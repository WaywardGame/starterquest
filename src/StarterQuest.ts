import { EventBus } from "@wayward/game/event/EventBuses";
import { EventHandler } from "@wayward/game/event/EventManager";
import { Game } from "@wayward/game/game/Game";
import { BiomeType } from "@wayward/game/game/biome/IBiome";
import { DoodadType, DoodadTypeGroup } from "@wayward/game/game/doodad/IDoodad";
import { EquipType } from "@wayward/game/game/entity/IHuman";
import { ActionArgumentsOf, ActionType } from "@wayward/game/game/entity/action/IAction";
import GatherLiquid from "@wayward/game/game/entity/action/actions/GatherLiquid";
import StokeFire from "@wayward/game/game/entity/action/actions/StokeFire";
import Player from "@wayward/game/game/entity/player/Player";
import PlayerManager from "@wayward/game/game/entity/player/PlayerManager";
import { QuestType } from "@wayward/game/game/entity/player/quest/quest/IQuest";
import { Quest as QuestBase } from "@wayward/game/game/entity/player/quest/quest/Quest";
import { QuestRequirementType } from "@wayward/game/game/entity/player/quest/requirement/IRequirement";
import { QuestRequirement } from "@wayward/game/game/entity/player/quest/requirement/Requirement";
import { ItemType, ItemTypeGroup } from "@wayward/game/game/item/IItem";
import { itemDescriptions } from "@wayward/game/game/item/ItemDescriptions";
import MapGenHelpers from "@wayward/game/game/mapgen/MapGenHelpers";
import { GameMode } from "@wayward/game/game/options/IGameOptions";
import { TileTemplateType } from "@wayward/game/game/tile/ITerrain";
import Dictionary from "@wayward/game/language/Dictionary";
import Translation from "@wayward/game/language/Translation";
import Mod from "@wayward/game/mod/Mod";
import Register, { Registry } from "@wayward/game/mod/ModRegistry";
import { RenderSource } from "@wayward/game/renderer/IRenderer";
import { ActionSlot } from "@wayward/game/ui/screen/screens/game/static/actions/ActionSlot";
import { IActionBarSlotData } from "@wayward/game/ui/screen/screens/game/static/actions/IActionBar";
import { HighlightType } from "@wayward/game/ui/util/IHighlight";
import Enums from "@wayward/game/utilities/enum/Enums";
import { Tuple } from "@wayward/utilities/collection/Tuple";

const STARTER_QUEST_ID = "Starter Quest";

enum ActionSlotType {
	Action,
	Item,
}

function isActionSlotType(type: ActionSlotType | undefined, slot: IActionBarSlotData): boolean {
	if (type === ActionSlotType.Item) {
		return !!slot.using?.item;
	}

	if (type === ActionSlotType.Action) {
		return !slot.using?.item && !slot.using?.itemType;
	}

	return true;
}

class Quest extends QuestBase {
	public constructor(type?: QuestType) {
		super(type);
		this.setSkippable();
	}
}

export default class StarterQuest extends Mod {

	////////////////////////////////////
	// Static
	//

	@Mod.instance<StarterQuest>(STARTER_QUEST_ID)
	public static readonly INSTANCE: StarterQuest;

	////////////////////////////////////
	// Requirements
	//

	@Register.questRequirement("actionSlots", new QuestRequirement<[ActionSlotType?]>({})
		.setEventTrigger(ActionSlot, "update", (api, slot) => {
			if (gameScreen?.actionBar?.hasFilledSlot(slot => isActionSlotType(api.requirement.options[0], slot))) {
				return true;
			}

			return false;
		})
		.setInitializeTrigger(api => {
			if (gameScreen?.actionBar?.hasFilledSlot(slot => isActionSlotType(api.requirement.options[0], slot))) {
				return true;
			}

			return false;
		})
		.setRelations([
			[HighlightType.Selector, ".game-action-slot:not(.game-action-slot-filled)"],
		])
		.setTranslation(api => Translation.get(Dictionary.QuestRequirement, api.requirement.type)
			.addArgs(api.requirement.options[0])))
	public requirementActionSlot: QuestRequirementType;

	@Register.questRequirement("lightCampfire", new QuestRequirement({})
		.setEventTrigger(EventBus.Actions, "postExecuteAction", (api, _actionApi, actionType, handlerApi, args) => {
			if (handlerApi.executor !== api.host || actionType !== ActionType.StartFire) {
				return false;
			}

			const tile = handlerApi.executor.asEntityMovable?.facingTile;
			const doodad = tile?.doodad;
			if (!doodad) {
				return false;
			}

			return doodad.type === DoodadType.LitClayCampfire || doodad.type === DoodadType.LitGraniteCampfire || doodad.type === DoodadType.LitSandstoneCampfire;
		})
		.setRelations([
			[HighlightType.Selector, "#inventory .group-FireStarter"],
		]))
	public requirementLightCampfire: QuestRequirementType;

	@Register.questRequirement("gatherFromDripstone", new QuestRequirement({})
		.setEventTrigger(EventBus.Actions, "postExecuteAction", (api, _actionApi, actionType, handlerApi, args) => {
			if (handlerApi.executor !== api.host || !(actionType === ActionType.GatherLiquid || actionType === ActionType.DrinkInFront)) {
				return false;
			}

			const tile = handlerApi.executor.asEntityMovable?.facingTile;
			const doodad = tile?.doodad;
			if (!doodad) {
				return false;
			}

			if (actionType === ActionType.GatherLiquid) {
				const [item] = args as ActionArgumentsOf<typeof GatherLiquid>;
				if (!handlerApi.executor.island.items.isInGroup(item.type, ItemTypeGroup.ContainerOfDesalinatedWater)) {
					return false;
				}
			} else if (actionType === ActionType.DrinkInFront && doodad.gatherReady !== undefined && doodad.gatherReady <= 0) {
				return false;
			}

			return doodad.gatherReady === undefined;
		}))
	public requirementGatherFromDripstone: QuestRequirementType;

	@Register.questRequirement("stokeCampfire", new QuestRequirement({})
		.setEventTrigger(EventBus.Actions, "postExecuteAction", (api, _actionApi, actionType, handlerApi, args) => {
			if (handlerApi.executor !== api.host || actionType !== ActionType.StokeFire) {
				return false;
			}

			const tile = handlerApi.executor.asEntityMovable?.facingTile;
			const doodad = tile?.doodad;
			if (!doodad || !(doodad.type === DoodadType.LitClayCampfire || doodad.type === DoodadType.LitGraniteCampfire || doodad.type === DoodadType.LitSandstoneCampfire)) {
				return false;
			}

			const [item] = args as ActionArgumentsOf<typeof StokeFire>;
			if (item.isValid) {
				return false;
			}

			return true;
		})
		.setRelations([
			...Enums.values(ItemType)
				.filter(type => (itemDescriptions[type] && itemDescriptions[type].use || []).includes(ActionType.StokeFire))
				.map(type => Tuple(HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
		]))
	public requirementStokeCampfire: QuestRequirementType;

	@Register.questRequirement("fillDripstone", new QuestRequirement({})
		.setEventTrigger(EventBus.Actions, "postExecuteAction", (api, _actionApi, actionType, handlerApi, args) => {
			if (handlerApi.executor !== api.host || actionType !== ActionType.Pour) {
				return false;
			}

			const tile = handlerApi.executor.asEntityMovable?.facingTile;
			const doodad = tile?.doodad;
			if (!doodad || !doodad.isInGroup(DoodadTypeGroup.Dripstone)) {
				return false;
			}

			if (doodad.gatherReady === undefined || doodad.gatherReady <= 0) {
				return false;
			}

			return true;
		})
		.setRelations([
			[HighlightType.Selector, "#inventory .group-ContainerOfSeawater"],
		]))
	public requirementFillDripstone: QuestRequirementType;

	////////////////////////////////////
	// Quests
	//

	@Register.quest("welcome", new Quest()
		.setNeedsManualCompletion()
		.addChildQuests(Registry<StarterQuest>().get("questGearUp")))
	public questWelcome: QuestType;

	@Register.quest("gearUp", new Quest()
		.addRequirement(QuestRequirementType.Equip, [EquipType.MainHand, EquipType.OffHand], [ItemTypeGroup.Weapon, ItemTypeGroup.Tool])
		.addChildQuests(Registry<StarterQuest>().get("questActionSlots")))
	public questGearUp: QuestType;

	@Register.quest("actionSlots", new Quest()
		.addRequirement(Registry<StarterQuest>().get("requirementActionSlot"), ActionSlotType.Action)
		.addChildQuests(Registry<StarterQuest>().get("questItemActionSlots")))
	public questActionSlots: QuestType;

	@Register.quest("itemActionSlots", new Quest()
		.addRequirement(Registry<StarterQuest>().get("requirementActionSlot"), ActionSlotType.Item)
		.addChildQuests(Registry<StarterQuest>().get("questResourceGathering")))
	public questItemActionSlots: QuestType;

	@Register.quest("resourceGathering", new Quest()
		.addRequirement(QuestRequirementType.CollectItem, [ItemType.Branch], 2)
		.addRequirement(QuestRequirementType.CollectItem, [ItemType.Granite], 2)
		.addChildQuests(Registry<StarterQuest>().get("questCrafting")))
	public questResourceGathering: QuestType;

	@Register.quest("crafting", new Quest()
		.addRequirement(QuestRequirementType.Craft, [ItemType.SharpGranite], 1)
		.addChildQuests(Registry<StarterQuest>().get("questDismantle")))
	public questCrafting: QuestType;

	@Register.quest("dismantle", new Quest()
		.addRequirement(QuestRequirementType.Dismantle, [ItemType.Branch, ItemType.Log, ItemType.Granite], 1)
		.addChildQuests(Registry<StarterQuest>().get("questHunting")))
	public questDismantle: QuestType;

	@Register.quest("hunting", new Quest()
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.Sharpened], 1)
		.addRequirement(QuestRequirementType.KillCreatures, 1)
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.RawMeat], 1)
		.addChildQuests(Registry<StarterQuest>().get("questWoodenPoles")))
	public questHunting: QuestType;

	@Register.quest("woodenPoles", new Quest()
		.addRequirement(QuestRequirementType.CollectItem, [ItemType.WoodenPole], 2)
		.addChildQuests(Registry<StarterQuest>().get("questHandDrill")))
	public questWoodenPoles: QuestType;

	@Register.quest("handDrill", new Quest()
		.addRequirement(QuestRequirementType.Craft, [ItemType.HandDrill], 1)
		.addChildQuests(Registry<StarterQuest>().get("questKindlingTinder")))
	public questHandDrill: QuestType;

	@Register.quest("kindlingTinder", new Quest()
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.Tinder], 1)
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.Kindling], 1)
		.addChildQuests(Registry<StarterQuest>().get("questCampfire")))
	public questKindlingTinder: QuestType;

	@Register.quest("campfire", new Quest()
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.Rock], 5)
		.addRequirement(QuestRequirementType.Craft, [ItemType.GraniteCampfire], 1)
		.addRequirement(QuestRequirementType.Build, [ItemType.GraniteCampfire])
		.addChildQuests(Registry<StarterQuest>().get("questFire")))
	public questCampfire: QuestType;

	@Register.quest("fire", new Quest()
		.addRequirement(Registry<StarterQuest>().get("requirementLightCampfire"))
		.addChildQuests(Registry<StarterQuest>().get("questStokeFire")))
	public questFire: QuestType;

	@Register.quest("stokeFire", new Quest()
		.addRequirement(Registry<StarterQuest>().get("requirementStokeCampfire"))
		.addChildQuests(Registry<StarterQuest>().get("questCooking")))
	public questStokeFire: QuestType;

	@Register.quest("cooking", new Quest()
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.CookingEquipment], 1)
		.addRequirement(QuestRequirementType.Craft, [ItemTypeGroup.CookedMeat], 1)
		.addChildQuests(Registry<StarterQuest>().get("purifyingFreshWater")))
	public questCooking: QuestType;

	@Register.quest("purifyingFreshWater", new Quest()
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.ContainerOfUnpurifiedFreshWater], 1)
		.addRequirement(QuestRequirementType.Craft, [ItemTypeGroup.ContainerOfPurifiedFreshWater], 1)
		.addChildQuests(Registry<StarterQuest>().get("questTaming")))
	public purifyingFreshWater: QuestType;

	@Register.quest("taming", new Quest()
		.addRequirement(QuestRequirementType.TameCreatures, 1)
		.addChildQuests(Registry<StarterQuest>().get("questExtraStorage")))
	public questTaming: QuestType;

	@Register.quest("extraStorage", new Quest()
		.addRequirement(QuestRequirementType.Craft, [ItemType.WoodenChest], 1)
		.addRequirement(QuestRequirementType.Build, [ItemType.WoodenChest])
		.addChildQuests(Registry<StarterQuest>().get("questDripstone")))
	public questExtraStorage: QuestType;

	@Register.quest("dripstone", new Quest()
		.addRequirement(QuestRequirementType.CollectItem, [ItemType.Granite], 3)
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.Sharpened], 1)
		.addRequirement(QuestRequirementType.CollectItem, [ItemType.String], 2)
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.Pole], 4)
		.addRequirement(QuestRequirementType.Craft, [ItemType.GraniteDripstone], 1)
		.addRequirement(QuestRequirementType.Build, [ItemType.GraniteDripstone])
		.addChildQuests(Registry<StarterQuest>().get("questFillDripstone")))
	public questDripstone: QuestType;

	@Register.quest("fillDripstone", new Quest()
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.ContainerOfSeawater], 1)
		.addRequirement(Registry<StarterQuest>().get("requirementFillDripstone"))
		.addChildQuests(Registry<StarterQuest>().get("questGatherLiquid")))
	public questFillDripstone: QuestType;

	@Register.quest("gatherLiquid", new Quest()
		.addRequirement(Registry<StarterQuest>().get("requirementGatherFromDripstone"))
		.addChildQuests(Registry<StarterQuest>().get("questSurvivalistTraining")))
	public questGatherLiquid: QuestType;

	@Register.quest("survivalistTraining", new Quest()
		.setNeedsManualCompletion())
	public questSurvivalistTraining: QuestType;

	////////////////////////////////////
	// Event Handlers
	//

	@EventHandler(EventBus.PlayerManager, "join")
	public onPlayerJoin(manager: PlayerManager, player: Player): void {
		this.addQuest(player);
	}

	@EventHandler(EventBus.Game, "play")
	public onGameStart(game: Game, isLoadingSave: boolean, loadCount: number): void {
		if (!multiplayer.isConnected || !multiplayer.isClient) {
			this.addQuest();
		}

		// Spawn a starting pond
		if (!isLoadingSave && (!multiplayer.isConnected || multiplayer.isServer) && localIsland.biomeType === BiomeType.Coastal) {
			for (let x = 9; x < 50; x++) {
				const tile = localIsland.getTile(localPlayer.x + x, localPlayer.y - 2, localPlayer.z);
				if (!tile?.description?.shallowWater && !tile?.description?.water) {
					MapGenHelpers.spawnTemplate(localIsland, TileTemplateType.Pond, localPlayer.x + x, localPlayer.y - 2, localPlayer.z, { which: "smallPond" });
					localPlayer.updateView(RenderSource.Mod, true);
					break;
				}
			}
		}
	}

	private addQuest(player: Player = localPlayer): void {
		if (game.getGameMode() !== GameMode.Challenge && player.quests.getQuests().every(quest => quest.data.type !== this.questWelcome)) {
			player.quests.add(this.questWelcome);
		}
	}
}

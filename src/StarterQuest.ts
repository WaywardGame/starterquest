import { DoodadType } from "game/doodad/IDoodad";
import GatherWater from "game/entity/action/actions/GatherWater";
import StokeFire from "game/entity/action/actions/StokeFire";
import { ActionArguments, ActionType } from "game/entity/action/IAction";
import { EquipType } from "game/entity/IHuman";
import Player from "game/entity/player/Player";
import { QuestType } from "game/entity/player/quest/quest/IQuest";
import { Quest } from "game/entity/player/quest/quest/Quest";
import { QuestRequirementType } from "game/entity/player/quest/requirement/IRequirement";
import { QuestRequirement } from "game/entity/player/quest/requirement/Requirement";
import { ItemType, ItemTypeGroup } from "game/item/IItem";
import itemDescriptions from "game/item/Items";
import { GameMode } from "game/options/IGameOptions";
import { HookMethod } from "mod/IHookHost";
import { Hook } from "mod/IHookManager";
import Mod from "mod/Mod";
import Register, { Registry } from "mod/ModRegistry";
import { HighlightType } from "ui/component/IComponent";
import { Tuple } from "utilities/collection/Arrays";
import Enums from "utilities/enum/Enums";

const STARTER_QUEST_ID = "Starter Quest";

export default class StarterQuest extends Mod {

	////////////////////////////////////
	// Static
	//

	@Mod.instance<StarterQuest>(STARTER_QUEST_ID)
	public static readonly INSTANCE: StarterQuest;

	////////////////////////////////////
	// Requirements
	//

	@Register.questRequirement("quickslot", new QuestRequirement({})
		.setTrigger(Hook.OnItemQuickslot, (api, item, player, slot) => {
			if (player !== api.host) return false;
			return true;
		})
		.setInitializeTrigger(api => {
			for (const quickslot of api.host.quickSlotInfo) {
				if (quickslot && quickslot.itemType) {
					return true;
				}
			}

			return false;
		})
		.setRelations([
			[HighlightType.Selector, "#quick-slots ul"],
		]))
	public requirementQuickslot: QuestRequirementType;

	@Register.questRequirement("changeHand", new QuestRequirement({})
		.setHostTrigger("updateOption", (api, player, key) => key === "leftHand" || key === "rightHand")
		.setRelations([
			[HighlightType.Selector, "#equipment .checkbox-option[data-checkbox-id='leftHand']"],
			[HighlightType.Selector, "#equipment .checkbox-option[data-checkbox-id='rightHand']"],
		]))
	public requirementChangeHand: QuestRequirementType;

	@Register.questRequirement("lightCampfire", new QuestRequirement({})
		.setTrigger(Hook.PostExecuteAction, (api, actionApi, action) => {
			if (actionApi.executor !== api.host || action.type !== ActionType.StartFire) {
				return false;
			}

			const tile = actionApi.executor.getFacingTile();
			const doodad = tile.doodad;
			if (!doodad) {
				return false;
			}

			return doodad.type === DoodadType.LitClayCampfire || doodad.type === DoodadType.LitStoneCampfire || doodad.type === DoodadType.LitSandstoneCampfire;
		})
		.setRelations([
			[HighlightType.Selector, "#inventory .group-FireStarter"],
		]))
	public requirementLightCampfire: QuestRequirementType;

	@Register.questRequirement("lightWaterStill", new QuestRequirement({})
		.setTrigger(Hook.PostExecuteAction, (api, actionApi, action) => {
			if (actionApi.executor !== api.host || action.type !== ActionType.StartFire) {
				return false;
			}

			const tile = actionApi.executor.getFacingTile();
			const doodad = tile.doodad;
			if (!doodad) {
				return false;
			}

			return doodad.type === DoodadType.LitClayWaterStill || doodad.type === DoodadType.LitStoneWaterStill || doodad.type === DoodadType.LitSandstoneWaterStill;
		})
		.setRelations([
			[HighlightType.Selector, "#inventory .group-FireStarter"],
		]))
	public requirementLightWaterStill: QuestRequirementType;

	@Register.questRequirement("gatherFromWaterStill", new QuestRequirement({})
		.setTrigger(Hook.PostExecuteAction, (api, actionApi, action, args) => {
			if (actionApi.executor !== api.host || !(action.type === ActionType.GatherWater || action.type === ActionType.DrinkInFront || action.type === ActionType.DetachContainer)) {
				return false;
			}

			const tile = actionApi.executor.getFacingTile();
			const doodad = tile.doodad;
			if (!doodad) {
				return false;
			}

			if (action.type === ActionType.GatherWater) {
				const [item] = args as ActionArguments<typeof GatherWater>;
				if (!itemManager.isInGroup(item.type, ItemTypeGroup.ContainerOfDesalinatedWater)) {
					return false;
				}
			} else if (action.type === ActionType.DrinkInFront && doodad.gatherReady !== undefined && doodad.gatherReady <= 0) {
				return false;
			} else if (action.type === ActionType.DetachContainer && doodad.stillContainer) {
				return false;
			}

			return doodad.gatherReady === undefined;
		}))
	public requirementGatherFromWaterStill: QuestRequirementType;

	@Register.questRequirement("stokeCampfire", new QuestRequirement({})
		.setTrigger(Hook.PostExecuteAction, (api, actionApi, action, args) => {
			if (actionApi.executor !== api.host || action.type !== ActionType.StokeFire) {
				return false;
			}

			const tile = actionApi.executor.getFacingTile();
			const doodad = tile.doodad;
			if (!doodad || !(doodad.type === DoodadType.LitClayCampfire || doodad.type === DoodadType.LitStoneCampfire || doodad.type === DoodadType.LitSandstoneCampfire)) {
				return false;
			}

			const [item] = args as ActionArguments<typeof StokeFire>;
			if (item.isValid()) {
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

	@Register.questRequirement("fillStill", new QuestRequirement({})
		.setTrigger(Hook.PostExecuteAction, (api, actionApi, action, args) => {
			if (actionApi.executor !== api.host || action.type !== ActionType.Pour) {
				return false;
			}

			const tile = actionApi.executor.getFacingTile();
			const doodad = tile.doodad;
			if (!doodad || !(doodad.type === DoodadType.SandstoneWaterStill || doodad.type === DoodadType.StoneWaterStill || doodad.type === DoodadType.ClayWaterStill)) {
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
	public requirementFillStill: QuestRequirementType;

	@Register.questRequirement("attachContainer", new QuestRequirement({})
		.setTrigger(Hook.PostExecuteAction, (api, actionApi, action, args) => {
			if (actionApi.executor !== api.host || action.type !== ActionType.AttachContainer) {
				return false;
			}

			const tile = actionApi.executor.getFacingTile();
			const doodad = tile.doodad;
			if (!doodad || !(doodad.type === DoodadType.SandstoneWaterStill || doodad.type === DoodadType.StoneWaterStill || doodad.type === DoodadType.ClayWaterStill)) {
				return false;
			}

			if (!doodad.stillContainer) {
				return false;
			}

			return true;
		})
		.setRelations([
			...Enums.values(ItemType)
				.filter(type => (itemDescriptions[type] && itemDescriptions[type].use || []).includes(ActionType.AttachContainer))
				.map(type => Tuple(HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
		]))
	public requirementAttachContainer: QuestRequirementType;

	@Register.questRequirement("stokeWaterStill", new QuestRequirement({})
		.setTrigger(Hook.PostExecuteAction, (api, actionApi, action, args) => {
			if (actionApi.executor !== api.host || action.type !== ActionType.StokeFire) {
				return false;
			}

			const tile = actionApi.executor.getFacingTile();
			const doodad = tile.doodad;
			const doodadDescription = doodad?.description();
			if (!doodadDescription || !doodadDescription.waterStill) {
				return false;
			}

			const [item] = args as ActionArguments<typeof StokeFire>;
			if (item.isValid()) {
				return false;
			}

			return true;
		})
		.setRelations([
			...Enums.values(ItemType)
				.filter(type => (itemDescriptions[type] && itemDescriptions[type].use || []).includes(ActionType.StokeFire))
				.map(type => Tuple(HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
		]))
	public requirementStokeWaterStill: QuestRequirementType;

	////////////////////////////////////
	// Quests
	//

	@Register.quest("welcome", new Quest()
		.setNeedsManualCompletion()
		.addChildQuests(Registry<StarterQuest>().get("questGearUp")))
	public questWelcome: QuestType;

	@Register.quest("gearUp", new Quest()
		.addRequirement(QuestRequirementType.Equip, [EquipType.RightHand, EquipType.LeftHand], [ItemTypeGroup.Weapon, ItemTypeGroup.Tool])
		.addChildQuests(Registry<StarterQuest>().get("questQuickslots")))
	public questGearUp: QuestType;

	@Register.quest("quickslots", new Quest()
		.addRequirement(Registry<StarterQuest>().get("requirementQuickslot"))
		.addChildQuests(Registry<StarterQuest>().get("questResourceGathering")))
	public questQuickslots: QuestType;

	@Register.quest("resourceGathering", new Quest()
		.addRequirement(QuestRequirementType.CollectItem, [ItemType.Branch], 2)
		.addRequirement(QuestRequirementType.CollectItem, [ItemType.LargeRock], 2)
		.addChildQuests(Registry<StarterQuest>().get("questCrafting")))
	public questResourceGathering: QuestType;

	@Register.quest("crafting", new Quest()
		.addRequirement(QuestRequirementType.Craft, [ItemType.SharpRock], 1)
		.addChildQuests(Registry<StarterQuest>().get("questDismantle")))
	public questCrafting: QuestType;

	@Register.quest("dismantle", new Quest()
		.addRequirement(QuestRequirementType.Dismantle, [ItemType.Branch, ItemType.Log, ItemType.LargeRock], 1)
		.addChildQuests(Registry<StarterQuest>().get("questChangeHands")))
	public questDismantle: QuestType;

	@Register.quest("changeHands", new Quest()
		.addRequirement(Registry<StarterQuest>().get("requirementChangeHand"))
		.addChildQuests(Registry<StarterQuest>().get("questHunting")))
	public questChangeHands: QuestType;

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
		.addRequirement(QuestRequirementType.Craft, [ItemType.StoneCampfire], 1)
		.addRequirement(QuestRequirementType.Build, [ItemType.StoneCampfire])
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
		.addChildQuests(Registry<StarterQuest>().get("questWaterStill")))
	public questCooking: QuestType;

	@Register.quest("waterStill", new Quest()
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.Rock], 2)
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.Sharpened], 1)
		.addRequirement(QuestRequirementType.CollectItem, [ItemType.String], 1)
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.Pole], 1)
		.addRequirement(QuestRequirementType.Craft, [ItemType.StoneWaterStill], 1)
		.addRequirement(QuestRequirementType.Build, [ItemType.StoneWaterStill])
		.addChildQuests(Registry<StarterQuest>().get("questFillStill")))
	public questWaterStill: QuestType;

	@Register.quest("fillStill", new Quest()
		.addRequirement(QuestRequirementType.CollectItem, [ItemTypeGroup.ContainerOfSeawater], 1)
		.addRequirement(Registry<StarterQuest>().get("requirementFillStill"))
		.addChildQuests(Registry<StarterQuest>().get("questAttachContainer")))
	public questFillStill: QuestType;

	@Register.quest("attachContainer", new Quest()
		.addRequirement(Registry<StarterQuest>().get("requirementAttachContainer"))
		.addChildQuests(Registry<StarterQuest>().get("questDesalination")))
	public questAttachContainer: QuestType;

	@Register.quest("desalination", new Quest()
		.addRequirement(Registry<StarterQuest>().get("requirementLightWaterStill"))
		.addRequirement(Registry<StarterQuest>().get("requirementStokeWaterStill"))
		.addChildQuests(Registry<StarterQuest>().get("questGatherWater")))
	public questDesalination: QuestType;

	@Register.quest("gatherWater", new Quest()
		.addRequirement(Registry<StarterQuest>().get("requirementGatherFromWaterStill"))
		.addChildQuests(Registry<StarterQuest>().get("questTaming")))
	public questGatherWater: QuestType;

	@Register.quest("taming", new Quest()
		.addRequirement(QuestRequirementType.TameCreatures, 1)
		.addChildQuests(Registry<StarterQuest>().get("questExtraStorage")))
	public questTaming: QuestType;

	@Register.quest("extraStorage", new Quest()
		.addRequirement(QuestRequirementType.Craft, [ItemType.WoodenChest], 1)
		.addRequirement(QuestRequirementType.Build, [ItemType.WoodenChest])
		.addChildQuests(Registry<StarterQuest>().get("questSurvivalistTraining")))
	public questExtraStorage: QuestType;

	@Register.quest("survivalistTraining", new Quest()
		.setNeedsManualCompletion())
	public questSurvivalistTraining: QuestType;

	////////////////////////////////////
	// Hooks
	//

	@HookMethod
	@Override public onPlayerJoin(player: Player) {
		this.addQuest(player);
	}

	@HookMethod
	@Override public onGameStart(isLoadingSave: boolean, loadCount: number) {
		if (!multiplayer.isConnected() || !multiplayer.isClient()) {
			this.addQuest();
		}
	}

	private addQuest(player: Player = localPlayer) {
		if (game.getGameMode() !== GameMode.Challenge && player.quests.getQuests().every(quest => quest.data.type !== this.questWelcome)) {
			player.quests.add(this.questWelcome);
		}
	}
}

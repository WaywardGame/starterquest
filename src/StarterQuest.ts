import GatherWater from "action/actions/GatherWater";
import StokeFire from "action/actions/StokeFire";
import { ActionArguments, ActionType } from "action/IAction";
import { DoodadType, EquipType, ItemType, ItemTypeGroup } from "Enums";
import itemDescriptions from "item/Items";
import { HookMethod } from "mod/IHookHost";
import { Hook } from "mod/IHookManager";
import Mod from "mod/Mod";
import Register, { Registry } from "mod/ModRegistry";
import { HighlightType } from "newui/component/IComponent";
import IPlayer, { PlayerEvent } from "player/IPlayer";
import { QuestType } from "player/quest/quest/IQuest";
import { Quest } from "player/quest/quest/Quest";
import { RequirementType } from "player/quest/requirement/IRequirement";
import { Requirement } from "player/quest/requirement/Requirement";
import { IOptions } from "save/data/ISaveDataGlobal";
import Enums from "utilities/enum/Enums";
import { tuple } from "utilities/iterable/Generators";

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

	@Register.questRequirement("quickslot", new Requirement({})
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
	public requirementQuickslot: RequirementType;

	@Register.questRequirement("changeHand", new Requirement({})
		.setHostTrigger(PlayerEvent.UpdateOption, (api, key: keyof IOptions, value: boolean | number) =>
			key === "leftHand" || key === "rightHand")
		.setRelations([
			[HighlightType.Selector, "#equipment .checkbox-option[data-checkbox-id='leftHand']"],
			[HighlightType.Selector, "#equipment .checkbox-option[data-checkbox-id='rightHand']"],
		]))
	public requirementChangeHand: RequirementType;

	@Register.questRequirement("lightCampfire", new Requirement({})
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
	public requirementLightCampfire: RequirementType;

	@Register.questRequirement("lightWaterStill", new Requirement({})
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
	public requirementLightWaterStill: RequirementType;

	@Register.questRequirement("gatherFromWaterStill", new Requirement({})
		.setTrigger(Hook.PostExecuteAction, (api, actionApi, action, args) => {
			if (actionApi.executor !== api.host || action.type !== ActionType.GatherWater) {
				return false;
			}

			const tile = actionApi.executor.getFacingTile();
			const doodad = tile.doodad;
			if (!doodad) {
				return false;
			}

			const [item] = args as ActionArguments<typeof GatherWater>;
			if (!itemManager.isInGroup(item.type, ItemTypeGroup.ContainerOfDesalinatedWater)) {
				return false;
			}

			return doodad.type === DoodadType.ClayWaterStill || doodad.type === DoodadType.SandstoneWaterStill || doodad.type === DoodadType.StoneWaterStill;
		})
		.setRelations([
			[HighlightType.Selector, "#inventory .group-FireStarter"],
		]))
	public requirementGatherFromWaterStill: RequirementType;

	@Register.questRequirement("stokeCampfire", new Requirement({})
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
				.map(type => tuple(HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
		]))
	public requirementStokeCampfire: RequirementType;

	@Register.questRequirement("fillStill", new Requirement({})
		.setTrigger(Hook.PostExecuteAction, (api, actionApi, action, args) => {
			if (actionApi.executor !== api.host || action.type !== ActionType.Pour) {
				return false;
			}

			const tile = actionApi.executor.getFacingTile();
			const doodad = tile.doodad;
			if (!doodad || !(doodad.type === DoodadType.SandstoneWaterStill || doodad.type === DoodadType.StoneWaterStill || doodad.type === DoodadType.ClayWaterStill)) {
				return false;
			}

			if (doodad.decay === undefined || doodad.decay === 0) {
				return false;
			}

			return true;
		})
		.setRelations([
			[HighlightType.Selector, "#inventory .group-ContainerOfSeawater"],
		]))
	public requirementFillStill: RequirementType;

	////////////////////////////////////
	// Quests
	//

	@Register.quest("welcome", new Quest()
		.setNeedsManualCompletion()
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questGearUp")))
	public questWelcome: QuestType;

	@Register.quest("gearUp", new Quest()
		.addRequirement(RequirementType.Equip, [EquipType.RightHand, EquipType.LeftHand], [ItemTypeGroup.Weapon, ItemTypeGroup.Tool])
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questQuickslots")))
	public questGearUp: QuestType;

	@Register.quest("quickslots", new Quest()
		.addRequirement(Registry<StarterQuest, RequirementType>().get("requirementQuickslot"))
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questResourceGathering")))
	public questQuickslots: QuestType;

	@Register.quest("resourceGathering", new Quest()
		.addRequirement(RequirementType.CollectItem, [ItemType.Branch], 2)
		.addRequirement(RequirementType.CollectItem, [ItemType.LargeRock], 2)
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questCrafting")))
	public questResourceGathering: QuestType;

	@Register.quest("crafting", new Quest()
		.addRequirement(RequirementType.Craft, [ItemType.SharpRock], 1)
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questDismantle")))
	public questCrafting: QuestType;

	@Register.quest("dismantle", new Quest()
		.addRequirement(RequirementType.Dismantle, [ItemType.Branch, ItemType.Log, ItemType.LargeRock], 1)
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questChangeHands")))
	public questDismantle: QuestType;

	@Register.quest("changeHands", new Quest()
		.addRequirement(Registry<StarterQuest, RequirementType>().get("requirementChangeHand"))
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questHunting")))
	public questChangeHands: QuestType;

	@Register.quest("hunting", new Quest()
		.addRequirement(RequirementType.CollectItem, [ItemTypeGroup.Sharpened], 1)
		.addRequirement(RequirementType.KillCreatures, 1)
		.addRequirement(RequirementType.CollectItem, [ItemTypeGroup.RawMeat], 1)
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questWoodenPoles")))
	public questHunting: QuestType;

	@Register.quest("woodenPoles", new Quest()
		.addRequirement(RequirementType.CollectItem, [ItemType.WoodenPole], 2)
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questHandDrill")))
	public questWoodenPoles: QuestType;

	@Register.quest("handDrill", new Quest()
		.addRequirement(RequirementType.Craft, [ItemType.HandDrill], 1)
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questKindlingTinder")))
	public questHandDrill: QuestType;

	@Register.quest("kindlingTinder", new Quest()
		.addRequirement(RequirementType.CollectItem, [ItemTypeGroup.Tinder], 1)
		.addRequirement(RequirementType.CollectItem, [ItemTypeGroup.Kindling], 1)
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questCampfire")))
	public questKindlingTinder: QuestType;

	@Register.quest("campfire", new Quest()
		.addRequirement(RequirementType.CollectItem, [ItemTypeGroup.Rock, ItemType.Sandstone], 5)
		.addRequirement(RequirementType.Craft, [ItemTypeGroup.Campfire], 1)
		.addRequirement(RequirementType.Build, [ItemTypeGroup.Campfire])
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questFire")))
	public questCampfire: QuestType;

	@Register.quest("fire", new Quest()
		.addRequirement(Registry<StarterQuest, RequirementType>().get("requirementLightCampfire"))
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questStokeFire")))
	public questFire: QuestType;

	@Register.quest("stokeFire", new Quest()
		.addRequirement(Registry<StarterQuest, RequirementType>().get("requirementStokeCampfire"))
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questCooking")))
	public questStokeFire: QuestType;

	@Register.quest("cooking", new Quest()
		.addRequirement(RequirementType.CollectItem, [ItemTypeGroup.CookingEquipment], 1)
		.addRequirement(RequirementType.Craft, [ItemTypeGroup.CookedMeat], 1)
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questTaming")))
	public questCooking: QuestType;

	@Register.quest("taming", new Quest()
		.addRequirement(RequirementType.TameCreatures, 1)
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questExtraStorage")))
	public questTaming: QuestType;

	@Register.quest("extraStorage", new Quest()
		.addRequirement(RequirementType.Craft, [ItemType.WoodenChest], 1)
		.addRequirement(RequirementType.Build, [ItemType.WoodenChest])
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questString")))
	public questExtraStorage: QuestType;

	@Register.quest("string", new Quest()
		.addRequirement(RequirementType.CollectItem, [ItemTypeGroup.Cordage], 2) // only require 2 in case they craft the string before collecting the other 2
		.addRequirement(RequirementType.Craft, [ItemType.String], 2)
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questLeather")))
	public questString: QuestType;

	@Register.quest("leather", new Quest()
		.addRequirement(RequirementType.CollectItem, [ItemType.AnimalPelt], 1)
		.addRequirement(RequirementType.Dismantle, [ItemType.AnimalPelt], 1)
		.addRequirement(RequirementType.Craft, [ItemTypeGroup.MortarAndPestle], 1)
		.addRequirement(RequirementType.Craft, [ItemType.Tannin], 1)
		.addRequirement(RequirementType.Craft, [ItemType.TannedLeather], 1)
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questWaterskin")))
	public questLeather: QuestType;

	@Register.quest("waterskin", new Quest()
		.addRequirement(RequirementType.CollectItem, [ItemTypeGroup.Needle], 1)
		.addRequirement(RequirementType.Craft, [ItemType.Waterskin], 1)
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questWaterStill")))
	public questWaterskin: QuestType;

	@Register.quest("waterStill", new Quest()
		.addRequirement(RequirementType.CollectItem, [ItemTypeGroup.Rock, ItemType.Sandstone], 2)
		.addRequirement(RequirementType.CollectItem, [ItemTypeGroup.Sharpened], 1)
		.addRequirement(RequirementType.CollectItem, [ItemType.String], 1)
		.addRequirement(RequirementType.CollectItem, [ItemTypeGroup.Pole], 1)
		.addRequirement(RequirementType.CollectItem, [ItemType.Waterskin], 1)
		.addRequirement(RequirementType.Craft, [ItemType.StoneWaterStill, ItemType.SandstoneWaterStill], 1)
		.addRequirement(RequirementType.Build, [ItemType.StoneWaterStill, ItemType.SandstoneWaterStill])
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questFillStill")))
	public questWaterStill: QuestType;

	@Register.quest("fillStill", new Quest()
		.addRequirement(RequirementType.CollectItem, [ItemTypeGroup.ContainerOfSeawater], 1)
		.addRequirement(Registry<StarterQuest, RequirementType>().get("requirementFillStill"))
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questDesalination")))
	public questFillStill: QuestType;

	@Register.quest("desalination", new Quest()
		.addRequirement(Registry<StarterQuest, RequirementType>().get("requirementLightWaterStill"))
		.addRequirement(Registry<StarterQuest, RequirementType>().get("requirementGatherFromWaterStill"))
		.addChildQuests(Registry<StarterQuest, QuestType>().get("questSurvivalistTraining")))
	public questDesalination: QuestType;

	@Register.quest("survivalistTraining", new Quest()
		.setNeedsManualCompletion())
	public questSurvivalistTraining: QuestType;

	////////////////////////////////////
	// Hooks
	//

	@HookMethod
	@Override public onPlayerJoin(player: IPlayer) {
		this.addQuest(player);
	}

	@HookMethod
	@Override public onGameStart(isLoadingSave: boolean, loadCount: number) {
		if (!multiplayer.isConnected() || !multiplayer.isClient()) {
			this.addQuest();
		}
	}

	private addQuest(player = localPlayer) {
		if (player.quests.getQuests().every(quest => quest.data.type !== this.questWelcome)) {
			player.quests.add(this.questWelcome);
		}
	}
}

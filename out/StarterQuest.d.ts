import Player from "entity/player/Player";
import { QuestType } from "entity/player/quest/quest/IQuest";
import { QuestRequirementType } from "entity/player/quest/requirement/IRequirement";
import Mod from "mod/Mod";
export default class StarterQuest extends Mod {
    static readonly INSTANCE: StarterQuest;
    requirementQuickslot: QuestRequirementType;
    requirementChangeHand: QuestRequirementType;
    requirementLightCampfire: QuestRequirementType;
    requirementLightWaterStill: QuestRequirementType;
    requirementGatherFromWaterStill: QuestRequirementType;
    requirementStokeCampfire: QuestRequirementType;
    requirementFillStill: QuestRequirementType;
    requirementAttachContainer: QuestRequirementType;
    requirementStokeWaterStill: QuestRequirementType;
    questWelcome: QuestType;
    questGearUp: QuestType;
    questQuickslots: QuestType;
    questResourceGathering: QuestType;
    questCrafting: QuestType;
    questDismantle: QuestType;
    questChangeHands: QuestType;
    questHunting: QuestType;
    questWoodenPoles: QuestType;
    questHandDrill: QuestType;
    questKindlingTinder: QuestType;
    questCampfire: QuestType;
    questFire: QuestType;
    questStokeFire: QuestType;
    questCooking: QuestType;
    questWaterStill: QuestType;
    questFillStill: QuestType;
    questAttachContainer: QuestType;
    questDesalination: QuestType;
    questGatherWater: QuestType;
    questTaming: QuestType;
    questExtraStorage: QuestType;
    questSurvivalistTraining: QuestType;
    onPlayerJoin(player: Player): void;
    onGameStart(isLoadingSave: boolean, loadCount: number): void;
    private addQuest;
    protected setEasySpawn(): boolean | undefined;
}

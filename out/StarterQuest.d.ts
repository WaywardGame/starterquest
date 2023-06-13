/*!
 * Copyright 2011-2023 Unlok
 * https://www.unlok.ca
 *
 * Credits & Thanks:
 * https://www.unlok.ca/credits-thanks/
 *
 * Wayward is a copyrighted and licensed work. Modification and/or distribution of any source files is prohibited. If you wish to modify the game in any way, please refer to the modding guide:
 * https://github.com/WaywardGame/types/wiki
 */
import Player from "game/entity/player/Player";
import PlayerManager from "game/entity/player/PlayerManager";
import { QuestType } from "game/entity/player/quest/quest/IQuest";
import { QuestRequirementType } from "game/entity/player/quest/requirement/IRequirement";
import { Game } from "game/Game";
import Mod from "mod/Mod";
export default class StarterQuest extends Mod {
    static readonly INSTANCE: StarterQuest;
    requirementActionSlot: QuestRequirementType;
    requirementLightCampfire: QuestRequirementType;
    requirementGatherFromDripstone: QuestRequirementType;
    requirementStokeCampfire: QuestRequirementType;
    requirementFillDripstone: QuestRequirementType;
    questWelcome: QuestType;
    questGearUp: QuestType;
    questActionSlots: QuestType;
    questResourceGathering: QuestType;
    questCrafting: QuestType;
    questDismantle: QuestType;
    questHunting: QuestType;
    questWoodenPoles: QuestType;
    questHandDrill: QuestType;
    questKindlingTinder: QuestType;
    questCampfire: QuestType;
    questFire: QuestType;
    questStokeFire: QuestType;
    questCooking: QuestType;
    purifyingFreshWater: QuestType;
    questTaming: QuestType;
    questExtraStorage: QuestType;
    questDripstone: QuestType;
    questFillDripstone: QuestType;
    questGatherLiquid: QuestType;
    questSurvivalistTraining: QuestType;
    onPlayerJoin(manager: PlayerManager, player: Player): void;
    onGameStart(game: Game, isLoadingSave: boolean, loadCount: number): void;
    private addQuest;
}

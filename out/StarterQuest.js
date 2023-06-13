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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "event/EventBuses", "event/EventManager", "game/biome/IBiome", "game/doodad/IDoodad", "game/entity/action/IAction", "game/entity/IHuman", "game/entity/player/quest/quest/Quest", "game/entity/player/quest/requirement/IRequirement", "game/entity/player/quest/requirement/Requirement", "game/item/IItem", "game/item/ItemDescriptions", "game/mapgen/MapGenHelpers", "game/options/IGameOptions", "game/tile/ITerrain", "mod/Mod", "mod/ModRegistry", "renderer/IRenderer", "ui/screen/screens/game/static/ActionBar", "ui/util/IHighlight", "utilities/collection/Tuple", "utilities/enum/Enums"], function (require, exports, EventBuses_1, EventManager_1, IBiome_1, IDoodad_1, IAction_1, IHuman_1, Quest_1, IRequirement_1, Requirement_1, IItem_1, ItemDescriptions_1, MapGenHelpers_1, IGameOptions_1, ITerrain_1, Mod_1, ModRegistry_1, IRenderer_1, ActionBar_1, IHighlight_1, Tuple_1, Enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const STARTER_QUEST_ID = "Starter Quest";
    class StarterQuest extends Mod_1.default {
        onPlayerJoin(manager, player) {
            this.addQuest(player);
        }
        onGameStart(game, isLoadingSave, loadCount) {
            if (!multiplayer.isConnected() || !multiplayer.isClient()) {
                this.addQuest();
            }
            if (!isLoadingSave && (!multiplayer.isConnected() || multiplayer.isServer()) && localIsland.biomeType === IBiome_1.BiomeType.Coastal) {
                for (let x = 9; x < 50; x++) {
                    const tile = localIsland.getTile(localPlayer.x + x, localPlayer.y - 2, localPlayer.z);
                    if (!tile?.description?.shallowWater && !tile?.description?.water) {
                        MapGenHelpers_1.default.spawnTemplate(localIsland, ITerrain_1.TileTemplateType.Pond, localPlayer.x + x, localPlayer.y - 2, localPlayer.z, { which: "smallPond" });
                        localPlayer.updateView(IRenderer_1.RenderSource.Mod, true);
                        break;
                    }
                }
            }
        }
        addQuest(player = localPlayer) {
            if (game.getGameMode() !== IGameOptions_1.GameMode.Challenge && player.quests.getQuests().every(quest => quest.data.type !== this.questWelcome)) {
                player.quests.add(this.questWelcome);
            }
        }
    }
    exports.default = StarterQuest;
    __decorate([
        ModRegistry_1.default.questRequirement("actionSlots", new Requirement_1.QuestRequirement({})
            .setEventTrigger(ActionBar_1.ActionSlot, "update", (api, slot) => {
            return true;
        })
            .setInitializeTrigger(api => {
            if (gameScreen?.actionBar?.hasFilledSlot()) {
                return true;
            }
            return false;
        })
            .setRelations([
            [IHighlight_1.HighlightType.Selector, ".game-action-slot"],
        ]))
    ], StarterQuest.prototype, "requirementActionSlot", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("lightCampfire", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, _actionApi, actionType, handlerApi, args) => {
            if (handlerApi.executor !== api.host || actionType !== IAction_1.ActionType.StartFire) {
                return false;
            }
            const tile = handlerApi.executor.asEntityMovable?.facingTile;
            const doodad = tile?.doodad;
            if (!doodad) {
                return false;
            }
            return doodad.type === IDoodad_1.DoodadType.LitClayCampfire || doodad.type === IDoodad_1.DoodadType.LitGraniteCampfire || doodad.type === IDoodad_1.DoodadType.LitSandstoneCampfire;
        })
            .setRelations([
            [IHighlight_1.HighlightType.Selector, "#inventory .group-FireStarter"],
        ]))
    ], StarterQuest.prototype, "requirementLightCampfire", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("gatherFromDripstone", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, _actionApi, actionType, handlerApi, args) => {
            if (handlerApi.executor !== api.host || !(actionType === IAction_1.ActionType.GatherLiquid || actionType === IAction_1.ActionType.DrinkInFront)) {
                return false;
            }
            const tile = handlerApi.executor.asEntityMovable?.facingTile;
            const doodad = tile?.doodad;
            if (!doodad) {
                return false;
            }
            if (actionType === IAction_1.ActionType.GatherLiquid) {
                const [item] = args;
                if (!handlerApi.executor.island.items.isInGroup(item.type, IItem_1.ItemTypeGroup.ContainerOfDesalinatedWater)) {
                    return false;
                }
            }
            else if (actionType === IAction_1.ActionType.DrinkInFront && doodad.gatherReady !== undefined && doodad.gatherReady <= 0) {
                return false;
            }
            return doodad.gatherReady === undefined;
        }))
    ], StarterQuest.prototype, "requirementGatherFromDripstone", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("stokeCampfire", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, _actionApi, actionType, handlerApi, args) => {
            if (handlerApi.executor !== api.host || actionType !== IAction_1.ActionType.StokeFire) {
                return false;
            }
            const tile = handlerApi.executor.asEntityMovable?.facingTile;
            const doodad = tile?.doodad;
            if (!doodad || !(doodad.type === IDoodad_1.DoodadType.LitClayCampfire || doodad.type === IDoodad_1.DoodadType.LitGraniteCampfire || doodad.type === IDoodad_1.DoodadType.LitSandstoneCampfire)) {
                return false;
            }
            const [item] = args;
            if (item.isValid()) {
                return false;
            }
            return true;
        })
            .setRelations([
            ...Enums_1.default.values(IItem_1.ItemType)
                .filter(type => (ItemDescriptions_1.itemDescriptions[type] && ItemDescriptions_1.itemDescriptions[type].use || []).includes(IAction_1.ActionType.StokeFire))
                .map(type => (0, Tuple_1.Tuple)(IHighlight_1.HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
        ]))
    ], StarterQuest.prototype, "requirementStokeCampfire", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("fillDripstone", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, _actionApi, actionType, handlerApi, args) => {
            if (handlerApi.executor !== api.host || actionType !== IAction_1.ActionType.Pour) {
                return false;
            }
            const tile = handlerApi.executor.asEntityMovable?.facingTile;
            const doodad = tile?.doodad;
            if (!doodad || !doodad.isInGroup(IDoodad_1.DoodadTypeGroup.Dripstone)) {
                return false;
            }
            if (doodad.gatherReady === undefined || doodad.gatherReady <= 0) {
                return false;
            }
            return true;
        })
            .setRelations([
            [IHighlight_1.HighlightType.Selector, "#inventory .group-ContainerOfSeawater"],
        ]))
    ], StarterQuest.prototype, "requirementFillDripstone", void 0);
    __decorate([
        ModRegistry_1.default.quest("welcome", new Quest_1.Quest()
            .setNeedsManualCompletion()
            .addChildQuests((0, ModRegistry_1.Registry)().get("questGearUp")))
    ], StarterQuest.prototype, "questWelcome", void 0);
    __decorate([
        ModRegistry_1.default.quest("gearUp", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Equip, [IHuman_1.EquipType.MainHand, IHuman_1.EquipType.OffHand], [IItem_1.ItemTypeGroup.Weapon, IItem_1.ItemTypeGroup.Tool])
            .addChildQuests((0, ModRegistry_1.Registry)().get("questActionSlots")))
    ], StarterQuest.prototype, "questGearUp", void 0);
    __decorate([
        ModRegistry_1.default.quest("actionSlots", new Quest_1.Quest()
            .addRequirement((0, ModRegistry_1.Registry)().get("requirementActionSlot"))
            .addChildQuests((0, ModRegistry_1.Registry)().get("questResourceGathering")))
    ], StarterQuest.prototype, "questActionSlots", void 0);
    __decorate([
        ModRegistry_1.default.quest("resourceGathering", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemType.Branch], 2)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemType.Granite], 2)
            .addChildQuests((0, ModRegistry_1.Registry)().get("questCrafting")))
    ], StarterQuest.prototype, "questResourceGathering", void 0);
    __decorate([
        ModRegistry_1.default.quest("crafting", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.SharpGranite], 1)
            .addChildQuests((0, ModRegistry_1.Registry)().get("questDismantle")))
    ], StarterQuest.prototype, "questCrafting", void 0);
    __decorate([
        ModRegistry_1.default.quest("dismantle", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Dismantle, [IItem_1.ItemType.Branch, IItem_1.ItemType.Log, IItem_1.ItemType.Granite], 1)
            .addChildQuests((0, ModRegistry_1.Registry)().get("questHunting")))
    ], StarterQuest.prototype, "questDismantle", void 0);
    __decorate([
        ModRegistry_1.default.quest("hunting", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Sharpened], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.KillCreatures, 1)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.RawMeat], 1)
            .addChildQuests((0, ModRegistry_1.Registry)().get("questWoodenPoles")))
    ], StarterQuest.prototype, "questHunting", void 0);
    __decorate([
        ModRegistry_1.default.quest("woodenPoles", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemType.WoodenPole], 2)
            .addChildQuests((0, ModRegistry_1.Registry)().get("questHandDrill")))
    ], StarterQuest.prototype, "questWoodenPoles", void 0);
    __decorate([
        ModRegistry_1.default.quest("handDrill", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.HandDrill], 1)
            .addChildQuests((0, ModRegistry_1.Registry)().get("questKindlingTinder")))
    ], StarterQuest.prototype, "questHandDrill", void 0);
    __decorate([
        ModRegistry_1.default.quest("kindlingTinder", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Tinder], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Kindling], 1)
            .addChildQuests((0, ModRegistry_1.Registry)().get("questCampfire")))
    ], StarterQuest.prototype, "questKindlingTinder", void 0);
    __decorate([
        ModRegistry_1.default.quest("campfire", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Rock], 5)
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.GraniteCampfire], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Build, [IItem_1.ItemType.GraniteCampfire])
            .addChildQuests((0, ModRegistry_1.Registry)().get("questFire")))
    ], StarterQuest.prototype, "questCampfire", void 0);
    __decorate([
        ModRegistry_1.default.quest("fire", new Quest_1.Quest()
            .addRequirement((0, ModRegistry_1.Registry)().get("requirementLightCampfire"))
            .addChildQuests((0, ModRegistry_1.Registry)().get("questStokeFire")))
    ], StarterQuest.prototype, "questFire", void 0);
    __decorate([
        ModRegistry_1.default.quest("stokeFire", new Quest_1.Quest()
            .addRequirement((0, ModRegistry_1.Registry)().get("requirementStokeCampfire"))
            .addChildQuests((0, ModRegistry_1.Registry)().get("questCooking")))
    ], StarterQuest.prototype, "questStokeFire", void 0);
    __decorate([
        ModRegistry_1.default.quest("cooking", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.CookingEquipment], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemTypeGroup.CookedMeat], 1)
            .addChildQuests((0, ModRegistry_1.Registry)().get("purifyingFreshWater")))
    ], StarterQuest.prototype, "questCooking", void 0);
    __decorate([
        ModRegistry_1.default.quest("purifyingFreshWater", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.ContainerOfUnpurifiedFreshWater], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemTypeGroup.ContainerOfPurifiedFreshWater], 1)
            .addChildQuests((0, ModRegistry_1.Registry)().get("questTaming")))
    ], StarterQuest.prototype, "purifyingFreshWater", void 0);
    __decorate([
        ModRegistry_1.default.quest("taming", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.TameCreatures, 1)
            .addChildQuests((0, ModRegistry_1.Registry)().get("questExtraStorage")))
    ], StarterQuest.prototype, "questTaming", void 0);
    __decorate([
        ModRegistry_1.default.quest("extraStorage", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.WoodenChest], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Build, [IItem_1.ItemType.WoodenChest])
            .addChildQuests((0, ModRegistry_1.Registry)().get("questDripstone")))
    ], StarterQuest.prototype, "questExtraStorage", void 0);
    __decorate([
        ModRegistry_1.default.quest("dripstone", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemType.Granite], 3)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Sharpened], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemType.String], 2)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Pole], 4)
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.GraniteDripstone], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Build, [IItem_1.ItemType.GraniteDripstone])
            .addChildQuests((0, ModRegistry_1.Registry)().get("questFillDripstone")))
    ], StarterQuest.prototype, "questDripstone", void 0);
    __decorate([
        ModRegistry_1.default.quest("fillDripstone", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.ContainerOfSeawater], 1)
            .addRequirement((0, ModRegistry_1.Registry)().get("requirementFillDripstone"))
            .addChildQuests((0, ModRegistry_1.Registry)().get("questGatherLiquid")))
    ], StarterQuest.prototype, "questFillDripstone", void 0);
    __decorate([
        ModRegistry_1.default.quest("gatherLiquid", new Quest_1.Quest()
            .addRequirement((0, ModRegistry_1.Registry)().get("requirementGatherFromDripstone"))
            .addChildQuests((0, ModRegistry_1.Registry)().get("questSurvivalistTraining")))
    ], StarterQuest.prototype, "questGatherLiquid", void 0);
    __decorate([
        ModRegistry_1.default.quest("survivalistTraining", new Quest_1.Quest()
            .setNeedsManualCompletion())
    ], StarterQuest.prototype, "questSurvivalistTraining", void 0);
    __decorate([
        (0, EventManager_1.EventHandler)(EventBuses_1.EventBus.PlayerManager, "join")
    ], StarterQuest.prototype, "onPlayerJoin", null);
    __decorate([
        (0, EventManager_1.EventHandler)(EventBuses_1.EventBus.Game, "play")
    ], StarterQuest.prototype, "onGameStart", null);
    __decorate([
        Mod_1.default.instance(STARTER_QUEST_ID)
    ], StarterQuest, "INSTANCE", void 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRlclF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YXJ0ZXJRdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0dBU0c7Ozs7Ozs7Ozs7SUE4QkgsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7SUFFekMsTUFBcUIsWUFBYSxTQUFRLGFBQUc7UUEwUHJDLFlBQVksQ0FBQyxPQUFzQixFQUFFLE1BQWM7WUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBR00sV0FBVyxDQUFDLElBQVUsRUFBRSxhQUFzQixFQUFFLFNBQWlCO1lBQ3ZFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNoQjtZQUdELElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLGtCQUFTLENBQUMsT0FBTyxFQUFFO2dCQUM1SCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM1QixNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEYsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsWUFBWSxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7d0JBQ2xFLHVCQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSwyQkFBZ0IsQ0FBQyxJ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
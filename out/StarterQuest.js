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
            if (!isLoadingSave && localIsland.biomeType === IBiome_1.BiomeType.Coastal) {
                MapGenHelpers_1.default.spawnTemplate(localIsland, ITerrain_1.TileTemplateType.Pond, localPlayer.x + 9, localPlayer.y - 2, localPlayer.z, { which: "smallPond" });
                localPlayer.updateView(IRenderer_1.RenderSource.Mod, true);
            }
        }
        addQuest(player = localPlayer) {
            if (game.getGameMode() !== IGameOptions_1.GameMode.Challenge && player.quests.getQuests().every(quest => quest.data.type !== this.questWelcome)) {
                player.quests.add(this.questWelcome);
            }
        }
    }
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
        ModRegistry_1.default.questRequirement("lightWaterStill", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, _actionApi, actionType, handlerApi, args) => {
            if (handlerApi.executor !== api.host || actionType !== IAction_1.ActionType.StartFire) {
                return false;
            }
            const tile = handlerApi.executor.asEntityMovable?.facingTile;
            const doodad = tile?.doodad;
            if (!doodad) {
                return false;
            }
            return doodad.type === IDoodad_1.DoodadType.LitClayWaterStill || doodad.type === IDoodad_1.DoodadType.LitGraniteWaterStill || doodad.type === IDoodad_1.DoodadType.LitSandstoneWaterStill;
        })
            .setRelations([
            [IHighlight_1.HighlightType.Selector, "#inventory .group-FireStarter"],
        ]))
    ], StarterQuest.prototype, "requirementLightWaterStill", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("gatherFromWaterStill", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, _actionApi, actionType, handlerApi, args) => {
            if (handlerApi.executor !== api.host || !(actionType === IAction_1.ActionType.GatherLiquid || actionType === IAction_1.ActionType.DrinkInFront || actionType === IAction_1.ActionType.DetachContainer)) {
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
            else if (actionType === IAction_1.ActionType.DetachContainer && doodad.stillContainer) {
                return false;
            }
            return doodad.gatherReady === undefined;
        }))
    ], StarterQuest.prototype, "requirementGatherFromWaterStill", void 0);
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
        ModRegistry_1.default.questRequirement("fillStill", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, _actionApi, actionType, handlerApi, args) => {
            if (handlerApi.executor !== api.host || actionType !== IAction_1.ActionType.Pour) {
                return false;
            }
            const tile = handlerApi.executor.asEntityMovable?.facingTile;
            const doodad = tile?.doodad;
            if (!doodad || !(doodad.type === IDoodad_1.DoodadType.SandstoneWaterStill || doodad.type === IDoodad_1.DoodadType.GraniteWaterStill || doodad.type === IDoodad_1.DoodadType.ClayWaterStill)) {
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
    ], StarterQuest.prototype, "requirementFillStill", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("attachContainer", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, _actionApi, actionType, handlerApi, args) => {
            if (handlerApi.executor !== api.host || actionType !== IAction_1.ActionType.AttachContainer) {
                return false;
            }
            const tile = handlerApi.executor.asEntityMovable?.facingTile;
            const doodad = tile?.doodad;
            if (!doodad || !(doodad.type === IDoodad_1.DoodadType.SandstoneWaterStill || doodad.type === IDoodad_1.DoodadType.GraniteWaterStill || doodad.type === IDoodad_1.DoodadType.ClayWaterStill)) {
                return false;
            }
            if (!doodad.stillContainer) {
                return false;
            }
            return true;
        })
            .setRelations([
            ...Enums_1.default.values(IItem_1.ItemType)
                .filter(type => (ItemDescriptions_1.itemDescriptions[type] && ItemDescriptions_1.itemDescriptions[type].use || []).includes(IAction_1.ActionType.AttachContainer))
                .map(type => (0, Tuple_1.Tuple)(IHighlight_1.HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
        ]))
    ], StarterQuest.prototype, "requirementAttachContainer", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("stokeWaterStill", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, _actionApi, actionType, handlerApi, args) => {
            if (handlerApi.executor !== api.host || actionType !== IAction_1.ActionType.StokeFire) {
                return false;
            }
            const tile = handlerApi.executor.asEntityMovable?.facingTile;
            const doodad = tile?.doodad;
            const doodadDescription = doodad?.description;
            if (!doodadDescription || !doodadDescription.waterStill) {
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
    ], StarterQuest.prototype, "requirementStokeWaterStill", void 0);
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
            .addChildQuests((0, ModRegistry_1.Registry)().get("questWaterStill")))
    ], StarterQuest.prototype, "questCooking", void 0);
    __decorate([
        ModRegistry_1.default.quest("waterStill", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Rock], 2)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Sharpened], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemType.String], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Pole], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.GraniteWaterStill], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Build, [IItem_1.ItemType.GraniteWaterStill])
            .addChildQuests((0, ModRegistry_1.Registry)().get("questFillStill")))
    ], StarterQuest.prototype, "questWaterStill", void 0);
    __decorate([
        ModRegistry_1.default.quest("fillStill", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.ContainerOfSeawater], 1)
            .addRequirement((0, ModRegistry_1.Registry)().get("requirementFillStill"))
            .addChildQuests((0, ModRegistry_1.Registry)().get("questAttachContainer")))
    ], StarterQuest.prototype, "questFillStill", void 0);
    __decorate([
        ModRegistry_1.default.quest("attachContainer", new Quest_1.Quest()
            .addRequirement((0, ModRegistry_1.Registry)().get("requirementAttachContainer"))
            .addChildQuests((0, ModRegistry_1.Registry)().get("questDesalination")))
    ], StarterQuest.prototype, "questAttachContainer", void 0);
    __decorate([
        ModRegistry_1.default.quest("desalination", new Quest_1.Quest()
            .addRequirement((0, ModRegistry_1.Registry)().get("requirementLightWaterStill"))
            .addRequirement((0, ModRegistry_1.Registry)().get("requirementStokeWaterStill"))
            .addChildQuests((0, ModRegistry_1.Registry)().get("questGatherLiquid")))
    ], StarterQuest.prototype, "questDesalination", void 0);
    __decorate([
        ModRegistry_1.default.quest("gatherLiquid", new Quest_1.Quest()
            .addRequirement((0, ModRegistry_1.Registry)().get("requirementGatherFromWaterStill"))
            .addChildQuests((0, ModRegistry_1.Registry)().get("questTaming")))
    ], StarterQuest.prototype, "questGatherLiquid", void 0);
    __decorate([
        ModRegistry_1.default.quest("taming", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.TameCreatures, 1)
            .addChildQuests((0, ModRegistry_1.Registry)().get("questExtraStorage")))
    ], StarterQuest.prototype, "questTaming", void 0);
    __decorate([
        ModRegistry_1.default.quest("extraStorage", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.WoodenChest], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Build, [IItem_1.ItemType.WoodenChest])
            .addChildQuests((0, ModRegistry_1.Registry)().get("questSurvivalistTraining")))
    ], StarterQuest.prototype, "questExtraStorage", void 0);
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
    exports.default = StarterQuest;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRlclF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YXJ0ZXJRdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0dBU0c7Ozs7Ozs7Ozs7SUE4QkgsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7SUFFekMsTUFBcUIsWUFBYSxTQUFRLGFBQUc7UUF3VXJDLFlBQVksQ0FBQyxPQUFzQixFQUFFLE1BQWM7WUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBR00sV0FBVyxDQUFDLElBQVUsRUFBRSxhQUFzQixFQUFFLFNBQWlCO1lBQ3ZFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNoQjtZQUVELElBQUksQ0FBQyxhQUFhLElBQUksV0FBVyxDQUFDLFNBQVMsS0FBSyxrQkFBUyxDQUFDLE9BQU8sRUFBRTtnQkFDbEUsdUJBQWEsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLDJCQUFnQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQzdJLFdBQVcsQ0FBQyxVQUFVLENBQUMsd0JBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDL0M7UUFDRixDQUFDO1FBRU8sUUFBUSxDQUFDLFNBQWlCLFdBQVc7WUFDNUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssdUJBQVEsQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUs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
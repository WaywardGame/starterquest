var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "event/EventBuses", "event/EventManager", "game/doodad/IDoodad", "game/entity/action/IAction", "game/entity/IHuman", "game/entity/player/quest/quest/Quest", "game/entity/player/quest/requirement/IRequirement", "game/entity/player/quest/requirement/Requirement", "game/item/IItem", "game/item/ItemDescriptions", "game/options/IGameOptions", "mod/Mod", "mod/ModRegistry", "ui/screen/screens/game/static/ActionBar", "ui/util/IHighlight", "utilities/collection/Arrays", "utilities/enum/Enums"], function (require, exports, EventBuses_1, EventManager_1, IDoodad_1, IAction_1, IHuman_1, Quest_1, IRequirement_1, Requirement_1, IItem_1, ItemDescriptions_1, IGameOptions_1, Mod_1, ModRegistry_1, ActionBar_1, IHighlight_1, Arrays_1, Enums_1) {
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
                .map(type => (0, Arrays_1.Tuple)(IHighlight_1.HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
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
                .map(type => (0, Arrays_1.Tuple)(IHighlight_1.HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
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
            const doodadDescription = doodad?.description();
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
                .map(type => (0, Arrays_1.Tuple)(IHighlight_1.HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRlclF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YXJ0ZXJRdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUF3QkEsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7SUFFekMsTUFBcUIsWUFBYSxTQUFRLGFBQUc7UUF3VXJDLFlBQVksQ0FBQyxPQUFzQixFQUFFLE1BQWM7WUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBR00sV0FBVyxDQUFDLElBQVUsRUFBRSxhQUFzQixFQUFFLFNBQWlCO1lBQ3ZFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNoQjtRQUNGLENBQUM7UUFFTyxRQUFRLENBQUMsU0FBaUIsV0FBVztZQUM1QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyx1QkFBUSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDakksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3JDO1FBQ0YsQ0FBQztLQUNEO0lBN1RPO1FBZE4scUJBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSw4QkFBZ0IsQ0FBQyxFQUFFLENBQUM7YUFDaEUsZUFBZSxDQUFDLHNCQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3BELE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQyxDQUFDO2FBQ0Qsb0JBQW9C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
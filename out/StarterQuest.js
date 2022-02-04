var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "event/EventBuses", "event/EventManager", "game/doodad/IDoodad", "game/entity/action/IAction", "game/entity/IHuman", "game/entity/player/quest/quest/Quest", "game/entity/player/quest/requirement/IRequirement", "game/entity/player/quest/requirement/Requirement", "game/item/IItem", "game/item/Items", "game/options/IGameOptions", "mod/Mod", "mod/ModRegistry", "ui/component/IComponent", "utilities/collection/Arrays", "utilities/enum/Enums"], function (require, exports, EventBuses_1, EventManager_1, IDoodad_1, IAction_1, IHuman_1, Quest_1, IRequirement_1, Requirement_1, IItem_1, Items_1, IGameOptions_1, Mod_1, ModRegistry_1, IComponent_1, Arrays_1, Enums_1) {
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
        ModRegistry_1.default.questRequirement("quickslot", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Players, "updatedQuickslotInfo", (api, player, slot) => {
            if (player !== api.host)
                return false;
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
            [IComponent_1.HighlightType.Selector, "#quick-slots ul"],
        ]))
    ], StarterQuest.prototype, "requirementQuickslot", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("changeHand", new Requirement_1.QuestRequirement({})
            .setHostTrigger("updateOption", (api, player, key) => key === "leftHand" || key === "rightHand")
            .setRelations([
            [IComponent_1.HighlightType.Selector, "#equipment .checkbox-option[data-checkbox-id='leftHand']"],
            [IComponent_1.HighlightType.Selector, "#equipment .checkbox-option[data-checkbox-id='rightHand']"],
        ]))
    ], StarterQuest.prototype, "requirementChangeHand", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("lightCampfire", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, actionApi, actionType, handlerApi, args) => {
            if (actionApi.executor !== api.host || actionType !== IAction_1.ActionType.StartFire) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
            if (!doodad) {
                return false;
            }
            return doodad.type === IDoodad_1.DoodadType.LitClayCampfire || doodad.type === IDoodad_1.DoodadType.LitStoneCampfire || doodad.type === IDoodad_1.DoodadType.LitSandstoneCampfire;
        })
            .setRelations([
            [IComponent_1.HighlightType.Selector, "#inventory .group-FireStarter"],
        ]))
    ], StarterQuest.prototype, "requirementLightCampfire", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("lightWaterStill", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, actionApi, actionType, handlerApi, args) => {
            if (actionApi.executor !== api.host || actionType !== IAction_1.ActionType.StartFire) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
            if (!doodad) {
                return false;
            }
            return doodad.type === IDoodad_1.DoodadType.LitClayWaterStill || doodad.type === IDoodad_1.DoodadType.LitStoneWaterStill || doodad.type === IDoodad_1.DoodadType.LitSandstoneWaterStill;
        })
            .setRelations([
            [IComponent_1.HighlightType.Selector, "#inventory .group-FireStarter"],
        ]))
    ], StarterQuest.prototype, "requirementLightWaterStill", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("gatherFromWaterStill", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, actionApi, actionType, handlerApi, args) => {
            if (actionApi.executor !== api.host || !(actionType === IAction_1.ActionType.GatherLiquid || actionType === IAction_1.ActionType.DrinkInFront || actionType === IAction_1.ActionType.DetachContainer)) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
            if (!doodad) {
                return false;
            }
            if (actionType === IAction_1.ActionType.GatherLiquid) {
                const [item] = args;
                if (!actionApi.executor.island.items.isInGroup(item.type, IItem_1.ItemTypeGroup.ContainerOfDesalinatedWater)) {
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
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, actionApi, actionType, handlerApi, args) => {
            if (actionApi.executor !== api.host || actionType !== IAction_1.ActionType.StokeFire) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
            if (!doodad || !(doodad.type === IDoodad_1.DoodadType.LitClayCampfire || doodad.type === IDoodad_1.DoodadType.LitStoneCampfire || doodad.type === IDoodad_1.DoodadType.LitSandstoneCampfire)) {
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
                .filter(type => (Items_1.default[type] && Items_1.default[type].use || []).includes(IAction_1.ActionType.StokeFire))
                .map(type => (0, Arrays_1.Tuple)(IComponent_1.HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
        ]))
    ], StarterQuest.prototype, "requirementStokeCampfire", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("fillStill", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, actionApi, actionType, handlerApi, args) => {
            if (actionApi.executor !== api.host || actionType !== IAction_1.ActionType.Pour) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
            if (!doodad || !(doodad.type === IDoodad_1.DoodadType.SandstoneWaterStill || doodad.type === IDoodad_1.DoodadType.StoneWaterStill || doodad.type === IDoodad_1.DoodadType.ClayWaterStill)) {
                return false;
            }
            if (doodad.gatherReady === undefined || doodad.gatherReady <= 0) {
                return false;
            }
            return true;
        })
            .setRelations([
            [IComponent_1.HighlightType.Selector, "#inventory .group-ContainerOfSeawater"],
        ]))
    ], StarterQuest.prototype, "requirementFillStill", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("attachContainer", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, actionApi, actionType, handlerApi, args) => {
            if (actionApi.executor !== api.host || actionType !== IAction_1.ActionType.AttachContainer) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
            if (!doodad || !(doodad.type === IDoodad_1.DoodadType.SandstoneWaterStill || doodad.type === IDoodad_1.DoodadType.StoneWaterStill || doodad.type === IDoodad_1.DoodadType.ClayWaterStill)) {
                return false;
            }
            if (!doodad.stillContainer) {
                return false;
            }
            return true;
        })
            .setRelations([
            ...Enums_1.default.values(IItem_1.ItemType)
                .filter(type => (Items_1.default[type] && Items_1.default[type].use || []).includes(IAction_1.ActionType.AttachContainer))
                .map(type => (0, Arrays_1.Tuple)(IComponent_1.HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
        ]))
    ], StarterQuest.prototype, "requirementAttachContainer", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("stokeWaterStill", new Requirement_1.QuestRequirement({})
            .setEventTrigger(EventBuses_1.EventBus.Actions, "postExecuteAction", (api, actionApi, actionType, handlerApi, args) => {
            if (actionApi.executor !== api.host || actionType !== IAction_1.ActionType.StokeFire) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
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
                .filter(type => (Items_1.default[type] && Items_1.default[type].use || []).includes(IAction_1.ActionType.StokeFire))
                .map(type => (0, Arrays_1.Tuple)(IComponent_1.HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
        ]))
    ], StarterQuest.prototype, "requirementStokeWaterStill", void 0);
    __decorate([
        ModRegistry_1.default.quest("welcome", new Quest_1.Quest()
            .setNeedsManualCompletion()
            .addChildQuests((0, ModRegistry_1.Registry)().get("questGearUp")))
    ], StarterQuest.prototype, "questWelcome", void 0);
    __decorate([
        ModRegistry_1.default.quest("gearUp", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Equip, [IHuman_1.EquipType.RightHand, IHuman_1.EquipType.LeftHand], [IItem_1.ItemTypeGroup.Weapon, IItem_1.ItemTypeGroup.Tool])
            .addChildQuests((0, ModRegistry_1.Registry)().get("questQuickslots")))
    ], StarterQuest.prototype, "questGearUp", void 0);
    __decorate([
        ModRegistry_1.default.quest("quickslots", new Quest_1.Quest()
            .addRequirement((0, ModRegistry_1.Registry)().get("requirementQuickslot"))
            .addChildQuests((0, ModRegistry_1.Registry)().get("questResourceGathering")))
    ], StarterQuest.prototype, "questQuickslots", void 0);
    __decorate([
        ModRegistry_1.default.quest("resourceGathering", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemType.Branch], 2)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemType.LargeRock], 2)
            .addChildQuests((0, ModRegistry_1.Registry)().get("questCrafting")))
    ], StarterQuest.prototype, "questResourceGathering", void 0);
    __decorate([
        ModRegistry_1.default.quest("crafting", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.SharpRock], 1)
            .addChildQuests((0, ModRegistry_1.Registry)().get("questDismantle")))
    ], StarterQuest.prototype, "questCrafting", void 0);
    __decorate([
        ModRegistry_1.default.quest("dismantle", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Dismantle, [IItem_1.ItemType.Branch, IItem_1.ItemType.Log, IItem_1.ItemType.LargeRock], 1)
            .addChildQuests((0, ModRegistry_1.Registry)().get("questChangeHands")))
    ], StarterQuest.prototype, "questDismantle", void 0);
    __decorate([
        ModRegistry_1.default.quest("changeHands", new Quest_1.Quest()
            .addRequirement((0, ModRegistry_1.Registry)().get("requirementChangeHand"))
            .addChildQuests((0, ModRegistry_1.Registry)().get("questHunting")))
    ], StarterQuest.prototype, "questChangeHands", void 0);
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
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.StoneCampfire], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Build, [IItem_1.ItemType.StoneCampfire])
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
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.StoneWaterStill], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Build, [IItem_1.ItemType.StoneWaterStill])
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRlclF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YXJ0ZXJRdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUF1QkEsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7SUFFekMsTUFBcUIsWUFBYSxTQUFRLGFBQUc7UUF3VnJDLFlBQVksQ0FBQyxPQUFzQixFQUFFLE1BQWM7WUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBR00sV0FBVyxDQUFDLElBQVUsRUFBRSxhQUFzQixFQUFFLFNBQWlCO1lBQ3ZFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNoQjtRQUNGLENBQUM7UUFFTyxRQUFRLENBQUMsU0FBaUIsV0FBVztZQUM1QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyx1QkFBUSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDakksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3JDO1FBQ0YsQ0FBQztLQUNEO0lBMVVBO1FBakJDLHFCQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksOEJBQWdCLENBQUMsRUFBRSxDQUFDO2FBQzlELGVBQWUsQ0FBQyxxQkFBUSxDQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDaEYsSUFBSSxNQUFNLEtBQUssR0FB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
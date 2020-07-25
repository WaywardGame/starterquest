var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "doodad/IDoodad", "entity/action/IAction", "entity/IHuman", "entity/player/quest/quest/Quest", "entity/player/quest/requirement/IRequirement", "entity/player/quest/requirement/Requirement", "game/options/IGameOptions", "item/IItem", "item/Items", "mod/IHookHost", "mod/IHookManager", "mod/Mod", "mod/ModRegistry", "newui/component/IComponent", "utilities/Arrays", "utilities/enum/Enums"], function (require, exports, IDoodad_1, IAction_1, IHuman_1, Quest_1, IRequirement_1, Requirement_1, IGameOptions_1, IItem_1, Items_1, IHookHost_1, IHookManager_1, Mod_1, ModRegistry_1, IComponent_1, Arrays_1, Enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const STARTER_QUEST_ID = "Starter Quest";
    class StarterQuest extends Mod_1.default {
        onPlayerJoin(player) {
            this.addQuest(player);
        }
        onGameStart(isLoadingSave, loadCount) {
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
            .setTrigger(IHookManager_1.Hook.OnItemQuickslot, (api, item, player, slot) => {
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
            .setTrigger(IHookManager_1.Hook.PostExecuteAction, (api, actionApi, action) => {
            if (actionApi.executor !== api.host || action.type !== IAction_1.ActionType.StartFire) {
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
            .setTrigger(IHookManager_1.Hook.PostExecuteAction, (api, actionApi, action) => {
            if (actionApi.executor !== api.host || action.type !== IAction_1.ActionType.StartFire) {
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
            .setTrigger(IHookManager_1.Hook.PostExecuteAction, (api, actionApi, action, args) => {
            if (actionApi.executor !== api.host || !(action.type === IAction_1.ActionType.GatherWater || action.type === IAction_1.ActionType.DrinkInFront || action.type === IAction_1.ActionType.DetachContainer)) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
            if (!doodad) {
                return false;
            }
            if (action.type === IAction_1.ActionType.GatherWater) {
                const [item] = args;
                if (!itemManager.isInGroup(item.type, IItem_1.ItemTypeGroup.ContainerOfDesalinatedWater)) {
                    return false;
                }
            }
            else if (action.type === IAction_1.ActionType.DrinkInFront && doodad.gatherReady !== undefined && doodad.gatherReady <= 0) {
                return false;
            }
            else if (action.type === IAction_1.ActionType.DetachContainer && doodad.stillContainer) {
                return false;
            }
            return doodad.gatherReady === undefined;
        }))
    ], StarterQuest.prototype, "requirementGatherFromWaterStill", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("stokeCampfire", new Requirement_1.QuestRequirement({})
            .setTrigger(IHookManager_1.Hook.PostExecuteAction, (api, actionApi, action, args) => {
            if (actionApi.executor !== api.host || action.type !== IAction_1.ActionType.StokeFire) {
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
                .map(type => Arrays_1.Tuple(IComponent_1.HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
        ]))
    ], StarterQuest.prototype, "requirementStokeCampfire", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("fillStill", new Requirement_1.QuestRequirement({})
            .setTrigger(IHookManager_1.Hook.PostExecuteAction, (api, actionApi, action, args) => {
            if (actionApi.executor !== api.host || action.type !== IAction_1.ActionType.Pour) {
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
            .setTrigger(IHookManager_1.Hook.PostExecuteAction, (api, actionApi, action, args) => {
            if (actionApi.executor !== api.host || action.type !== IAction_1.ActionType.AttachContainer) {
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
                .map(type => Arrays_1.Tuple(IComponent_1.HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
        ]))
    ], StarterQuest.prototype, "requirementAttachContainer", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("stokeWaterStill", new Requirement_1.QuestRequirement({})
            .setTrigger(IHookManager_1.Hook.PostExecuteAction, (api, actionApi, action, args) => {
            if (actionApi.executor !== api.host || action.type !== IAction_1.ActionType.StokeFire) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
            const doodadDescription = doodad === null || doodad === void 0 ? void 0 : doodad.description();
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
                .map(type => Arrays_1.Tuple(IComponent_1.HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
        ]))
    ], StarterQuest.prototype, "requirementStokeWaterStill", void 0);
    __decorate([
        ModRegistry_1.default.quest("welcome", new Quest_1.Quest()
            .setNeedsManualCompletion()
            .addChildQuests(ModRegistry_1.Registry().get("questGearUp")))
    ], StarterQuest.prototype, "questWelcome", void 0);
    __decorate([
        ModRegistry_1.default.quest("gearUp", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Equip, [IHuman_1.EquipType.RightHand, IHuman_1.EquipType.LeftHand], [IItem_1.ItemTypeGroup.Weapon, IItem_1.ItemTypeGroup.Tool])
            .addChildQuests(ModRegistry_1.Registry().get("questQuickslots")))
    ], StarterQuest.prototype, "questGearUp", void 0);
    __decorate([
        ModRegistry_1.default.quest("quickslots", new Quest_1.Quest()
            .addRequirement(ModRegistry_1.Registry().get("requirementQuickslot"))
            .addChildQuests(ModRegistry_1.Registry().get("questResourceGathering")))
    ], StarterQuest.prototype, "questQuickslots", void 0);
    __decorate([
        ModRegistry_1.default.quest("resourceGathering", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemType.Branch], 2)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemType.LargeRock], 2)
            .addChildQuests(ModRegistry_1.Registry().get("questCrafting")))
    ], StarterQuest.prototype, "questResourceGathering", void 0);
    __decorate([
        ModRegistry_1.default.quest("crafting", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.SharpRock], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questDismantle")))
    ], StarterQuest.prototype, "questCrafting", void 0);
    __decorate([
        ModRegistry_1.default.quest("dismantle", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Dismantle, [IItem_1.ItemType.Branch, IItem_1.ItemType.Log, IItem_1.ItemType.LargeRock], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questChangeHands")))
    ], StarterQuest.prototype, "questDismantle", void 0);
    __decorate([
        ModRegistry_1.default.quest("changeHands", new Quest_1.Quest()
            .addRequirement(ModRegistry_1.Registry().get("requirementChangeHand"))
            .addChildQuests(ModRegistry_1.Registry().get("questHunting")))
    ], StarterQuest.prototype, "questChangeHands", void 0);
    __decorate([
        ModRegistry_1.default.quest("hunting", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Sharpened], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.KillCreatures, 1)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.RawMeat], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questWoodenPoles")))
    ], StarterQuest.prototype, "questHunting", void 0);
    __decorate([
        ModRegistry_1.default.quest("woodenPoles", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemType.WoodenPole], 2)
            .addChildQuests(ModRegistry_1.Registry().get("questHandDrill")))
    ], StarterQuest.prototype, "questWoodenPoles", void 0);
    __decorate([
        ModRegistry_1.default.quest("handDrill", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.HandDrill], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questKindlingTinder")))
    ], StarterQuest.prototype, "questHandDrill", void 0);
    __decorate([
        ModRegistry_1.default.quest("kindlingTinder", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Tinder], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Kindling], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questCampfire")))
    ], StarterQuest.prototype, "questKindlingTinder", void 0);
    __decorate([
        ModRegistry_1.default.quest("campfire", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Rock], 5)
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.StoneCampfire], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Build, [IItem_1.ItemType.StoneCampfire])
            .addChildQuests(ModRegistry_1.Registry().get("questFire")))
    ], StarterQuest.prototype, "questCampfire", void 0);
    __decorate([
        ModRegistry_1.default.quest("fire", new Quest_1.Quest()
            .addRequirement(ModRegistry_1.Registry().get("requirementLightCampfire"))
            .addChildQuests(ModRegistry_1.Registry().get("questStokeFire")))
    ], StarterQuest.prototype, "questFire", void 0);
    __decorate([
        ModRegistry_1.default.quest("stokeFire", new Quest_1.Quest()
            .addRequirement(ModRegistry_1.Registry().get("requirementStokeCampfire"))
            .addChildQuests(ModRegistry_1.Registry().get("questCooking")))
    ], StarterQuest.prototype, "questStokeFire", void 0);
    __decorate([
        ModRegistry_1.default.quest("cooking", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.CookingEquipment], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemTypeGroup.CookedMeat], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questWaterStill")))
    ], StarterQuest.prototype, "questCooking", void 0);
    __decorate([
        ModRegistry_1.default.quest("waterStill", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Rock], 2)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Sharpened], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemType.String], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Pole], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.StoneWaterStill], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Build, [IItem_1.ItemType.StoneWaterStill])
            .addChildQuests(ModRegistry_1.Registry().get("questFillStill")))
    ], StarterQuest.prototype, "questWaterStill", void 0);
    __decorate([
        ModRegistry_1.default.quest("fillStill", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.ContainerOfSeawater], 1)
            .addRequirement(ModRegistry_1.Registry().get("requirementFillStill"))
            .addChildQuests(ModRegistry_1.Registry().get("questAttachContainer")))
    ], StarterQuest.prototype, "questFillStill", void 0);
    __decorate([
        ModRegistry_1.default.quest("attachContainer", new Quest_1.Quest()
            .addRequirement(ModRegistry_1.Registry().get("requirementAttachContainer"))
            .addChildQuests(ModRegistry_1.Registry().get("questDesalination")))
    ], StarterQuest.prototype, "questAttachContainer", void 0);
    __decorate([
        ModRegistry_1.default.quest("desalination", new Quest_1.Quest()
            .addRequirement(ModRegistry_1.Registry().get("requirementLightWaterStill"))
            .addRequirement(ModRegistry_1.Registry().get("requirementStokeWaterStill"))
            .addChildQuests(ModRegistry_1.Registry().get("questGatherWater")))
    ], StarterQuest.prototype, "questDesalination", void 0);
    __decorate([
        ModRegistry_1.default.quest("gatherWater", new Quest_1.Quest()
            .addRequirement(ModRegistry_1.Registry().get("requirementGatherFromWaterStill"))
            .addChildQuests(ModRegistry_1.Registry().get("questTaming")))
    ], StarterQuest.prototype, "questGatherWater", void 0);
    __decorate([
        ModRegistry_1.default.quest("taming", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.TameCreatures, 1)
            .addChildQuests(ModRegistry_1.Registry().get("questExtraStorage")))
    ], StarterQuest.prototype, "questTaming", void 0);
    __decorate([
        ModRegistry_1.default.quest("extraStorage", new Quest_1.Quest()
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.WoodenChest], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Build, [IItem_1.ItemType.WoodenChest])
            .addChildQuests(ModRegistry_1.Registry().get("questSurvivalistTraining")))
    ], StarterQuest.prototype, "questExtraStorage", void 0);
    __decorate([
        ModRegistry_1.default.quest("survivalistTraining", new Quest_1.Quest()
            .setNeedsManualCompletion())
    ], StarterQuest.prototype, "questSurvivalistTraining", void 0);
    __decorate([
        IHookHost_1.HookMethod,
        Override
    ], StarterQuest.prototype, "onPlayerJoin", null);
    __decorate([
        IHookHost_1.HookMethod,
        Override
    ], StarterQuest.prototype, "onGameStart", null);
    __decorate([
        Mod_1.default.instance(STARTER_QUEST_ID)
    ], StarterQuest, "INSTANCE", void 0);
    exports.default = StarterQuest;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRlclF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YXJ0ZXJRdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFxQkEsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7SUFFekMsTUFBcUIsWUFBYSxTQUFRLGFBQUc7UUF3VjNCLFlBQVksQ0FBQyxNQUFjO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUdnQixXQUFXLENBQUMsYUFBc0IsRUFBRSxTQUFpQjtZQUNyRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUMxRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDaEI7UUFDRixDQUFDO1FBRU8sUUFBUSxDQUFDLFNBQWlCLFdBQVc7WUFDNUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssdUJBQVEsQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ2pJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNyQztRQUNGLENBQUM7S0FDRDtJQTFVQTtRQWpCQyxxQkFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLDhCQUFnQixDQUFDLEVBQUUsQ0FBQzthQUM5RCxVQUFVLENBQUMsbUJBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUM3RCxJQUFJLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSTtnQkFBRSxPQUFP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
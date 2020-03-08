var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "doodad/IDoodad", "entity/action/IAction", "entity/IHuman", "entity/player/quest/quest/Quest", "entity/player/quest/requirement/IRequirement", "entity/player/quest/requirement/Requirement", "event/EventManager", "game/options/IGameOptions", "item/IItem", "item/Items", "mapgen/version/2.8.0", "mod/IHookHost", "mod/IHookManager", "mod/Mod", "mod/ModRegistry", "newui/component/IComponent", "utilities/Arrays", "utilities/enum/Enums"], function (require, exports, IDoodad_1, IAction_1, IHuman_1, Quest_1, IRequirement_1, Requirement_1, EventManager_1, IGameOptions_1, IItem_1, Items_1, _2_8_0_1, IHookHost_1, IHookManager_1, Mod_1, ModRegistry_1, IComponent_1, Arrays_1, Enums_1) {
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
        setEasySpawn() {
            return true;
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
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Rock, IItem_1.ItemType.Sandstone], 5)
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemTypeGroup.Campfire], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Build, [IItem_1.ItemTypeGroup.Campfire])
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
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Rock, IItem_1.ItemType.Sandstone], 2)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Sharpened], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemType.String], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.CollectItem, [IItem_1.ItemTypeGroup.Pole], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Craft, [IItem_1.ItemType.StoneWaterStill, IItem_1.ItemType.SandstoneWaterStill], 1)
            .addRequirement(IRequirement_1.QuestRequirementType.Build, [IItem_1.ItemType.StoneWaterStill, IItem_1.ItemType.SandstoneWaterStill])
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
        EventManager_1.EventHandler(_2_8_0_1.default, "isEasySpawn")
    ], StarterQuest.prototype, "setEasySpawn", null);
    __decorate([
        Mod_1.default.instance(STARTER_QUEST_ID)
    ], StarterQuest, "INSTANCE", void 0);
    exports.default = StarterQuest;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRlclF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YXJ0ZXJRdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUF1QkEsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7SUFFekMsTUFBcUIsWUFBYSxTQUFRLGFBQUc7UUF3VjNCLFlBQVksQ0FBQyxNQUFjO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUdnQixXQUFXLENBQUMsYUFBc0IsRUFBRSxTQUFpQjtZQUNyRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUMxRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDaEI7UUFDRixDQUFDO1FBRU8sUUFBUSxDQUFDLFNBQWlCLFdBQVc7WUFDNUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssdUJBQVEsQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ2pJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNyQztRQUNGLENBQUM7UUFHUyxZQUFZO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQztLQUNEO0lBL1VBO1FBakJDLHFCQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksOEJBQWdCLENBQUMsRUFBRSxDQUFDO2FBQzlELFVBQVUsQ0FBQyxtQkFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzdE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
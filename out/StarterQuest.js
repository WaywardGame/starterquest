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
            else if (action.type === IAction_1.ActionType.DrinkInFront && doodad.gatherReady) {
                return false;
            }
            else if (action.type === IAction_1.ActionType.DetachContainer && doodad.stillContainer) {
                return false;
            }
            return doodad.type === IDoodad_1.DoodadType.ClayWaterStill || doodad.type === IDoodad_1.DoodadType.SandstoneWaterStill || doodad.type === IDoodad_1.DoodadType.StoneWaterStill;
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
            if (doodad.decay === undefined || doodad.decay === 0) {
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
            .addRequirement(ModRegistry_1.Registry().get("requirementGatherFromWaterStill"))
            .addChildQuests(ModRegistry_1.Registry().get("questTaming")))
    ], StarterQuest.prototype, "questDesalination", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRlclF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YXJ0ZXJRdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUF1QkEsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7SUFFekMsTUFBcUIsWUFBYSxTQUFRLGFBQUc7UUF3VDNCLFlBQVksQ0FBQyxNQUFjO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUdnQixXQUFXLENBQUMsYUFBc0IsRUFBRSxTQUFpQjtZQUNyRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUMxRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDaEI7UUFDRixDQUFDO1FBRU8sUUFBUSxDQUFDLFNBQWlCLFdBQVc7WUFDNUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssdUJBQVEsQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ2pJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNyQztRQUNGLENBQUM7UUFHUyxZQUFZO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQztLQUNEO0lBL1NBO1FBakJDLHFCQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksOEJBQWdCLENBQUMsRUFBRSxDQUFDO2FBQzlELFVBQVUsQ0FBQyxtQkFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzdE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
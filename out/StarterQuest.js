var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "action/IAction", "Enums", "item/Items", "mod/IHookHost", "mod/IHookManager", "mod/Mod", "mod/ModRegistry", "newui/component/IComponent", "player/quest/quest/Quest", "player/quest/requirement/IRequirement", "player/quest/requirement/Requirement", "utilities/enum/Enums", "utilities/iterable/Generators"], function (require, exports, IAction_1, Enums_1, Items_1, IHookHost_1, IHookManager_1, Mod_1, ModRegistry_1, IComponent_1, Quest_1, IRequirement_1, Requirement_1, Enums_2, Generators_1) {
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
            if (player.quests.getQuests().every(quest => quest.data.type !== this.questWelcome)) {
                player.quests.add(this.questWelcome);
            }
        }
    }
    __decorate([
        ModRegistry_1.default.questRequirement("quickslot", new Requirement_1.Requirement({})
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
        ModRegistry_1.default.questRequirement("changeHand", new Requirement_1.Requirement({})
            .setHostTrigger("UpdateOption", (api, key, value) => key === "leftHand" || key === "rightHand")
            .setRelations([
            [IComponent_1.HighlightType.Selector, "#equipment .checkbox-option[data-checkbox-id='leftHand']"],
            [IComponent_1.HighlightType.Selector, "#equipment .checkbox-option[data-checkbox-id='rightHand']"],
        ]))
    ], StarterQuest.prototype, "requirementChangeHand", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("lightCampfire", new Requirement_1.Requirement({})
            .setTrigger(IHookManager_1.Hook.PostExecuteAction, (api, actionApi, action) => {
            if (actionApi.executor !== api.host || action.type !== IAction_1.ActionType.StartFire) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
            if (!doodad) {
                return false;
            }
            return doodad.type === Enums_1.DoodadType.LitClayCampfire || doodad.type === Enums_1.DoodadType.LitStoneCampfire || doodad.type === Enums_1.DoodadType.LitSandstoneCampfire;
        })
            .setRelations([
            [IComponent_1.HighlightType.Selector, "#inventory .group-FireStarter"],
        ]))
    ], StarterQuest.prototype, "requirementLightCampfire", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("lightWaterStill", new Requirement_1.Requirement({})
            .setTrigger(IHookManager_1.Hook.PostExecuteAction, (api, actionApi, action) => {
            if (actionApi.executor !== api.host || action.type !== IAction_1.ActionType.StartFire) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
            if (!doodad) {
                return false;
            }
            return doodad.type === Enums_1.DoodadType.LitClayWaterStill || doodad.type === Enums_1.DoodadType.LitStoneWaterStill || doodad.type === Enums_1.DoodadType.LitSandstoneWaterStill;
        })
            .setRelations([
            [IComponent_1.HighlightType.Selector, "#inventory .group-FireStarter"],
        ]))
    ], StarterQuest.prototype, "requirementLightWaterStill", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("gatherFromWaterStill", new Requirement_1.Requirement({})
            .setTrigger(IHookManager_1.Hook.PostExecuteAction, (api, actionApi, action, args) => {
            if (actionApi.executor !== api.host || action.type !== IAction_1.ActionType.GatherWater) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
            if (!doodad) {
                return false;
            }
            const [item] = args;
            if (!itemManager.isInGroup(item.type, Enums_1.ItemTypeGroup.ContainerOfDesalinatedWater)) {
                return false;
            }
            return doodad.type === Enums_1.DoodadType.ClayWaterStill || doodad.type === Enums_1.DoodadType.SandstoneWaterStill || doodad.type === Enums_1.DoodadType.StoneWaterStill;
        })
            .setRelations([
            [IComponent_1.HighlightType.Selector, "#inventory .group-FireStarter"],
        ]))
    ], StarterQuest.prototype, "requirementGatherFromWaterStill", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("stokeCampfire", new Requirement_1.Requirement({})
            .setTrigger(IHookManager_1.Hook.PostExecuteAction, (api, actionApi, action, args) => {
            if (actionApi.executor !== api.host || action.type !== IAction_1.ActionType.StokeFire) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
            if (!doodad || !(doodad.type === Enums_1.DoodadType.LitClayCampfire || doodad.type === Enums_1.DoodadType.LitStoneCampfire || doodad.type === Enums_1.DoodadType.LitSandstoneCampfire)) {
                return false;
            }
            const [item] = args;
            if (item.isValid()) {
                return false;
            }
            return true;
        })
            .setRelations([
            ...Enums_2.default.values(Enums_1.ItemType)
                .filter(type => (Items_1.default[type] && Items_1.default[type].use || []).includes(IAction_1.ActionType.StokeFire))
                .map(type => Generators_1.tuple(IComponent_1.HighlightType.Selector, `#inventory [data-item-type="${type}"]`)),
        ]))
    ], StarterQuest.prototype, "requirementStokeCampfire", void 0);
    __decorate([
        ModRegistry_1.default.questRequirement("fillStill", new Requirement_1.Requirement({})
            .setTrigger(IHookManager_1.Hook.PostExecuteAction, (api, actionApi, action, args) => {
            if (actionApi.executor !== api.host || action.type !== IAction_1.ActionType.Pour) {
                return false;
            }
            const tile = actionApi.executor.getFacingTile();
            const doodad = tile.doodad;
            if (!doodad || !(doodad.type === Enums_1.DoodadType.SandstoneWaterStill || doodad.type === Enums_1.DoodadType.StoneWaterStill || doodad.type === Enums_1.DoodadType.ClayWaterStill)) {
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
        ModRegistry_1.default.quest("welcome", new Quest_1.Quest()
            .setNeedsManualCompletion()
            .addChildQuests(ModRegistry_1.Registry().get("questGearUp")))
    ], StarterQuest.prototype, "questWelcome", void 0);
    __decorate([
        ModRegistry_1.default.quest("gearUp", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.Equip, [Enums_1.EquipType.RightHand, Enums_1.EquipType.LeftHand], [Enums_1.ItemTypeGroup.Weapon, Enums_1.ItemTypeGroup.Tool])
            .addChildQuests(ModRegistry_1.Registry().get("questQuickslots")))
    ], StarterQuest.prototype, "questGearUp", void 0);
    __decorate([
        ModRegistry_1.default.quest("quickslots", new Quest_1.Quest()
            .addRequirement(ModRegistry_1.Registry().get("requirementQuickslot"))
            .addChildQuests(ModRegistry_1.Registry().get("questResourceGathering")))
    ], StarterQuest.prototype, "questQuickslots", void 0);
    __decorate([
        ModRegistry_1.default.quest("resourceGathering", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemType.Branch], 2)
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemType.LargeRock], 2)
            .addChildQuests(ModRegistry_1.Registry().get("questCrafting")))
    ], StarterQuest.prototype, "questResourceGathering", void 0);
    __decorate([
        ModRegistry_1.default.quest("crafting", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.Craft, [Enums_1.ItemType.SharpRock], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questDismantle")))
    ], StarterQuest.prototype, "questCrafting", void 0);
    __decorate([
        ModRegistry_1.default.quest("dismantle", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.Dismantle, [Enums_1.ItemType.Branch, Enums_1.ItemType.Log, Enums_1.ItemType.LargeRock], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questChangeHands")))
    ], StarterQuest.prototype, "questDismantle", void 0);
    __decorate([
        ModRegistry_1.default.quest("changeHands", new Quest_1.Quest()
            .addRequirement(ModRegistry_1.Registry().get("requirementChangeHand"))
            .addChildQuests(ModRegistry_1.Registry().get("questHunting")))
    ], StarterQuest.prototype, "questChangeHands", void 0);
    __decorate([
        ModRegistry_1.default.quest("hunting", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemTypeGroup.Sharpened], 1)
            .addRequirement(IRequirement_1.RequirementType.KillCreatures, 1)
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemTypeGroup.RawMeat], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questWoodenPoles")))
    ], StarterQuest.prototype, "questHunting", void 0);
    __decorate([
        ModRegistry_1.default.quest("woodenPoles", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemType.WoodenPole], 2)
            .addChildQuests(ModRegistry_1.Registry().get("questHandDrill")))
    ], StarterQuest.prototype, "questWoodenPoles", void 0);
    __decorate([
        ModRegistry_1.default.quest("handDrill", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.Craft, [Enums_1.ItemType.HandDrill], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questKindlingTinder")))
    ], StarterQuest.prototype, "questHandDrill", void 0);
    __decorate([
        ModRegistry_1.default.quest("kindlingTinder", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemTypeGroup.Tinder], 1)
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemTypeGroup.Kindling], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questCampfire")))
    ], StarterQuest.prototype, "questKindlingTinder", void 0);
    __decorate([
        ModRegistry_1.default.quest("campfire", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemTypeGroup.Rock, Enums_1.ItemType.Sandstone], 5)
            .addRequirement(IRequirement_1.RequirementType.Craft, [Enums_1.ItemTypeGroup.Campfire], 1)
            .addRequirement(IRequirement_1.RequirementType.Build, [Enums_1.ItemTypeGroup.Campfire])
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
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemTypeGroup.CookingEquipment], 1)
            .addRequirement(IRequirement_1.RequirementType.Craft, [Enums_1.ItemTypeGroup.CookedMeat], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questTaming")))
    ], StarterQuest.prototype, "questCooking", void 0);
    __decorate([
        ModRegistry_1.default.quest("taming", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.TameCreatures, 1)
            .addChildQuests(ModRegistry_1.Registry().get("questExtraStorage")))
    ], StarterQuest.prototype, "questTaming", void 0);
    __decorate([
        ModRegistry_1.default.quest("extraStorage", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.Craft, [Enums_1.ItemType.WoodenChest], 1)
            .addRequirement(IRequirement_1.RequirementType.Build, [Enums_1.ItemType.WoodenChest])
            .addChildQuests(ModRegistry_1.Registry().get("questString")))
    ], StarterQuest.prototype, "questExtraStorage", void 0);
    __decorate([
        ModRegistry_1.default.quest("string", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemTypeGroup.Cordage], 2)
            .addRequirement(IRequirement_1.RequirementType.Craft, [Enums_1.ItemType.String], 2)
            .addChildQuests(ModRegistry_1.Registry().get("questLeather")))
    ], StarterQuest.prototype, "questString", void 0);
    __decorate([
        ModRegistry_1.default.quest("leather", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemType.AnimalPelt], 1)
            .addRequirement(IRequirement_1.RequirementType.Dismantle, [Enums_1.ItemType.AnimalPelt], 1)
            .addRequirement(IRequirement_1.RequirementType.Craft, [Enums_1.ItemTypeGroup.MortarAndPestle], 1)
            .addRequirement(IRequirement_1.RequirementType.Craft, [Enums_1.ItemType.Tannin], 1)
            .addRequirement(IRequirement_1.RequirementType.Craft, [Enums_1.ItemType.TannedLeather], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questWaterskin")))
    ], StarterQuest.prototype, "questLeather", void 0);
    __decorate([
        ModRegistry_1.default.quest("waterskin", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemTypeGroup.Needle], 1)
            .addRequirement(IRequirement_1.RequirementType.Craft, [Enums_1.ItemType.Waterskin], 1)
            .addChildQuests(ModRegistry_1.Registry().get("questWaterStill")))
    ], StarterQuest.prototype, "questWaterskin", void 0);
    __decorate([
        ModRegistry_1.default.quest("waterStill", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemTypeGroup.Rock, Enums_1.ItemType.Sandstone], 2)
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemTypeGroup.Sharpened], 1)
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemType.String], 1)
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemTypeGroup.Pole], 1)
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemType.Waterskin], 1)
            .addRequirement(IRequirement_1.RequirementType.Craft, [Enums_1.ItemType.StoneWaterStill, Enums_1.ItemType.SandstoneWaterStill], 1)
            .addRequirement(IRequirement_1.RequirementType.Build, [Enums_1.ItemType.StoneWaterStill, Enums_1.ItemType.SandstoneWaterStill])
            .addChildQuests(ModRegistry_1.Registry().get("questFillStill")))
    ], StarterQuest.prototype, "questWaterStill", void 0);
    __decorate([
        ModRegistry_1.default.quest("fillStill", new Quest_1.Quest()
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemTypeGroup.ContainerOfSeawater], 1)
            .addRequirement(IRequirement_1.RequirementType.CollectItem, [Enums_1.ItemTypeGroup.Sharpened], 1)
            .addRequirement(ModRegistry_1.Registry().get("requirementFillStill"))
            .addChildQuests(ModRegistry_1.Registry().get("questDesalination")))
    ], StarterQuest.prototype, "questFillStill", void 0);
    __decorate([
        ModRegistry_1.default.quest("desalination", new Quest_1.Quest()
            .addRequirement(ModRegistry_1.Registry().get("requirementLightWaterStill"))
            .addRequirement(ModRegistry_1.Registry().get("requirementGatherFromWaterStill"))
            .addChildQuests(ModRegistry_1.Registry().get("questSurvivalistTraining")))
    ], StarterQuest.prototype, "questDesalination", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRlclF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YXJ0ZXJRdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFtQkEsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7SUFFekMsTUFBcUIsWUFBYSxTQUFRLGFBQUc7UUErUzNCLFlBQVksQ0FBQyxNQUFlO1lBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUdnQixXQUFXLENBQUMsYUFBc0IsRUFBRSxTQUFpQjtZQUNyRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUMxRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDaEI7UUFDRixDQUFDO1FBRU8sUUFBUSxDQUFDLE1BQU0sR0FBRyxXQUFXO1lBQ3BDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ3BGLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNyQztRQUNGLENBQUM7S0FDRDtJQWpTQTtRQWpCQyxxQkFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLHlCQUFXLENBQUMsRUFBRSxDQUFDO2FBQ3pELFVBQVUsQ0FBQyxtQkFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzdELElBQUksTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQ3RDLE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQyxD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
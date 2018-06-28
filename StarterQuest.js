var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "doodad/Doodads", "Enums", "item/Items", "language/IMessages", "language/Messages", "language/Translation", "mod/IHookHost", "mod/Mod"], function (require, exports, Doodads_1, Enums_1, Items_1, IMessages_1, Messages_1, Translation_1, IHookHost_1, Mod_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StarterQuestDictionary;
    (function (StarterQuestDictionary) {
        StarterQuestDictionary[StarterQuestDictionary["NameWelcome"] = 0] = "NameWelcome";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionWelcome"] = 1] = "DescriptionWelcome";
        StarterQuestDictionary[StarterQuestDictionary["NameGearUp"] = 2] = "NameGearUp";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionGearUp"] = 3] = "DescriptionGearUp";
        StarterQuestDictionary[StarterQuestDictionary["NameQuickslots"] = 4] = "NameQuickslots";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionQuickslots"] = 5] = "DescriptionQuickslots";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionQuickslots"] = 6] = "CompletionDescriptionQuickslots";
        StarterQuestDictionary[StarterQuestDictionary["NameResourceGathering"] = 7] = "NameResourceGathering";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionResourceGathering"] = 8] = "DescriptionResourceGathering";
        StarterQuestDictionary[StarterQuestDictionary["NameCrafting"] = 9] = "NameCrafting";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionCrafting"] = 10] = "DescriptionCrafting";
        StarterQuestDictionary[StarterQuestDictionary["NameDismantling"] = 11] = "NameDismantling";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionDismantling"] = 12] = "DescriptionDismantling";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionDismantling"] = 13] = "CompletionDescriptionDismantling";
        StarterQuestDictionary[StarterQuestDictionary["NameCreatureTaming"] = 14] = "NameCreatureTaming";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionCreatureTaming"] = 15] = "DescriptionCreatureTaming";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionCreatureTaming"] = 16] = "CompletionDescriptionCreatureTaming";
        StarterQuestDictionary[StarterQuestDictionary["NameLeftRightHand"] = 17] = "NameLeftRightHand";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionLeftRightHand"] = 18] = "DescriptionLeftRightHand";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionLeftRightHand"] = 19] = "CompletionDescriptionLeftRightHand";
        StarterQuestDictionary[StarterQuestDictionary["NameHunting"] = 20] = "NameHunting";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionHunting"] = 21] = "DescriptionHunting";
        StarterQuestDictionary[StarterQuestDictionary["NameWoodenPoles"] = 22] = "NameWoodenPoles";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionWoodenPoles"] = 23] = "DescriptionWoodenPoles";
        StarterQuestDictionary[StarterQuestDictionary["NameHandDrill"] = 24] = "NameHandDrill";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionHandDrill"] = 25] = "DescriptionHandDrill";
        StarterQuestDictionary[StarterQuestDictionary["NameKindlingTinder"] = 26] = "NameKindlingTinder";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionKindlingTinder"] = 27] = "DescriptionKindlingTinder";
        StarterQuestDictionary[StarterQuestDictionary["NameCampfireMaterials"] = 28] = "NameCampfireMaterials";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionCampfireMaterials"] = 29] = "DescriptionCampfireMaterials";
        StarterQuestDictionary[StarterQuestDictionary["NameCampfireCrafting"] = 30] = "NameCampfireCrafting";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionCampfireCrafting"] = 31] = "DescriptionCampfireCrafting";
        StarterQuestDictionary[StarterQuestDictionary["NameCampfireBuilding"] = 32] = "NameCampfireBuilding";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionCampfireBuilding"] = 33] = "DescriptionCampfireBuilding";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadPrefixCampfireBuilding"] = 34] = "CompletionDoodadPrefixCampfireBuilding";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadActionPrefixCampfireBuilding"] = 35] = "CompletionDoodadActionPrefixCampfireBuilding";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionMessageCampfireBuilding"] = 36] = "CompletionDescriptionMessageCampfireBuilding";
        StarterQuestDictionary[StarterQuestDictionary["NameFire"] = 37] = "NameFire";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionFire"] = 38] = "DescriptionFire";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadPrefixFire"] = 39] = "CompletionDoodadPrefixFire";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadActionPrefixFire"] = 40] = "CompletionDoodadActionPrefixFire";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionMessageFire"] = 41] = "CompletionDescriptionMessageFire";
        StarterQuestDictionary[StarterQuestDictionary["NameStokingFire"] = 42] = "NameStokingFire";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionStokingFire"] = 43] = "DescriptionStokingFire";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionStokingFire"] = 44] = "CompletionDescriptionStokingFire";
        StarterQuestDictionary[StarterQuestDictionary["NameCookingFire"] = 45] = "NameCookingFire";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionCookingFire"] = 46] = "DescriptionCookingFire";
        StarterQuestDictionary[StarterQuestDictionary["NameExtraStorage"] = 47] = "NameExtraStorage";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionExtraStorage"] = 48] = "DescriptionExtraStorage";
        StarterQuestDictionary[StarterQuestDictionary["NameDrinkableWater"] = 49] = "NameDrinkableWater";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionDrinkableWater"] = 50] = "DescriptionDrinkableWater";
        StarterQuestDictionary[StarterQuestDictionary["NameCordage"] = 51] = "NameCordage";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionCordage"] = 52] = "DescriptionCordage";
        StarterQuestDictionary[StarterQuestDictionary["NameString"] = 53] = "NameString";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionString"] = 54] = "DescriptionString";
        StarterQuestDictionary[StarterQuestDictionary["NameGrindingMaterials"] = 55] = "NameGrindingMaterials";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionGrindingMaterials"] = 56] = "DescriptionGrindingMaterials";
        StarterQuestDictionary[StarterQuestDictionary["NameHuntLeather"] = 57] = "NameHuntLeather";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionHuntLeather"] = 58] = "DescriptionHuntLeather";
        StarterQuestDictionary[StarterQuestDictionary["NameTannedLeather"] = 59] = "NameTannedLeather";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionTannedLeather"] = 60] = "DescriptionTannedLeather";
        StarterQuestDictionary[StarterQuestDictionary["NameWaterskin"] = 61] = "NameWaterskin";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionWaterskin"] = 62] = "DescriptionWaterskin";
        StarterQuestDictionary[StarterQuestDictionary["NameWaterStillMaterials"] = 63] = "NameWaterStillMaterials";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionWaterStillMaterials"] = 64] = "DescriptionWaterStillMaterials";
        StarterQuestDictionary[StarterQuestDictionary["NameWaterStillCrafting"] = 65] = "NameWaterStillCrafting";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionWaterStillCrafting"] = 66] = "DescriptionWaterStillCrafting";
        StarterQuestDictionary[StarterQuestDictionary["NameSeawater"] = 67] = "NameSeawater";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionSeawater"] = 68] = "DescriptionSeawater";
        StarterQuestDictionary[StarterQuestDictionary["NameBuildingStill"] = 69] = "NameBuildingStill";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionBuildingStill"] = 70] = "DescriptionBuildingStill";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadPrefixBuildingStill"] = 71] = "CompletionDoodadPrefixBuildingStill";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadActionPrefixBuildingStill"] = 72] = "CompletionDoodadActionPrefixBuildingStill";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionMessageBuildingStill"] = 73] = "CompletionDescriptionMessageBuildingStill";
        StarterQuestDictionary[StarterQuestDictionary["NameFillingStill"] = 74] = "NameFillingStill";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionFillingStill"] = 75] = "DescriptionFillingStill";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionFillingStill"] = 76] = "CompletionDescriptionFillingStill";
        StarterQuestDictionary[StarterQuestDictionary["NameDesalination"] = 77] = "NameDesalination";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionDesalination"] = 78] = "DescriptionDesalination";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadPrefixDesalination"] = 79] = "CompletionDoodadPrefixDesalination";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadActionPrefixDesalination"] = 80] = "CompletionDoodadActionPrefixDesalination";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionMessageDesalination"] = 81] = "CompletionDescriptionMessageDesalination";
        StarterQuestDictionary[StarterQuestDictionary["NameGatherWater"] = 82] = "NameGatherWater";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionGatherWater"] = 83] = "DescriptionGatherWater";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionGatherWater"] = 84] = "CompletionDescriptionGatherWater";
        StarterQuestDictionary[StarterQuestDictionary["NameSurvivalistTraining"] = 85] = "NameSurvivalistTraining";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionSurvivalistTraining"] = 86] = "DescriptionSurvivalistTraining";
        StarterQuestDictionary[StarterQuestDictionary["QuestCompleted"] = 87] = "QuestCompleted";
        StarterQuestDictionary[StarterQuestDictionary["QuestProgressItemCollected"] = 88] = "QuestProgressItemCollected";
        StarterQuestDictionary[StarterQuestDictionary["QuestProgressItemEquipped"] = 89] = "QuestProgressItemEquipped";
        StarterQuestDictionary[StarterQuestDictionary["QuestProgressItemQuickslotted"] = 90] = "QuestProgressItemQuickslotted";
        StarterQuestDictionary[StarterQuestDictionary["QuestProgressFinished"] = 91] = "QuestProgressFinished";
        StarterQuestDictionary[StarterQuestDictionary["QuestProgressCompleted"] = 92] = "QuestProgressCompleted";
        StarterQuestDictionary[StarterQuestDictionary["StarterQuestTitle"] = 93] = "StarterQuestTitle";
        StarterQuestDictionary[StarterQuestDictionary["ButtonObjectives"] = 94] = "ButtonObjectives";
        StarterQuestDictionary[StarterQuestDictionary["ButtonStartQuest"] = 95] = "ButtonStartQuest";
        StarterQuestDictionary[StarterQuestDictionary["ButtonBack"] = 96] = "ButtonBack";
        StarterQuestDictionary[StarterQuestDictionary["ButtonSkip"] = 97] = "ButtonSkip";
        StarterQuestDictionary[StarterQuestDictionary["ButtonClose"] = 98] = "ButtonClose";
        StarterQuestDictionary[StarterQuestDictionary["ButtonCompleteQuest"] = 99] = "ButtonCompleteQuest";
        StarterQuestDictionary[StarterQuestDictionary["QuestTitle"] = 100] = "QuestTitle";
        StarterQuestDictionary[StarterQuestDictionary["QuestCraft"] = 101] = "QuestCraft";
        StarterQuestDictionary[StarterQuestDictionary["QuestCrafted"] = 102] = "QuestCrafted";
        StarterQuestDictionary[StarterQuestDictionary["QuestCollect"] = 103] = "QuestCollect";
        StarterQuestDictionary[StarterQuestDictionary["QuestCollected"] = 104] = "QuestCollected";
        StarterQuestDictionary[StarterQuestDictionary["QuestItem"] = 105] = "QuestItem";
        StarterQuestDictionary[StarterQuestDictionary["QuestAnItem"] = 106] = "QuestAnItem";
        StarterQuestDictionary[StarterQuestDictionary["QuestAnItemLowercase"] = 107] = "QuestAnItemLowercase";
        StarterQuestDictionary[StarterQuestDictionary["QuestEquip"] = 108] = "QuestEquip";
        StarterQuestDictionary[StarterQuestDictionary["QuestDoodad"] = 109] = "QuestDoodad";
    })(StarterQuestDictionary || (StarterQuestDictionary = {}));
    let translation;
    class StarterQuest extends Mod_1.default {
        constructor() {
            super(...arguments);
            this.quests = [];
        }
        onInitialize(saveDataGlobal) {
            this.bindable = this.addBindable("Toggle", { key: "KeyJ" });
            this.dictionary = this.addDictionary("StarterQuest", StarterQuestDictionary);
            translation = Translation_1.default.bind(undefined, this.dictionary);
            this.sourceQuest = this.addMessageSource("Quest");
            this.globalData = saveDataGlobal;
            if (!this.globalData) {
                this.globalData = {
                    maxQuest: 0
                };
            }
            this.addMenuBarButton("Starter Quest", {
                bindable: this.bindable,
                tooltip: tooltip => tooltip.addText(text => text
                    .setText(new Translation_1.default(this.dictionary, StarterQuestDictionary.StarterQuestTitle))),
                onActivate: () => ui.toggleDialog(this.dialog)
            });
            return this.globalData;
        }
        onLoad(saveData) {
            this.data = saveData;
            if (!this.data) {
                this.data = {
                    dialogOpen: true,
                    current: 0,
                    completion: {}
                };
            }
            this.quests = [
                {
                    name: translation(StarterQuestDictionary.NameWelcome).getString(),
                    description: translation(StarterQuestDictionary.DescriptionWelcome).getString(),
                    completion: {
                        complete: true
                    }
                },
                {
                    name: translation(StarterQuestDictionary.NameGearUp).getString(),
                    description: translation(StarterQuestDictionary.DescriptionGearUp).getString(),
                    completion: {
                        equips: [
                            {
                                equip: Enums_1.EquipType.Held
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#inventory li.group-${Enums_1.ItemTypeGroup.Weapon}:eq(0)`,
                        `#inventory li.group-${Enums_1.ItemTypeGroup.Tool}:eq(0)`,
                        "#equipment ul:lt(2)"
                    ],
                    allowMultipleHighlights: true
                },
                {
                    name: translation(StarterQuestDictionary.NameQuickslots).getString(),
                    description: translation(StarterQuestDictionary.DescriptionQuickslots).getString(),
                    completion: {
                        quickslots: {
                            messages: translation(StarterQuestDictionary.CompletionDescriptionQuickslots).getString()
                        }
                    },
                    highlightElementSelector: [
                        '#quick-slots ul[data-quick-slot="1"]'
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameResourceGathering).getString(),
                    description: translation(StarterQuestDictionary.DescriptionResourceGathering).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemType.Branch],
                                amount: 2
                            },
                            {
                                types: [Enums_1.ItemType.LargeRock],
                                amount: 2
                            }
                        ]
                    }
                },
                {
                    name: translation(StarterQuestDictionary.NameCrafting).getString(),
                    description: translation(StarterQuestDictionary.DescriptionCrafting).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemType.SharpRock],
                                amount: 1,
                                craft: true
                            }
                        ]
                    },
                    highlightElementSelector: [
                        '#buttons img[data-button="Crafting"]',
                        `#crafting li[data-item-type="${Enums_1.ItemType.SharpRock}"]`
                    ],
                    allowMultipleHighlights: true
                },
                {
                    name: translation(StarterQuestDictionary.NameDismantling).getString(),
                    description: translation(StarterQuestDictionary.DescriptionDismantling).getString(),
                    completion: {
                        messages: {
                            types: [IMessages_1.Message.YouDismantled],
                            description: translation(StarterQuestDictionary.CompletionDescriptionDismantling).getString()
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.Branch}"]:eq(0)`,
                        `#inventory li[data-item-type="${Enums_1.ItemType.Log}"]:eq(0)`,
                        `#inventory li[data-item-type="${Enums_1.ItemType.LargeRock}"]:eq(0)`
                    ],
                    allowMultipleHighlights: true
                },
                {
                    name: translation(StarterQuestDictionary.NameCreatureTaming).getString(),
                    description: translation(StarterQuestDictionary.DescriptionCreatureTaming).getString(),
                    completion: {
                        messages: {
                            types: [IMessages_1.Message.YouHaveTamed, IMessages_1.Message.TakenFromGroundBecomeTamed, IMessages_1.Message.YouOfferedToCreature],
                            description: translation(StarterQuestDictionary.CompletionDescriptionCreatureTaming).getString()
                        }
                    }
                },
                {
                    name: translation(StarterQuestDictionary.NameLeftRightHand).getString(),
                    description: translation(StarterQuestDictionary.DescriptionLeftRightHand).getString(),
                    completion: {
                        messages: {
                            types: [IMessages_1.Message.YouHaveEnabledDisabled],
                            description: translation(StarterQuestDictionary.CompletionDescriptionLeftRightHand).getString()
                        }
                    },
                    highlightElementSelector: [
                        '#equipment .checkbox-option[data-checkbox-id="LeftHand"]',
                        '#equipment .checkbox-option[data-checkbox-id="RightHand"]'
                    ],
                    allowMultipleHighlights: true
                },
                {
                    name: translation(StarterQuestDictionary.NameHunting).getString(),
                    description: translation(StarterQuestDictionary.DescriptionHunting).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemTypeGroup.Sharpened],
                                amount: 1
                            },
                            {
                                types: [Enums_1.ItemTypeGroup.RawMeat],
                                amount: 1
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#inventory li.group-${Enums_1.ItemTypeGroup.Sharpened}:eq(0)`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameWoodenPoles).getString(),
                    description: translation(StarterQuestDictionary.DescriptionWoodenPoles).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemType.WoodenPole],
                                amount: 2
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.Branch}"]:eq(0)`,
                        `#inventory li[data-item-type="${Enums_1.ItemType.Log}"]:eq(0)`
                    ],
                    allowMultipleHighlights: true
                },
                {
                    name: translation(StarterQuestDictionary.NameHandDrill).getString(),
                    description: translation(StarterQuestDictionary.DescriptionHandDrill).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemType.HandDrill],
                                amount: 1,
                                craft: true
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#crafting li[data-item-type="${Enums_1.ItemType.HandDrill}"]`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameKindlingTinder).getString(),
                    description: translation(StarterQuestDictionary.DescriptionKindlingTinder).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemTypeGroup.Tinder],
                                amount: 1
                            },
                            {
                                types: [Enums_1.ItemTypeGroup.Kindling],
                                amount: 1
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#crafting li[data-item-type="${Enums_1.ItemType.WoodenPole}"]`,
                        `#crafting li[data-item-type="${Enums_1.ItemType.Twigs}"]`
                    ],
                    allowMultipleHighlights: true
                },
                {
                    name: translation(StarterQuestDictionary.NameCampfireMaterials).getString(),
                    description: translation(StarterQuestDictionary.DescriptionCampfireMaterials).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemTypeGroup.Rock, Enums_1.ItemType.Sandstone],
                                amount: 5
                            }
                        ]
                    }
                },
                {
                    name: translation(StarterQuestDictionary.NameCampfireCrafting).getString(),
                    description: translation(StarterQuestDictionary.DescriptionCampfireCrafting).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemType.StoneCampfire, Enums_1.ItemType.SandstoneCampfire],
                                amount: 1,
                                craft: true
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#crafting li[data-item-type="${Enums_1.ItemType.StoneCampfire}"]`,
                        `#crafting li[data-item-type="${Enums_1.ItemType.SandstoneCampfire}"]`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameCampfireBuilding).getString(),
                    description: translation(StarterQuestDictionary.DescriptionCampfireBuilding).getString(),
                    completion: {
                        doodads: {
                            types: [Enums_1.DoodadType.StoneCampfire, Enums_1.DoodadType.SandstoneCampfire],
                            doodadPrefix: translation(StarterQuestDictionary.CompletionDoodadPrefixCampfireBuilding).getString(),
                            doodadActionPrefix: translation(StarterQuestDictionary.CompletionDoodadActionPrefixCampfireBuilding).getString(),
                            completionMessage: translation(StarterQuestDictionary.CompletionDescriptionMessageCampfireBuilding).getString()
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.StoneCampfire}"]:eq(0)`,
                        `#inventory li[data-item-type="${Enums_1.ItemType.SandstoneCampfire}"]:eq(0)`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameFire).getString(),
                    description: translation(StarterQuestDictionary.DescriptionFire).getString(),
                    completion: {
                        doodads: {
                            types: [Enums_1.DoodadType.LitStoneCampfire, Enums_1.DoodadType.LitSandstoneCampfire],
                            doodadPrefix: translation(StarterQuestDictionary.CompletionDoodadPrefixFire).getString(),
                            doodadActionPrefix: translation(StarterQuestDictionary.CompletionDoodadActionPrefixFire).getString(),
                            completionMessage: translation(StarterQuestDictionary.CompletionDescriptionMessageFire).getString()
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.HandDrill}"]:eq(0)`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameStokingFire).getString(),
                    description: translation(StarterQuestDictionary.DescriptionStokingFire).getString(),
                    completion: {
                        messages: {
                            types: [IMessages_1.Message.AddedFuelToFire],
                            description: translation(StarterQuestDictionary.CompletionDescriptionStokingFire).getString()
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.Log}"]:eq(0)`,
                        `#inventory li[data-item-type="${Enums_1.ItemType.Branch}"]:eq(0)`,
                        `#inventory li[data-item-type="${Enums_1.ItemType.WoodenPole}"]:eq(0)`,
                        `#inventory li[data-item-type="${Enums_1.ItemTypeGroup.Kindling}"]:eq(0)`,
                        `#inventory li[data-item-type="${Enums_1.ItemTypeGroup.Tinder}"]:eq(0)`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameCookingFire).getString(),
                    description: translation(StarterQuestDictionary.DescriptionCookingFire).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemTypeGroup.Skewer],
                                amount: 1
                            },
                            {
                                types: [Enums_1.ItemTypeGroup.CookedMeat],
                                amount: 1,
                                craft: true
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#crafting li.group-${Enums_1.ItemTypeGroup.Skewer}:eq(0)`,
                        `#crafting li.group-${Enums_1.ItemTypeGroup.CookedMeat}:eq(0)`
                    ],
                    allowMultipleHighlights: true
                },
                {
                    name: translation(StarterQuestDictionary.NameExtraStorage).getString(),
                    description: translation(StarterQuestDictionary.DescriptionExtraStorage).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemType.WoodenChest],
                                amount: 1,
                                craft: true
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#crafting li[data-item-type="${Enums_1.ItemType.WoodenChest}"]`,
                        `#crafting li[data-item-type="${Enums_1.ItemType.WoodenDowels}"]`,
                        `#crafting li[data-item-type="${Enums_1.ItemType.WoodenPole}"]`,
                        `#crafting li[data-item-type="${Enums_1.ItemType.Branch}"]`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameDrinkableWater).getString(),
                    description: translation(StarterQuestDictionary.DescriptionDrinkableWater).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemTypeGroup.Needle],
                                amount: 1
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#crafting li.group-${Enums_1.ItemTypeGroup.Needle}`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameCordage).getString(),
                    description: translation(StarterQuestDictionary.DescriptionCordage).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemTypeGroup.Cordage],
                                amount: 4
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#inventory li.group-${Enums_1.ItemTypeGroup.Cordage}`,
                        `#crafting li.group-${Enums_1.ItemTypeGroup.Cordage}`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameString).getString(),
                    description: translation(StarterQuestDictionary.DescriptionString).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemType.String],
                                amount: 2,
                                craft: true
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#crafting li[data-item-type="${Enums_1.ItemType.String}"]`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameGrindingMaterials).getString(),
                    description: translation(StarterQuestDictionary.DescriptionGrindingMaterials).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemType.StoneMortarAndPestle, Enums_1.ItemType.WoodenMortarAndPestle, Enums_1.ItemType.SandstoneMortarAndPestle],
                                amount: 1,
                                craft: true
                            },
                            {
                                types: [Enums_1.ItemType.Tannin],
                                amount: 1,
                                craft: true
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#crafting li[data-item-type="${Enums_1.ItemTypeGroup.MortarAndPestle}"]`,
                        `#crafting li[data-item-type="${Enums_1.ItemType.Tannin}"]`
                    ],
                    allowMultipleHighlights: true
                },
                {
                    name: translation(StarterQuestDictionary.NameHuntLeather).getString(),
                    description: translation(StarterQuestDictionary.DescriptionHuntLeather).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemType.AnimalPelt],
                                amount: 1
                            }
                        ]
                    }
                },
                {
                    name: translation(StarterQuestDictionary.NameTannedLeather).getString(),
                    description: translation(StarterQuestDictionary.DescriptionTannedLeather).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemType.TannedLeather],
                                amount: 1,
                                craft: true
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#crafting li[data-item-type="${Enums_1.ItemType.TannedLeather}"]`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameWaterskin).getString(),
                    description: translation(StarterQuestDictionary.DescriptionWaterskin).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemType.Waterskin],
                                amount: 1,
                                craft: true
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#crafting li[data-item-type="${Enums_1.ItemType.Waterskin}"]`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameWaterStillMaterials).getString(),
                    description: translation(StarterQuestDictionary.DescriptionWaterStillMaterials).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemTypeGroup.Rock, Enums_1.ItemType.Sandstone],
                                amount: 2
                            },
                            {
                                types: [Enums_1.ItemTypeGroup.Sharpened],
                                amount: 1
                            },
                            {
                                types: [Enums_1.ItemType.String],
                                amount: 1
                            },
                            {
                                types: [Enums_1.ItemTypeGroup.Pole],
                                amount: 1
                            },
                            {
                                types: [Enums_1.ItemType.Waterskin],
                                amount: 1
                            }
                        ]
                    }
                },
                {
                    name: translation(StarterQuestDictionary.NameWaterStillCrafting).getString(),
                    description: translation(StarterQuestDictionary.DescriptionWaterStillCrafting).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemType.StoneWaterStill, Enums_1.ItemType.SandstoneWaterStill],
                                amount: 1,
                                craft: true
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#crafting li[data-item-type="${Enums_1.ItemType.StoneWaterStill}"]`,
                        `#crafting li[data-item-type="${Enums_1.ItemType.SandstoneWaterStill}"]`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameSeawater).getString(),
                    description: translation(StarterQuestDictionary.DescriptionSeawater).getString(),
                    completion: {
                        items: [
                            {
                                types: [Enums_1.ItemTypeGroup.ContainerOfSeawater],
                                amount: 1
                            }
                        ]
                    },
                    highlightElementSelector: [
                        `#inventory li.group-${Enums_1.ItemTypeGroup.Container}:eq(0)`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameBuildingStill).getString(),
                    description: translation(StarterQuestDictionary.DescriptionBuildingStill).getString(),
                    completion: {
                        doodads: {
                            types: [Enums_1.DoodadType.StoneWaterStill, Enums_1.DoodadType.SandstoneWaterStill],
                            doodadPrefix: translation(StarterQuestDictionary.CompletionDoodadPrefixBuildingStill).getString(),
                            doodadActionPrefix: translation(StarterQuestDictionary.CompletionDoodadActionPrefixBuildingStill).getString(),
                            completionMessage: translation(StarterQuestDictionary.CompletionDescriptionMessageBuildingStill).getString()
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.StoneWaterStill}"]:eq(0)`,
                        `#inventory li[data-item-type="${Enums_1.ItemType.SandstoneWaterStill}"]:eq(0)`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameFillingStill).getString(),
                    description: translation(StarterQuestDictionary.DescriptionFillingStill).getString(),
                    completion: {
                        messages: {
                            types: [IMessages_1.Message.PouredWaterIntoStill],
                            description: translation(StarterQuestDictionary.CompletionDescriptionFillingStill).getString()
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li.group-${Enums_1.ItemTypeGroup.ContainerOfSeawater}:eq(0)`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameDesalination).getString(),
                    description: translation(StarterQuestDictionary.DescriptionDesalination).getString(),
                    completion: {
                        doodads: {
                            types: [Enums_1.DoodadType.LitStoneWaterStill, Enums_1.DoodadType.LitSandstoneWaterStill],
                            doodadPrefix: translation(StarterQuestDictionary.CompletionDoodadPrefixDesalination).getString(),
                            doodadActionPrefix: translation(StarterQuestDictionary.CompletionDoodadActionPrefixDesalination).getString(),
                            completionMessage: translation(StarterQuestDictionary.CompletionDescriptionMessageDesalination).getString()
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.HandDrill}"]`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameGatherWater).getString(),
                    description: translation(StarterQuestDictionary.DescriptionGatherWater).getString(),
                    completion: {
                        messages: {
                            types: [IMessages_1.Message.FilledFrom],
                            description: translation(StarterQuestDictionary.CompletionDescriptionGatherWater).getString()
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li.group-${Enums_1.ItemTypeGroup.Container}:eq(0)`
                    ]
                },
                {
                    name: translation(StarterQuestDictionary.NameSurvivalistTraining).getString(),
                    description: translation(StarterQuestDictionary.DescriptionSurvivalistTraining).getString()
                }
            ];
            this.messageQuestCompleted = this.addMessage("QuestCompleted", translation(StarterQuestDictionary.QuestCompleted).getString());
            this.messageQuestProgressItemCollected = this.addMessage("QuestProgressItemCollected", translation(StarterQuestDictionary.QuestProgressItemCollected).getString());
            this.messageQuestProgressEquipped = this.addMessage("QuestProgressItemEquipped", translation(StarterQuestDictionary.QuestProgressItemEquipped).getString());
            this.messageQuestProgressQuickslotted = this.addMessage("QuestProgressItemQuickslotted", translation(StarterQuestDictionary.QuestProgressItemQuickslotted).getString());
            this.messageQuestProgressFinished = this.addMessage("QuestProgressFinished", translation(StarterQuestDictionary.QuestProgressFinished).getString());
            this.messageQuestProgressCompleted = this.addMessage("QuestProgressCompleted", translation(StarterQuestDictionary.QuestProgressCompleted).getString());
        }
        onSave() {
            return this.data;
        }
        onUnload() {
            this.dialog = undefined;
            this.container = undefined;
        }
        onGameStart(isLoadingSave, playedCount) {
            if (playedCount === 0) {
            }
        }
        onGameScreenVisible() {
            this.container = $("<div></div>");
            this.inner = $('<div class="inner"></div>');
            this.container.append(this.inner);
            this.containerName = $('<div style="font-size: 16px; line-height: 16px;"></div>');
            this.inner.append(this.containerName);
            this.containerDescription = $('<p style="margin-top: 5px;"></p>');
            this.inner.append(this.containerDescription);
            this.inner.append("<br />");
            this.inner.append(`<div style="font-size: 16px; margin-top: 15px;" data-id="objectives">${translation(StarterQuestDictionary.ButtonObjectives).getString()}</div>`);
            this.containerProgress = $('<ul style="margin-top: 5px; list-style: none;" data-id="objectives"></ul>');
            this.inner.append(this.containerProgress);
            this.containerCompleteButton = $(`<button style="display: block; width: auto; margin-top: 15px;">${translation(StarterQuestDictionary.ButtonStartQuest).getString()}</button>`);
            this.containerCompleteButton.click(() => {
                this.onCompleteQuestClick();
            });
            this.inner.append(this.containerCompleteButton);
            this.containerBackButton = $(`<button style="margin-top: 15px; margin-right: 5px;">${translation(StarterQuestDictionary.ButtonBack).getString()}</button>`);
            this.containerBackButton.click(() => {
                if (this.data.current > 0) {
                    this.setQuest(this.data.current - 1);
                }
            });
            this.inner.append(this.containerBackButton);
            this.containerSkipButton = $(`<button style="margin-top: 15px;">${translation(StarterQuestDictionary.ButtonSkip).getString()}</button>`);
            this.containerSkipButton.click(() => {
                if (this.data.current < this.quests.length - 1) {
                    this.setQuest(this.data.current + 1);
                }
            });
            this.inner.append(this.containerSkipButton);
            this.containerCloseButton = $(`<button style="margin-top: 15px;">${translation(StarterQuestDictionary.ButtonClose).getString()}</button>`);
            this.containerCloseButton.click(() => {
                $(this.container).dialog("close");
            });
            this.inner.append(this.containerCloseButton);
            this.dialog = this.createDialog(this.container, {
                id: this.getName(),
                title: translation(StarterQuestDictionary.StarterQuestTitle).getString(),
                open: this.data.dialogOpen !== false,
                x: 20,
                y: 180,
                width: 380,
                height: "auto",
                resizable: false,
                onOpen: () => {
                    this.data.dialogOpen = true;
                },
                onClose: () => {
                    this.data.dialogOpen = false;
                }
            });
            this.updateDialog();
        }
        onBindLoop(bindPressed, api) {
            if (api.wasPressed(this.bindable) && !bindPressed) {
                ui.toggleDialog(this.dialog);
                bindPressed = this.bindable;
            }
            return bindPressed;
        }
        onInventoryItemAdd(player, item, container) {
            this.updateProgress();
        }
        onInventoryItemRemove(player, item, container) {
            this.updateProgress();
        }
        onInventoryItemUpdate(player, item, container) {
            this.updateProgress();
        }
        onItemEquip(player, item, equip) {
            const quest = this.quests[this.data.current];
            if (!quest.completion) {
                return;
            }
            const questEquips = quest.completion.equips;
            if (questEquips) {
                let updateProgress = false;
                for (let i = 0; i < questEquips.length; i++) {
                    if (this.data.completion.equips[i].complete) {
                        continue;
                    }
                    const questEquip = questEquips[i];
                    if ((!questEquip.type || questEquip.type === item.type) && (questEquip.equip === equip || (questEquip.equip === Enums_1.EquipType.Held && (equip === Enums_1.EquipType.LeftHand || equip === Enums_1.EquipType.RightHand)))) {
                        this.data.completion.equips[i].complete = true;
                        updateProgress = true;
                    }
                }
                if (updateProgress) {
                    this.updateProgress();
                }
            }
        }
        onTurnEnd(player) {
            if (this.updateQuestDoodads()) {
                this.updateProgress();
            }
        }
        onMoveDirectionUpdate(player, direction) {
            if (this.updateQuestDoodads()) {
                this.updateProgress();
            }
        }
        shouldDisplayMessage(player, _1, message) {
            if (!player.isLocalPlayer()) {
                return;
            }
            const quest = this.quests[this.data.current];
            if (!quest.completion) {
                return;
            }
            const questMessages = quest.completion.messages;
            if (questMessages) {
                if (!this.data.completion.messages) {
                    this.data.completion.messages = {
                        types: quest.completion.messages.types
                    };
                }
                if (!this.data.completion.messages.complete) {
                    for (let i = 0; i < questMessages.types.length; i++) {
                        const questMessage = questMessages.types[i];
                        if (questMessage === message) {
                            this.data.completion.messages.complete = true;
                            this.updateProgress();
                            break;
                        }
                    }
                }
            }
            return undefined;
        }
        onItemQuickslot(item, player, quickSlot) {
            this.updateQuickslot();
        }
        updateDialog() {
            const quest = this.quests[this.data.current];
            this.containerName.html(translation(StarterQuestDictionary.QuestTitle).getString(quest.name, this.data.current + 1, this.quests.length));
            this.containerDescription.html(quest.description);
            const questText = this.data.current === 0 ? translation(StarterQuestDictionary.ButtonStartQuest).getString() : translation(StarterQuestDictionary.ButtonCompleteQuest).getString();
            this.containerCompleteButton.text(questText);
            if (this.data.current > 0) {
                this.containerBackButton.show();
            }
            else {
                this.containerBackButton.hide();
            }
            if (this.globalData.maxQuest > this.data.current) {
                this.containerSkipButton.show();
            }
            else {
                this.containerSkipButton.hide();
            }
            if (this.data.current === this.quests.length) {
                this.containerCloseButton.show();
            }
            else {
                this.containerCloseButton.hide();
            }
            this.updateProgress();
        }
        updateProgress() {
            if (!this.dialog) {
                return;
            }
            const quest = this.quests[this.data.current];
            this.containerProgress.empty();
            const questItems = quest.completion ? quest.completion.items : null;
            const questEquips = quest.completion ? quest.completion.equips : null;
            const questDoodads = quest.completion ? quest.completion.doodads : null;
            const questMessages = quest.completion ? quest.completion.messages : null;
            const questQuickslots = quest.completion ? quest.completion.quickslots : null;
            const hasObjectives = questItems || questEquips || questDoodads || questMessages || questQuickslots;
            if (hasObjectives) {
                this.container.find('[data-id="objectives"]').show();
                if (questItems) {
                    for (let i = 0; i < questItems.length; i++) {
                        const questItem = questItems[i];
                        let style = "";
                        let itemLine = "";
                        for (const questItemTypes of questItem.types) {
                            const isItemGroup = itemManager.isItemTypeGroup(questItemTypes);
                            let questItemName = itemManager.getItemTypeGroupName(questItemTypes, false);
                            const questMessageItemName = itemManager.getItemTypeGroupName(questItemTypes, false, Enums_1.SentenceCaseStyle.None);
                            const collected = Math.min(isItemGroup ? itemManager.countItemsInContainerByGroup(localPlayer.inventory, questItemTypes) : itemManager.countItemsInContainer(localPlayer.inventory, questItemTypes), questItem.amount);
                            if (!this.data.completion.items) {
                                this.data.completion.items = [];
                            }
                            let message = false;
                            if (this.data.completion.items[i]) {
                                if (this.data.completion.items[i].amount !== collected) {
                                    this.data.completion.items[i].amount = collected;
                                    message = true;
                                }
                            }
                            else {
                                this.data.completion.items[i] = {
                                    types: questItem.types,
                                    amount: collected
                                };
                                message = true;
                            }
                            if (this.data.completion.items[i].amount === questItem.amount) {
                                this.data.completion.items[i].complete = true;
                                style = "text-decoration: line-through;";
                            }
                            let questType = "";
                            if (questItem.craft) {
                                questItemName = translation(StarterQuestDictionary.QuestCraft).getString(questItemName);
                                questType = translation(StarterQuestDictionary.QuestCrafted).getString();
                            }
                            else {
                                questItemName = translation(StarterQuestDictionary.QuestCollect).getString(questItemName);
                                questType = translation(StarterQuestDictionary.QuestCollected).getString();
                            }
                            itemLine += translation(StarterQuestDictionary.QuestItem).getString(this.data.completion.items[i].amount, questItem.amount, questItemName);
                            if (message && this.data.completion.items[i].amount > 0) {
                                localPlayer.messages.source(this.sourceQuest)
                                    .type(IMessages_1.MessageType.Skill)
                                    .send(this.messageQuestProgressItemCollected, questType, this.data.completion.items[i].amount, questItem.amount, questMessageItemName);
                            }
                        }
                        this.containerProgress.append(`<li style="${style}">${itemLine.slice(0, -3)}</li>`);
                    }
                }
                if (questEquips) {
                    for (let i = 0; i < questEquips.length; i++) {
                        const questEquip = questEquips[i];
                        const questItemName = questEquip.type ? Items_1.itemDescriptions[questEquip.type].name : translation(StarterQuestDictionary.QuestAnItem).getString();
                        const questMessageItemName = questEquip.type ? Items_1.itemDescriptions[questEquip.type].name : translation(StarterQuestDictionary.QuestAnItemLowercase).getString();
                        if (!this.data.completion.equips) {
                            this.data.completion.equips = [];
                        }
                        if (!this.data.completion.equips[i]) {
                            this.data.completion.equips[i] = {
                                type: questEquip.type,
                                equip: questEquip.equip
                            };
                        }
                        const style = this.data.completion.equips[i].complete ? "text-decoration: line-through;" : "";
                        this.containerProgress.append(`<li style="${style}">${translation(StarterQuestDictionary.QuestEquip).getString(questItemName, Messages_1.default[Messages_1.equipTypeToMessage[questEquip.equip]])}</li>`);
                        if (this.data.completion.equips[i].complete && !this.data.completion.equips[i].notified) {
                            this.data.completion.equips[i].notified = true;
                            localPlayer.messages.source(this.sourceQuest)
                                .type(IMessages_1.MessageType.Skill)
                                .send(this.messageQuestProgressEquipped, questMessageItemName);
                        }
                    }
                }
                if (questDoodads) {
                    this.updateQuestDoodads();
                    const doodadPrefix = questDoodads.doodadPrefix;
                    const doodadActionPrefix = questDoodads.doodadActionPrefix;
                    const doodadCompletionMessage = questDoodads.completionMessage;
                    let style = "";
                    let doodadLine = "";
                    for (const questDoodadTypes of questDoodads.types) {
                        const doodadDesc = Doodads_1.default[questDoodadTypes];
                        style = this.data.completion.doodads.complete ? "text-decoration: line-through;" : "";
                        doodadLine += translation(StarterQuestDictionary.QuestDoodad).getString(doodadPrefix, game.getNameFromDescription(doodadDesc, Enums_1.SentenceCaseStyle.Title));
                        if (this.data.completion.doodads.complete && !this.data.completion.doodads.notified) {
                            this.data.completion.doodads.notified = true;
                            localPlayer.messages.source(this.sourceQuest)
                                .type(IMessages_1.MessageType.Skill)
                                .send(this.messageQuestProgressFinished, doodadActionPrefix, doodadCompletionMessage);
                        }
                    }
                    this.containerProgress.append(`<li style="${style}">${doodadLine.slice(0, -3)}</li>`);
                }
                if (questMessages) {
                    const messageName = questMessages.description ? questMessages.description : ui.messageIdToText(questMessages.types[0]);
                    if (!this.data.completion.messages) {
                        this.data.completion.messages = {
                            types: questMessages.types
                        };
                    }
                    const style = this.data.completion.messages.complete ? "text-decoration: line-through;" : "";
                    this.containerProgress.append(`<li style="${style}">${messageName}</li>`);
                    if (this.data.completion.messages.complete && !this.data.completion.messages.notified) {
                        this.data.completion.messages.notified = true;
                        localPlayer.messages.source(this.sourceQuest)
                            .type(IMessages_1.MessageType.Skill)
                            .send(this.messageQuestProgressCompleted, messageName);
                    }
                }
                if (questQuickslots) {
                    if (!this.data.completion.quickslots) {
                        this.data.completion.quickslots = {
                            messages: quest.completion.quickslots.messages
                        };
                    }
                    const style = this.data.completion.quickslots.complete ? "text-decoration: line-through;" : "";
                    const quickslotLine = questQuickslots.messages;
                    if (this.data.completion.quickslots.complete && !this.data.completion.quickslots.notified) {
                        this.data.completion.quickslots.notified = true;
                        localPlayer.messages.source(this.sourceQuest)
                            .type(IMessages_1.MessageType.Skill)
                            .send(this.messageQuestProgressQuickslotted, IMessages_1.MessageType.Skill);
                    }
                    this.containerProgress.append(`<li style="${style}">${quickslotLine}</li>`);
                }
            }
            else {
                this.container.find('[data-id="objectives"]').hide();
            }
            if (this.isQuestCompletable()) {
                this.containerCompleteButton.show();
                if (this.globalData.maxQuest < this.data.current + 1) {
                    this.globalData.maxQuest = this.data.current + 1;
                }
            }
            else {
                this.containerCompleteButton.hide();
            }
        }
        updateQuestDoodads() {
            const quest = this.quests[this.data.current];
            if (!quest.completion || !quest.completion.doodads) {
                return false;
            }
            if (!this.data.completion.doodads) {
                this.data.completion.doodads = {
                    types: quest.completion.doodads.types,
                    doodadPrefix: quest.completion.doodads.doodadPrefix,
                    doodadActionPrefix: quest.completion.doodads.doodadActionPrefix,
                    completionMessage: quest.completion.doodads.completionMessage
                };
            }
            if (!this.data.completion.doodads.complete) {
                const tile = localPlayer.getFacingTile();
                if (tile.doodad !== undefined) {
                    const doodad = tile.doodad;
                    if (quest.completion.doodads.types.indexOf(doodad.type) !== -1) {
                        this.data.completion.doodads.complete = true;
                        return true;
                    }
                }
            }
            return false;
        }
        onCompleteQuestClick() {
            const quest = this.quests[this.data.current];
            localPlayer.messages.source(this.sourceQuest)
                .type(IMessages_1.MessageType.Skill)
                .send(this.messageQuestCompleted, quest.name);
            this.setQuest(this.data.current + 1);
        }
        setQuest(questNumber) {
            this.data.current = questNumber;
            this.data.completion = {};
            const highlightElements = this.quests[questNumber].highlightElementSelector;
            if (highlightElements) {
                if (this.quests[questNumber].allowMultipleHighlights) {
                    ui.highlight(undefined, ...highlightElements);
                }
                else {
                    ui.highlightUnique(undefined, ...highlightElements);
                }
            }
            this.updateDialog();
            this.onQuestChanged();
        }
        onQuestChanged() {
            if (this.globalData.maxQuest < this.data.current) {
                this.globalData.maxQuest = this.data.current;
            }
            const quest = this.quests[this.data.current];
            if (!quest.completion) {
                return;
            }
            const questEquips = quest.completion.equips;
            if (questEquips) {
                const items = itemManager.getItemsInContainer(localPlayer.inventory);
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    if (item.isEquipped()) {
                        this.onItemEquip(localPlayer, item, item.getEquipSlot());
                    }
                }
            }
            if (ui.getUsedQuickSlots().length !== 0) {
                this.updateQuickslot();
            }
        }
        updateQuickslot() {
            const quest = this.quests[this.data.current];
            if (!quest.completion) {
                return;
            }
            const questQuickslots = quest.completion.quickslots;
            if (questQuickslots) {
                if (!this.data.completion.quickslots) {
                    this.data.completion.quickslots = {
                        messages: quest.completion.quickslots.messages
                    };
                }
                if (!this.data.completion.quickslots.complete) {
                    this.data.completion.quickslots.complete = true;
                    this.updateProgress();
                }
            }
        }
        isQuestCompletable() {
            const quest = this.quests[this.data.current];
            if (!quest.completion) {
                return false;
            }
            if (quest.completion.complete) {
                return true;
            }
            const completion = this.data.completion;
            if (completion.items) {
                for (let i = 0; i < completion.items.length; i++) {
                    if (!completion.items[i].complete) {
                        return false;
                    }
                }
            }
            if (completion.equips) {
                for (let i = 0; i < completion.equips.length; i++) {
                    if (!completion.equips[i].complete) {
                        return false;
                    }
                }
            }
            if (completion.doodads) {
                if (!completion.doodads.complete) {
                    return false;
                }
            }
            if (completion.messages) {
                if (!completion.messages.complete) {
                    return false;
                }
            }
            if (completion.quickslots) {
                if (!completion.quickslots.complete) {
                    return false;
                }
            }
            return true;
        }
    }
    __decorate([
        IHookHost_1.HookMethod
    ], StarterQuest.prototype, "onGameStart", null);
    __decorate([
        IHookHost_1.HookMethod
    ], StarterQuest.prototype, "onGameScreenVisible", null);
    __decorate([
        IHookHost_1.HookMethod
    ], StarterQuest.prototype, "onBindLoop", null);
    __decorate([
        IHookHost_1.HookMethod
    ], StarterQuest.prototype, "onInventoryItemAdd", null);
    __decorate([
        IHookHost_1.HookMethod
    ], StarterQuest.prototype, "onInventoryItemRemove", null);
    __decorate([
        IHookHost_1.HookMethod
    ], StarterQuest.prototype, "onInventoryItemUpdate", null);
    __decorate([
        IHookHost_1.HookMethod
    ], StarterQuest.prototype, "onItemEquip", null);
    __decorate([
        IHookHost_1.HookMethod
    ], StarterQuest.prototype, "onTurnEnd", null);
    __decorate([
        IHookHost_1.HookMethod
    ], StarterQuest.prototype, "onMoveDirectionUpdate", null);
    __decorate([
        IHookHost_1.HookMethod
    ], StarterQuest.prototype, "shouldDisplayMessage", null);
    __decorate([
        IHookHost_1.HookMethod
    ], StarterQuest.prototype, "onItemQuickslot", null);
    exports.default = StarterQuest;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRlclF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU3RhcnRlclF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztJQTBFQSxJQUFLLHNCQStHSjtJQS9HRCxXQUFLLHNCQUFzQjtRQUMxQixpRkFBVyxDQUFBO1FBQ1gsK0ZBQWtCLENBQUE7UUFDbEIsK0VBQVUsQ0FBQTtRQUNWLDZGQUFpQixDQUFBO1FBQ2pCLHVGQUFjLENBQUE7UUFDZCxxR0FBcUIsQ0FBQTtRQUNyQix5SEFBK0IsQ0FBQTtRQUMvQixxR0FBcUIsQ0FBQTtRQUNyQixtSEFBNEIsQ0FBQTtRQUM1QixtRkFBWSxDQUFBO1FBQ1osa0dBQW1CLENBQUE7UUFDbkIsMEZBQWUsQ0FBQTtRQUNmLHdHQUFzQixDQUFBO1FBQ3RCLDRIQUFnQyxDQUFBO1FBQ2hDLGdHQUFrQixDQUFBO1FBQ2xCLDhHQUF5QixDQUFBO1FBQ3pCLGtJQUFtQyxDQUFBO1FBQ25DLDhGQUFpQixDQUFBO1FBQ2pCLDRHQUF3QixDQUFBO1FBQ3hCLGdJQUFrQyxDQUFBO1FBQ2xDLGtGQUFXLENBQUE7UUFDWCxnR0FBa0IsQ0FBQTtRQUNsQiwwRkFBZSxDQUFBO1FBQ2Ysd0dBQXNCLENBQUE7UUFDdEIsc0ZBQWEsQ0FBQTtRQUNiLG9HQUFvQixDQUFBO1FBQ3BCLGdHQUFrQixDQUFBO1FBQ2xCLDhHQUF5QixDQUFBO1FBQ3pCLHNHQUFxQixDQUFBO1FBQ3JCLG9IQUE0QixDQUFBO1FBQzVCLG9HQUFvQixDQUFBO1FBQ3BCLGtIQUEyQixDQUFBO1FBQzNCLG9HQUFvQixDQUFBO1FBQ3BCLGtIQUEyQixDQUFBO1FBQzNCLHdJQUFzQyxDQUFBO1FBQ3RDLG9KQUE0QyxDQUFBO1FBQzVDLG9KQUE0QyxDQUFBO1FBQzVDLDRFQUFRLENBQUE7UUFDUiwwRkFBZSxDQUFBO1FBQ2YsZ0hBQTBCLENBQUE7UUFDMUIsNEhBQWdDLENBQUE7UUFDaEMsNEhBQWdDLENBQUE7UUFDaEMsMEZBQWUs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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "doodad/Doodads", "Enums", "item/Items", "language/IMessages", "language/Messages", "language/Translation", "mod/IHookHost", "mod/Mod", "mod/ModRegistry"], function (require, exports, Doodads_1, Enums_1, Items_1, IMessages_1, Messages_1, Translation_1, IHookHost_1, Mod_1, ModRegistry_1) {
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
    function translation(entry) {
        return new Translation_1.default(StarterQuest.INSTANCE.dictionary, entry);
    }
    class StarterQuest extends Mod_1.default {
        constructor() {
            super(...arguments);
            this.quests = [];
        }
        onInitialize(saveDataGlobal) {
            this.globalData = saveDataGlobal;
            if (!this.globalData) {
                this.globalData = {
                    maxQuest: 0
                };
            }
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
        ModRegistry_1.default.bindable("Toggle", { key: "KeyJ" })
    ], StarterQuest.prototype, "bindable", void 0);
    __decorate([
        ModRegistry_1.default.dictionary("StarterQuest", StarterQuestDictionary)
    ], StarterQuest.prototype, "dictionary", void 0);
    __decorate([
        ModRegistry_1.default.message("QuestCompleted")
    ], StarterQuest.prototype, "messageQuestCompleted", void 0);
    __decorate([
        ModRegistry_1.default.message("QuestProgressItemCollected")
    ], StarterQuest.prototype, "messageQuestProgressItemCollected", void 0);
    __decorate([
        ModRegistry_1.default.message("QuestProgressItemEquipped")
    ], StarterQuest.prototype, "messageQuestProgressEquipped", void 0);
    __decorate([
        ModRegistry_1.default.message("QuestProgressItemQuickslotted")
    ], StarterQuest.prototype, "messageQuestProgressQuickslotted", void 0);
    __decorate([
        ModRegistry_1.default.message("QuestProgressFinished")
    ], StarterQuest.prototype, "messageQuestProgressFinished", void 0);
    __decorate([
        ModRegistry_1.default.message("QuestProgressCompleted")
    ], StarterQuest.prototype, "messageQuestProgressCompleted", void 0);
    __decorate([
        ModRegistry_1.default.messageSource("Quest")
    ], StarterQuest.prototype, "sourceQuest", void 0);
    __decorate([
        ModRegistry_1.default.menuBarButton("Starter Quest", {
            bindable: ModRegistry_1.Registry().get("bindable"),
            tooltip: tooltip => tooltip.addText(text => text
                .setText(translation(StarterQuestDictionary.StarterQuestTitle))),
            onActivate: () => ui.toggleDialog(this.dialog)
        })
    ], StarterQuest.prototype, "menuBarButton", void 0);
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
    __decorate([
        Mod_1.default.instance("Starter Quest")
    ], StarterQuest, "INSTANCE", void 0);
    exports.default = StarterQuest;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRlclF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YXJ0ZXJRdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUE2RUEsSUFBSyxzQkErR0o7SUEvR0QsV0FBSyxzQkFBc0I7UUFDMUIsaUZBQVcsQ0FBQTtRQUNYLCtGQUFrQixDQUFBO1FBQ2xCLCtFQUFVLENBQUE7UUFDViw2RkFBaUIsQ0FBQTtRQUNqQix1RkFBYyxDQUFBO1FBQ2QscUdBQXFCLENBQUE7UUFDckIseUhBQStCLENBQUE7UUFDL0IscUdBQXFCLENBQUE7UUFDckIsbUhBQTRCLENBQUE7UUFDNUIsbUZBQVksQ0FBQTtRQUNaLGtHQUFtQixDQUFBO1FBQ25CLDBGQUFlLENBQUE7UUFDZix3R0FBc0IsQ0FBQTtRQUN0Qiw0SEFBZ0MsQ0FBQTtRQUNoQyxnR0FBa0IsQ0FBQTtRQUNsQiw4R0FBeUIsQ0FBQTtRQUN6QixrSUFBbUMsQ0FBQTtRQUNuQyw4RkFBaUIsQ0FBQTtRQUNqQiw0R0FBd0IsQ0FBQTtRQUN4QixnSUFBa0MsQ0FBQTtRQUNsQyxrRkFBVyxDQUFBO1FBQ1gsZ0dBQWtCLENBQUE7UUFDbEIsMEZBQWUsQ0FBQTtRQUNmLHdHQUFzQixDQUFBO1FBQ3RCLHNGQUFhLENBQUE7UUFDYixvR0FBb0IsQ0FBQTtRQUNwQixnR0FBa0IsQ0FBQTtRQUNsQiw4R0FBeUIsQ0FBQTtRQUN6QixzR0FBcUIsQ0FBQTtRQUNyQixvSEFBNEIsQ0FBQTtRQUM1QixvR0FBb0IsQ0FBQTtRQUNwQixrSEFBMkIsQ0FBQTtRQUMzQixvR0FBb0IsQ0FBQTtRQUNwQixrSEFBMkIsQ0FBQTtRQUMzQix3SUFBc0MsQ0FBQTtRQUN0QyxvSkFBNEMsQ0FBQTtRQUM1QyxvSkFBNEMsQ0FBQTtRQUM1Qyw0RUFBUSxDQUFBO1FBQ1IsMEZBQWUsQ0FBQTtRQUNmLGdIQUEwQixDQUFBO1FBQzFCLDRIQUFnQyxDQUFBO1FBQ2hDLDRIQUFnQyxDQUFBO1FBQ2hD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
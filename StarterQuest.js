define(["require", "exports", "doodad/Doodads", "Enums", "item/Items", "language/Messages", "mod/Mod", "newui/BindingManager"], function (require, exports, Doodads_1, Enums_1, Items_1, Messages_1, Mod_1, BindingManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StarterQuestDictionary;
    (function (StarterQuestDictionary) {
        StarterQuestDictionary[StarterQuestDictionary["NameWelcome"] = 0] = "NameWelcome";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionWelcome"] = 1] = "DescriptionWelcome";
        StarterQuestDictionary[StarterQuestDictionary["NameGearUp"] = 2] = "NameGearUp";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionGearUp"] = 3] = "DescriptionGearUp";
        StarterQuestDictionary[StarterQuestDictionary["NameLeftRightHand"] = 4] = "NameLeftRightHand";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionLeftRightHand"] = 5] = "DescriptionLeftRightHand";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionLeftRightHand"] = 6] = "CompletionDescriptionLeftRightHand";
        StarterQuestDictionary[StarterQuestDictionary["NameResourceGathering"] = 7] = "NameResourceGathering";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionResourceGathering"] = 8] = "DescriptionResourceGathering";
        StarterQuestDictionary[StarterQuestDictionary["NameCrafting"] = 9] = "NameCrafting";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionCrafting"] = 10] = "DescriptionCrafting";
        StarterQuestDictionary[StarterQuestDictionary["NameDismantling"] = 11] = "NameDismantling";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionDismantling"] = 12] = "DescriptionDismantling";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionDismantling"] = 13] = "CompletionDescriptionDismantling";
        StarterQuestDictionary[StarterQuestDictionary["NameHunting"] = 14] = "NameHunting";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionHunting"] = 15] = "DescriptionHunting";
        StarterQuestDictionary[StarterQuestDictionary["NameWoodenPoles"] = 16] = "NameWoodenPoles";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionWoodenPoles"] = 17] = "DescriptionWoodenPoles";
        StarterQuestDictionary[StarterQuestDictionary["NameHandDrill"] = 18] = "NameHandDrill";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionHandDrill"] = 19] = "DescriptionHandDrill";
        StarterQuestDictionary[StarterQuestDictionary["NameKindlingTinder"] = 20] = "NameKindlingTinder";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionKindlingTinder"] = 21] = "DescriptionKindlingTinder";
        StarterQuestDictionary[StarterQuestDictionary["NameCampfireMaterials"] = 22] = "NameCampfireMaterials";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionCampfireMaterials"] = 23] = "DescriptionCampfireMaterials";
        StarterQuestDictionary[StarterQuestDictionary["NameCampfireCrafting"] = 24] = "NameCampfireCrafting";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionCampfireCrafting"] = 25] = "DescriptionCampfireCrafting";
        StarterQuestDictionary[StarterQuestDictionary["NameCampfireBuilding"] = 26] = "NameCampfireBuilding";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionCampfireBuilding"] = 27] = "DescriptionCampfireBuilding";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadPrefixCampfireBuilding"] = 28] = "CompletionDoodadPrefixCampfireBuilding";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadActionPrefixCampfireBuilding"] = 29] = "CompletionDoodadActionPrefixCampfireBuilding";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionMessageCampfireBuilding"] = 30] = "CompletionDescriptionMessageCampfireBuilding";
        StarterQuestDictionary[StarterQuestDictionary["NameFire"] = 31] = "NameFire";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionFire"] = 32] = "DescriptionFire";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadPrefixFire"] = 33] = "CompletionDoodadPrefixFire";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadActionPrefixFire"] = 34] = "CompletionDoodadActionPrefixFire";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionMessageFire"] = 35] = "CompletionDescriptionMessageFire";
        StarterQuestDictionary[StarterQuestDictionary["NameStokingFire"] = 36] = "NameStokingFire";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionStokingFire"] = 37] = "DescriptionStokingFire";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionStokingFire"] = 38] = "CompletionDescriptionStokingFire";
        StarterQuestDictionary[StarterQuestDictionary["NameCookingFire"] = 39] = "NameCookingFire";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionCookingFire"] = 40] = "DescriptionCookingFire";
        StarterQuestDictionary[StarterQuestDictionary["NameDrinkableWater"] = 41] = "NameDrinkableWater";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionDrinkableWater"] = 42] = "DescriptionDrinkableWater";
        StarterQuestDictionary[StarterQuestDictionary["NameCordage"] = 43] = "NameCordage";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionCordage"] = 44] = "DescriptionCordage";
        StarterQuestDictionary[StarterQuestDictionary["NameString"] = 45] = "NameString";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionString"] = 46] = "DescriptionString";
        StarterQuestDictionary[StarterQuestDictionary["NameGrindingMaterials"] = 47] = "NameGrindingMaterials";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionGrindingMaterials"] = 48] = "DescriptionGrindingMaterials";
        StarterQuestDictionary[StarterQuestDictionary["NameHuntLeather"] = 49] = "NameHuntLeather";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionHuntLeather"] = 50] = "DescriptionHuntLeather";
        StarterQuestDictionary[StarterQuestDictionary["NameTannedLeather"] = 51] = "NameTannedLeather";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionTannedLeather"] = 52] = "DescriptionTannedLeather";
        StarterQuestDictionary[StarterQuestDictionary["NameWaterskin"] = 53] = "NameWaterskin";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionWaterskin"] = 54] = "DescriptionWaterskin";
        StarterQuestDictionary[StarterQuestDictionary["NameWaterStillMaterials"] = 55] = "NameWaterStillMaterials";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionWaterStillMaterials"] = 56] = "DescriptionWaterStillMaterials";
        StarterQuestDictionary[StarterQuestDictionary["NameWaterStillCrafting"] = 57] = "NameWaterStillCrafting";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionWaterStillCrafting"] = 58] = "DescriptionWaterStillCrafting";
        StarterQuestDictionary[StarterQuestDictionary["NameSeawater"] = 59] = "NameSeawater";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionSeawater"] = 60] = "DescriptionSeawater";
        StarterQuestDictionary[StarterQuestDictionary["NameBuildingStill"] = 61] = "NameBuildingStill";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionBuildingStill"] = 62] = "DescriptionBuildingStill";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadPrefixBuildingStill"] = 63] = "CompletionDoodadPrefixBuildingStill";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadActionPrefixBuildingStill"] = 64] = "CompletionDoodadActionPrefixBuildingStill";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionMessageBuildingStill"] = 65] = "CompletionDescriptionMessageBuildingStill";
        StarterQuestDictionary[StarterQuestDictionary["NameFillingStill"] = 66] = "NameFillingStill";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionFillingStill"] = 67] = "DescriptionFillingStill";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionFillingStill"] = 68] = "CompletionDescriptionFillingStill";
        StarterQuestDictionary[StarterQuestDictionary["NameDesalination"] = 69] = "NameDesalination";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionDesalination"] = 70] = "DescriptionDesalination";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadPrefixDesalination"] = 71] = "CompletionDoodadPrefixDesalination";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDoodadActionPrefixDesalination"] = 72] = "CompletionDoodadActionPrefixDesalination";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionMessageDesalination"] = 73] = "CompletionDescriptionMessageDesalination";
        StarterQuestDictionary[StarterQuestDictionary["NameGatherWater"] = 74] = "NameGatherWater";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionGatherWater"] = 75] = "DescriptionGatherWater";
        StarterQuestDictionary[StarterQuestDictionary["CompletionDescriptionGatherWater"] = 76] = "CompletionDescriptionGatherWater";
        StarterQuestDictionary[StarterQuestDictionary["NameSurvivalistTraining"] = 77] = "NameSurvivalistTraining";
        StarterQuestDictionary[StarterQuestDictionary["DescriptionSurvivalistTraining"] = 78] = "DescriptionSurvivalistTraining";
        StarterQuestDictionary[StarterQuestDictionary["QuestCompleted"] = 79] = "QuestCompleted";
        StarterQuestDictionary[StarterQuestDictionary["QuestProgressItemCollected"] = 80] = "QuestProgressItemCollected";
        StarterQuestDictionary[StarterQuestDictionary["QuestProgressItemEquipped"] = 81] = "QuestProgressItemEquipped";
        StarterQuestDictionary[StarterQuestDictionary["QuestProgressFinished"] = 82] = "QuestProgressFinished";
        StarterQuestDictionary[StarterQuestDictionary["QuestProgressCompleted"] = 83] = "QuestProgressCompleted";
        StarterQuestDictionary[StarterQuestDictionary["StarterQuestTitle"] = 84] = "StarterQuestTitle";
        StarterQuestDictionary[StarterQuestDictionary["ButtonObjectives"] = 85] = "ButtonObjectives";
        StarterQuestDictionary[StarterQuestDictionary["ButtonStartQuest"] = 86] = "ButtonStartQuest";
        StarterQuestDictionary[StarterQuestDictionary["ButtonBack"] = 87] = "ButtonBack";
        StarterQuestDictionary[StarterQuestDictionary["ButtonSkip"] = 88] = "ButtonSkip";
        StarterQuestDictionary[StarterQuestDictionary["ButtonClose"] = 89] = "ButtonClose";
        StarterQuestDictionary[StarterQuestDictionary["ButtonCompleteQuest"] = 90] = "ButtonCompleteQuest";
        StarterQuestDictionary[StarterQuestDictionary["QuestTitle"] = 91] = "QuestTitle";
        StarterQuestDictionary[StarterQuestDictionary["QuestCraft"] = 92] = "QuestCraft";
        StarterQuestDictionary[StarterQuestDictionary["QuestCrafted"] = 93] = "QuestCrafted";
        StarterQuestDictionary[StarterQuestDictionary["QuestCollect"] = 94] = "QuestCollect";
        StarterQuestDictionary[StarterQuestDictionary["QuestCollected"] = 95] = "QuestCollected";
        StarterQuestDictionary[StarterQuestDictionary["QuestItem"] = 96] = "QuestItem";
        StarterQuestDictionary[StarterQuestDictionary["QuestAnItem"] = 97] = "QuestAnItem";
        StarterQuestDictionary[StarterQuestDictionary["QuestAnItemLowercase"] = 98] = "QuestAnItemLowercase";
        StarterQuestDictionary[StarterQuestDictionary["QuestEquip"] = 99] = "QuestEquip";
        StarterQuestDictionary[StarterQuestDictionary["QuestDoodad"] = 100] = "QuestDoodad";
    })(StarterQuestDictionary || (StarterQuestDictionary = {}));
    class StarterQuest extends Mod_1.default {
        constructor() {
            super(...arguments);
            this.quests = [];
        }
        onInitialize(saveDataGlobal) {
            this.keyBind = this.addBindable("Toggle", { key: "KeyJ" });
            this.dictionary = this.addDictionary("StarterQuest", StarterQuestDictionary);
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameWelcome),
                    description: Messages_1.makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionWelcome), BindingManager_1.bindingManager.getBindTranslation(this.keyBind)),
                    completion: {
                        complete: true
                    }
                },
                {
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameGearUp),
                    description: Messages_1.makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionGearUp), BindingManager_1.bindingManager.getBindTranslation(Enums_1.Bindable.DialogEquipment)),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameLeftRightHand),
                    description: Messages_1.makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionLeftRightHand), BindingManager_1.bindingManager.getBindTranslation(Enums_1.Bindable.GameHandToggleLeft), BindingManager_1.bindingManager.getBindTranslation(Enums_1.Bindable.GameHandToggleRight)),
                    completion: {
                        messages: {
                            types: [Messages_1.Message.YouHaveEnabledDisabled],
                            description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionLeftRightHand)
                        }
                    },
                    highlightElementSelector: [
                        '#equipment .checkbox-option[data-checkbox-id="LeftHand"]',
                        '#equipment .checkbox-option[data-checkbox-id="RightHand"]'
                    ],
                    allowMultipleHighlights: true
                },
                {
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameResourceGathering),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionResourceGathering),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameCrafting),
                    description: Messages_1.makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionCrafting), BindingManager_1.bindingManager.getBindTranslation(Enums_1.Bindable.DialogCrafting)),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameDismantling),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionDismantling),
                    completion: {
                        messages: {
                            types: [Messages_1.Message.YouDismantled],
                            description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionDismantling)
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameHunting),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionHunting),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameWoodenPoles),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionWoodenPoles),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameHandDrill),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionHandDrill),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameKindlingTinder),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionKindlingTinder),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameCampfireMaterials),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionCampfireMaterials),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameCampfireCrafting),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionCampfireCrafting),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameCampfireBuilding),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionCampfireBuilding),
                    completion: {
                        doodads: {
                            types: [Enums_1.DoodadType.StoneCampfire, Enums_1.DoodadType.SandstoneCampfire],
                            doodadPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadPrefixCampfireBuilding),
                            doodadActionPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadActionPrefixCampfireBuilding),
                            completionMessage: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionMessageCampfireBuilding)
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.StoneCampfire}"]:eq(0)`,
                        `#inventory li[data-item-type="${Enums_1.ItemType.SandstoneCampfire}"]:eq(0)`
                    ]
                },
                {
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameFire),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionFire),
                    completion: {
                        doodads: {
                            types: [Enums_1.DoodadType.LitStoneCampfire, Enums_1.DoodadType.LitSandstoneCampfire],
                            doodadPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadPrefixFire),
                            doodadActionPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadActionPrefixFire),
                            completionMessage: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionMessageFire)
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.HandDrill}"]:eq(0)`
                    ]
                },
                {
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameStokingFire),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionStokingFire),
                    completion: {
                        messages: {
                            types: [Messages_1.Message.AddedFuelToFire],
                            description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionStokingFire)
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameCookingFire),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionCookingFire),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameDrinkableWater),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionDrinkableWater),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameCordage),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionCordage),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameString),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionString),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameGrindingMaterials),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionGrindingMaterials),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameHuntLeather),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionHuntLeather),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameTannedLeather),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionTannedLeather),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameWaterskin),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionWaterskin),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameWaterStillMaterials),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionWaterStillMaterials),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameWaterStillCrafting),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionWaterStillCrafting),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameSeawater),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionSeawater),
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
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameBuildingStill),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionBuildingStill),
                    completion: {
                        doodads: {
                            types: [Enums_1.DoodadType.StoneWaterStill, Enums_1.DoodadType.SandstoneWaterStill],
                            doodadPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadPrefixBuildingStill),
                            doodadActionPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadActionPrefixBuildingStill),
                            completionMessage: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionMessageBuildingStill)
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.StoneWaterStill}"]:eq(0)`,
                        `#inventory li[data-item-type="${Enums_1.ItemType.SandstoneWaterStill}"]:eq(0)`
                    ]
                },
                {
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameFillingStill),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionFillingStill),
                    completion: {
                        messages: {
                            types: [Messages_1.Message.PouredWaterIntoStill],
                            description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionFillingStill)
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li.group-${Enums_1.ItemTypeGroup.ContainerOfSeawater}:eq(0)`
                    ]
                },
                {
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameDesalination),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionDesalination),
                    completion: {
                        doodads: {
                            types: [Enums_1.DoodadType.LitStoneWaterStill, Enums_1.DoodadType.LitSandstoneWaterStill],
                            doodadPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadPrefixDesalination),
                            doodadActionPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadActionPrefixDesalination),
                            completionMessage: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionMessageDesalination)
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.HandDrill}"]`
                    ]
                },
                {
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameGatherWater),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionGatherWater),
                    completion: {
                        messages: {
                            types: [Messages_1.Message.FilledFrom],
                            description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionGatherWater)
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li.group-${Enums_1.ItemTypeGroup.Container}:eq(0)`
                    ]
                },
                {
                    name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameSurvivalistTraining),
                    description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionSurvivalistTraining)
                }
            ];
            this.messageQuestCompleted = this.addMessage("QuestCompleted", languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestCompleted));
            this.messageQuestProgressItemCollected = this.addMessage("QuestProgressItemCollected", languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestProgressItemCollected));
            this.messageQuestProgressEquipped = this.addMessage("QuestProgressItemEquipped", languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestProgressItemEquipped));
            this.messageQuestProgressFinished = this.addMessage("QuestProgressFinished", languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestProgressFinished));
            this.messageQuestProgressCompleted = this.addMessage("QuestProgressCompleted", languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestProgressCompleted));
            this.button = this.createButton(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.StarterQuestTitle), `${this.getPath()}/images/starterquest.png`, this.keyBind);
        }
        onSave() {
            return this.data;
        }
        onUnload() {
            this.dialog = undefined;
            this.container = undefined;
            this.removeButton(this.button);
        }
        onGameStart(isLoadingSave, playedCount) {
            if (playedCount === 0) {
            }
        }
        onShowInGameScreen() {
            this.container = $("<div></div>");
            this.inner = $('<div class="inner"></div>');
            this.container.append(this.inner);
            this.containerName = $('<div style="font-size: 16px; line-height: 16px;"></div>');
            this.inner.append(this.containerName);
            this.containerDescription = $('<p style="margin-top: 5px;"></p>');
            this.inner.append(this.containerDescription);
            this.inner.append("<br />");
            this.inner.append(`<div style="font-size: 16px; margin-top: 15px;" data-id="objectives">${languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.ButtonObjectives)}</div>`);
            this.containerProgress = $('<ul style="margin-top: 5px; list-style: none;" data-id="objectives"></ul>');
            this.inner.append(this.containerProgress);
            this.containerCompleteButton = $(`<button style="display: block; width: auto; margin-top: 15px;">${languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.ButtonStartQuest)}</button>`);
            this.containerCompleteButton.click(() => {
                this.onCompleteQuestClick();
            });
            this.inner.append(this.containerCompleteButton);
            this.containerBackButton = $(`<button style="margin-top: 15px; margin-right: 5px;">${languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.ButtonBack)}</button>`);
            this.containerBackButton.click(() => {
                if (this.data.current > 0) {
                    this.setQuest(this.data.current - 1);
                }
            });
            this.inner.append(this.containerBackButton);
            this.containerSkipButton = $(`<button style="margin-top: 15px;">${languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.ButtonSkip)}</button>`);
            this.containerSkipButton.click(() => {
                if (this.data.current < this.quests.length - 1) {
                    this.setQuest(this.data.current + 1);
                }
            });
            this.inner.append(this.containerSkipButton);
            this.containerCloseButton = $(`<button style="margin-top: 15px;">${languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.ButtonClose)}</button>`);
            this.containerCloseButton.click(() => {
                $(this.container).dialog("close");
            });
            this.inner.append(this.containerCloseButton);
            this.dialog = this.createDialog(this.container, {
                id: this.getName(),
                title: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.StarterQuestTitle),
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
        onButtonBarClick(button) {
            if (button.is(this.button)) {
                ui.toggleDialog(this.dialog);
            }
        }
        onBindLoop(bindPressed, api) {
            if (api.wasPressed(this.keyBind) && !bindPressed) {
                ui.toggleDialog(this.dialog);
                bindPressed = true;
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
        onDisplayMessage(message, messageType, ...args) {
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
        updateDialog() {
            const quest = this.quests[this.data.current];
            this.containerName.html(Messages_1.makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestTitle), quest.name, this.data.current + 1, this.quests.length));
            this.containerDescription.html(quest.description);
            const questText = this.data.current === 0 ? languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.ButtonStartQuest) : languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.ButtonCompleteQuest);
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
            const hasObjectives = questItems || questEquips || questDoodads || questMessages;
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
                            const itemName = questItemName;
                            if (questItem.craft) {
                                questItemName = Messages_1.makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestCraft), questItemName);
                                questType = languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestCrafted);
                            }
                            else {
                                questItemName = Messages_1.makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestCollect), questItemName);
                                questType = languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestCollected);
                            }
                            itemLine += Messages_1.makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestItem), this.data.completion.items[i].amount, questItem.amount, questItemName);
                            if (message && this.data.completion.items[i].amount > 0) {
                                ui.displayMessage(localPlayer, this.messageQuestProgressItemCollected, Messages_1.MessageType.Skill, questType, this.data.completion.items[i].amount, questItem.amount, questMessageItemName);
                            }
                        }
                        this.containerProgress.append(`<li style="${style}">${itemLine.slice(0, -4)}</li>`);
                    }
                }
                if (questEquips) {
                    for (let i = 0; i < questEquips.length; i++) {
                        const questEquip = questEquips[i];
                        const questItemName = questEquip.type ? Items_1.itemDescriptions[questEquip.type].name : languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestAnItem);
                        const questMessageItemName = questEquip.type ? Items_1.itemDescriptions[questEquip.type].name : languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestAnItemLowercase);
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
                        this.containerProgress.append(`<li style="${style}">${Messages_1.makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestEquip), questItemName, Messages_1.messages[Enums_1.equipTypeToMessage[questEquip.equip]])}</li>`);
                        if (this.data.completion.equips[i].complete && !this.data.completion.equips[i].notified) {
                            this.data.completion.equips[i].notified = true;
                            ui.displayMessage(localPlayer, this.messageQuestProgressEquipped, Messages_1.MessageType.Skill, questMessageItemName);
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
                        doodadLine += Messages_1.makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestDoodad), doodadPrefix, game.getNameFromDescription(doodadDesc, Enums_1.SentenceCaseStyle.Title));
                        if (this.data.completion.doodads.complete && !this.data.completion.doodads.notified) {
                            this.data.completion.doodads.notified = true;
                            ui.displayMessage(localPlayer, this.messageQuestProgressFinished, Messages_1.MessageType.Skill, doodadActionPrefix, doodadCompletionMessage);
                        }
                    }
                    this.containerProgress.append(`<li style="${style}">${doodadLine.slice(0, -4)}</li>`);
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
                        ui.displayMessagePack(localPlayer, {
                            message: this.messageQuestProgressCompleted,
                            type: Messages_1.MessageType.Skill,
                            args: [messageName]
                        });
                    }
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
                const tile = game.getTileInFrontOfPlayer(localPlayer);
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
            ui.displayMessagePack(localPlayer, {
                message: this.messageQuestCompleted,
                type: Messages_1.MessageType.Skill,
                args: [quest.name]
            });
            this.setQuest(this.data.current + 1);
        }
        setQuest(questNumber) {
            this.data.current = questNumber;
            this.data.completion = {};
            const highlightElements = this.quests[questNumber].highlightElementSelector;
            if (highlightElements) {
                ui.highlight(highlightElements, this.quests[questNumber].allowMultipleHighlights ? false : true);
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
            return true;
        }
    }
    exports.default = StarterQuest;
});
//# sourceMappingURL=StarterQuest.js.map
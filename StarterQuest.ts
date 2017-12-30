import Doodads from "doodad/Doodads";
import { Bindable, DamageType, DoodadType, EquipType, equipTypeToMessage, FacingDirection, ItemType, ItemTypeGroup, RecipeLevel, SentenceCaseStyle, SkillType } from "Enums";
import { IContainer, IItem } from "item/IItem";
import { itemDescriptions as Items, RecipeComponent } from "item/Items";
import { Dictionary } from "language/ILanguage";
import { makeString, Message, messages, MessageType } from "language/Messages";
import { ModType } from "mod/IModManager";
import Mod from "mod/Mod";
import { BindCatcherApi, bindingManager } from "newui/BindingManager";
import { IPlayer } from "player/IPlayer";

interface IGlobalSaveData {
	maxQuest: number;
}

interface IQuestSaveData {
	dialogOpen: boolean;
	current: number;
	completion: IQuestCompletion;
}

interface IQuest {
	name: string;
	description: string;
	completion?: IQuestCompletion;
	highlightElementSelector?: string[];
	allowMultipleHighlights?: boolean;
	onStart?(): void;
}

interface IQuestCompletion {
	complete?: boolean;
	items?: IQuestItem[];
	equips?: IQuestEquip[];
	doodads?: IQuestDoodad;
	messages?: IQuestMessage;
}

interface IQuestRequirement {
	complete?: boolean;
	notified?: boolean;
}

interface IQuestItem extends IQuestRequirement {
	types: [ItemType | ItemTypeGroup];
	amount: number;
	craft?: boolean;
}

interface IQuestEquip extends IQuestRequirement {
	type?: ItemType;
	equip: EquipType;
	complete?: boolean;
}

interface IQuestDoodad extends IQuestRequirement {
	types: DoodadType[];
	completionMessage: string;
	doodadPrefix: string;
	doodadActionPrefix: string;
}

interface IQuestMessage extends IQuestRequirement {
	types: Message[];
	description?: string;
}

enum StarterQuestDictionary {
	NameWelcome,
	DescriptionWelcome,
	NameGearUp,
	DescriptionGearUp,
	NameLeftRightHand,
	DescriptionLeftRightHand,
	CompletionDescriptionLeftRightHand,
	NameResourceGathering,
	DescriptionResourceGathering,
	NameCrafting,
	DescriptionCrafting,
	NameDismantling,
	DescriptionDismantling,
	CompletionDescriptionDismantling,
	NameHunting,
	DescriptionHunting,
	NameWoodenPoles,
	DescriptionWoodenPoles,
	NameHandDrill,
	DescriptionHandDrill,
	NameKindlingTinder,
	DescriptionKindlingTinder,
	NameCampfireMaterials,
	DescriptionCampfireMaterials,
	NameCampfireCrafting,
	DescriptionCampfireCrafting,
	NameCampfireBuilding,
	DescriptionCampfireBuilding,
	CompletionDoodadPrefixCampfireBuilding,
	CompletionDoodadActionPrefixCampfireBuilding,
	CompletionDescriptionMessageCampfireBuilding,
	NameFire,
	DescriptionFire,
	CompletionDoodadPrefixFire,
	CompletionDoodadActionPrefixFire,
	CompletionDescriptionMessageFire,
	NameStokingFire,
	DescriptionStokingFire,
	CompletionDescriptionStokingFire,
	NameCookingFire,
	DescriptionCookingFire,
	NameDrinkableWater,
	DescriptionDrinkableWater,
	NameCordage,
	DescriptionCordage,
	NameString,
	DescriptionString,
	NameGrindingMaterials,
	DescriptionGrindingMaterials,
	NameHuntLeather,
	DescriptionHuntLeather,
	NameTannedLeather,
	DescriptionTannedLeather,
	NameWaterskin,
	DescriptionWaterskin,
	NameWaterStillMaterials,
	DescriptionWaterStillMaterials,
	NameWaterStillCrafting,
	DescriptionWaterStillCrafting,
	NameSeawater,
	DescriptionSeawater,
	NameBuildingStill,
	DescriptionBuildingStill,
	CompletionDoodadPrefixBuildingStill,
	CompletionDoodadActionPrefixBuildingStill,
	CompletionDescriptionMessageBuildingStill,
	NameFillingStill,
	DescriptionFillingStill,
	CompletionDescriptionFillingStill,
	NameDesalination,
	DescriptionDesalination,
	CompletionDoodadPrefixDesalination,
	CompletionDoodadActionPrefixDesalination,
	CompletionDescriptionMessageDesalination,
	NameGatherWater,
	DescriptionGatherWater,
	CompletionDescriptionGatherWater,
	NameSurvivalistTraining,
	DescriptionSurvivalistTraining,
	QuestCompleted,
	QuestProgressItemCollected,
	QuestProgressItemEquipped,
	QuestProgressFinished,
	QuestProgressCompleted,
	StarterQuestTitle,
	ButtonObjectives,
	ButtonStartQuest,
	ButtonBack,
	ButtonSkip,
	ButtonClose,
	ButtonCompleteQuest,
	QuestTitle,
	QuestCraft,
	QuestCrafted,
	QuestCollect,
	QuestCollected,
	QuestItem,
	QuestAnItem,
	QuestAnItemLowercase,
	QuestEquip,
	QuestDoodad
}

export default class StarterQuest extends Mod {
	private quests: IQuest[] = [];

	private button: JQuery;
	private dialog: JQuery;
	private container: JQuery;
	private inner: JQuery;
	private containerName: JQuery;
	private containerDescription: JQuery;
	private containerProgress: JQuery;
	private containerCompleteButton: JQuery;
	private containerBackButton: JQuery;
	private containerSkipButton: JQuery;
	private containerCloseButton: JQuery;

	private keyBind: number;
	private data: IQuestSaveData;
	private globalData: IGlobalSaveData;

	private dictionary: number;

	private messageQuestCompleted: number;
	private messageQuestProgressItemCollected: number;
	private messageQuestProgressEquipped: number;
	private messageQuestProgressFinished: number;
	private messageQuestProgressCompleted: number;

	public onInitialize(saveDataGlobal: any): any {
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

	public onLoad(saveData: any): void {
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
				description: makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionWelcome), bindingManager.getBindTranslation(this.keyBind)),
				completion: {
					complete: true
				}
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameGearUp),
				description: makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionGearUp), bindingManager.getBindTranslation(Bindable.DialogEquipment)),
				completion: {
					equips: [
						{
							equip: EquipType.Held
						}
					]
				},
				highlightElementSelector: [
					`#inventory li.group-${ItemTypeGroup.Weapon}:eq(0)`,
					`#inventory li.group-${ItemTypeGroup.Tool}:eq(0)`,
					"#equipment ul:lt(2)"
				],
				allowMultipleHighlights: true
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameLeftRightHand),
				description: makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionLeftRightHand), bindingManager.getBindTranslation(Bindable.GameHandToggleLeft), bindingManager.getBindTranslation(Bindable.GameHandToggleRight)),
				completion: {
					messages: {
						types: [Message.YouHaveEnabledDisabled],
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
							types: [ItemType.Branch],
							amount: 2
						},
						{
							types: [ItemType.LargeRock],
							amount: 2
						}
					]
				}
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameCrafting),
				description: makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionCrafting), bindingManager.getBindTranslation(Bindable.DialogCrafting)),
				completion: {
					items: [
						{
							types: [ItemType.SharpRock],
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					'#buttons img[data-button="Crafting"]',
					`#crafting li[data-item-type="${ItemType.SharpRock}"]`
				],
				allowMultipleHighlights: true
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameDismantling),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionDismantling),
				completion: {
					messages: {
						types: [Message.YouDismantled],
						description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionDismantling)
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.Branch}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.Log}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.LargeRock}"]:eq(0)`
				],
				allowMultipleHighlights: true
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameHunting),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionHunting),
				completion: {
					items: [
						{
							types: [ItemTypeGroup.Sharpened],
							amount: 1
						},
						{
							types: [ItemTypeGroup.RawMeat],
							amount: 1
						}
					]
				},
				highlightElementSelector: [
					`#inventory li.group-${ItemTypeGroup.Sharpened}:eq(0)`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameWoodenPoles),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionWoodenPoles),
				completion: {
					items: [
						{
							types: [ItemType.WoodenPole],
							amount: 2
						}
					]
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.Branch}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.Log}"]:eq(0)`
				],
				allowMultipleHighlights: true
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameHandDrill),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionHandDrill),
				completion: {
					items: [
						{
							types: [ItemType.HandDrill],
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemType.HandDrill}"]`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameKindlingTinder),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionKindlingTinder),
				completion: {
					items: [
						{
							types: [ItemTypeGroup.Tinder],
							amount: 1
						},
						{
							types: [ItemTypeGroup.Kindling],
							amount: 1
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemType.WoodenPole}"]`,
					`#crafting li[data-item-type="${ItemType.Twigs}"]`
				],
				allowMultipleHighlights: true
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameCampfireMaterials),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionCampfireMaterials),
				completion: {
					items: [
						{
							types: [ItemTypeGroup.Rock, ItemType.Sandstone],
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
							types: [ItemType.StoneCampfire, ItemType.SandstoneCampfire],
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemType.StoneCampfire}"]`,
					`#crafting li[data-item-type="${ItemType.SandstoneCampfire}"]`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameCampfireBuilding),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionCampfireBuilding),
				completion: {
					doodads: {
						types: [DoodadType.StoneCampfire, DoodadType.SandstoneCampfire],
						doodadPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadPrefixCampfireBuilding),
						doodadActionPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadActionPrefixCampfireBuilding),
						completionMessage: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionMessageCampfireBuilding)
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.StoneCampfire}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.SandstoneCampfire}"]:eq(0)`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameFire),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionFire),
				completion: {
					doodads: {
						types: [DoodadType.LitStoneCampfire, DoodadType.LitSandstoneCampfire],
						doodadPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadPrefixFire),
						doodadActionPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadActionPrefixFire),
						completionMessage: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionMessageFire)
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.HandDrill}"]:eq(0)`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameStokingFire),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionStokingFire),
				completion: {
					messages: {
						types: [Message.AddedFuelToFire],
						description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionStokingFire)
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.Log}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.Branch}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.WoodenPole}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemTypeGroup.Kindling}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemTypeGroup.Tinder}"]:eq(0)`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameCookingFire),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionCookingFire),
				completion: {
					items: [
						{
							types: [ItemTypeGroup.Skewer],
							amount: 1
						},
						{
							types: [ItemTypeGroup.CookedMeat],
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li.group-${ItemTypeGroup.Skewer}:eq(0)`,
					`#crafting li.group-${ItemTypeGroup.CookedMeat}:eq(0)`
				],
				allowMultipleHighlights: true
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameDrinkableWater),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionDrinkableWater),
				completion: {
					items: [
						{
							types: [ItemTypeGroup.Needle],
							amount: 1
						}
					]
				},
				highlightElementSelector: [
					`#crafting li.group-${ItemTypeGroup.Needle}`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameCordage),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionCordage),
				completion: {
					items: [
						{
							types: [ItemTypeGroup.Cordage],
							amount: 4
						}
					]
				},
				highlightElementSelector: [
					`#inventory li.group-${ItemTypeGroup.Cordage}`,
					`#crafting li.group-${ItemTypeGroup.Cordage}`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameString),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionString),
				completion: {
					items: [
						{
							types: [ItemType.String],
							amount: 2,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemType.String}"]`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameGrindingMaterials),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionGrindingMaterials),
				completion: {
					items: [
						{
							types: [ItemType.StoneMortarAndPestle, ItemType.WoodenMortarAndPestle, ItemType.SandstoneMortarAndPestle],
							amount: 1,
							craft: true
						},
						{
							types: [ItemType.Tannin],
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemTypeGroup.MortarAndPestle}"]`,
					`#crafting li[data-item-type="${ItemType.Tannin}"]`
				],
				allowMultipleHighlights: true
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameHuntLeather),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionHuntLeather),
				completion: {
					items: [
						{
							types: [ItemType.AnimalPelt],
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
							types: [ItemType.TannedLeather],
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemType.TannedLeather}"]`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameWaterskin),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionWaterskin),
				completion: {
					items: [
						{
							types: [ItemType.Waterskin],
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemType.Waterskin}"]`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameWaterStillMaterials),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionWaterStillMaterials),
				completion: {
					items: [
						{
							types: [ItemTypeGroup.Rock, ItemType.Sandstone],
							amount: 2
						},
						{
							types: [ItemTypeGroup.Sharpened],
							amount: 1
						},
						{
							types: [ItemType.String],
							amount: 1
						},
						{
							types: [ItemTypeGroup.Pole],
							amount: 1
						},
						{
							types: [ItemType.Waterskin],
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
							types: [ItemType.StoneWaterStill, ItemType.SandstoneWaterStill],
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemType.StoneWaterStill}"]`,
					`#crafting li[data-item-type="${ItemType.SandstoneWaterStill}"]`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameSeawater),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionSeawater),
				completion: {
					items: [
						{
							types: [ItemTypeGroup.ContainerOfSeawater],
							amount: 1
						}
					]
				},
				highlightElementSelector: [
					`#inventory li.group-${ItemTypeGroup.Container}:eq(0)`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameBuildingStill),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionBuildingStill),
				completion: {
					doodads: {
						types: [DoodadType.StoneWaterStill, DoodadType.SandstoneWaterStill],
						doodadPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadPrefixBuildingStill),
						doodadActionPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadActionPrefixBuildingStill),
						completionMessage: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionMessageBuildingStill)
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.StoneWaterStill}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.SandstoneWaterStill}"]:eq(0)`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameFillingStill),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionFillingStill),
				completion: {
					messages: {
						types: [Message.PouredWaterIntoStill],
						description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionFillingStill)
					}
				},
				highlightElementSelector: [
					`#inventory li.group-${ItemTypeGroup.ContainerOfSeawater}:eq(0)`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameDesalination),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionDesalination),
				completion: {
					doodads: {
						types: [DoodadType.LitStoneWaterStill, DoodadType.LitSandstoneWaterStill],
						doodadPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadPrefixDesalination),
						doodadActionPrefix: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDoodadActionPrefixDesalination),
						completionMessage: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionMessageDesalination)
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.HandDrill}"]`
				]
			},
			{
				name: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.NameGatherWater),
				description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.DescriptionGatherWater),
				completion: {
					messages: {
						types: [Message.FilledFrom],
						description: languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.CompletionDescriptionGatherWater)
					}
				},
				highlightElementSelector: [
					`#inventory li.group-${ItemTypeGroup.Container}:eq(0)`
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

	public onSave(): any {
		return this.data;
	}

	public onUnload(): void {
		this.dialog = undefined;
		this.container = undefined;
		this.removeButton(this.button);
	}

	///////////////////////////////////////////////////
	// Hooks

	public onGameStart(isLoadingSave: boolean, playedCount: number): void {
		if (playedCount === 0) {
			// this is the players first game
			// do work
		}
	}

	public onShowInGameScreen(): void {
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

		// Complete quest
		this.containerCompleteButton = $(`<button style="display: block; width: auto; margin-top: 15px;">${languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.ButtonStartQuest)}</button>`);
		this.containerCompleteButton.click(() => {
			this.onCompleteQuestClick();
		});
		this.inner.append(this.containerCompleteButton);

		// Back button
		this.containerBackButton = $(`<button style="margin-top: 15px; margin-right: 5px;">${languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.ButtonBack)}</button>`);
		this.containerBackButton.click(() => {
			if (this.data.current > 0) {
				this.setQuest(this.data.current - 1);
			}
		});
		this.inner.append(this.containerBackButton);

		// Skip button
		this.containerSkipButton = $(`<button style="margin-top: 15px;">${languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.ButtonSkip)}</button>`);
		this.containerSkipButton.click(() => {
			if (this.data.current < this.quests.length - 1) {
				this.setQuest(this.data.current + 1);
			}
		});
		this.inner.append(this.containerSkipButton);

		// Close button (for last quest)
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

		/*
			// Use this for exporting/spell checking
			for (const starterQuest of this.quests) {
				console.log(starterQuest.name);
				console.log(starterQuest.description);
			}
		*/

		this.updateDialog();
	}

	public onButtonBarClick(button: JQuery) {
		if (button.is(this.button)) {
			ui.toggleDialog(this.dialog);
		}
	}

	public onBindLoop(bindPressed: true | undefined, api: BindCatcherApi): true | undefined {
		if (api.wasPressed(this.keyBind) && !bindPressed) {
			ui.toggleDialog(this.dialog);
			bindPressed = true;
		}

		return bindPressed;
	}

	public onInventoryItemAdd(player: IPlayer, item: IItem, container: IContainer): void {
		this.updateProgress();
	}

	public onInventoryItemRemove(player: IPlayer, item: IItem, container: IContainer): void {
		this.updateProgress();
	}

	public onInventoryItemUpdate(player: IPlayer, item: IItem, container: IContainer): void {
		this.updateProgress();
	}

	public onItemEquip(player: IPlayer, item: IItem, equip: EquipType): void {
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

				if ((!questEquip.type || questEquip.type === item.type) && (questEquip.equip === equip || (questEquip.equip === EquipType.Held && (equip === EquipType.LeftHand || equip === EquipType.RightHand)))) {
					this.data.completion.equips[i].complete = true;
					updateProgress = true;
				}
			}

			if (updateProgress) {
				this.updateProgress();
			}
		}
	}

	public onTurnEnd(player: IPlayer): void {
		if (this.updateQuestDoodads()) {
			this.updateProgress();
		}
	}

	public onMoveDirectionUpdate(player: IPlayer, direction: FacingDirection): void {
		if (this.updateQuestDoodads()) {
			this.updateProgress();
		}
	}

	public onDisplayMessage(message: Message, messageType?: MessageType, ...args: any[]): boolean {
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

	///////////////////////////////////////////////////
	// Quests

	public updateDialog(): void {
		const quest = this.quests[this.data.current];

		this.containerName.html(makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestTitle), quest.name, this.data.current + 1, this.quests.length));
		this.containerDescription.html(quest.description);

		// First quest button is unique
		const questText = this.data.current === 0 ? languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.ButtonStartQuest) : languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.ButtonCompleteQuest);
		this.containerCompleteButton.text(questText);

		if (this.data.current > 0) {
			this.containerBackButton.show();

		} else {
			this.containerBackButton.hide();
		}

		if (this.globalData.maxQuest > this.data.current) {
			this.containerSkipButton.show();

		} else {
			this.containerSkipButton.hide();
		}

		// Last quest close button
		if (this.data.current === this.quests.length) {
			this.containerCloseButton.show();

		} else {
			this.containerCloseButton.hide();
		}

		this.updateProgress();
	}

	public updateProgress(): void {
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
						const questMessageItemName = itemManager.getItemTypeGroupName(questItemTypes, false, SentenceCaseStyle.None);

						const collected = Math.min(isItemGroup ? itemManager.countItemsInContainerByGroup(localPlayer.inventory, questItemTypes as ItemTypeGroup) : itemManager.countItemsInContainer(localPlayer.inventory, questItemTypes as ItemType), questItem.amount);

						if (!this.data.completion.items) {
							this.data.completion.items = [];
						}

						let message = false;

						if (this.data.completion.items[i]) {
							if (this.data.completion.items[i].amount !== collected) {
								this.data.completion.items[i].amount = collected;
								message = true;
							}
							
						} else {
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
							questItemName = makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestCraft), questItemName);
							questType = languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestCrafted);

						} else {
							questItemName = makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestCollect), questItemName);
							questType = languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestCollected);
						}

						itemLine += makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestItem), this.data.completion.items[i].amount, questItem.amount, questItemName);

						if (message && this.data.completion.items[i].amount > 0) {
							ui.displayMessage(localPlayer, this.messageQuestProgressItemCollected, MessageType.Skill, questType, this.data.completion.items[i].amount, questItem.amount, questMessageItemName);
						}

					}

					this.containerProgress.append(`<li style="${style}">${itemLine.slice(0, -4)}</li>`);

				}
			}

			if (questEquips) {
				for (let i = 0; i < questEquips.length; i++) {
					const questEquip = questEquips[i];
					const questItemName = questEquip.type ? Items[questEquip.type].name : languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestAnItem);
					const questMessageItemName = questEquip.type ? Items[questEquip.type].name : languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestAnItemLowercase);

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

					this.containerProgress.append(`<li style="${style}">${makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestEquip), questItemName, messages[equipTypeToMessage[questEquip.equip]])}</li>`);

					if (this.data.completion.equips[i].complete && !this.data.completion.equips[i].notified) {
						this.data.completion.equips[i].notified = true;
						ui.displayMessage(localPlayer, this.messageQuestProgressEquipped, MessageType.Skill, questMessageItemName);
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

					const doodadDesc = Doodads[questDoodadTypes];

					style = this.data.completion.doodads.complete ? "text-decoration: line-through;" : "";

					doodadLine += makeString(languageManager.getTranslationString(this.dictionary, StarterQuestDictionary.QuestDoodad), doodadPrefix, game.getNameFromDescription(doodadDesc, SentenceCaseStyle.Title));

					if (this.data.completion.doodads.complete && !this.data.completion.doodads.notified) {
						this.data.completion.doodads.notified = true;
						ui.displayMessage(localPlayer, this.messageQuestProgressFinished, MessageType.Skill, doodadActionPrefix, doodadCompletionMessage);
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
						type: MessageType.Skill,
						args: [messageName]
					});
				}
			}

		} else {
			this.container.find('[data-id="objectives"]').hide();
		}

		// console.log("quest data", this.data, this.isQuestCompletable());

		if (this.isQuestCompletable()) {

			this.containerCompleteButton.show();

			// If the quest was completable at any given point, give them the point and allow a skip if they go back for example
			if (this.globalData.maxQuest < this.data.current + 1) {
				this.globalData.maxQuest = this.data.current + 1;
			}

		} else {
			this.containerCompleteButton.hide();
		}
	}

	public updateQuestDoodads(): boolean {
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

	public onCompleteQuestClick(): void {
		const quest = this.quests[this.data.current];

		ui.displayMessagePack(localPlayer, {
			message: this.messageQuestCompleted,
			type: MessageType.Skill,
			args: [quest.name]
		});

		this.setQuest(this.data.current + 1);
	}

	public setQuest(questNumber: number): void {
		this.data.current = questNumber;
		this.data.completion = {};

		// Highlight elements if they are available
		const highlightElements = this.quests[questNumber].highlightElementSelector;
		if (highlightElements) {
			ui.highlight(highlightElements, this.quests[questNumber].allowMultipleHighlights ? false : true);
		}

		this.updateDialog();
		this.onQuestChanged();
	}

	public onQuestChanged(): void {
		if (this.globalData.maxQuest < this.data.current) {
			this.globalData.maxQuest = this.data.current;
		}

		const quest = this.quests[this.data.current];

		if (!quest.completion) {
			return;
		}

		const questEquips = quest.completion.equips;

		// backfill some events

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

	public isQuestCompletable(): boolean {
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

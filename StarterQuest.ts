import Doodads from "doodad/Doodads";
import { Bindable, Direction, DoodadType, EquipType, ItemType, ItemTypeGroup, SentenceCaseStyle } from "Enums";
import { IContainer, IItem } from "item/IItem";
import { itemDescriptions as Items } from "item/Items";
import { Message, MessageType } from "language/IMessages";
import messages, { equipTypeToMessage } from "language/Messages";
import Translation from "language/Translation";
import { HookMethod } from "mod/IHookHost";
import Mod from "mod/Mod";
import { BindCatcherApi } from "newui/BindingManager";
import { IPlayer } from "player/IPlayer";
import { IMessage } from "player/IMessageManager";

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
	quickslots?: IQuestQuickslot;
}

interface IQuestRequirement {
	complete?: boolean;
	notified?: boolean;
}

interface IQuestItem extends IQuestRequirement {
	types: Array<ItemType | ItemTypeGroup>;
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

interface IQuestQuickslot extends IQuestRequirement {
	messages: string;
}

enum StarterQuestDictionary {
	NameWelcome,
	DescriptionWelcome,
	NameGearUp,
	DescriptionGearUp,
	NameQuickslots,
	DescriptionQuickslots,
	CompletionDescriptionQuickslots,
	NameResourceGathering,
	DescriptionResourceGathering,
	NameCrafting,
	DescriptionCrafting,
	NameDismantling,
	DescriptionDismantling,
	CompletionDescriptionDismantling,
	NameCreatureTaming,
	DescriptionCreatureTaming,
	CompletionDescriptionCreatureTaming,
	NameLeftRightHand,
	DescriptionLeftRightHand,
	CompletionDescriptionLeftRightHand,
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
	NameExtraStorage,
	DescriptionExtraStorage,
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
	QuestProgressItemQuickslotted,
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

let translation: (entry: StarterQuestDictionary) => Translation;

export default class StarterQuest extends Mod {
	private quests: IQuest[] = [];

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

	private bindable: number;
	private data: IQuestSaveData;
	private globalData: IGlobalSaveData;

	private dictionary: number;

	private messageQuestCompleted: number;
	private messageQuestProgressItemCollected: number;
	private messageQuestProgressEquipped: number;
	private messageQuestProgressQuickslotted: number;
	private messageQuestProgressFinished: number;
	private messageQuestProgressCompleted: number;

	private sourceQuest: number;

	public onInitialize(saveDataGlobal: any): any {
		this.bindable = this.addBindable("Toggle", { key: "KeyJ" });
		this.dictionary = this.addDictionary("StarterQuest", StarterQuestDictionary);
		translation = Translation.bind(undefined, this.dictionary);
		this.sourceQuest = this.addMessageSource("Quest");

		this.globalData = saveDataGlobal;

		if (!this.globalData) {
			this.globalData = {
				maxQuest: 0
			};
		}

		this.addMenuBarButton(
			"Starter Quest",
			{
				bindable: this.bindable,
				tooltip: tooltip => tooltip.addText(text => text
					.setText(new Translation(this.dictionary, StarterQuestDictionary.StarterQuestTitle))),
				onActivate: () => ui.toggleDialog(this.dialog)
			}
		);

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
				name: translation(StarterQuestDictionary.NameCrafting).getString(),
				description: translation(StarterQuestDictionary.DescriptionCrafting).getString(),
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
				name: translation(StarterQuestDictionary.NameDismantling).getString(),
				description: translation(StarterQuestDictionary.DescriptionDismantling).getString(),
				completion: {
					messages: {
						types: [Message.YouDismantled],
						description: translation(StarterQuestDictionary.CompletionDescriptionDismantling).getString()
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
				name: translation(StarterQuestDictionary.NameCreatureTaming).getString(),
				description: translation(StarterQuestDictionary.DescriptionCreatureTaming).getString(),
				completion: {
					messages: {
						types: [Message.YouHaveTamed, Message.TakenFromGroundBecomeTamed, Message.YouOfferedToCreature],
						description: translation(StarterQuestDictionary.CompletionDescriptionCreatureTaming).getString()
					}
				}
			},
			{
				name: translation(StarterQuestDictionary.NameLeftRightHand).getString(),
				description: translation(StarterQuestDictionary.DescriptionLeftRightHand).getString(),
				completion: {
					messages: {
						types: [Message.YouHaveEnabledDisabled],
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
				name: translation(StarterQuestDictionary.NameWoodenPoles).getString(),
				description: translation(StarterQuestDictionary.DescriptionWoodenPoles).getString(),
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
				name: translation(StarterQuestDictionary.NameHandDrill).getString(),
				description: translation(StarterQuestDictionary.DescriptionHandDrill).getString(),
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
				name: translation(StarterQuestDictionary.NameKindlingTinder).getString(),
				description: translation(StarterQuestDictionary.DescriptionKindlingTinder).getString(),
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
				name: translation(StarterQuestDictionary.NameCampfireMaterials).getString(),
				description: translation(StarterQuestDictionary.DescriptionCampfireMaterials).getString(),
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
				name: translation(StarterQuestDictionary.NameCampfireCrafting).getString(),
				description: translation(StarterQuestDictionary.DescriptionCampfireCrafting).getString(),
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
				name: translation(StarterQuestDictionary.NameCampfireBuilding).getString(),
				description: translation(StarterQuestDictionary.DescriptionCampfireBuilding).getString(),
				completion: {
					doodads: {
						types: [DoodadType.StoneCampfire, DoodadType.SandstoneCampfire],
						doodadPrefix: translation(StarterQuestDictionary.CompletionDoodadPrefixCampfireBuilding).getString(),
						doodadActionPrefix: translation(StarterQuestDictionary.CompletionDoodadActionPrefixCampfireBuilding).getString(),
						completionMessage: translation(StarterQuestDictionary.CompletionDescriptionMessageCampfireBuilding).getString()
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.StoneCampfire}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.SandstoneCampfire}"]:eq(0)`
				]
			},
			{
				name: translation(StarterQuestDictionary.NameFire).getString(),
				description: translation(StarterQuestDictionary.DescriptionFire).getString(),
				completion: {
					doodads: {
						types: [DoodadType.LitStoneCampfire, DoodadType.LitSandstoneCampfire],
						doodadPrefix: translation(StarterQuestDictionary.CompletionDoodadPrefixFire).getString(),
						doodadActionPrefix: translation(StarterQuestDictionary.CompletionDoodadActionPrefixFire).getString(),
						completionMessage: translation(StarterQuestDictionary.CompletionDescriptionMessageFire).getString()
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.HandDrill}"]:eq(0)`
				]
			},
			{
				name: translation(StarterQuestDictionary.NameStokingFire).getString(),
				description: translation(StarterQuestDictionary.DescriptionStokingFire).getString(),
				completion: {
					messages: {
						types: [Message.AddedFuelToFire],
						description: translation(StarterQuestDictionary.CompletionDescriptionStokingFire).getString()
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
				name: translation(StarterQuestDictionary.NameCookingFire).getString(),
				description: translation(StarterQuestDictionary.DescriptionCookingFire).getString(),
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
				name: translation(StarterQuestDictionary.NameExtraStorage).getString(),
				description: translation(StarterQuestDictionary.DescriptionExtraStorage).getString(),
				completion: {
					items: [
						{
							types: [ItemType.WoodenChest],
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemType.WoodenChest}"]`,
					`#crafting li[data-item-type="${ItemType.WoodenDowels}"]`,
					`#crafting li[data-item-type="${ItemType.WoodenPole}"]`,
					`#crafting li[data-item-type="${ItemType.Branch}"]`
				]
			},
			{
				name: translation(StarterQuestDictionary.NameDrinkableWater).getString(),
				description: translation(StarterQuestDictionary.DescriptionDrinkableWater).getString(),
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
				name: translation(StarterQuestDictionary.NameCordage).getString(),
				description: translation(StarterQuestDictionary.DescriptionCordage).getString(),
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
				name: translation(StarterQuestDictionary.NameString).getString(),
				description: translation(StarterQuestDictionary.DescriptionString).getString(),
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
				name: translation(StarterQuestDictionary.NameGrindingMaterials).getString(),
				description: translation(StarterQuestDictionary.DescriptionGrindingMaterials).getString(),
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
				name: translation(StarterQuestDictionary.NameHuntLeather).getString(),
				description: translation(StarterQuestDictionary.DescriptionHuntLeather).getString(),
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
				name: translation(StarterQuestDictionary.NameTannedLeather).getString(),
				description: translation(StarterQuestDictionary.DescriptionTannedLeather).getString(),
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
				name: translation(StarterQuestDictionary.NameWaterskin).getString(),
				description: translation(StarterQuestDictionary.DescriptionWaterskin).getString(),
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
				name: translation(StarterQuestDictionary.NameWaterStillMaterials).getString(),
				description: translation(StarterQuestDictionary.DescriptionWaterStillMaterials).getString(),
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
				name: translation(StarterQuestDictionary.NameWaterStillCrafting).getString(),
				description: translation(StarterQuestDictionary.DescriptionWaterStillCrafting).getString(),
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
				name: translation(StarterQuestDictionary.NameSeawater).getString(),
				description: translation(StarterQuestDictionary.DescriptionSeawater).getString(),
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
				name: translation(StarterQuestDictionary.NameBuildingStill).getString(),
				description: translation(StarterQuestDictionary.DescriptionBuildingStill).getString(),
				completion: {
					doodads: {
						types: [DoodadType.StoneWaterStill, DoodadType.SandstoneWaterStill],
						doodadPrefix: translation(StarterQuestDictionary.CompletionDoodadPrefixBuildingStill).getString(),
						doodadActionPrefix: translation(StarterQuestDictionary.CompletionDoodadActionPrefixBuildingStill).getString(),
						completionMessage: translation(StarterQuestDictionary.CompletionDescriptionMessageBuildingStill).getString()
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.StoneWaterStill}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.SandstoneWaterStill}"]:eq(0)`
				]
			},
			{
				name: translation(StarterQuestDictionary.NameFillingStill).getString(),
				description: translation(StarterQuestDictionary.DescriptionFillingStill).getString(),
				completion: {
					messages: {
						types: [Message.PouredWaterIntoStill],
						description: translation(StarterQuestDictionary.CompletionDescriptionFillingStill).getString()
					}
				},
				highlightElementSelector: [
					`#inventory li.group-${ItemTypeGroup.ContainerOfSeawater}:eq(0)`
				]
			},
			{
				name: translation(StarterQuestDictionary.NameDesalination).getString(),
				description: translation(StarterQuestDictionary.DescriptionDesalination).getString(),
				completion: {
					doodads: {
						types: [DoodadType.LitStoneWaterStill, DoodadType.LitSandstoneWaterStill],
						doodadPrefix: translation(StarterQuestDictionary.CompletionDoodadPrefixDesalination).getString(),
						doodadActionPrefix: translation(StarterQuestDictionary.CompletionDoodadActionPrefixDesalination).getString(),
						completionMessage: translation(StarterQuestDictionary.CompletionDescriptionMessageDesalination).getString()
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.HandDrill}"]`
				]
			},
			{
				name: translation(StarterQuestDictionary.NameGatherWater).getString(),
				description: translation(StarterQuestDictionary.DescriptionGatherWater).getString(),
				completion: {
					messages: {
						types: [Message.FilledFrom],
						description: translation(StarterQuestDictionary.CompletionDescriptionGatherWater).getString()
					}
				},
				highlightElementSelector: [
					`#inventory li.group-${ItemTypeGroup.Container}:eq(0)`
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

	public onSave(): any {
		return this.data;
	}

	public onUnload(): void {
		this.dialog = undefined;
		this.container = undefined;
	}

	///////////////////////////////////////////////////
	// Hooks

	@HookMethod
	public onGameStart(isLoadingSave: boolean, playedCount: number): void {
		if (playedCount === 0) {
			// this is the players first game
			// do work
		}
	}

	@HookMethod
	public onGameScreenVisible(): void {
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

		// Complete quest
		this.containerCompleteButton = $(`<button style="display: block; width: auto; margin-top: 15px;">${translation(StarterQuestDictionary.ButtonStartQuest).getString()}</button>`);
		this.containerCompleteButton.click(() => {
			this.onCompleteQuestClick();
		});
		this.inner.append(this.containerCompleteButton);

		// Back button
		this.containerBackButton = $(`<button style="margin-top: 15px; margin-right: 5px;">${translation(StarterQuestDictionary.ButtonBack).getString()}</button>`);
		this.containerBackButton.click(() => {
			if (this.data.current > 0) {
				this.setQuest(this.data.current - 1);
			}
		});
		this.inner.append(this.containerBackButton);

		// Skip button
		this.containerSkipButton = $(`<button style="margin-top: 15px;">${translation(StarterQuestDictionary.ButtonSkip).getString()}</button>`);
		this.containerSkipButton.click(() => {
			if (this.data.current < this.quests.length - 1) {
				this.setQuest(this.data.current + 1);
			}
		});
		this.inner.append(this.containerSkipButton);

		// Close button (for last quest)
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

		/*
			// Use this for exporting/spell checking
			for (const starterQuest of this.quests) {
				console.log(starterQuest.name);
				console.log(starterQuest.description);
			}
		*/

		this.updateDialog();
	}

	@HookMethod
	public onBindLoop(bindPressed: Bindable, api: BindCatcherApi): Bindable {
		if (api.wasPressed(this.bindable) && !bindPressed) {
			ui.toggleDialog(this.dialog);
			bindPressed = this.bindable;
		}

		return bindPressed;
	}

	@HookMethod
	public onInventoryItemAdd(player: IPlayer, item: IItem, container: IContainer): void {
		this.updateProgress();
	}

	@HookMethod
	public onInventoryItemRemove(player: IPlayer, item: IItem, container: IContainer): void {
		this.updateProgress();
	}

	@HookMethod
	public onInventoryItemUpdate(player: IPlayer, item: IItem, container: IContainer): void {
		this.updateProgress();
	}

	@HookMethod
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

	@HookMethod
	public onTurnEnd(player: IPlayer): void {
		if (this.updateQuestDoodads()) {
			this.updateProgress();
		}
	}

	@HookMethod
	public onMoveDirectionUpdate(player: IPlayer, direction: Direction): void {
		if (this.updateQuestDoodads()) {
			this.updateProgress();
		}
	}

	@HookMethod
	public shouldDisplayMessage(player: IPlayer, _1: IMessage, message: number): boolean | undefined {
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

	@HookMethod
	public onItemQuickslot(item: IItem, player: IPlayer, quickSlot: number | undefined): void {
		this.updateQuickslot();
	}

	///////////////////////////////////////////////////
	// Quests

	public updateDialog(): void {
		const quest = this.quests[this.data.current];

		this.containerName.html(translation(StarterQuestDictionary.QuestTitle).getString(quest.name, this.data.current + 1, this.quests.length));
		this.containerDescription.html(quest.description);

		// First quest button is unique
		const questText = this.data.current === 0 ? translation(StarterQuestDictionary.ButtonStartQuest).getString() : translation(StarterQuestDictionary.ButtonCompleteQuest).getString();
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
						if (questItem.craft) {
							questItemName = translation(StarterQuestDictionary.QuestCraft).getString(questItemName);
							questType = translation(StarterQuestDictionary.QuestCrafted).getString();

						} else {
							questItemName = translation(StarterQuestDictionary.QuestCollect).getString(questItemName);
							questType = translation(StarterQuestDictionary.QuestCollected).getString();
						}

						itemLine += translation(StarterQuestDictionary.QuestItem).getString(this.data.completion.items[i].amount, questItem.amount, questItemName);

						if (message && this.data.completion.items[i].amount > 0) {
							localPlayer.messages.source(this.sourceQuest)
								.type(MessageType.Skill)
								.send(this.messageQuestProgressItemCollected,
									questType,
									this.data.completion.items[i].amount,
									questItem.amount,
									questMessageItemName);
						}

					}

					this.containerProgress.append(`<li style="${style}">${itemLine.slice(0, -3)}</li>`);

				}
			}

			if (questEquips) {
				for (let i = 0; i < questEquips.length; i++) {
					const questEquip = questEquips[i];
					const questItemName = questEquip.type ? Items[questEquip.type].name : translation(StarterQuestDictionary.QuestAnItem).getString();
					const questMessageItemName = questEquip.type ? Items[questEquip.type].name : translation(StarterQuestDictionary.QuestAnItemLowercase).getString();

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

					this.containerProgress.append(`<li style="${style}">${translation(StarterQuestDictionary.QuestEquip).getString(questItemName, messages[equipTypeToMessage[questEquip.equip]])}</li>`);

					if (this.data.completion.equips[i].complete && !this.data.completion.equips[i].notified) {
						this.data.completion.equips[i].notified = true;
						localPlayer.messages.source(this.sourceQuest)
							.type(MessageType.Skill)
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

					const doodadDesc = Doodads[questDoodadTypes];

					style = this.data.completion.doodads.complete ? "text-decoration: line-through;" : "";

					doodadLine += translation(StarterQuestDictionary.QuestDoodad).getString(doodadPrefix, game.getNameFromDescription(doodadDesc, SentenceCaseStyle.Title));

					if (this.data.completion.doodads.complete && !this.data.completion.doodads.notified) {
						this.data.completion.doodads.notified = true;
						localPlayer.messages.source(this.sourceQuest)
							.type(MessageType.Skill)
							.send(this.messageQuestProgressFinished,
								doodadActionPrefix, doodadCompletionMessage);
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
						.type(MessageType.Skill)
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
						.type(MessageType.Skill)
						.send(this.messageQuestProgressQuickslotted, MessageType.Skill);
				}

				this.containerProgress.append(`<li style="${style}">${quickslotLine}</li>`);
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

	public onCompleteQuestClick(): void {
		const quest = this.quests[this.data.current];

		localPlayer.messages.source(this.sourceQuest)
			.type(MessageType.Skill)
			.send(this.messageQuestCompleted, quest.name);

		this.setQuest(this.data.current + 1);
	}

	public setQuest(questNumber: number): void {
		this.data.current = questNumber;
		this.data.completion = {};

		// Highlight elements if they are available
		const highlightElements = this.quests[questNumber].highlightElementSelector;
		if (highlightElements) {
			if (this.quests[questNumber].allowMultipleHighlights) {
				ui.highlight(undefined, ...highlightElements);

			} else {
				ui.highlightUnique(undefined, ...highlightElements);
			}
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

		if (ui.getUsedQuickSlots().length !== 0) {
			this.updateQuickslot();
		}
	}

	public updateQuickslot() {
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

		if (completion.quickslots) {
			if (!completion.quickslots.complete) {
				return false;
			}
		}

		return true;
	}
}

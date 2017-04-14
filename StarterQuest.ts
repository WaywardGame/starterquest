import Doodads from "doodad/Doodads";
import { DamageType, DoodadType, EquipType, equipTypeToMessage, FacingDirection, ItemType, ItemTypeGroup, KeyBind, RecipeLevel, SentenceCaseStyle, SkillType } from "Enums";
import { IContainer, IItem } from "item/IItem";
import { itemDescriptions as Items, RecipeComponent } from "item/Items";
import { Message, messages, MessageType } from "language/Messages";
import { ModType } from "mod/IModManager";
import Mod from "mod/Mod";

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
	onStart?: () => void;
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
	type: ItemType | ItemTypeGroup;
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
	doodadPrefix: string;
	doodadActionPrefix: string;
}

interface IQuestMessage extends IQuestRequirement {
	types: Message[];
	description?: string;
}

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

	private keyBind: number;
	private data: IQuestSaveData;
	private globalData: IGlobalSaveData;

	private messageQuestCompleted: number;
	private messageQuestProgressItemCollected: number;
	private messageQuestProgressEquipped: number;
	private messageQuestProgressFinished: number;
	private messageQuestProgressCompleted: number;

	public onInitialize(saveDataGlobal: any): any {
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

		this.keyBind = this.addKeyBind(this.getName(), 74);

		this.quests = [
			{
				name: "Welcome",
				description: `If you're new to Wayward, this <em>Starter Quest</em> can help you survive this harsh world by teaching you some of the mechanics of the game. This walkthrough will take approximately 15-45 minutes and is completely optional.<br /><br />Press <em>${ui.getStringForKeyBind(this.keyBind)}</em> to re-open or close this window. If you don't want help right now, simply close this window. Otherwise, click "<em>Start Quest</em>" to start your first quest.`,
				completion: {
					complete: true
				}
			},
			{
				name: "Gear Up",
				description: `Walking around bare-handed can lead to trouble. Equip yourself with a tool or weapon. You can open your equipment window by pressing <em>${ui.getStringForKeyBind(KeyBind.Equipment)}</em> or by clicking the equipment icon at the top of your screen. Left clicking an item in your inventory will bring up that item's menu; allowing you to equip from there if it can be equipped or to perform the item's various tasks.<br /><br />Hovering over items in your inventory will give you more information on them. Alternatively, you can drag an item with "<em>Equip: Held</em>" in its description from your inventory into either the left or right hand in your equipment window.`,
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
					`#equipment ul:lt(2)`
				],
				allowMultipleHighlights: true
			},
			{
				name: "Resource Gathering",
				description: "Now that you have something equipped, you can try gathering some resources.<br /><br />There are different environments in Wayward; some harsher than others. If you are in a desert, you may have to venture north/north-east to find different resources. You may even have to venture across large bodies of water. Find a lush green forest or dead bushes to gather the branches. Find large rocks on the ground (in piles), or by gathering them from a gray-colored mountain side.",
				completion: {
					items: [
						{
							type: ItemType.Branch,
							amount: 2
						},
						{
							type: ItemType.LargeRock,
							amount: 2
						}
					]
				}
			},
			{
				name: "Doodads",
				description: `Doodads are considered objects attached to the ground like plants, piles of rocks, mushrooms, campfires, and more. There's a few ways to collect them. The easiest way to do this is to use the "<em>Actions</em>" menu, which you can bring up with <em>${ui.getStringForKeyBind(KeyBind.Actions)}</em>. If you are facing the object (not under you), you will get the "<em>Collect Object with Hands</em>" option in your actions menu.`,
				completion: {
					messages: {
						types: [Message.YouCollected],
						description: "Collect An Object"
					}
				},
				highlightElementSelector: [
					`#buttons img[data-button="Actions"]`
				]
			},
			{
				name: "Crafting",
				description: `To survive, you will need to craft new items from the resources you gather. Press <em>${ui.getStringForKeyBind(KeyBind.Crafting)}</em> to open the crafting window. It will show you what you can make from the items in your inventory. Start by making a sharp rock which is used in many crafting recipes. Not every attempt to craft an item is successful, and the chance of success depends on the skill level of the item against your crafting skills.<br /><br />If your crafting menu is too small, you can adjust it in size and position by dragging it around or dragging the corners to resize.`,
				completion: {
					items: [
						{
							type: ItemType.SharpRock,
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#buttons img[data-button="Crafting"]`,
					`#crafting li[data-item-type="${ItemType.SharpRock}"]`
				],
				allowMultipleHighlights: true
			},
			{
				name: "Dismantling",
				description: `Not all items are crafted, some are dismantled from other items. A branch for example can be dismantled into twigs, leaves, stripped bark, and a wooden pole; a wealth of resources.<br /><br />Dismantling items can be done through the crafting menu by clicking on the "<em>Dismantle</em>" tab. You will see a listing of items that can be dismantled. Hovering over each will show what they will be dismantled into. Alternatively, you can dismantle items from clicking on them in your inventory and selecting "<em>Dismantle</em>".`,
				completion: {
					messages: {
						types: [Message.YouDismantled],
						description: "Dismantle An Item"
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
				name: "Hunting",
				description: `With crafting knowledge under your belt, it's time to learn another important survival lesson: Hunting! Find a creature with meat and slay it. You can carve its corpse after dealing the final blow, using a "<em>Sharpened</em>" item while facing it by using "<em>Carve</em>" from the item's menu. You can also quickslot it and use a hotkey to quickly carve. Creatures with some form of raw meat include giant rats, spiders, chickens, rabbits, and more.`,
				completion: {
					items: [
						{
							type: ItemTypeGroup.Sharpened,
							amount: 1
						},
						{
							type: ItemTypeGroup.RawMeat,
							amount: 1
						}
					]
				},
				highlightElementSelector: [
					`#inventory li.group-${ItemTypeGroup.Sharpened}:eq(0)`
				]
			},
			{
				name: "Wooden Poles",
				description: `You will need to start a fire to cook the raw meat if you want to eat it safely. Your first order of business is to gather the materials used to create your fire-making device. Dismantle enough branches or logs to get a least two "<em>Wooden Poles</em>".`,
				completion: {
					items: [
						{
							type: ItemType.WoodenPole,
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
				name: "Hand Drill",
				description: `At this point, you will have unlocked a new crafting recipe called "<em>Hand Drill</em>", a primitive and easy-to-craft device that makes fire. You unlock new crafting recipes by having one of each required items in your inventory. Go ahead and craft it!`,
				completion: {
					items: [
						{
							type: ItemType.HandDrill,
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
				name: "Fire Starter Materials",
				description: `The final items needed to start a fire are "<em>Wooden Shavings</em>" (or any other tinder item) and "<em>Kindling</em>". Gather the resources needed to craft both. Logs can come from gathering a tree completely (or finding one with no leaves).`,
				completion: {
					items: [
						{
							type: ItemType.Twigs,
							amount: 2
						},
						{
							type: ItemType.TreeBark,
							amount: 1
						},
						{
							type: ItemType.Log,
							amount: 1
						}
					]
				}
			},
			{
				name: "Kindling & Tinder",
				description: "With the resources from the previous quest, you should now have what you need to craft some wooden shavings and kindling.",
				completion: {
					items: [
						{
							type: ItemType.WoodenShavings,
							amount: 1,
							craft: true
						},
						{
							type: ItemType.Kindling,
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemType.WoodenShavings}"]`,
					`#crafting li[data-item-type="${ItemType.Kindling}"]`
				],
				allowMultipleHighlights: true
			},
			{
				name: "Campfire Materials",
				description: `You could technically start a fire at this moment. But to make a proper, enclosed fire-source, you'll want to make a "<em>Stone Campfire</em>". You'll need quite a few rocks for this endeavor.`,
				completion: {
					items: [
						{
							type: ItemTypeGroup.Rock,
							amount: 5
						}
					]
				}
			},
			{
				name: "Campfire Crafting",
				description: "With all the rocks from the last quest, you will now be able to craft a campfire.",
				completion: {
					items: [
						{
							type: ItemType.StoneCampfire,
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemType.StoneCampfire}"]`
				]
			},
			{
				name: "Campfire Building",
				description: `With some items, you will be able to build them, and temporarily affix them to the world. These objects that are attached/placed on tiles, are called "<em>Doodads</em>". Clicking on the campfire in your inventory, you will give you the option to "<em>Build</em>" it. Do so now, facing a valid tile.`,
				completion: {
					doodads: {
						types: [DoodadType.StoneCampfire, DoodadType.LitStoneCampfire],
						doodadPrefix: "Place",
						doodadActionPrefix: "placed"
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.StoneCampfire}"]:eq(0)`
				]
			},
			{
				name: "Fire!",
				description: `With your hand drill, select the "<em>Start Fire</em>" option from the item's menu while facing the campfire. Doing so will create a fire contained inside of it. You don't always get lucky when making a fire at low Camping skill. It's possible that you may need to re-gather and craft some more wooden shavings (or any other tinder item, such as, leaves, animal fur, or grass blades) and kindling if you fail too many times.<br /><br />Be careful not to step in your fire!`,
				completion: {
					doodads: {
						types: [DoodadType.LitStoneCampfire],
						doodadPrefix: "Start",
						doodadActionPrefix: "started"
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.HandDrill}"]:eq(0)`
				]
			},
			{
				name: "Stoking Fire",
				description: `Your fire could probably use more fuel as well. To add fuel to a fire, click an item and choose the "<em>Stoke Fire</em>" action. This action is available on many items, including logs, branches, and more.<br /><br />You can check the status of the fire by hovering your mouse over it. If you have world tool-tips disabled, you can also check the status by right clicking on it or by using the "<em>Inspect</em>" action from the actions menu while facing it.`,
				completion: {
					messages: {
						types: [Message.AddedFuelToFire],
						description: "Stoke Fire"
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.Log}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.Branch}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.Leaves}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.PalmLeaf}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.Twigs}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.TreeBark}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.Kindling}"]:eq(0)`,
					`#inventory li[data-item-type="${ItemType.WoodenShavings}"]:eq(0)`
				]
			},
			{
				name: "Cooking with Fire",
				description: "Now that you have a proper fire going, you can cook the meat! The craft recipe will be unlocked for the cooked form of this meat. You can even eat it after you are done if you are hungry, or save it for later.",
				completion: {
					items: [
						{
							type: ItemTypeGroup.Skewer,
							amount: 1
						},
						{
							type: ItemTypeGroup.CookedMeat,
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
				name: "Drinkable Water",
				description: `Are you a bit parched? Time to think about water desalination for turning seawater into drinkable, clean water. First, you'll need to make a "<em>Waterskin</em>" to hold this water. Collect a needle by either finding cactus needles (carving a cactus) or by progressively sharpening down bones via crafting (bone to bone pole, to sharpened bone, to bone needle). You can also dismantle bone fragments into bone needles directly.<br /><br />Note that desalination is an advanced technique and may not be needed if you have found fresh water sources. Fresh water can be gathered and purified from the craft menu directly.`,
				completion: {
					items: [
						{
							type: ItemTypeGroup.Needle,
							amount: 1
						}
					]
				},
				highlightElementSelector: [
					`#crafting li.group-${ItemTypeGroup.Needle}`
				]
			},
			{
				name: "Cordage",
				description: `A very common resource for making many items in Wayward is "<em>String</em>". By combining two items that are considered "<em>Cordage</em>", you can craft string. The cordage group is very diverse and includes things such as stripped bark (dismantled from branches), plant roots, seaweed, and many more. See if you can find four of them.`,
				completion: {
					items: [
						{
							type: ItemTypeGroup.Cordage,
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
				name: "String",
				description: "With string and the needle, you'll be able to sew the waterskin together. Combine the four cordage items together to create the string.",
				completion: {
					items: [
						{
							type: ItemType.String,
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
				name: "Smooth Rocks",
				description: "Smooth rocks can either be found naturally from mining rock, or from using a combination of a sharpened rock and a large rock to smooth it out via the crafting window. With the two smooth rocks, you'll be able to craft a grinding device.",
				completion: {
					items: [
						{
							type: ItemType.SmoothRock,
							amount: 2,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemType.SmoothRock}"]`
				]
			},
			{
				name: "Grinding Materials",
				description: "You're going to need some material for that waterskin. The perfect material is tanned leather. You'll need to make something to grind your tannin with. Two smooth rocks should do the trick. After you craft the mortar and pestle, you can grind down tree bark into tannin. This special powder can tan the leather for the waterskin.",
				completion: {
					items: [
						{
							type: ItemType.MortarAndPestle,
							amount: 1,
							craft: true
						},
						{
							type: ItemType.Tannin,
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemType.MortarAndPestle}"]`,
					`#crafting li[data-item-type="${ItemType.Tannin}"]`
				],
				allowMultipleHighlights: true
			},
			{
				name: "Hunt for Leather",
				description: "Venture forth and find a creature with a pelt. Creatures with pelts include giant rats, rabbits, grey wolves, and bears. Be very careful with the latter two - you may have to improve your combat skills or craft armor if these prove too much for you. Never be afraid to run from a losing battle. Carve its corpse to get the animal pelt.",
				completion: {
					items: [
						{
							type: ItemType.AnimalPelt,
							amount: 1
						}
					]
				}
			},
			{
				name: "Tanned Leather",
				description: `With the animal pelt from the creature, you can now tan it with the tannin. Simply dismantle the pelt to remove the fur and gain the cleaned leather hide. After the dismantle, craft "<em>Tanned Leather</em>" from the crafting window.`,
				completion: {
					items: [
						{
							type: ItemType.TannedLeather,
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
				name: "Waterskin",
				description: "You finally have everything you need to sew and fabricate the waterskin. Craft it with the tanned leather, strings, and a needle.",
				completion: {
					items: [
						{
							type: ItemType.Waterskin,
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
				name: "Stone Water Still Materials",
				description: `Making the container was the hard part. You should now have most things you need to create a still for desalinating water. One last hurdle remains. Gather and collect the following resources to be able to craft a "<em>Stone Water Still</em>".`,
				completion: {
					items: [
						{
							type: ItemTypeGroup.Rock,
							amount: 2
						},
						{
							type: ItemTypeGroup.Sharpened,
							amount: 1
						},
						{
							type: ItemType.String,
							amount: 1
						},
						{
							type: ItemTypeGroup.Pole,
							amount: 1
						},
						{
							type: ItemType.Waterskin,
							amount: 1
						}
					]
				}
			},
			{
				name: "Stone Water Still Crafting",
				description: "After gathering all those resources, you can go ahead and craft the stone water still. You'll use this device to pour the seawater into, boil and steam-drip the desalinated water into the container.",
				completion: {
					items: [
						{
							type: ItemType.StoneWaterStill,
							amount: 1,
							craft: true
						}
					]
				},
				highlightElementSelector: [
					`#crafting li[data-item-type="${ItemType.StoneWaterStill}"]`
				]
			},
			{
				name: "Seawater",
				description: `To test out your new water still, grab some water from the ocean. With another empty container in your inventory, choose the "<em>Gather Water</em>" option while facing the ocean with your container.`,
				completion: {
					items: [
						{
							type: ItemTypeGroup.ContainerOfSeawater,
							amount: 1
						}
					]
				},
				highlightElementSelector: [
					`#inventory li.group-${ItemTypeGroup.Container}:eq(0)`
				]
			},
			{
				name: "Building the Still",
				description: `Just like with the campfire previously, you'll be able to "<em>Build</em>" the stone water still facing a valid tile from the item's menu. Do so now.`,
				completion: {
					doodads: {
						types: [DoodadType.StoneWaterStill, DoodadType.LitStoneWaterStill],
						doodadPrefix: "Place",
						doodadActionPrefix: "placed"
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.StoneWaterStill}"]:eq(0)`
				]
			},
			{
				name: "Filling the Still",
				description: `While still facing the stone water still, choose the "<em>Pour</em>" option from your container of seawater's item menu. This will pour the liquid into the water still.`,
				completion: {
					messages: {
						types: [Message.PouredWaterIntoStill],
						description: "Pour Water Into Still"
					}
				},
				highlightElementSelector: [
					`#inventory li.group-${ItemTypeGroup.ContainerOfSeawater}:eq(0)`
				]
			},
			{
				name: "Desalination",
				description: "You'll need to light the stone water still on fire so the water can begin to boil and steam. Which means you'll need to find or craft more tinder and kindling. Hopefully you still have durability on your hand drill as well. If not, you'll need to craft another one. After it's on fire, you'll have to wait until the fire goes out before you can collect the water.",
				completion: {
					doodads: {
						types: [DoodadType.LitStoneWaterStill],
						doodadPrefix: "Start",
						doodadActionPrefix: "started"
					}
				},
				highlightElementSelector: [
					`#inventory li[data-item-type="${ItemType.HandDrill}"]`
				]
			},
			{
				name: "Drinkable Water",
				description: `Choose the "<em>Gather Water</em>" option from your now empty container while facing the unlit stone water still. You will gather the fresh, desalinated water. Ready to drink as desired. You will only need to complete a process such as this for drinking sea or ocean water.`,
				completion: {
					messages: {
						types: [Message.FilledFrom],
						description: "Gather Water"
					}
				},
				highlightElementSelector: [
					`#inventory li.group-${ItemTypeGroup.Container}:eq(0)`
				]
			},
			{
				name: "Survivalist in Training",
				description: "That's it! You should now have some basic knowledge on how to survive in Wayward. With enough learning and skill, you'll eventually be able to thrive and prosper.<br /><br />Treasure, you remember something about treasure..."
			}
		];

		this.messageQuestCompleted = this.addMessage("QuestCompleted", `You have completed the "_0_" quest.`);
		this.messageQuestProgressItemCollected = this.addMessage("QuestProgressItemCollected", "You have _0_ _1_/_2_ _3_.");
		this.messageQuestProgressEquipped = this.addMessage("QuestProgressItemEquipped", "You have equipped _0_.");
		this.messageQuestProgressFinished = this.addMessage("QuestProgressFinished", "You have _0_ _1_.");
		this.messageQuestProgressCompleted = this.addMessage("QuestProgressCompleted", `You have completed the "_0_" objective.`);

		this.createButton(this.getName(), this.getPath() + "/images/starterquest.png", "Starter Quest", this.keyBind);
	}

	public onSave(): any {
		return this.data;
	}

	public onUnload(): void {
		this.dialog = undefined;
		this.container = undefined;
		this.removeButton(this.getName());
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
		this.inner = $(`<div class="inner"></div>`);
		this.container.append(this.inner);

		this.containerName = $(`<div style="font-size: 16px; line-height: 16px;"></div>`);
		this.inner.append(this.containerName);

		this.containerDescription = $(`<p style="margin-top: 5px;"></p>`);
		this.inner.append(this.containerDescription);
		this.inner.append("<br />");

		this.inner.append(`<div style="font-size: 16px; margin-top: 15px;" data-id="objectives">Objectives</div>`);

		this.containerProgress = $(`<ul style="margin-top: 5px; list-style: none;" data-id="objectives"></ul>`);
		this.inner.append(this.containerProgress);

		// Complete quest
		this.containerCompleteButton = $(`<button style="display: block; width: auto; margin-top: 15px;">Start Quest</button>`);
		this.containerCompleteButton.click(() => {
			this.onCompleteQuestClick();
		});
		this.inner.append(this.containerCompleteButton);

		// Back button
		this.containerBackButton = $(`<button style="margin-top: 15px; margin-right: 5px;">Back</button>`);
		this.containerBackButton.click(() => {
			if (this.data.current > 0) {
				this.setQuest(this.data.current - 1);
			}
		});
		this.inner.append(this.containerBackButton);

		// Skip button
		this.containerSkipButton = $(`<button style="margin-top: 15px;">Skip</button>`);
		this.containerSkipButton.click(() => {
			if (this.data.current < this.quests.length - 1) {
				this.setQuest(this.data.current + 1);
			}
		});
		this.inner.append(this.containerSkipButton);

		// Close button (for last quest)
		this.containerCloseButton = $(`<button style="margin-top: 15px;">Close</button>`);
		this.containerCloseButton.click(() => {
			$(this.container).dialog("close");
		});
		this.inner.append(this.containerCloseButton);

		this.dialog = this.createDialog(this.container, {
			id: this.getName(),
			title: "Starter Quest",
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

	public onButtonBarClick(buttonName: string) {
		switch (buttonName) {
			case this.getName():
				ui.toggleDialog(this.dialog);
		}
	}

	public onKeyBindPress(keyBind: number): boolean {
		switch (keyBind) {
			case this.keyBind:
				ui.toggleDialog(this.dialog);
				return false;
		}
		return undefined;
	}

	public onInventoryItemAdd(item: IItem, container: IContainer): void {
		this.updateProgress();
	}

	public onInventoryItemRemove(item: IItem, container: IContainer): void {
		this.updateProgress();
	}

	public onInventoryItemUpdate(item: IItem, container: IContainer): void {
		this.updateProgress();
	}

	public onItemEquip(item: IItem, equip: EquipType): void {
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

	public onTurnComplete(): void {
		if (this.updateQuestDoodads()) {
			this.updateProgress();
		}
	}

	public onMoveDirectionUpdate(direction: FacingDirection): void {
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

		this.containerName.html(`${quest.name} (${this.data.current + 1}/${this.quests.length})`);
		this.containerDescription.html(quest.description);

		// First quest button is unique
		const questText = this.data.current === 0 ? "Start Quest" : "Complete Quest";
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
			this.container.find(`[data-id="objectives"]`).show();

			if (questItems) {
				for (let i = 0; i < questItems.length; i++) {
					const questItem = questItems[i];

					const isItemGroup = itemManager.isItemTypeGroup(questItem.type);
					let questItemName = itemManager.getItemTypeGroupName(questItem.type, false);

					const collected = Math.min(isItemGroup ? itemManager.countItemsInContainerByGroup(localPlayer.inventory, questItem.type as ItemTypeGroup) : itemManager.countItemsInContainer(localPlayer.inventory, questItem.type as ItemType), questItem.amount);

					if (!this.data.completion.items) {
						this.data.completion.items = [];
					}

					let message = false;
					let style = "";

					if (this.data.completion.items[i]) {
						if (this.data.completion.items[i].amount !== collected) {
							this.data.completion.items[i].amount = collected;
							message = true;
						}
					} else {
						this.data.completion.items[i] = {
							type: questItem.type,
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
						questItemName = "Craft " + questItemName;
						questType = "Crafted ";
					} else {
						questItemName = "Collect " + questItemName;
						questType = "Collected ";
					}

					this.containerProgress.append(`<li style="${style}">${this.data.completion.items[i].amount}/${questItem.amount} ${questItemName}</li>`);

					if (message && this.data.completion.items[i].amount > 0) {
						ui.displayMessage(localPlayer, this.messageQuestProgressItemCollected, MessageType.Skill, questType, this.data.completion.items[i].amount, questItem.amount, itemName);
					}
				}
			}

			if (questEquips) {
				for (let i = 0; i < questEquips.length; i++) {
					const questEquip = questEquips[i];
					const questItemName = questEquip.type ? Items[questEquip.type].name : "An Item";

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

					this.containerProgress.append(`<li style="${style}">Equip ${questItemName} In ${messages[equipTypeToMessage[questEquip.equip]]}</li>`);

					if (this.data.completion.equips[i].complete && !this.data.completion.equips[i].notified) {
						this.data.completion.equips[i].notified = true;
						ui.displayMessage(localPlayer, this.messageQuestProgressEquipped, MessageType.Skill, questItemName);
					}
				}
			}

			if (questDoodads) {
				this.updateQuestDoodads();

				const doodadPrefix = questDoodads.doodadPrefix;
				const doodadActionPrefix = questDoodads.doodadActionPrefix;
				const doodadDesc = Doodads[questDoodads.types[0]];

				const style = this.data.completion.doodads.complete ? "text-decoration: line-through;" : "";

				this.containerProgress.append(`<li style="${style}">${doodadPrefix} ${game.getNameFromDescription(doodadDesc, SentenceCaseStyle.Title)}</li>`);

				if (this.data.completion.doodads.complete && !this.data.completion.doodads.notified) {
					this.data.completion.doodads.notified = true;
					ui.displayMessage(localPlayer, this.messageQuestProgressFinished, MessageType.Skill, doodadActionPrefix, game.getNameFromDescription(doodadDesc, SentenceCaseStyle.Sentence));
				}
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
						args: [messageName],
						argSkipCasing: true
					});
				}
			}
		} else {
			this.container.find(`[data-id="objectives"]`).hide();
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
				doodadActionPrefix: quest.completion.doodads.doodadActionPrefix
			};
		}

		if (!this.data.completion.doodads.complete) {
			const tile = game.getTileInFrontOfPlayer(localPlayer);
			if (tile.doodadId !== undefined) {
				const doodad = game.doodads[tile.doodadId];
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
			args: [quest.name],
			argSkipCasing: true
		});

		this.setQuest(this.data.current + 1);
	}

	public setQuest(questNumber: number): void {
		this.data.current = questNumber;
		this.data.completion = {};

		// Highlight elements if they are available
		const highlightElements = this.quests[questNumber].highlightElementSelector;
		if (highlightElements) {
			ui.highlight(highlightElements, this.quests[questNumber].allowMultipleHighlights ? true : false);
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
					this.onItemEquip(item, item.getEquipSlot());
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

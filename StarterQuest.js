define(["require", "exports", "doodad/Doodads", "Enums", "item/Items", "language/Messages", "mod/Mod", "newui/BindingManager"], function (require, exports, Doodads_1, Enums_1, Items_1, Messages_1, Mod_1, BindingManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StarterQuestDictionary;
    (function (StarterQuestDictionary) {
    })(StarterQuestDictionary || (StarterQuestDictionary = {}));
    class StarterQuest extends Mod_1.default {
        constructor() {
            super(...arguments);
            this.quests = [];
        }
        onInitialize(saveDataGlobal) {
            this.keyBind = this.addBindable("Toggle", { key: "KeyJ" });
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
            const english = languageManager.getLanguage("English");
            this.addDictionary("starterQuest", StarterQuestDictionary);
            this.quests = [
                {
                    name: "Welcome",
                    description: `If you're new to Wayward, this <em>Starter Quest</em> can help you survive this harsh world by teaching you some of the mechanics of the game. This walkthrough will take approximately 15-45 minutes and is completely optional.<br /><br />Press <em>${BindingManager_1.bindingManager.getBindTranslation(this.keyBind)}</em> to re-open or close this window. If you don't want help right now, simply close this window. Otherwise, click "<em>Start Quest</em>" to start your first quest.`,
                    completion: {
                        complete: true
                    }
                },
                {
                    name: "Gear Up",
                    description: `Walking around bare-handed can lead to trouble. Equip yourself with a tool or weapon. You can open your equipment window by pressing <em>${BindingManager_1.bindingManager.getBindTranslation(Enums_1.Bindable.DialogEquipment)}</em> or by clicking the equipment icon at the top of your screen. Right clicking an item in your inventory will bring up that item's menu; allowing you to equip from there if it can be equipped or to perform the item's various tasks.<br /><br />Hovering over items in your inventory will give you more information on them. Alternatively, you can drag an item with "<em>Equip: Held</em>" in its description from your inventory into either the left or right hand in your equipment window.`,
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
                    name: "Left/Right Hand Use",
                    description: `By default, you will use both hands to automatically gather and attack. You can enable and disable each hand. This is useful when you only want to use a certain tool for gathering or weapon for attacking. This can also prevent injury to your bare hands. You can toggle your hands using the select boxes on the bottom of the equipment menu (or through the use of the <em>${BindingManager_1.bindingManager.getBindTranslation(Enums_1.Bindable.GameHandToggleLeft)}</em> and <em>${BindingManager_1.bindingManager.getBindTranslation(Enums_1.Bindable.GameHandToggleRight)}</em> keybinds.`,
                    completion: {
                        messages: {
                            types: [Messages_1.Message.YouHaveEnabledDisabled],
                            description: "Toggle Hands"
                        }
                    },
                    highlightElementSelector: [
                        '#equipment .checkbox-option[data-checkbox-id="LeftHand"]',
                        '#equipment .checkbox-option[data-checkbox-id="RightHand"]'
                    ],
                    allowMultipleHighlights: true
                },
                {
                    name: "Resource Gathering",
                    description: "Now that you have something equipped and selected, you can try gathering some resources.<br /><br />There are different environments in Wayward; some harsher than others. If you are in a desert, you may have to venture north/north-east to find different resources. You may even have to venture across large bodies of water. Find a lush green forest or dead bushes to gather the branches. Find large rocks on the ground (in piles), or by gathering them from a gray-colored mountain side.",
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
                    name: "Crafting",
                    description: `To survive, you will need to craft new items from the resources you gather. Press <em>${BindingManager_1.bindingManager.getBindTranslation(Enums_1.Bindable.DialogCrafting)}</em> to open the crafting window. It will show you what you can make from the items in your inventory. Start by making a sharp rock which is used in many crafting recipes. Not every attempt to craft an item is successful, and the chance of success depends on the skill level of the item against your crafting skills.<br /><br />If your crafting menu is too small, you can adjust it in size and position by dragging it around or dragging the corners to resize.`,
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
                    name: "Dismantling",
                    description: 'Not all items are crafted, some are dismantled from other items. A branch for example can be dismantled into twigs, leaves, stripped bark, and a wooden pole; a wealth of resources.<br /><br />Dismantling items can be done through the crafting menu by clicking on the "<em>Dismantle</em>" tab. You will see a listing of items that can be dismantled. Hovering over each will show what they will be dismantled into. Alternatively, you can dismantle items from right clicking on them in your inventory and selecting "<em>Dismantle</em>".',
                    completion: {
                        messages: {
                            types: [Messages_1.Message.YouDismantled],
                            description: "Dismantle An Item"
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
                    name: "Hunting",
                    description: `With crafting knowledge under your belt, it's time to learn another important survival lesson: Hunting! Find a creature with meat and slay it. You can carve its corpse after dealing the final blow, using a "<em>Sharpened</em>" item while facing it by using "<em>Carve</em>" from the item's menu. You can also quickslot it and use a hotkey to quickly carve. Creatures with some form of raw meat include giant rats, spiders, chickens, rabbits, and more.`,
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
                    name: "Wooden Poles",
                    description: 'You will need to start a fire to cook the raw meat if you want to eat it safely. Your first order of business is to gather the materials used to create your fire-making device. Dismantle enough branches or logs to get a least two "<em>Wooden Poles</em>".',
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
                    name: "Hand Drill",
                    description: 'At this point, you will have unlocked a new crafting recipe called "<em>Hand Drill</em>", a primitive and easy-to-craft device that makes fire. You unlock new crafting recipes by having one of each required items in your inventory. Go ahead and craft it!',
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
                    name: "Kindling & Tinder",
                    description: "The final items needed to start a fire are kindling and tinder. Many items are considered kindling, such as twigs, tree bark and wooden dowels (dismantled from wooden poles). Many items are also considered tinder, such as wooden shavings (dismantled from twigs or wooden dowels), animal fur, leaves and more.<br /><br />Craft, dismantle, or find kindling and tinder!",
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
                    name: "Campfire Materials",
                    description: `You could technically start a fire at this moment. But to make a proper, enclosed fire-source, you'll want to make either a "<em>Stone Campfire</em>" or "<em>Sandstone Campfire</em>". You'll need quite a few rocks or sandstone for this endeavor.`,
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
                    name: "Campfire Crafting",
                    description: "With all the rocks or sandstone from the last quest, you will now be able to craft a campfire.",
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
                    name: "Campfire Building",
                    description: 'With some items, you will be able to build them, and temporarily affix them to the world. These objects that are attached/placed on tiles, are called "<em>Doodads</em>". Right clicking on the campfire in your inventory, you will give you the option to "<em>Build</em>" it. Do so now, facing a valid tile.',
                    completion: {
                        doodads: {
                            types: [Enums_1.DoodadType.StoneCampfire, Enums_1.DoodadType.SandstoneCampfire],
                            doodadPrefix: "Build",
                            doodadActionPrefix: "built",
                            completionMessage: "a campfire"
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.StoneCampfire}"]:eq(0)`,
                        `#inventory li[data-item-type="${Enums_1.ItemType.SandstoneCampfire}"]:eq(0)`
                    ]
                },
                {
                    name: "Fire!",
                    description: `With your hand drill, select the "<em>Start Fire</em>" option from the item's menu while facing the campfire. Doing so will create a fire contained inside of it. You don't always get lucky when making a fire at low Camping skill. It's possible that you may need to re-gather and craft some more wooden shavings (or any other tinder item, such as, leaves, animal fur, or grass blades) and kindling if you fail too many times.<br /><br />Be careful not to step in your fire!`,
                    completion: {
                        doodads: {
                            types: [Enums_1.DoodadType.LitStoneCampfire, Enums_1.DoodadType.LitSandstoneCampfire],
                            doodadPrefix: "Start",
                            doodadActionPrefix: "started",
                            completionMessage: "a campfire"
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.HandDrill}"]:eq(0)`
                    ]
                },
                {
                    name: "Stoking Fire",
                    description: 'Your fire could probably use more fuel as well. To add fuel to a fire, right click an item and choose the "<em>Stoke Fire</em>" action. This action is available on many items, including logs, branches, and more.<br /><br />You can check the status of the fire by hovering your mouse over it. If you have world tool-tips disabled, you can also check the status by shift + right clicking it.',
                    completion: {
                        messages: {
                            types: [Messages_1.Message.AddedFuelToFire],
                            description: "Stoke Fire"
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
                    name: "Cooking with Fire",
                    description: "Now that you have a proper fire going, you can cook the meat! The craft recipe will be unlocked for the cooked form of this meat. You can even eat it after you are done if you are hungry, or save it for later.<br /><br />A skewer is an item grouping that contains a wide variety of items including branches, wooden poles, spears, and more!",
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
                    name: "Drinkable Water",
                    description: `Are you a bit parched? Time to think about water desalination for turning seawater into drinkable, clean water. First, you'll need to make a "<em>Waterskin</em>" to hold this water. Collect a needle by either finding cactus needles (carving a cactus) or by progressively sharpening down bones via crafting (bone to bone pole, to sharpened bone, to bone needle). You can also dismantle bone fragments into bone needles directly.<br /><br />Note that desalination is an advanced technique and may not be needed if you have found fresh water sources. Fresh water can be gathered and purified from the craft menu directly.`,
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
                    name: "Cordage",
                    description: 'A very common resource for making many items in Wayward is "<em>String</em>". By combining two items that are considered "<em>Cordage</em>", you can craft string. The cordage group is very diverse and includes things such as stripped bark (dismantled from branches), plant roots, seaweed, and many more. See if you can find four of them.',
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
                    name: "String",
                    description: "With string and the needle, you'll be able to sew the waterskin together. Combine the four cordage items together to create the string.",
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
                    name: "Grinding Materials",
                    description: "You're going to need some material for that waterskin. The perfect material is tanned leather. You'll need to make something to grind your tannin with. Mortar and pestles can be crafted with smooth rocks, logs, or even sandstone. After you craft the mortar and pestle, you can grind down tree bark into tannin. This special powder can tan the leather for the waterskin.",
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
                    name: "Hunt for Leather",
                    description: "Venture forth and find a creature with a pelt. Creatures with pelts include giant rats, rabbits, grey wolves, and bears. Be very careful with the latter two - you may have to improve your combat skills or craft armor if these prove too much for you. Never be afraid to run from a losing battle. Carve its corpse to get the animal pelt.",
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
                    name: "Tanned Leather",
                    description: 'With the animal pelt from the creature, you can now tan it with the tannin. Simply dismantle the pelt to remove the fur and gain the cleaned leather hide. After the dismantle, craft "<em>Tanned Leather</em>" from the crafting window.',
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
                    name: "Waterskin",
                    description: "You finally have everything you need to sew and fabricate the waterskin. Craft it with the tanned leather, strings, and a needle.",
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
                    name: "Water Still Materials",
                    description: 'Making the container was the hard part. You should now have most things you need to create a still for desalinating water. One last hurdle remains. Gather and collect the following resources to be able to craft a "<em>Stone Water Still</em>" or "<em>Sandstone Water Still</em>".',
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
                    name: "Water Still Crafting",
                    description: "After gathering all those resources, you can go ahead and craft the water still. You'll use this device to pour the seawater into, boil and steam-drip the desalinated water into the container.",
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
                    name: "Seawater",
                    description: 'To test out your new water still, grab some water from the ocean. With another empty container in your inventory, choose the "<em>Gather Water</em>" option while facing the ocean with your container.',
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
                    name: "Building the Still",
                    description: `Just like with the campfire previously, you'll be able to "<em>Build</em>" the water still facing a valid tile from the item's menu. Do so now.`,
                    completion: {
                        doodads: {
                            types: [Enums_1.DoodadType.StoneWaterStill, Enums_1.DoodadType.SandstoneWaterStill],
                            doodadPrefix: "Build",
                            doodadActionPrefix: "built",
                            completionMessage: "a water still"
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.StoneWaterStill}"]:eq(0)`,
                        `#inventory li[data-item-type="${Enums_1.ItemType.SandstoneWaterStill}"]:eq(0)`
                    ]
                },
                {
                    name: "Filling the Still",
                    description: `While still facing the water still, choose the "<em>Pour</em>" option from your container of seawater's item menu. This will pour the liquid into the water still.`,
                    completion: {
                        messages: {
                            types: [Messages_1.Message.PouredWaterIntoStill],
                            description: "Pour Water Into Still"
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li.group-${Enums_1.ItemTypeGroup.ContainerOfSeawater}:eq(0)`
                    ]
                },
                {
                    name: "Desalination",
                    description: "You'll need to light the water still on fire so the water can begin to boil and steam. Which means you'll need to find or craft more tinder and kindling. Hopefully you still have durability on your hand drill as well. If not, you'll need to craft another one. After it's on fire, you'll have to wait until the fire goes out before you can collect the water.",
                    completion: {
                        doodads: {
                            types: [Enums_1.DoodadType.LitStoneWaterStill, Enums_1.DoodadType.LitSandstoneWaterStill],
                            doodadPrefix: "Start",
                            doodadActionPrefix: "started",
                            completionMessage: "a water still"
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li[data-item-type="${Enums_1.ItemType.HandDrill}"]`
                    ]
                },
                {
                    name: "Drinkable Water",
                    description: 'Choose the "<em>Gather Water</em>" option from your now empty container while facing the unlit water still. You will gather the fresh, desalinated water. Ready to drink as desired. You will only need to complete a process such as this for drinking sea or ocean water.',
                    completion: {
                        messages: {
                            types: [Messages_1.Message.FilledFrom],
                            description: "Gather Water"
                        }
                    },
                    highlightElementSelector: [
                        `#inventory li.group-${Enums_1.ItemTypeGroup.Container}:eq(0)`
                    ]
                },
                {
                    name: "Survivalist in Training",
                    description: "That's it! You should now have some basic knowledge on how to survive in Wayward. With enough learning and skill, you'll eventually be able to thrive and prosper.<br /><br />Treasure, you remember something about treasure..."
                }
            ];
            this.messageQuestCompleted = this.addMessage("QuestCompleted", 'You have completed the "_0_" quest.');
            this.messageQuestProgressItemCollected = this.addMessage("QuestProgressItemCollected", "You have _0_ _1_/_2_ _3_.");
            this.messageQuestProgressEquipped = this.addMessage("QuestProgressItemEquipped", "You have equipped _0_.");
            this.messageQuestProgressFinished = this.addMessage("QuestProgressFinished", "You have _0_ _1_.");
            this.messageQuestProgressCompleted = this.addMessage("QuestProgressCompleted", 'You have completed the "_0_" objective.');
            this.button = this.createButton("Starter Quest", `${this.getPath()}/images/starterquest.png`, this.keyBind);
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
            this.inner.append('<div style="font-size: 16px; margin-top: 15px;" data-id="objectives">Objectives</div>');
            this.containerProgress = $('<ul style="margin-top: 5px; list-style: none;" data-id="objectives"></ul>');
            this.inner.append(this.containerProgress);
            this.containerCompleteButton = $('<button style="display: block; width: auto; margin-top: 15px;">Start Quest</button>');
            this.containerCompleteButton.click(() => {
                this.onCompleteQuestClick();
            });
            this.inner.append(this.containerCompleteButton);
            this.containerBackButton = $('<button style="margin-top: 15px; margin-right: 5px;">Back</button>');
            this.containerBackButton.click(() => {
                if (this.data.current > 0) {
                    this.setQuest(this.data.current - 1);
                }
            });
            this.inner.append(this.containerBackButton);
            this.containerSkipButton = $('<button style="margin-top: 15px;">Skip</button>');
            this.containerSkipButton.click(() => {
                if (this.data.current < this.quests.length - 1) {
                    this.setQuest(this.data.current + 1);
                }
            });
            this.inner.append(this.containerSkipButton);
            this.containerCloseButton = $('<button style="margin-top: 15px;">Close</button>');
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
            this.containerName.html(`${quest.name} (${this.data.current + 1}/${this.quests.length})`);
            this.containerDescription.html(quest.description);
            const questText = this.data.current === 0 ? "Start Quest" : "Complete Quest";
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
                                questItemName = `Craft ${questItemName}`;
                                questType = "crafted ";
                            }
                            else {
                                questItemName = `Collect ${questItemName}`;
                                questType = "collected ";
                            }
                            itemLine += `${this.data.completion.items[i].amount}/${questItem.amount} ${questItemName} Or `;
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
                        const questItemName = questEquip.type ? Items_1.itemDescriptions[questEquip.type].name : "An Item";
                        const questMessageItemName = questEquip.type ? Items_1.itemDescriptions[questEquip.type].name : "an item";
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
                        this.containerProgress.append(`<li style="${style}">Equip ${questItemName} In ${Messages_1.messages[Enums_1.equipTypeToMessage[questEquip.equip]]}</li>`);
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
                        doodadLine += `${doodadPrefix} ${game.getNameFromDescription(doodadDesc, Enums_1.SentenceCaseStyle.Title)} Or `;
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
import { Bindable, Direction, EquipType } from "Enums";
import { IContainer, IItem } from "item/IItem";
import { Dictionary } from "language/ILanguage";
import { Message } from "language/IMessages";
import Mod from "mod/Mod";
import { BindCatcherApi } from "newui/BindingManager";
import { MenuBarButtonType } from "newui/screen/screens/game/static/menubar/MenuBarButtonDescriptions";
import { IMessage, Source } from "player/IMessageManager";
import { IPlayer } from "player/IPlayer";
export default class StarterQuest extends Mod {
    static readonly INSTANCE: StarterQuest;
    readonly bindable: Bindable;
    readonly dictionary: Dictionary;
    readonly messageQuestCompleted: Message;
    readonly messageQuestProgressItemCollected: Message;
    readonly messageQuestProgressEquipped: Message;
    readonly messageQuestProgressQuickslotted: Message;
    readonly messageQuestProgressFinished: Message;
    readonly messageQuestProgressCompleted: Message;
    readonly sourceQuest: Source;
    readonly menuBarButton: MenuBarButtonType;
    private quests;
    private dialog;
    private container;
    private inner;
    private containerName;
    private containerDescription;
    private containerProgress;
    private containerCompleteButton;
    private containerBackButton;
    private containerSkipButton;
    private containerCloseButton;
    private data;
    private globalData;
    onInitialize(saveDataGlobal: any): any;
    onLoad(saveData: any): void;
    onSave(): any;
    onUnload(): void;
    onGameStart(isLoadingSave: boolean, playedCount: number): void;
    onGameScreenVisible(): void;
    onBindLoop(bindPressed: Bindable, api: BindCatcherApi): Bindable;
    onInventoryItemAdd(player: IPlayer, item: IItem, container: IContainer): void;
    onInventoryItemRemove(player: IPlayer, item: IItem, container: IContainer): void;
    onInventoryItemUpdate(player: IPlayer, item: IItem, container: IContainer): void;
    onItemEquip(player: IPlayer, item: IItem, equip: EquipType): void;
    onTurnEnd(player: IPlayer): void;
    onMoveDirectionUpdate(player: IPlayer, direction: Direction): void;
    shouldDisplayMessage(player: IPlayer, _1: IMessage, message: number): boolean | undefined;
    onItemQuickslot(item: IItem, player: IPlayer, quickSlot: number | undefined): void;
    updateDialog(): void;
    updateProgress(): void;
    updateQuestDoodads(): boolean;
    onCompleteQuestClick(): void;
    setQuest(questNumber: number): void;
    onQuestChanged(): void;
    updateQuickslot(): void;
    isQuestCompletable(): boolean;
}
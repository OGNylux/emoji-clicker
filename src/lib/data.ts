import { unlockedClicker, unlockedPassiveItems } from "./store";


interface Item {
    name: string;
    description: string;
    component?: string;
    image: {
        src: string;
        alt: string;
    };
    initialCost: number;
    max: number;
}

/**
 * This class is the base class for all items in the shop.
 * It contains the basic properties and methods that are needed for all items.
 * extend this class to create a new item only when you need custom behavior.
 */
abstract class StoreItem {
    // contains the amount of items the player currently has
    protected amount: number = 0;
    upgradeAmount: number = 0;
    // contains the name of the item
    readonly name: string = "";
    // contains the description of the item
    readonly description: string = "";
    // contains the component name of the item that is used for animated emojis
    readonly component?: string;
    // contains the image of the item with alt text and src path
    image: {
        src: string;
        alt: string;
    };
    // contains the initial cost of the item
    initialCost: number;
    // contains the maximum amount the player can have of this item
    readonly max: number;


    constructor(item: Item) {
        this.name = item.name;
        this.description = item.description;
        this.image = item.image;
        this.initialCost = item.initialCost;
        this.max = item.max;
        this.component = item.component;
    }

    abstract nextCost(count: number): number;
    abstract nextUpgradeCost(): number;
    abstract nextSell(count: number): number;
    /**
     * This function returns the influence of the item.
     * The influence is the value that the item has on the game.
     * e.g. the clicker item has an influence of 1, because it increases the amount of emojis per click by 1.
     */
    abstract getInfluence(): number;

    addItem(amount: number = 1) {
        if (this.amount + amount > this.max) return; // fix needed
        this.amount = this.amount + amount;
        unlockedPassiveItems.update(this);
    }

    /**
     * Remove (sell) a given amount of items
     * If you want to remove more items than there are left, the function will not remove any items
     */
    removeItem(amount: number) {
        if (this.amount - amount < 0) this.amount = 0;
        this.amount = this.amount - amount;
        unlockedPassiveItems.update(this);
    }

    getAmount() {
        return this.amount;
    }

    checkAddAmount(count: number) {
        return this.amount + count <= this.max;
    }

    checkRemoveAmount(count: number) {
        return this.amount - count >= 0;
    }

    addUpgrade(amount: number = 1) {
        this.upgradeAmount = this.upgradeAmount + amount;
        unlockedPassiveItems.update(this);
    }
}

class ClickerItem extends StoreItem {
    multiplier: number;
    costMultiplier: number;
    upgradeAmount: number = 0;
    initialUpgradeCost: number;
    upgradeCostMultiplier: number;

    constructor() {
        super({
            name: "Emoji Upgrade",
            description: "Increses the amount of emojis per click",
            image: { src: "emojis/heart.svg", alt: "clicker emoji" },
            initialCost: 30,
            max: Infinity
        });
        this.multiplier = 1;
        this.costMultiplier = 1.2;
        this.initialUpgradeCost = 30;
        this.upgradeCostMultiplier = 1.2;
    }

    nextCost(count: number) {
        if (this.amount == 0 && count == 1) return this.initialCost;
        if (count == 1) return Math.floor(this.initialCost * this.costMultiplier ** (this.amount + count - 1));
        let tmp = 0;
        for (let i = 0; i < count; i++) {
            tmp += Math.floor(this.initialCost * this.costMultiplier ** (this.amount + i));
        }
        return tmp;
    }

    nextUpgradeCost() {
        if (this.upgradeAmount == 0) return this.initialUpgradeCost;
        return Math.floor(this.initialUpgradeCost * this.upgradeCostMultiplier ** this.upgradeAmount);
    }

    nextSell(count: number): number {
        let tmp = 0;
        for (let i = 0; i < count; i++) {
            if (this.amount - i <= 0) break;
            tmp += Math.floor((this.initialCost * this.costMultiplier ** (this.amount - i))*0.3);
        }
        return tmp;
    }

    getInfluence(): number {
        return this.amount * this.multiplier * (2 ** this.upgradeAmount);
    }

    addItem(amount: number = 1) {
        this.amount = this.amount + amount;
        unlockedClicker.update(this);
    }

    // sell a given amount of items
    removeItem(amount: number) {
        if (this.amount - amount < 0) this.amount = 0;
        else this.amount = this.amount - amount;
        unlockedClicker.update(this);
    }

    addUpgrade(amount: number = 1) {
        this.upgradeAmount = this.upgradeAmount + amount;
        unlockedClicker.update(this);
    }

    setImage(src: string, alt: string) {
        this.image.src = src;
        this.image.alt = alt;
    }
}

class PassiveIncomeItem extends StoreItem {
    incomeMultiplier: number;
    costMultiplier: number;
    upgradeAmount: number = 0;
    initialUpgradeCost: number;
    upgradeCostMultiplier: number;
    component: string;

    constructor(item: Item, incomeMultiplier: number, costMultiplier: number, component: string) {
        super(item);
        this.incomeMultiplier = incomeMultiplier;
        this.costMultiplier = costMultiplier;
        this.component = component;
        this.initialUpgradeCost = 30;
        this.upgradeCostMultiplier = 1.2;
    }

    getInfluence(): number {
        return this.amount * this.incomeMultiplier * (2 ** this.upgradeAmount);
    }

    nextCost(count: number) {
        if (this.amount == 0 && count == 1) return this.initialCost;
        if (count == 1) return Math.floor(this.initialCost * this.costMultiplier ** (this.amount + count - 1));
        let tmp = 0;
        for (let i = 0; i < count; i++) {
            tmp += Math.floor(this.initialCost * this.costMultiplier ** (this.amount + i));
        }
        return tmp;
    }

    nextUpgradeCost() {
        if (this.upgradeAmount == 0) return this.initialUpgradeCost;
        return Math.floor(this.initialUpgradeCost * this.upgradeCostMultiplier ** this.upgradeAmount);
    }

    nextSell(count: number): number {
        let tmp = 0;
        for (let i = 0; i < count; i++) {
            if (this.amount - i <= 0) break;
            tmp += Math.floor((this.initialCost * this.costMultiplier ** (this.amount - i))*0.3);
        }
        return tmp;
    }

    addUpgrade(amount: number = 1) {
        this.upgradeAmount = this.upgradeAmount + amount;
        unlockedPassiveItems.update(this);
    }
}

class ExpensivePassiveIncomeItem extends StoreItem {
    costArray: number[];
    incomeArray: number[];

    constructor(item: Item, costArray: number[], incomeArray: number[]) {
        super(item);
        this.costArray = costArray;
        this.incomeArray = incomeArray;
    }

    nextCost(count: number): number {
        if (this.amount + count > this.costArray.length) return Infinity;
        if (this.amount == 0) return this.costArray[0];
        return this.costArray[this.amount + count - 1];
    }
    nextUpgradeCost() {
        return 2
    }
    nextSell(count: number): number {
        return this.costArray[this.amount - count];
    }
    

    getInfluence(): number {
        console.log(this.amount);
        console.log(this.incomeArray[this.amount]);
        return this.incomeArray[this.amount];
    }

}

// values are directly defined in the class here
class EasyExpensivePassiveIncomeItem extends StoreItem {
    costArray: number[] = [300, 500, 1000, 2000, 5000];
    incomeArray: number[] = [0, 6, 12, 30, 33, 96];
    constructor() {
        super({ name: "easy", description: "easy", image: { src: "emojis/hot.svg", alt: "hot face" }, initialCost: 300, max: 5, component: "HotEmoji"});
    }

    nextCost(count: number): number {
        if (this.amount + count > this.costArray.length) return Infinity;
        if (this.amount == 0) return this.costArray[0];
        return this.costArray[this.amount + count - 1];
    }
    
    nextUpgradeCost() {
        return 2
    }

    nextSell(count: number): number {
        return this.costArray[this.amount - count];
    }

    getInfluence(): number {
        return this.incomeArray[this.amount];
    }
}

class FarmItem {
    protected amount: number = 0;
    planted: number = 0;
    readonly name: string;
    readonly description: string;
    readonly value: number;
    // how long it takes the FarmItem to grow in ms
    growthTime: number;
    image: {
        src: string;
        alt: string;
    };

    constructor(name: string, description: string, value: number, growthTime: number, image: { src: string, alt: string }) {
        this.name = name;
        this.description = description;
        this.value = value;
        this.growthTime = growthTime;
        this.image = image;
    }

    plant() {
        if (this.planted + 1 > this.amount) return;

        this.planted += 1;
    }

    harvest() {
        if (this.planted - 1 < 0) return;

        this.planted -= 1;
    }

    getAmount() {
        return this.amount;
    }
}

/**
 * StoreItem Definitions
 */
let nerd = new PassiveIncomeItem({
    name: "Nerd Face",
    description: "your mother",
    image: { src: "emojis/nerd.svg", alt: "nerd face" },
    initialCost: 10,
    max: Infinity
}, 1, 1.2, "NerdEmoji");

let blushed = new PassiveIncomeItem({
    name: "blushed face",
    description: "blushed face",
    image: { src: "emojis/blushed.svg", alt: "blushed face" },
    initialCost: 100,
    max: Infinity
}, 3, 1.4, "BlushedEmoji");

let easyHot = new EasyExpensivePassiveIncomeItem();

let costArray = [300, 500, 1000, 2000, 5000];
let incomeArray = [0, 6, 12, 30, 33, 96];
let expensiveHot = new ExpensivePassiveIncomeItem(
    {
        name: "expensive hot face",
        description: "hot face",
        image: {
            src: "emojis/hot.svg",
            alt: "hot face"
        }, initialCost: Infinity, max: costArray.length
    }, costArray, incomeArray);


/**
 * FarmItems Definitions
 */
let peach = new FarmItem("Peach", "A juicy peach", 5, 10000, { src: "emojis/peach.svg", alt: "peach" });


/**
 * This array contains the scores needed to level up.
 * The first element is the score needed to reach level 1.
 * If the player reaches a level that is not in the array it is calculated.
 */
export const levelScores = [2000, 5000, 10000, 50000];

/**
 * This object contains the rewards for each level up.
 * The key is the level and the value is an array of StoreItems that get unlocked at that level.
 * The key t0 is he initial rewards starting items.
 * Note that you can also skip levels, e.g. level 2 has no rewards, but level 3 and 1 has.
 */
export const levelUpRewards: Record<number, Array<StoreItem | FarmItem>> = {
    0: [nerd, blushed],
    1: [easyHot],
    3: [peach]
}

export { StoreItem, ClickerItem, PassiveIncomeItem, EasyExpensivePassiveIncomeItem, ExpensivePassiveIncomeItem, FarmItem };
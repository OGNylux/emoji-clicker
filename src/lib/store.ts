import { writable, get, readable } from "svelte/store";
import { ClickerItem, FarmItem, StoreItem } from "$lib/data";


// enable server communication and certain features
export const isClassic = writable(true);

function userFunc() {
    const store = writable<string | null>(null);
    const { subscribe, set, update } = store;
    return {
        subscribe,
        login: (value: string | null) => set(value),
        update: (value: string | null) => update(_=>value),
        get: () => get(store),
        logout: () => set(null)
    };
}
export const user = userFunc();

function clickerStoreFunc() {
    const store = writable(new ClickerItem());
    const { subscribe, set, update } = store;
    return {
        subscribe,
        update: (item: ClickerItem) => update(_=>item),
        get: () => get(store),
        reset: () => set(new ClickerItem()),
    };
}
export const unlockedClicker = clickerStoreFunc();

function passiveStoreItems() {
    const store = writable<StoreItem[]>([]);
    const { subscribe, set, update } = store;
    return {
        subscribe,
        update: (item: StoreItem) => update(n => n.map(i => i.name == item.name ? item : i)), // if the item is already in the store, update it, otherwise add it
        add: (item: StoreItem) => update(n => [...n, item]),
        contains: (item: StoreItem) => get(store).some(x => x.name == item.name),
        get: () => get(store),
        reset: () => set([]),
    };
}
export const unlockedPassiveItems = passiveStoreItems();

function unlockedFarmItemsFunc() {
    const store = writable<FarmItem[]>([]);
    const { subscribe, set, update } = store;
    return {
        subscribe,
        update: (item: FarmItem) => update(n => n.map(i => i.name == item.name ? item : i)), // if the item is already in the store, update it, otherwise add it
        add: (item: FarmItem) => update(n => [...n, item]),
        contains: (item: FarmItem) => get(store).some(x => x.name == item.name),
        get: () => get(store),
        reset: () => set([]),
    };
}
export const unlockedFarmItems = unlockedFarmItemsFunc();

function cropStore() {
    const { subscribe, set, update } = writable(0);
    return {
        subscribe,
        increment: (incrementValue: number) => update(n => n + incrementValue),
        decrement: (decrementValue: number) => update(n => n - decrementValue),
        set: (value: number) => set(value),
        get: () => get(crops),
        reset: () => set(0)
    };
}
export const crops = cropStore();

function emojiStore () {
    const store = writable(0);
    const { subscribe, set, update } = store;
    return {
        subscribe,
        increment: (incrementValue: number) => update(n => n + incrementValue),
        decrement: (decrementValue: number) => update(n => n - decrementValue),
        get: () => get(store),
        set: (value: number) => set(value),
        reset: () => set(0)
    };
}
export const emojis = emojiStore();

function scoreStore() {
    const { subscribe, set, update } = writable(0);
    return {
        subscribe,
        increment: (incrementValue: number) => update(n => n + incrementValue),
        decrement: (decrementValue: number) => update(n => n - decrementValue),
        set: (value: number) => set(value),
        get: () => get(score),
        reset: () => set(0)
    };
}
export const score = scoreStore(); 


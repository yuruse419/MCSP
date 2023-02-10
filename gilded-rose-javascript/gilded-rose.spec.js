import { expect, describe, it } from "vitest";
import { Conjured, TAFKAL80ETC, Sulfuras, AgedBrie, Item, items, updateQuality } from "./gilded-rose.js";

describe("updateQuality", () => {
  it("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new Item("basic", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });
});

// - Once the `sellIn` days is less then zero, `quality` degrades twice as fast.
describe("reduceQualityTwiceAsFast", () => {
  it("reduces quality twice as fast when sellIn is less than 0", () => {
    const testItem = new Item("basic", -1, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(1);
    expect(testItem.sellIn).toBe(-2);
  });
});

// - The `quality` of an item is never negative.
describe("neverNegativeQuality", () => {
  it("quality is never negative", () => {
    const testItem = new Item("basic", -1, 0);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(-2);
  });
});

// - "Aged Brie" actually increases in `quality` the older it gets.
describe("agedBrieIncreaseQuality", () => {
  it("increase quality of Aged Brie as it ages", () => {
    const testItem = new AgedBrie('_', 1, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(4);
    expect(testItem.sellIn).toBe(0);
  });
});

// - The `quality` of an item is never more than `50`.
describe("limitQuality", () => {
  it("quality is never greater than 50", () => {
    const testItem = new AgedBrie('_', 1, 50);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(50);
    expect(testItem.sellIn).toBe(0);
  });
});

// - "Sulfuras, Hand of Ragnaros," being a legendary item, never has to be sold nor does it decrease in `quality`.
describe("RagnarosFixedQuality", () => {
  it("quality and sellIn never decrease", () => {
    const testItem = new Sulfuras();
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(80);
    expect(testItem.sellIn).toBe(0);
  });
});

// - "Backstage passes to a TAFKAL80ETC concert", increase in `quality` as it's `sellIn` value decreases:
//   - `quality` increases by `2` when there are `10` days or less left before the concert.
describe("concertQualityIncrease10OrLessDays", () => {
  it("quality increases by 2 when there are 10 or less days", () => {
    const testItem = new TAFKAL80ETC('_', 10, 10);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(12);
    expect(testItem.sellIn).toBe(9);
  });
});

//   - `quality` increases by `3` when there are `5` days or less left before the concert.
describe("concertQualityIncrease5OrLessDays", () => {
  it("quality increases by 3 when there are 5 or less days", () => {
    const testItem = new TAFKAL80ETC('_', 5, 10);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(13);
    expect(testItem.sellIn).toBe(4);
  });
});

//   - `quality` drops to `0` after the concert.
describe("concertQuality0After0Days", () => {
  it("quality drops to 0 when there are less than 0 days", () => {
    const testItem = new TAFKAL80ETC('_', 0, 10);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(-1);
  });
});

// - quality decreases twice as fast for Conjured items.
describe("reduceConjuredQuality", () => {
  it("quality drops twice as fast for Conjured items", () => {
    const testItem = new Conjured('Cursed Ring', 5, 10);
    items.push(testItem);

    const testItem2 = new Conjured('Cursed Ring', -1, 10);
    items.push(testItem2);

    updateQuality();

    expect(testItem.quality).toBe(8);
    expect(testItem.sellIn).toBe(4);

    expect(testItem2.quality).toBe(6);
    expect(testItem2.sellIn).toBe(-2);
  });
});
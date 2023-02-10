export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Conjured extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    this.sellIn--;

    if(this.quality > 0) {
      this.quality -= this.sellIn < 0 ? 4 : 2;
    }
  }
}

export class AgedBrie extends Item {
  constructor(_, sellIn, quality) {
    super(_, sellIn, quality);

    this.name = 'Aged Brie';
  }

  updateQuality() {
    this.sellIn--;

    if(this.quality < 50) {
      this.quality += this.sellIn < 0 ? 2 : 1;
    }
  }
}

export class Sulfuras extends Item {
  constructor() {
    super();

    this.name = 'Sulfuras, Hand of Ragnaros';
    this.sellIn = 0;
    this.quality = 80;
  }

  updateQuality() {

  }
}

export class TAFKAL80ETC extends Item {
  constructor(_, sellIn, quality) {
    super(_, sellIn, quality);

    this.name = 'Backstage passes to a TAFKAL80ETC concert';
  }

  // - "Backstage passes to a TAFKAL80ETC concert", increase in `quality` as it's `sellIn` value decreases:
  // - `quality` increases by `2` when there are `10` days or less left before the concert.
  // - `quality` increases by `3` when there are `5` days or less left before the concert.
  // - `quality` drops to `0` after the concert.
  updateQuality() {
    this.sellIn--;

    console.log(this.sellIn);
    console.log(this.quality);

    if(this.sellIn < 0) {
      this.quality = 0;
    }
    else {
        const add = (this.sellIn <= 5) ? 3 : (this.sellIn <= 10 ? 2 : 1);
        if(this.quality < 50 - add) {
          this.quality += add;
      }
    }
  }
}

export let items = [];

items.push(new Item("+5 Dexterity Vest", 10, 20));
items.push(new AgedBrie('_', 2, 0));
items.push(new Item("Elixir of the Mongoose", 5, 7));
items.push(new Sulfuras());
items.push(new TAFKAL80ETC('_', 15, 20));
items.push(new Item("Conjured Mana Cake", 3, 6));

for(let item of items) {
  console.log(`Name: ${item.name}, sellIn: ${item.sellIn}, Quality: ${item.quality}`);
}

export const updateQuality = () => {
  for (let item of items) {
    if(item.constructor.name === 'Item') { // if item is of class Item and not a child
      item.sellIn--;

      if(item.quality > 0) {
        item.quality -= item.sellIn < 0 ? 2 : 1;
      }
    }
    else {
      item.updateQuality();
    }

    // if (
    //   item.name != "Aged Brie" &&
    //   item.name != "Backstage passes to a TAFKAL80ETC concert"
    // ) {
    //   if (item.quality > 0) {
    //     if (item.name != "Sulfuras, Hand of Ragnaros") {
    //       item.quality = item.quality - 1;
    //     }
    //   }
    // } else {
    //   if (item.quality < 50) {
    //     item.quality = item.quality + 1;
    //     if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
    //       if (item.sellIn < 11) {
    //         if (item.quality < 50) {
    //           item.quality = item.quality + 1;
    //         }
    //       }
    //       if (item.sellIn < 6) {
    //         if (item.quality < 50) {
    //           item.quality = item.quality + 1;
    //         }
    //       }
    //     }
    //   }
    // }
    // if (item.name != "Sulfuras, Hand of Ragnaros") {
    //   item.sellIn = item.sellIn - 1;
    // }
    // if (item.sellIn < 0) {
    //   if (item.name != "Aged Brie") {
    //     if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
    //       if (item.quality > 0) {
    //         if (item.name != "Sulfuras, Hand of Ragnaros") {
    //           item.quality = item.quality - 1;
    //         }
    //       }
    //     } else {
    //       item.quality = item.quality - item.quality;
    //     }
    //   } else {
    //     if (item.quality < 50) {
    //       item.quality = item.quality + 1;
    //     }
    //   }
    // }
  }
};

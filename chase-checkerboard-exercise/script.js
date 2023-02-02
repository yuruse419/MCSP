// Your JS goes here
// * Each tile should be a `div`
// * Each tile's width is `11.1%`
// * Set each tile's `float` property to `left`
// * Each tile's paddingBottom is `11.1%`

var container = document.createElement('container');
// container.setAttribute('overflow', 'hidden');
var tile;

for(var i = 0; i < 45; i++) {
    tile = document.createElement('div');

    tile.style.width = '11.1%';
    tile.style.float = 'left';
    tile.style.paddingBottom = '11.1%';

    tile.style.backgroundColor = i % 2 === 0 ? 'black' : 'red';

    container.append(tile);
}

document.body.appendChild(container);
//properties used across functions
var globalInits = {
    startPixels: 1000, //the initial number of pixels in the canvas; used as a fallback reference for resetting the canvas
    newPixels: 1000, //the number of pixels in the canvas at arbitrary points during runtime; initialized equal to startPixels
    currentColor: '#000000', //default color
    predefinedColors: ['#FF0000', '#FFA500', '#0000FF', '#00FFFF', '#008000', '#FFFF00', '#FFFFFF', '#000000'], //predefined colors to add to palette: 'red', 'orange', 'blue', 'cyan', 'green', 'yellow', 'white', 'black'
    mouseDown: false, //initialize state tracker for mouse down or up as not down
    fillOn: false, //initialize fill tool as off
    eraserOn: false
};

(function() {
    document.querySelector('html').style.height = '100%'; //set html element height to 100% of document's height
    document.body.style.height = '100%'; //set body's height to 100% of parent's (html's) height 
    document.body.style.backgroundColor = 'firebrick'; //set background of body

    //add mousedown event
    document.body.addEventListener('mousedown', function(e) {
        if(e.button === 0 && !globalInits.fillOn) { //if button down is main button and fill tool is off
            globalInits.mouseDown = true; //enable state tracker for mouse down or up

            e.preventDefault(); //prevent default mouse behavior while painting (e.g., disable attempted element dragging)

            //color/erase the first touched element, as it is not caught by the mouseenter event
            if(e.target.className === 'pixel') {
                 e.target.style.backgroundColor = globalInits.eraserOn ? '#FFFFFF' : globalInits.currentColor;
            }
        }
    });

    //add mouseup event
    document.body.addEventListener('mouseup', function(e) {
        if(e.button === 0 && !globalInits.fillOn) { //if button up is main button and fill tool is off
            globalInits.mouseDown = false;
        }
    });

    //create HTML elements
    createPalette(globalInits.predefinedColors); //create a palette with some predefined colors
    createCanvas(globalInits.startPixels); //create a canvas with a predetermined number of pixels
})();

/*
Palette consists of:
    a parent div for all contents:
        a div for canvas tools:
            - a reset button
            - a clear button
            - a pixel change incrementor
            - a pixel change decrementor
            - a picker element
            - a fill tool
            - an eraser tool
            - //a save button
            - //a load button
        a div for predefined color buttons:
            - predefined color buttons
*/
function createPalette(colorsArr) {
    //create palette div
    var palette = document.createElement('div');
    palette.style.border = 'medium solid black';
    palette.style.height = '20%';
    palette.style.width = '70%';
    palette.style.margin = '1% auto';
    //palette.style.display = 'block';

    //create canvas tools div
    var tools = document.createElement('div');
    tools.style.display = 'flex';
    tools.style.height = '25%';
    tools.style.justifyItems = 'center';

    //create a save button w/ event listener
    var save = document.createElement('button');
    save.textContent = 'Save';
    save.style.height = '80%';
    save.style.width = 100 / 8 + '%';
    save.style.margin = 'auto';
    save.addEventListener('click', function(e) {
        var lastSave = document.querySelector('.canvas').outerHTML;
        var lastNumPixels = globalInits.newPixels;
        localStorage.setItem('lastSave', lastSave);
        localStorage.setItem('lastNumPixels', lastNumPixels);
    });

    //create a load button w/ event listener
    var load = document.createElement('button');
    load.textContent = 'Load';
    load.style.height = '80%';
    load.style.width = 100 / 8 + '%';
    load.style.margin = 'auto';
    load.addEventListener('click', function(e) {
        var currentCanvas = document.querySelector('.canvas')
        currentCanvas.outerHTML = localStorage.getItem('lastSave');

        var lastNumPixels = localStorage.getItem('lastNumPixels');
        var pixelEdge = Math.sqrt(10000 / lastNumPixels);
        var pixelsPerLine = Math.floor(100 / pixelEdge); //calculate the number of pixels that will be in a single line with the given width and heights

        addPixelEvents(pixelsPerLine);
    });

    //create reset button w/ event listener
    var reset = document.createElement('button');
    reset.textContent = 'Reset';
    reset.style.height = '80%';
    reset.style.width = 100 / 8 + '%';
    reset.style.margin = 'auto';
    reset.addEventListener('click', function(e) {
        resetPixels(globalInits.startPixels);
    });

    //create clear button w/ event listener
    var clear = document.createElement('button');
    clear.textContent = 'Clear';
    clear.style.height = '80%';
    clear.style.width = 100 / 8 + '%';
    clear.style.margin = 'auto';
    clear.addEventListener('click', function() {
        resetPixels(globalInits.newPixels);
    });

    //create pixel decrementor w/ event listener
    var pixelDecr = document.createElement('button');
    pixelDecr.textContent = '-';
    pixelDecr.style.fontSize = 'x-large';
    pixelDecr.style.height = '80%';
    pixelDecr.style.width = 100 / 16 + '%';
    pixelDecr.style.margin = 'auto';
    pixelDecr.addEventListener('click', function() {
        var decrPixels = parseInt(globalInits.newPixels - globalInits.newPixels / 10);
        resetPixels(decrPixels);
    });

    //create pixel incrementor w/ event listener
    var pixelIncr = document.createElement('button');
    pixelIncr.textContent = '+';
    pixelIncr.style.fontSize = 'x-large';
    pixelIncr.style.height = '80%';
    pixelIncr.style.width = 100 / 16 + '%';
    pixelIncr.style.margin = 'auto';
    pixelIncr.addEventListener('click', function() {
        var incrPixels = parseInt(globalInits.newPixels + globalInits.newPixels / 10);
        resetPixels(incrPixels);
    });

    //create picker input box w/ event listener to change current color as it is changed in the input window
    var picker = document.createElement('input');
    picker.type = 'color';
    picker.value = '#000000';
    picker.style.height = '80%';
    picker.style.width = 100 / 8 + '%';
    picker.style.margin = 'auto';
    picker.addEventListener('input', function(e) {
        globalInits.currentColor = e.target.value;
    });

    //create fill button w/ event listener
    var fill = document.createElement('button');
    fill.textContent = 'Fill: Off';
    fill.style.fontSize = 'x-small';
    fill.style.height = '80%';
    fill.style.width = 100 / 16 + '%';
    fill.style.margin = 'auto';
    fill.addEventListener('click', function() {
        globalInits.fillOn = !globalInits.fillOn;

        //ensure erase tool is disabled
        globalInits.eraserOn = false;
        eraser.textContent = 'Erase: Off';

        fill.textContent = globalInits.fillOn ? 'Fill: On' : 'Fill: Off';
    });

    //create eraser button w/ event listener
    var eraser = document.createElement('button');
    eraser.textContent = 'Erase: Off';
    eraser.style.fontSize = 'xx-small';
    eraser.style.height = '80%';
    eraser.style.width = 100 / 16 + '%';
    eraser.style.margin = 'auto';
    eraser.addEventListener('click', function() {
        globalInits.eraserOn = !globalInits.eraserOn;

        //ensure fill tool is disabled
        globalInits.fillOn = false;
        fill.textContent = 'Fill: Off';

        eraser.textContent = globalInits.eraserOn ? 'Erase: On' : 'Erase: Off';
    });

    //append tools to tools div
    tools.replaceChildren(load, save, reset, clear, pixelDecr, pixelIncr, picker, fill, eraser);

    //create div for predefined colors
    var predefinedColors = document.createElement('div');
    predefinedColors.style.display = 'flex';
    predefinedColors.style.flexWrap = 'wrap';
    predefinedColors.style.height = '70%';
    predefinedColors.style.justifyContent = 'center';

    var color; //to store predefined color elements

    //create all predefined colors within function parameter array w/ event listener
    for(var i = 0; i < colorsArr.length; i++) {
        color = document.createElement('button');
        color.id = 'c' + i;
        //colors.style.height = 100 / colorsArr.length * 2 + '%';
        color.style.width = 100 / colorsArr.length * 2 + '%';
        color.style.backgroundColor = colorsArr[i];
        color.addEventListener('click', function(e) {

            globalInits.currentColor = globalInits.predefinedColors[parseInt(e.target.id[1])];
            picker.value = globalInits.currentColor;
        });

        predefinedColors.appendChild(color);
    }

    //append elements to palette
    palette.replaceChildren(tools, predefinedColors);

    //append palette to document body
    document.body.appendChild(palette);
}

/*
Canvas consists of:
    a parent div for all pixel elements:
        - Pixels are placed within the canvas in complete lines.
            - i.e., trailing pixels are removed.
            - This means modifying the original input number of pixels.
*/
function createCanvas(numPixels) {
    //create canvas div
    var canvas = document.createElement('div');
    canvas.className = 'canvas';
    canvas.style.display = 'flex';
    canvas.style.flexWrap = 'wrap';
    canvas.style.height = '70%';
    canvas.style.width = '70%';
    canvas.style.margin = 'auto';
    canvas.style.justifyContent = 'center';
    canvas.style.alignContent = 'flex-start'; //ensures each pixel touches the pixel above/below it (avoid gaps)
    //canvas.style.overflow = 'hidden'; //does not work to cut off excess pixels because the last acceptable row may be partially off the canvas

    //calculate the percentage of the canvas able to be allocated for a side of each pixel; value applies to both width and height for each pixel
    var pixelEdge = Math.sqrt(10000 / numPixels); //does not return an accurate enough decimal percentage to simply set each pixel's width and height to it; there will be overflow
    var pixelsPerLine = Math.floor(100 / pixelEdge); //calculate the number of pixels that will be in a single line with the given width and heights

    numPixels = pixelsPerLine**2; //remove the excess pixels from the total number of pixels
    globalInits.newPixels = numPixels;

    var pixel; //to store pixel elements within iteration

    for(var i = 0; i < numPixels; i++) {
        pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.id = String(i);

        pixel.style.boxSizing = 'border-box';
        pixel.style.border = '1px solid black';
        pixel.style.backgroundColor = 'white';
        pixel.style.height = pixelEdge + '%';
        pixel.style.width = pixelEdge + '%';

        canvas.appendChild(pixel);
    }

    document.body.appendChild(canvas);

    addPixelEvents(pixelsPerLine);
}

function addPixelEvents(pixelsPerLine) {
    var pixelList = document.querySelectorAll('.pixel');

    for(var i = 0; i < pixelList.length; i++) {
        pixelList[i].addEventListener('mouseenter', function(e) {
            if(globalInits.mouseDown) {
                e.target.style.backgroundColor = globalInits.eraserOn ? '#FFFFFF' : globalInits.currentColor; //if erase tool is on, set pixels white; else set as current color
            }
        });
        pixelList[i].addEventListener('click', function(e) {
            if(globalInits.fillOn) {
                fillBoundary(e, pixelsPerLine);
            }
        });
    }
}

//duals as a reset to default colors and as a resize
function resetPixels(total) {
    document.querySelector('.canvas').remove();

    globalInits.newPixels = total;

    createCanvas(total);
}

function fillBoundary(e, pixelsPerLine) {
    var currentPixel = e.target.id;
    var originalColor = e.target.style.backgroundColor;

    var pixelNumberOnRow = parseInt(currentPixel) % pixelsPerLine + 1;
    var queueObj = {
    };

    queueObj[currentPixel] = [false, pixelNumberOnRow];

    while(!queueObj[currentPixel][0]) { //while current pixel has not been traversed
        //traverse left
        for(var i = 1; i < queueObj[currentPixel][1]; i++) { //iterate from 1 to current pixel number in the row
            //search from the pixel with an ID of currentPixel's ID - 1 to the pixel with an ID of currentPixel's ID - currentPixel's number in the row (i.e., to the beginning of the row)
            if(document.getElementById(String(parseInt(currentPixel) - i)).style.backgroundColor !== originalColor) { //if a pixel's color is not the same as the original's, terminate search
                break;
            }
            
            //if pixel's color does equal the original's, add it to queueObj
            if(queueObj[String(parseInt(currentPixel) - i)] === undefined) {
                queueObj[String(parseInt(currentPixel) - i)] = [false, (parseInt(currentPixel) - i) % pixelsPerLine + 1];
            }
        }

        //traverse right
        for(var i = 0; i < (pixelsPerLine - queueObj[currentPixel][1]); i++) { //iterate from current pixel number in the row to the end of the row
            //console.log('pulled ID:' + String(parseInt(currentPixel) + i));
            //search from the pixel with an ID of currentPixel's ID + 1 to the pixel with an ID of currentPixel's ID + the number of pixels on the same row after currentPixel (i.e., to the end of the row)
            if(document.getElementById(String(parseInt(currentPixel) + i + 1)).style.backgroundColor !== originalColor) { //if a pixel's color is not the same as the original's, terminate search
                break;
            }
            
            //if pixel's color does equal the original's, add it to queueObj
            if(queueObj[String(parseInt(currentPixel) + i + 1)] === undefined) {
                queueObj[String(parseInt(currentPixel) + i + 1)] = [false, (parseInt(currentPixel) + i + 1) % pixelsPerLine + 1];
            }
        }

        //traverse up
        for(var i = parseInt(currentPixel); i >= queueObj[currentPixel][1] - 1; i -= pixelsPerLine) { //iterate over every pixel above that has the same number in row
            //search every pixel above in the same row with an ID from currentPixel's ID to the number in row minus one (i.e., the pixel in the top row will have an ID equal to number in row minus one)
            if(document.getElementById(String(i)).style.backgroundColor !== originalColor) { //if a pixel's color is not the same as the original's, terminate search
                break;
            }
            
            //if pixel's color does equal the original's, add it to queueObj
            if(queueObj[String(i)] === undefined) {
                queueObj[String(i)] = [false, queueObj[currentPixel][1]];
            }
        }

        //traverse down
        for(var i = parseInt(currentPixel); i <= (globalInits.newPixels - (pixelsPerLine - queueObj[currentPixel][1]) - 1); i += pixelsPerLine) { //iterate over every pixel below that has the same number in row
            //search every pixel in the same row at and below currentPixel with an ID from currentPixel's ID to the number in row minus one (i.e., the pixel in the bottom row will have an ID equal to number in row minus one)
            if(document.getElementById(String(i)).style.backgroundColor !== originalColor) { //if a pixel's color is not the same as the original's, terminate search
                break;
            }
            
            //if pixel's color does equal the original's, add it to queueObj
            if(queueObj[String(i)] === undefined) {
                queueObj[String(i)] = [false, queueObj[currentPixel][1]];
            }
        }

        //after a full traversal
        queueObj[currentPixel][0] = true; //set traversed as true

        //search through all queued pixels
        for(var key in queueObj) {
            if(!queueObj[key][0]) { //if pixel in queue has not been traversed
                currentPixel = key; //set as next pixel to traverse
                break; //terminate search since already found
            }
        }
    }

    //set color of all queued pixels
    for(var key in queueObj) {
        document.getElementById(key).style.backgroundColor = globalInits.currentColor;
    }
}
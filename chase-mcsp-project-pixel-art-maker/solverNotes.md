/*
- Create a Canvas of Pixels:
    - The colorable blocks/elements are contained within a parent div element. The colorable blocks themselves are also div elements.
        - From this point forward, pixels "refers" to the colorable blocks, and "canvas" refers to their parent container.
    - Styling/Layout Through CSS:
        - 'padding-left: 15%', 'padding-right: 15%' applied to the canvas.
            - Adds 15% padding on both the left and right, where the percentage is relative to the canvas's inline size (in this case, its width).
            - This does not have an effect on the canvas's width as a percentage relative to the document body.
                - To illustrate:
                    - In my browser, setting a padding of 15% on each size makes both the body and the canvas 796px x 332.09px.
                    - Also in my browser, changing the left padding to 30% makes both the body and the canvas 796px x 274.35px.
        - 'display: flex' applied to the canvas.
            - Makes the canvas a flex container.
            - Applies the flex layout to the canvas's children, the pixels.
        - 'flex-wrap: wrap' applied to the canvas.
            - Makes the pixels wrap when the sum width exceeds the canvas's width.
        - 'justify-content: center' applied to the canvas.
            - Makes the canvas center along the main-axis (a flex container property).
        - 'box-sizing: border-box' applied to the pixels.
            - Makes sizing properties (width, height) affect the border area instead of the content area.
            - This makes the sizing properties account for any border or padding applied to the pixels.
                - i.e., adding a border/padding does not change the total width.
        - 'border: thin solid black' applied to the pixels.
            - Applies a thin, solid, black border to each pixel.
                - The 'thin' value is not defined as any specific quantity, so manipulating widths while needing to manually account for this value is not practical.
    - Calculating Pixel Sizing:
        - Referenced Information:
            - All sizing values are percentages relative to a whole (such as the document body or the canvas content area).
            - Calculations are an approximation based on certain principles. Actual values may differ from what would be expected.
            - 'box-sizing: border-box' prevents the borders on our pixels from adding additional width/height.
            - The canvas is given a padding-left and padding-right of 15% each (30% total), relative to its containing block (the document body).
                - The width of the body available to our canvas's content, the pixels, is 70%.
                    - 100% minus both paddings, without needing to account for the pixels' borders.
            - We want to keep space below the canvas for our palette. Let's say a 30% buffer, relative to the containing block.
                - The height of the body available to our canvas's content, the pixels, is 70%.
                    - 100% minus our buffer, without needing to account for the pixels' borders.
            - The total area available to our rectangular canvas's content is calculated with width times height.
            - The area of each square pixel is calculated with the square (to the second power) of either their width or their height.
            - 100% of the area of our canvas is equivalent to 70% x 70% of the area of the body. 
                - The percentage areas of each pixel are relative now to this area of the canvas, not the area of the body.
                - This 100% reference is used below to calculate the number of pixels on each line within the canvas.
        - Arithmetic:
            - Total canvas content area should not exceed 70% x 70% (canvas width and height calculated above) of the document body, or 4900%.
            - The area we can allocate for each pixel, then, is the total area (4900%) divided by the total number of pixels (numPixels).
            - As such, the widths/heights for each pixel will be the square root of the area for each pixel (pixel area equals width or height squared, as determined above): 
                - width = Math.sqrt(4900 / numPixels).
                - height = Math.sqrt(4900 / numPixels).
    - Implementation:
        - At this point, we can add a dynamic number of pixels to our canvas that will stay within the bounds specified above for the canvas.
        - One issue that will persist is having a trailing, incomplete row of pixels on the canvas. 
        - This happens when the number of pixels specified is made to fit within the content area, but there are not enough pixels to entirely fill up the content area.
            - ooooo
              ooooo
              ooooo
               ooo    <- trailing row (centered due to styling)
        - A solution to this is to round up the total number of pixels to complete the last row.
        - First, we can calculate the number of pixels that will appear on each row, or line.
            - Each line has a maximum width of 100%, relative to the canvas's content, as explained under Referenced Information of Calculating Pixel Sizing.
            - Each pixel has a width of Math.sqrt(4900 / numPixels).
            - The number of pixels that will fit on a single line is the whole number total width divided by the width of each pixel:
                - 100% / Math.sqrt(4900 / numPixels)... which may return a float.
                - Since fractional pixels can't fit on a line, we can truncate any trailing decimals:
                    - Math.floor(100% / Math.sqrt(4900 / numPixels)).
        - Next, we can calculate the number of trailing pixels by finding the remainder of total pixels divided by pixels per line:
            - trailingPixels = numPixels % pixelsPerLine.
        - Lastly, we can add the difference between the number of pixels per line and the number of trailing pixels to the total number of pixels:
            - numPixels = numPixels + (pixelsPerLine - trailingPixels).
        - It should be noted that the sizing, number of pixels per line, and number of trailing pixels are calculated using the original total number of pixels.
            - Recalculation of these values using the new total number of pixels will again result in trailing pixels to appear.


- Create a palette of colors.
    - Palette should have a color picker aspect.
        - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
        - https://developer.mozilla.org/en-US/docs/Web/Events/change
- Make the mouse act like a real paintbrush.
    - While the mouse is clicked down, it should change the color of a pixel upon entry of the pixel.
        - mousedown, mouseenter, mouseup
- Add a save feature that saves the states of pixels.
    - Should include a load feature to change the states to the saved state.
    - Accomplish this with LocalStorage.
- Add a fill feature that fills connected pixels of the same color.
    - Or enable drawing of a custom boundary, and all pixels included (even partially) will be changed to a specified color.
*/

// (function () {
//     document.querySelector('html').style.height = '100%';
//     document.body.style.height = '100%';
//     document.body.style.backgroundColor = 'firebrick';

//     createCanvas(500);
//     //createPalette(['white', 'red', 'blue', 'green', 'black']); 
// })();

// function createCanvas(numPixels) {
//     var canvas = document.createElement('div'); //parent div container to hold pixels
//     canvas.className = 'parent-container';
//     canvas.style.justifyContent = 'center';
//     canvas.style.height = '70%';

//     //var pixelSide = Math.sqrt(4900 / numPixels); //equals both pixel width and height
//     //var pixelsPerLine = Math.floor(100 / pixelSide);
//     //var trailingPixels = numPixels % pixelsPerLine;
//     //numPixels += pixelsPerLine - trailingPixels;

//     for(var i = 0; i < numPixels; i++) {
//         pixel = document.createElement('div');
//         pixel.className = 'pixels';
//         //pixel.style.width = pixelSide + '%'; 
//         //pixel.style.paddingBottom = pixelSide + '%'; 
        
//         //pixel.style.backgroundColor = i % 2 === 0 ? 'black' : 'red';

//         canvas.appendChild(pixel);
//     }

//     document.body.appendChild(canvas);
// }

// function createPalette(defaultColors) {
//     var palette = document.createElement('div');
//     palette.className = 'parent-container';
//     palette.style.justifyContent = 'space-evenly';

//     var btnWidth = 50 / (defaultColors.length);

//     var picker = document.createElement('input');
//     picker.type = 'color';
//     picker.value = '#FF00FF';
//     picker.style.width = btnWidth + '%';
//     //picker.style.block

//     var color;

//     for(var i = 0; i < defaultColors.length; i++) {
//         color = document.createElement('div');
//         //color.className = 'color-btns';
//         color.style.width = btnWidth + '%';
//         color.style.paddingBottom = btnWidth / 4 + '%';
//         color.style.backgroundColor = defaultColors[i];
//         color.style.border = 'thick solid dimgray';

//         palette.appendChild(color);
//     }

//     document.body.appendChild(palette);
// }
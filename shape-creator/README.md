# Shape Maker

In this project you will be tasked with creating new functionality for various shapes that have been coded out for you. The project uses the [p5.js](https://p5js.org/) library to create, manipulate, and draw various shapes on the browser canvas.

This project is designed to give you experience in not only writing functionality for various super and subclasses, but also to refactor code into a more modular pattern. In the project, you will be given one large javascript file. This file will initial contain all of the classes used to create the core functionality of the app. Your job, is to:

1. Read the existing code to get a feel for how all the parts fit together. Consult the [p5.js getting started docs](https://p5js.org/get-started/) to gain an understanding of the p5.js library.
   > You don't need to understand the whole library to be productive, just focus on the `setup` and `draw` methods.
1. Create a superclass called `Shape` which contains all shared properties and methods from the `Rectangle`, `Circle`, and `Ellipse` classes.
1. Move all classes to a separate file (e.g. `shapes.js`) and export them so they can be imported in `main.js`.
1. Create your own shape class, e.g. `Triangle`, `Arc`, etc. with its own functionality for the `show` and `transform` methods. (You can find a list of shapes supported by p5 [here](https://p5js.org/reference/#group-Shape)).

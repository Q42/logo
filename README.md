# Q42 logo

The world's first code logo.

## Compile

`compile.sh` creates the final q42.js

## Deploy

`deploy.sh` compiles and deploys to static.q42.nl, assuming you have access rights to it

## How to create a canvas2d module

* Duplicate `canvas-demo.js`
* Rename the module in all places eg line 2 AND line 7
* Override any method as needed, starting with `draw()`

## Modules: scaling, and going beyond the boundaries

By default, your canvas element is sized as a regular image with the logo touching all edges.
You are expected to render a logo that defaults to that same visual size, even if you enlarge the canvas for funky effects:

![how to size](http://i.imgur.com/6sysoMt.png)

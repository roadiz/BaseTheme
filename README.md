# Base Roadiz theme

[![Build Status](https://travis-ci.org/roadiz/BaseTheme.svg?branch=develop)](https://travis-ci.org/roadiz/BaseTheme)

This theme is meant to get a **fresh start** to create a custom website on *Roadiz*.

**Compatible with Internet Explorer 11+**

## Get started

Make sure that NodeJS and NPM are installed on your machine.

Generate a new theme with *Test* as your theme prefix

```bash
bin/roadiz themes:generate Test
cd themes/TestTheme
# Install JS dependencies with npm or Yarn
yarn 
```

We provide a starter kit based on ES6 with *Webpack4*, *Babel*, *Scss* and *Gulp* as task runner. Feel free to adapt it if you have your own coding workflow. Keep in mind that we inject built CSS and JS into partial *Twig* templates to get versioned file names.

## Scripts
### Development

```shell
yarn run dev
```

Watch js, scss, images and svg changes in `app/` folder, then build.

```shell
yarn run dev-livereload
```

Same features as above but with browser livereload.

### Production

```shell 
yarn run build
```

Build all assets in `app/` folder, optimized and minified. After a build, you are ready to deploy to production site.

## Structure

#### `app/`

This folder **is not publicly visible.**. It stores all your source files (fonts, js, scss, images and svg).

#### `static/`

This **folder will be symlinked in your *Roadiz Standard edition* `web/` folder, you should not store sensitive data here.**

**IMPORTANT**: Do not add any files in `static/img`, `static/js`, `static/svg`, `static/css`, `static/fonts`, `static/vendors`.

#### `build/`

This folder stores all build configurations, webpack configuration and gulp tasks.

## Features

### JS + Starting blocks

We externalized all the JS logic and routing system into our [*Starting blocks*](https://github.com/rezozero/starting-blocks) framework so that your theme only host specific JS code and will be able to easily upgrade common JS features.

We encourage you to read [*Starting Blocks* README](https://github.com/rezozero/starting-blocks/blob/master/README.md) 
to understand how we route and synchronize our *Twig* generated DOM with our ES6 scripts. You can find a detailled
API documentation at http://startingblocks.rezo-zero.com

In *development*, all *JS* files are preprocessed with *Babel*, linted and a sourcemap is created.  
In *production*, these files are also minified and optimized (uglifyJs, mangle) and the sourcemap is removed.

**Attention: Starting-Block is using window.fetch since version 4.0.0.** Make sure your compatibility chart will match or simply use a *polyfill*. 

### Scss + Bootstrap 4

When you create a new *SCSS* file in `app/scss/`, you have to include it in `app/scss/style.scss`, which is your main project stylesheet.

We use *Bootstrap 4* right in *BaseTheme* but you can choose what feature to include in your style not to bloat your CSS files. 
Open your `app/scss/bootstrap-custom.scss` file and comment/uncomment/import your *Bootstrap* modules files, you even can override *Bootstrap* variables.

In *development*, all *SCSS* files are merged into one *CSS* file and a sourcemap is created.  
In *production*, this file is minified and optimized (postcss, autoprefixer) and the sourcemap is removed.

### Images

All images in `app/img/` can be required in *CSS*, *JS* or in *Twig* files.

```scss
// app/scss/base/_common.scss
...
background: url('../../img/mybackground.png');
...
```

or *JS*

```javascript
import myBackground from '../img/mybackground.png'
```

Images are automatically processed by webpack and copied in `static/img`. So you can easly use in *Twig* files.

Under `config.limit_image_size`, required image will be transformed into dataUrl.

### SVG

All *SVG* files in `app/svg/` folder will be processed by *Gulp*, minified with *SVGO* and injected in `Resources/views/svg/sprite.svg.twig` as `<defs>` element, which is injected in `base.html.twig`.

To include a new *SVG* to your site, move your *SVG* to `app/svg/myicon.svg` and, in any *Twig* template

```html
<use xlink:href="#icon-myicon"/>
```

### Versioning

Versioning is really important in order to avoid browser and public cache problems after a site update.

While you run `npm run build`, *Webpack* will generate a random generated name suffix for each file and require *CSS* and *JS* files in `Resources/views/base.html.twig` template.

### Customize build tasks

All build configurations are in `build/config/`. `base.js` file contains general configurations which you can override according `NODE_ENV` in `environments.js`.

For example, while you run `npm run build`, `NODE_ENV` is equal to `production` :

```json
// package.json

"betterScripts": {
    "build": {
      "command": "npm run build-svg && webpack",
      "env": {
        "NODE_ENV": "production",
        "DEBUG": "Roadiz-front:*"
      }
    }
}
``` 

So the configuration is overriden like this :

```javascript
// environments.js

export default {
    production: (config) => ({
        devtool: false
    })
}
```

Webpack configuration works the same. `build/build/base.js` exports a common webpack configuration which you can override in `build/build/environments.js`

Feel free to add other custom `NODE_ENV` like staging, testing...

**important note** : When you start `npm run dev-livereload` task, Webpack watch the files every 1000ms. You can change this interval in `config.watchInterval`.

### Constants

By default, you have access to 3 constants in your *Javascript* code. These can be useful to display or not a loader, an authentification form, etc... or to set API paths and override them in production configuration :

```javascript
// build/config/base.js
  
{
    globals: {
        'DEVELOPMENT': JSON.stringify(config.env === 'development'),
        'PRODUCTION': JSON.stringify(config.env === 'production'),
        'ENV': JSON.stringify(config.env)
    }
  
}
```

```javascript
// any js file  
  
if (PRODUCTION) {
  // show loader
}
```


## Boilerplate

BaseTheme will provide you some ready-made *Twig* templates, styles and ES6 classes.

- A basic block is available with its Twig template. All you need is to create the node-type in your Roadiz back-office.
- A map block is available with its Twig template. All you need is to create the node-type in your Roadiz back-office.
- A contact form block is available with its controller and Twig templates. All you need is to create the 
node-type in your Roadiz back-office.

#### Node-types

A common node-type called *Page* will be installed with this theme, his controller is located 
in `Controllers/PageController.php` and his twig template in `Resources/views/types/page.html.twig`.
We also created a SCSS (`app/scss/pages/page.scss`) and a javascript file (`app/src/pages/Page.js`) for this node-type.
If you need others node-type, duplicate theses files and rename them.

#### ES6 classes

- `BasicBlock.js`
- `ContactBlock.js` with an AJAX form submit
- `MapBlock.js` with a Google Map creation
- `Nav.js` with AJAX update for your active *nav-item*

## Contributing

See [Contributing guidelines](./CONTRIBUTING.md)


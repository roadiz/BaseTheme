# Base Roadiz theme

This theme is meant to get a **fresh start** to create a custom website on *Roadiz*.

## First use

Make sure that NodeJS and NPM are installed on your machine.

```bash
bin/roadiz themes:generate Test
```

* Generate a new theme with *Test* as your theme prefix

We provide a starter kit based on ES6 with *Webpack2*, *Babel*, *Less* and *Gulp* as task runner. Feel free to adapt it if you have your own coding workflow. Keep in mind that we inject built CSS and JS into partial *Twig* templates to get versioned file names and ignore them in development stage.

## Usage for development

* Go to your theme folder and install JS dependencies with your favorite tool `npm install` or `yarn`
* Launch assets building for the first time with `npm run build`
* Launch `npm run dev` each time you start coding, this will launch a watcher on JS, Less, SVG and images files in `app/` folder

- `app/` folder stores every scripts and styles sources. **This folder should not be visible publicly**.
- `static/` folder stores only generated JS and CSS and other public assets, such as images. **This folder will be symlinked in your *Roadiz Standard edition* `web/` folder, you should not store sensitive data here.**

## External JS framework

Base theme uses *Gulp* and *NPM* to deal with front development files.
We chose to use **ES6 javascript** transpiled with *Babel* and loaded via *Webpack2*.

Then we externalized all the JS logic and routing system into our [*Starting blocks*](https://github.com/rezozero/starting-blocks) framework so that your theme only host specific JS code and will be able to easily upgrade common JS features.

We encourage you to read [*Starting Blocks* README](https://github.com/rezozero/starting-blocks/blob/master/README.md) 
to understand how we route and synchronize our *Twig* generated DOM with our ES6 scripts. You can find a detailled
API documentation at http://startingblocks.rezo-zero.com

### Based on Bootstrap 3

We use *Bootstrap 3* right in *BaseTheme* but you can choose what feature to include in your style not to bloat your CSS files. 
We recommend to use *LESS* development version to ignore unnecessary modules.
Open your `app/less/bootstrap-custom.less` file and comment/uncomment your *Bootstrap*
modules files, you even can override *Bootstrap* variables.

### Gulp

This blank theme uses *Gulp* as task manager to handle your LESS, JS and CSS files. 
When you set it up, *Gulp* will generate versioned CSS and JS files to 
be properly served over browser caches.

* Install globally *NodeJS* - http://nodejs.org/ and *Yarn* (optional)
* Launch `npm install` or `yarn` in your theme folder to install *NPM* vendor and launch *Gulp* tasks for the first time.

Then you can launch *Gulp* in background to listen every file update: this command will
generate development CSS file (with source-map and not-minified) and transpile your ES6 scripts.

```shell
npm run dev
```

And when you need to prepare files for production: this command will generate production CSS
files (no source-map and minified) and will uglify and optimize scripts into
a single JS bundle in `static/js/` folder. 
Build command passes `NODE_ENV=production` environment var to *Gulp*.

```shell
npm run build
```

### Versioning

Versioning is really important in order to avoid browser and public cache problems after
a site update.

Gulp will generate a `js/` folder for optimized JS file and a `css/` for CSS files, all files
will have random generated name suffix. Then *Gulp* will inject these files directly into your
`Resources/views/base.html.twig` template at each change.

For *LESS* files, it’s a bit different. To add a new *LESS* file, just include it in `app/less/style.less`
file, which is your main project stylesheet. For *Bower* stylesheet, just do the same in `app/less/vendor.less`.
Do not forget to use `@import (inline)` syntax to force *LESS* compiler to include files contents if 
you want to import plain CSS files.

#### In production mode

When you execute a `npm run build` command, *Gulp* will compile your *LESS* files
and it will optimize your *Webpack2* app into `/static/js` folder. 
As in *development* mode, *Twig* will automatically inject your assets to
insert as many `<script>` and `<link>` tags as needed into `Resources/view/partials/` folder.

## Boilerplate

BaseTheme will provide you some ready-made *Twig* templates, styles and ES6 classes.

- A basic block is available with its Twig template. All you need is to create the node-type in your Roadiz back-office.
- A map block is available with its Twig template. All you need is to create the node-type in your Roadiz back-office.
- A contact form block is available with its controller and Twig templates. All you need is to create the 
node-type in your Roadiz back-office.

#### Node-types

A common node-type called *Page* will be installed with this theme, his controller is located 
in `Controllers/PageController.php` and his twig template in `Resources/views/types/page.html.twig`.
We also created a LESS (`app/less/pages/page.less`) and a javascript file (`app/src/pages/page.js`) for this node-type.
If you need others node-type, duplicate theses files and rename them.

#### ES6 classes

- `basic-block.js`
- `contact-block.js` with an AJAX form submit
- `map-block.js` with a Google Map creation
- `nav.js` with AJAX update for your active *nav-item*

## Contributing

See [Contributing guidelines](./CONTRIBUTING.md)


# Blank Roadiz theme

This theme is meant to get a **fresh start** to create a theme.
*No node-type will be shipped and no node too.*

* **Find and replace** `BaseTheme` over this folder using your own theme name
* Rename `BaseThemeApp.php` and this folder according to your theme name
* Do not forget to `npm install` in your `static` folder.

To begin with dynamic routing, create a node-type in your back-office. Then duplicate
our `Controllers/ExampleController.php` file. Rename it (file + classname + extends).
You can repeat this process for every node-types you create.

## JS + LESS

Blank theme uses *Grunt* and *Bower* to deal with front development files.

### Grunt

This blank theme uses *Grunt* to manage your LESS, JS and CSS files. When you setup it, Grunt will
generate versioned CSS and JS files to be properly served over browser caches.

* Install *NodeJS* - http://nodejs.org/
* Install *Bower* - http://bower.io/
* Install *grunt-cli* - http://gruntjs.com/getting-started#installing-the-cli
* Install theme development tools `npm install`
* Install bower theme dependancies `bower install`

Then you can launch *Grunt* in background to listen every file update: this command will
generate development CSS file (with source-map and not-minified)

```shell
grunt watch
```

And when you need to prepare files for production: this command will generate prod CSS
files (no source-map and minified)

```shell
grunt
```

### Versioning

Versioning is really important in order to avoid browser and public cache problems after
a site update.

Grunt will generate a `/static/public` folder for you containing randomly named CSS and JS files.
It will generate a `/static/public/config/assets.config.php` file which tell
your *Twig* template what files to import. This file is regenerated each time *Grunt* is launched
so do not edit it manually.

If you need to include a new *JS* file in your project, just add it to the `distFiles` array
in your `/static/Gruntfile.js`. If it’s a *Bower* JS dependency, add it to the `vendorFiles` array.

For *LESS* files, it’s a bit different. To add a new *LESS* file, just include it in `/static/css/style.less`
file, which is your main project stylesheet. For *Bower* stylesheet, just do the same in `/static/css/vendor.less`.
Do not forget to use `@import (inline)` syntax to force *LESS* compiler to include files contents.

There are some examples in `/static/css/vendor.less` and `/static/Gruntfile.js` files yet.

#### In development mode

When you work with `grunt watch` running in background, *Grunt* will only compile your *LESS* files
and only copy your *JS* files in `/static/public` folder.
It won’t concat nor uglify your JS. Then *Twig* will automatically parse
*Grunt* assets configuration to render a `<script>` tag for each of your dependencies.

#### In production mode

When you execute a `grunt` command, *Grunt* will compile your *LESS* files
and it will concat and uglify *Bower* dependencies and your own *JS* files into
`/static/public` folder. As in development mode, *Twig* will automatically parse your assets to
insert as many `<script>` and `<link>` tags as needed.

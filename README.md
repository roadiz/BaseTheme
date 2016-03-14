# Blank Roadiz theme

This theme is meant to get a **fresh start** to create a custom website.

* **Find and replace** `BaseTheme` over this folder using your own theme name
* Rename `BaseThemeApp.php`, javascript files (`static/src/pages/` & `static/src/pages/blocks/`) and this folder according to your theme name
* Do not forget to `npm install` in your `static` folder.

A common node-type called *Page* will be installed with this theme, his controller is located 
in `Controllers/PageController.php` and his twig template in `Resources/views/types/page.html.twig`.
We also created a LESS (`static/less/pages/page.less`) and a javascript file (`static/src/pages/base-theme-page.class.js`) for this node-type.

If you need others node-type, duplicate theses files and rename them.

## Extrenal JS framework

Base theme uses *Gulp* and *Bower* to deal with front development files.
We chose to use **ES6 javascript** transpiled with *Babel* and loaded via *RequireJS*.

Then we externalized all the JS logic and routing system into https://github.com/rezozero/pageblock-framework
so that your theme only host specific JS code and will be able to easily upgrade common JS features.

We encourage to see Page-Block README: https://github.com/rezozero/pageblock-framework/blob/master/README.md

### Bootstrap

We use *Bootstrap* right in BaseTheme but you can choose what feature to include in your style not to bloat your CSS files. 
We recommend to use *LESS* version to ignore unnecessary modules.
Open your `static/less/styles.less` and comment/uncomment your *Bootstrap*
modules files, you even can override *Bootstrap* variables.

### Gulp

This blank theme uses *Gulp* to manage your LESS, JS and CSS files. 
When you set it up, Gulp will generate versioned CSS and JS files to 
be properly served over browser caches.

* Install *NodeJS* - http://nodejs.org/
* Install *Bower* - http://bower.io/
* Install *gulp-cli* - http://gruntjs.com/getting-started#installing-the-cli
* Install theme development tools `npm install`
* Install bower theme dependancies `bower install`

Then you can launch *Gulp* in background to listen every file update: this command will
generate development CSS file (with source-map and not-minified)

```shell
gulp watch
```

And when you need to prepare files for production: this command will generate prod CSS
files (no source-map and minified)

```shell
gulp
```

### Versioning

Versioning is really important in order to avoid browser and public cache problems after
a site update.

Gulp will generate a `/build` folder for optimized JS file and a `/css` for CSS files, all files
will have random generated name suffix. Then *Gulp* will inject these files directly into your
`base.html.twig` template at each change.

For *LESS* files, it’s a bit different. To add a new *LESS* file, just include it in `/static/less/style.less`
file, which is your main project stylesheet. For *Bower* stylesheet, just do the same in `/static/less/vendor.less`.
Do not forget to use `@import (inline)` syntax to force *LESS* compiler to include files contents if 
you want to import plain CSS files.

#### In development mode

When you work with `gulp watch` running in background, *Gulp* will only compile your *LESS* files in `/static/css` folder 
and transpile your ES6 javascript files into `/dist` folder. It won’t optimize nor uglify your JS. 

#### In production mode

When you execute a `gulp` command, *Gulp* will compile your *LESS* files
and it will optimize your *RequireJS* tree with your *Bower* dependencies and your own *JS* files into
`/static/build` folder. As in development mode, *Twig* will automatically inject your assets to
insert as many `<script>` and `<link>` tags as needed.

# Blank Roadiz theme

This theme is meant to get a **fresh start** to create a theme.
*No node-type will be shipped and no node too.*

* **Find and replace** `BaseTheme` over this folder using your own theme name
* Rename `BaseThemeApp.php` and this folder according to your theme name
* Do not forget to `npm install` in your `static` folder.

To begin with dynamic routing, create a node-type in your back-office. Then duplicate
our `Controllers/ExampleController.php` file. Rename it (file + classname + extends).
You can repeat this process for every node-types you create.

### Grunt

This blank theme uses *Grunt* to manage your LESS, JS and CSS files. When setup, Grunt will
generate versioned CSS and JS files to be properly served over browser caches.

* Install *NodeJS* - http://nodejs.org/
* Install *grunt-cli* - http://gruntjs.com/getting-started#installing-the-cli
* Install theme dependencies `npm install`

Then you can launch *Grunt* in background to listen every file update: this command will
generate development CSS file (with source-map and not-minified)

```
grunt watch
```

And when you need to prepare files for production: this command will generate prod CSS
files (no source-map and minified)

```
grunt
```

### Versioning

Versioning is really important in order to avoid browser and public cache problems after
a site update.

Grunt will generate a public folder for you containing randomly named CSS and JS files.
It will generate a `/static/public/config/assets.config.php` file too which tell
your *Twig* template what files to import.
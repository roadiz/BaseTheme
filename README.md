# Base Roadiz theme

[![Build Status](https://travis-ci.org/roadiz/BaseTheme.svg?branch=master)](https://travis-ci.org/roadiz/BaseTheme)

This theme is meant to get a **fresh start** to create a custom website on *Roadiz*.

## Get started

Make sure that *NodeJS*, *NPM* and *Yarn* are installed on your machine.

Generate a new theme with *Test* as your theme prefix

```bash
bin/roadiz themes:generate --relative --symlink Test
cd themes/TestTheme
# Install JS dependencies with npm or Yarn
yarn && yarn run build
```

We provide a starter kit based on ES6 with *Webpack*, *VueJS*, *Scss*, *Typescript*. Feel free to adapt it if you have your own coding workflow. Keep in mind that we inject built CSS and JS into partial *Twig* templates to get versioned file names.

### Register BaseTheme services

Base service will provide some Twig image formats and a PathGeneration subscriber for `NSLink` node-type.
This will also register new asset package to be able to use `{{ asset('js/file.js', 'BaseTheme') }}` *Twig* function.

**Do not forget** to add the following lines to your `app/AppKernel.php` file:

```php
// app/AppKernel.php

public function register(\Pimple\Container $container)
{
    parent::register($container);

    /*
     * Add your own service providers.
     */
    $container->register(new \Themes\BaseTheme\Services\BaseThemeServiceProvider());
}
```

### Install front dependencies
```
cd themes/TestTheme
yarn
```

### Change front config (proxy)
```typescript
// themes/TestTheme/vue.config.js
// Change followed line to match with your php local server ip

//...
{
    target: 'http://0.0.0.0:8091'
}
//...
```

You can use your Roadiz `.env` to expose `APP_PORT` variable.

### Compiles and hot-reloads for development
```
yarn serve
## Then open `0.0.0.0:8080/dev.php`
```

### Basic dev with watch mode (no live reload)
```
yarn dev
```

### Compiles and minify for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Analyse build files
```
yarn analyse
```

Two files will be generated in static folder

### Utils

`@/` or `~/` can be used for root sources access
Example: `import EventBus from '~/utils/EventBus'`
Or: `import { SWIPER } from '@/config/contants'` 

## Syntax

We use decorators and vue class component, see : 
https://github.com/vuejs/vue-class-component
https://github.com/kaorun343/vue-property-decorator

It also possible to use `jsx`. You just need to create file with `.tsx` extension do not forget to create a `render` function.

## Dynamic component import

You can dynamically import component as follow
```typescript
// ...
import MainNavigation from './components/Navigation/Navigation'

@Component({
    components: {
        // Standard import
        MainNavigation,
        // Dynamic import with component naming (for browser dev tools)
        // If you prefix the component with "async-" the component will be not prefetch
        // To disable prefetch use: /* webpackChunkName: "async-group-carousel" */ 
        GroupCarousel: () => import(/* webpackChunkName: "group-carousel" */'./components/GroupCarousel/GroupCarousel')
    }
})
export default class App extends Vue {
    // ...
}
```

Dynamic components will be automatically loaded when corresponding tag are founded

## Guidelines

#### General

If you need to use utility library like `lodash`, please import only required functions (for treeshaking)
Example:
```typescript
import map from 'lodash/map'
// or
import uniq from 'lodash/uniq'
```

#### Twig

Use snake case to name your block in twig file  
Ex:
```twig
{% block inner_content %}
    {# ... #}
{% endblock %}
```

Use single quotes  (for visibility between variables and declarations)
Ex:
```twig
{% include '@TestTheme/svg/use.svg.twig' with {
    'icon': 'facebook'
} only %}
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Boilerplate

BaseTheme will provide you some ready-made *Twig* templates, styles and ES6 classes.

- A page node-type is available with its Twig template.
- A link node-type is available with its Twig template and its event subscriber to rewrite URL. 
- A content block is available with its Twig template.
- A map block is available with its Twig template. All you need is to create the node-type in your Roadiz back-office.
- A contact form block is available with its controller and Twig templates. 

#### Node-types

A common node-type called *Page* will be installed with this theme, his controller is located 
in `Controllers/PageController.php` and his twig template in `Resources/views/types/page.html.twig`.
If you need others node-type, duplicate theses files and rename them.

#### Blueprints, UI and grid helpers

BaseTheme has several frontend helpers available from keystrokes `8`, `9` and `0` when you are using Roadiz `devMode`:

- `8` will display your blueprints images over you website.
- `9` will display your UI components 
- `0` will display your grid

Change these helpers in `@BaseTheme/dev/dev.html.twig` template

## Contributing

See [Contributing guidelines](./CONTRIBUTING.md)


# Contributing to BaseTheme

BaseTheme is built upon `Twig`, `Webpack`, `ES6` and `SCSS`. If you want to 
take part in improving our *Roadiz* theme boilerplate, we encourage you to know 
a minimum about these frontend technologies.

We keep this theme starter as fresh as possible and some technology choices 
may changes among time. 

## Ignored files

**Be careful:** by default, all built files are ignored from *Git*
history so that they don’t annoy developers team when merging code. **But** when you 
need to improve this *BaseTheme* you’ll need to `git add --force` these file to make
them available when somebody clone or generate a theme with Roadiz for the first
time.

We provide `npm run add-force` so you can easily add these files to git.

Build files added by npm task :  
`/static/js/*`  
`/static/build/*`  
`/static/css/*`  
`/static/img/*`  
`/static/vendors/*`  
`/static/fonts/*`  
`/Resources/views/svg/sprite.svg.twig`  
`/Resources/views/partials/css-inject.html.twig`  
`/Resources/views/partials/js-inject.html.twig`  

These files **MUST** be available on `master` or `develop` branch at any time.
Even if they are *gitignored*, they are needed for *Roadiz* to display your theme.

## Use EditorConfig 

We added an `.editorconfig` file to make developers use the same codestyle. Please
install the plugin if you’re working with *Atom*, *Sublime Text*, … editors.

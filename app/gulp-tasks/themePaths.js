const themePaths = {
    'entry': 'app/src/main.js',
    'entryStyle': [
        'app/less/style.less',
        'app/less/vendor.less'
    ],
    'distScripts': 'static/js',
    'distStyles': 'static/css',
    'distImages': 'static/img',
    'scripts': [
        'app/src/**/*.js'
    ],
    'styles': [
        'app/less/**/*.less'
    ],
    'svg': [
        'app/src-svg/**/*.svg'
    ],
    'images': [
        'app/src-img/**/*'
    ],
    'injectedFiles': [
        'static/build/*',
        'static/js/*',
        'static/css/vendor-*.css',
        'static/css/style-*.css'
    ],
    'svgSpriteFolder': './Resources/views/svg',
    'svgSpriteFilename': 'sprite.svg.twig',
    'injectFilePath': './Resources/views/partials',
    'cssFilePath': '/css-inject.html.twig',
    'jsFilePath': '/js-inject.html.twig',
};

export default themePaths;

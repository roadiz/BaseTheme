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
        'static/js/*.js',
        'static/css/*.css',
    ],
    'svgSpriteFolder': './Resources/views/svg',
    'svgSpriteFilename': 'sprite.svg.twig',
    'injectFilePath': './Resources/views/partials',
    'cssFilePath': '/css-inject.html.twig',
    'jsFilePath': '/js-inject.html.twig',
};

export default themePaths;

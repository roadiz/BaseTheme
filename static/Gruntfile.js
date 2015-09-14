module.exports = function(grunt) {
    require('jit-grunt')(grunt,
    {
        versioning: 'grunt-static-versioning'
    });

    function objectify(array){
        var objectArray = [];
        for(var i in array){
            objectArray[i] = {
                'src':[array[i]],
                'dest':array[i]
            };
        }

        return objectArray;
    }

    var vendorFiles = [
        "bower_components/gsap/src/minified/TweenMax.min.js",
        "bower_components/gsap/src/minified/plugins/ScrollToPlugin.min.js",
        "bower_components/jquery.actual/jquery.actual.min.js",
        "bower_components/isMobile/isMobile.min.js",
        "bower_components/waitForImages/dist/jquery.waitforimages.min.js",
        "bower_components/bootstrap/js/collapse.js"
    ];

    var vendorFilesObject = objectify(vendorFiles);

    var distFiles = [
        "js/vendor/cookiechoices.js",
        "js/plugins.js",

        "js/pages/abstract-page.class.js",
        "js/pages/page.class.js",

        "js/blocks/abstract-block.class.js",
        "js/blocks/basicblock.class.js",
        "js/blocks/mapblock.class.js",

        "js/history.class.js",
        "js/nav.class.js",
        "js/main.js"
    ];

    var distFilesObject = objectify(distFiles);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
            },
            vendor: {
                src: vendorFiles,
                dest: 'dist/<%= pkg.name %>-vendor.js',
            },
            dist: {
                src: distFiles,
                dest: 'dist/<%= pkg.name %>.js',
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            vendor: {
                src: 'dist/<%= pkg.name %>-vendor.js',
                dest: 'dist/<%= pkg.name %>-vendor.min.js'
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false,
                    sourceMap: true
                },
                files:
                {
                    "dist/vendor.min.css" : "css/vendor.less",
                    "dist/style.min.css" : "css/style.less"
                }
            },
            production: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 3,
                    sourceMap: false
                },
                files:
                {
                    "dist/vendor.min.css" : "css/vendor.less",
                    "dist/style.min.css" : "css/style.less"
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    'js/**/*.js',
                    '!js/<%= pkg.name %>.js',
                    '!js/<%= pkg.name %>.min.js',
                    'css/**/*.less',
                    'src-img/**/*.{png,jpg,gif}',
                ],
                tasks: ['less:development', 'jshint', 'concat','uglify'],
                options: {
                    event: ['added', 'deleted', 'changed'],
                },
            },
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'js/*.js',
                'js/*/*.js',
                '!dist/*.js',
                '!js/plugins.js',
                '!js/vendor/*.js'
            ]
        },
        imagemin: {
            dynamic: {
                options: {                          // Target options
                    optimizationLevel: 4,
                },                                  // Another target
                files: [{
                    expand: true,                   // Enable dynamic expansion
                    cwd: 'src-img/',                // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],    // Actual patterns to match
                    dest: 'img/'                    // Destination path prefix
                }]
            }
        },
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer-core')({browsers: ['last 3 version', 'ie 9']}),
                    require('csswring').postcss
                ]
            },
            dist: {
                src: 'dist/style.min.css'
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    },
                    {
                        removeUselessStrokeAndFill: true
                    }
                ]
            },
            dist: {
                expand: true,
                cwd: 'src-svg',
                src: ['*.svg'],
                dest: 'svg',
            }
        },
        svgstore: {
            options: {
                cleanup:[
                    'fill',
                    'fill-rule',
                    'clip-rule',
                ],
                cleanupdefs:true,
                includeTitleElement:false,
                prefix:'base-icon-'
            },
            default : {
                files: {
                    '../Resources/views/svg/sprite.svg.twig': ['svg/*.svg'],
                },
            },
        },
        versioning: {
            options: {
                cwd: 'public',
                outputConfigDir: 'public/config',
                output: 'php'
            },
            development: {
                files: [
                    {
                        assets: vendorFilesObject,
                        key: 'global',
                        dest: '',
                        type: 'js',
                        ext: '.min.js'
                    },
                    {
                        assets: distFilesObject,
                        key: 'global',
                        dest: '',
                        type: 'js',
                        ext: '.min.js'
                    },
                    {
                        assets: [
                            {
                                src:['dist/vendor.min.css'],
                                dest:'dist/vendor.min.css'
                            }
                        ],
                        key: 'global',
                        dest: '',
                        type: 'css',
                        ext: '.css'
                    },
                    {
                        assets: [
                            {
                                src:['dist/style.min.css'],
                                dest:'dist/style.min.css'
                            }
                        ],
                        key: 'global',
                        dest: '',
                        type: 'css',
                        ext: '.css'
                    }
                ]
            },
            production: {
                files: [{
                    assets: [{
                        src: [ 'dist/<%= pkg.name %>-vendor.min.js' ],
                        dest:'dist/<%= pkg.name %>-vendor.min.js'
                    }],
                    key: 'global',
                    dest: '',
                    type: 'js',
                    ext: '.min.js'
                },{
                    assets: [{
                        src: [ 'dist/<%= pkg.name %>.min.js' ],
                        dest:'dist/<%= pkg.name %>.min.js'
                    }],
                    key: 'global',
                    dest: '',
                    type: 'js',
                    ext: '.min.js'
                },
                {
                    assets: [{
                        src: [ 'dist/vendor.min.css' ],
                        dest:'dist/vendor.min.css'
                    }],
                    key: 'global',
                    dest: '',
                    type: 'css',
                    ext: '.css'
                },{
                    assets: [{
                        src: [ 'dist/style.min.css' ],
                        dest:'dist/style.min.css'
                    }],
                    key: 'global',
                    dest: '',
                    type: 'css',
                    ext: '.css'
                }]
            }
        },
        clean: ["public"],
        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['dist/style.min.css.map'],
                        dest: 'public/',
                        filter: 'isFile'
                    },
                    {
                        expand: false,
                        flatten: true,
                        src: 'bower_components/bootstrap/dist/css/bootstrap.css.map',
                        dest: 'public/bootstrap.css.map',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        src: ['dist/vendor.min.css.map'],
                        dest: 'public/',
                        filter: 'isFile'
                    },
                ],
            },
        }
    });

    grunt.loadNpmTasks('grunt-postcss');

    /*
     * Watch differently LESS, JS & imagemin
     */
    grunt.event.on('watch', function(action, filepath) {
        if (filepath.indexOf('.js') > -1 ) {
            grunt.config('watch.scripts.tasks', ['clean','jshint','versioning:development', 'copy']);
        }
        else if(filepath.indexOf('.less') > -1 ){
            grunt.config('watch.scripts.tasks', ['clean','less:development', 'postcss','versioning:development', 'copy']);
        }
        else if( filepath.indexOf('.png') > -1  ||
            filepath.indexOf('.jpg') > -1  ||
            filepath.indexOf('.gif') > -1 ){
            grunt.config('watch.scripts.tasks', ['imagemin']);
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify', 'less:production', 'postcss', 'versioning:production', 'copy', 'svgmin', 'svgstore']);
};

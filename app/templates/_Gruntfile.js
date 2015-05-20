// Generated on <%= (new Date).toISOString().split('T')[0] %> using
// <%= pkg.name %> <%= pkg.version %>
// JSHint settings
/* jshint camelcase: false, es3: false */
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // Get devDependencies
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });

    // Displays the execution time of grunt tasks
    require('time-grunt')(grunt);

    // Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Need a copy to handle release tasks
        pkpCopy: grunt.file.readJSON('package.json'),

        // Configurable paths
        config: {
            app: 'assets',
            dist: '<%= distDirectory %>',
            reports: '<%= reportsDirectory %>',
            docs: '<%= docsDirectory %>',
            vendor: '<%= bowerComponentsDirectory %>',
        },

        // List available tasks
        availabletasks: {
            tasks: {
                options: {
                    filter: 'include',
                    tasks: [
                        'default',
                        'dev',
                        'server',
                        'watch',
                        'build',
                        'checkBuild',
                        'plato',
                        'jsdoc',
                        'sync',
                        'releasePatch',
                        'releaseMinor',
                        'releaseMajor',
                        'lint'
                    ],
                    descriptions: {
                        'watch': '`grunt watch` run dev tasks whenever watched files change and ' +
                            'Reloads the browser with »LiveReload« plugin.',
                        'jsdoc': '`grunt jsdoc` generates source documentation using jsdoc.',
                        'plato': '`grunt plato` generates static code analysis charts with plato.'
                    },
                    groups: {
                        'Dev': ['default', 'dev', 'sync', 'server', 'watch', 'plato', 'jsdoc', 'lint'],
                        'Production': ['build', 'checkBuild', 'releasePatch', 'releaseMinor', 'releaseMajor'],
                    },
                    sort: [
                        'default',
                        'dev',
                        'sync',
                        'plato',
                        'jsdoc',
                        'server',
                        'watch',
                        'build',
                        'checkBuild',
                        'releasePatch',
                        'releaseMinor',
                        'releaseMajor'
                    ]
                }
            }
        },

        // jsHint
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc',
                ignores: ['<%%= config.app %>/js/*.min.js']
            },
            all: [
                'Gruntfile.js',
                '<%%= config.app %>/js/*.js'
            ]
        },

        // uglify
        uglify: {
            options: {
                banner: '/*! <%%= pkg.title %> - v<%%= pkg.version %>\n' +
                    ' * webmaster@hanos.nl\n' +
                    ' * Copyright ©<%%= grunt.template.today("yyyy") %> HANOS Internationale Horeca Groothandel\n' +
                    ' * <%%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    ' */',
                sourceMap: true,
                sourceMapIncludeSources: true,
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            },
            minify: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/js',
                    src: ['{,*/}*.js', '!{,*/}*.min.js'],
                    dest: '<%%= config.dist %>/assets/js',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            },
            concatenate: {
                files: {
                    '<%%= config.dist %>/assets/js/built.min.js': ['<%%= config.dist %>/assets/js/{,*/}*.js']
                }
            },
            bower: {
                options: {
                    sourceMap: false,
                    banner: '/*! <%%= pkg.title %> - v<%%= pkg.version %>\n' +
                        ' * webmaster@hanos.nl\n' +
                        ' * – Concatenated libs –  \n' +
                        ' * Copyright ©<%%= grunt.template.today("yyyy") %> HANOS Internationale Horeca Groothandel\n' +
                        ' * <%%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        ' */\n',
                },
                files: {
                    '<%%= config.dist %>/libs/libs.js': ['<%%= config.dist %>/libs/libs.js']
                }
            }
        },
        <% if (includeSass) { %>
        compass: {
            options: {
                sassDir: '<%%= config.app %>/scss',
                /*cssDir: '.tmp/styles',*/
                cssDir: '<%%= config.app %>/css',
                generatedImagesDir: '<%%= config.app %>/img/generated',
                imagesDir: '<%%= config.app %>/img',
                javascriptsDir: '<%%= config.app %>/js',
                fontsDir: '<%%= config.app %>/fonts',
                importPath: '<%%= config.vendor %>',
                httpImagesPath: '../img',
                httpGeneratedImagesPath: '../img/generated',
                httpFontsPath: '../../fonts',
                relativeAssets: false,
                assetCacheBuster: false

            },
            dist: {
                options: {
                    generatedImagesDir: '<%= config.dist %>/assets/img/generated',
                    imagesDir: '<%= config.dist %>/assets/img',
                    fontsDir: '<%= config.dist %>/assets/fonts',
                    httpFontsPath: '../fonts',
                    relativeAssets: false
                }
            },
            server: {
                options: {
                    debugInfo: true,
                    environment: 'development',
                    noLineComments: true, //Disable line comments.
                    outputStyle: 'expanded',
                    relativeAssets: true,
                }
            },
            sourcemap: {
                options: {
                    sourcemap: true
                }
            }
        },
        <% } else { %>
        // less
        less: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: '<%%= config.app %>/css/index_raw.css.map',
                    sourceMapURL: 'index_raw.css.map',
                    sourceMapRootpath: '../../'
                },
                files: {
                    '<%%= config.app %>/css/index_raw.css': '<%%= config.app %>/less/index.less'
                }
            }
        },
        <% } %>

        autoprefixer: {
            options: {
                browsers: [
                    '> 1%',
                    'last 3 version',
                    'ie 8',
                    'ie 9',
                    'Firefox ESR',
                    'Opera 12.1'
                ],
                // diff: true, // or 'custom/path/to/file.css.patch',
                map: true
            },
            dev: {
                src: '<%%= config.app %>/css/index_raw.css',
                dest: '<%%= config.app %>/css/index.css'
            }
        },

        clean: {
            less: ['<%%= config.app %>/css/index_raw.*'],
            scss: ['<%%= config.app %>/css/index_raw.*'],
            js: ['<%%= config.app %>/js/{,*/}*min.js*'],
            dist: ['<%%= config.dist %>'],
            temp: ['temp'],
        },

        // Local dev server
        connect: {
            dev: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                    open: {
                        target: 'http://<%%= connect.dev.options.hostname %>:' +
                            '<%%= connect.dev.options.port %>',
                    },
                }
            },
            sync: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                }
            },
            dist: {
                options: {
                    port: 9002,
                    hostname: 'localhost',
                    base: '<%%= config.dist %>',
                    keepalive: true,
                    open: {
                        target: 'http://<%%= connect.dev.options.hostname %>:' +
                            '<%%= connect.dist.options.port %>',
                    },
                }
            }
        },

        uncss: {
            options: {
                ignoreSheets: [/fonts.googleapis/],
            },
            dist: {
                src: '*.html',
                dest: 'temp/index.css'
            }
        },

        cssmin: {
            assets: {
                options: {
                    keepSpecialComments: 0
                },
                files: {
                    '<%%= config.dist %>/assets/css/index.uncss.min.css': ['temp/index.css'],
                    '<%%= config.dist %>/assets/css/index.min.css': ['<%%= config.app %>/css/index.css'],
                }
            },
            bower: {
                options: {
                    keepSpecialComments: 0
                },
                files: {
                    '<%%= config.dist %>/libs/libs.css': ['<%%= config.dist %>/libs/libs.css']
                }
            }
        },

        usebanner: {
            assets: {
                options: {
                    banner: '/*! <%%= pkg.title %> - v<%%= pkg.version %>\n' +
                        ' * m.kuehnel@micromata.de\n' +
                        ' * Copyright ©<%%= grunt.template.today("yyyy") %> Micromata GmbH\n' +
                        ' * <%%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        ' */'
                },
                files: {
                    src: [
                        '<%%= config.dist %>/assets/css/index.uncss.min.css',
                        '<%%= config.dist %>/assets/css/index.min.css'
                    ]
                }
            },
            bower: {
                options: {
                    banner: '/*! <%%= pkg.title %> - v<%%= pkg.version %>\n' +
                        ' * webmaster@hanos.nl\n' +
                        ' * – Concatenated libs –  \n' +
                        ' * Copyright ©<%%= grunt.template.today("yyyy") %> HANOS Internationale Horeca Groothandel\n' +
                        ' * <%%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        ' */'
                },
                files: {
                    src: ['<%%= config.dist %>/libs/libs.css']
                }
            }
        },

        imagemin: {
            dist: {
                options: {},
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: '<%%= config.app %>/img', // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
                    dest: '<%%= config.dist %>/assets/img' // Destination path prefix
                }]
            }
        },

        processhtml: {
            dist: {
                files: [{
                    expand: true,
                    src: [
                        '*.html'
                    ],
                    dest: '<%%= config.dist %>/'
                }, ]
            }
        },

        copy: {
            assets: {
                files: [{
                    expand: true,
                    dot: true,
                    dest: '<%%= config.dist %>/',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '<%%= config.app %>/css/*.min.css',
                        '<%%= config.app %>/fonts/{,*/}*',
                        '<%%= config.app %>/img/{,*/}*.{gif,jpeg,jpg,png,webp,svg}' <% if (oldIeSupport) { %> ,
                            // Bower libs needed for oldIEs. The rest is concatenated via the bower_concat task.
                        '<%%= config.vendor %>/html5shiv/dist/html5shiv-printshiv.min.js',
                        '<%%= config.vendor %>/respondJs/dest/respond.min.js' <% } %>
                    ]
                }, <% if (includeSass) { %> {
                //for bootstrap sass fonts
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.vendor %>/bootstrap-sass/assets',
                    src: ['fonts/*.*'],
                    dest: '<%%= config.dist %>/'
                } <% } else { %> {
                //for bootstrap less fonts
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.vendor %>/bootstrap/dist',
                    src: ['fonts/*.*'],
                    dest: '<%%= config.dist %>/'
                } <% } %>
                ]
            },
            styles: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.vendor %>/font-awesome/css',
                    dest: '<%%= config.app %>/fonts/font-awesome/',
                    src: [
                      'font-awesome.css'
                    ]
                }, <% if (includeSass) { %> {
                //for bootstrap sass fonts
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.vendor %>/bootstrap-sass/assets',
                    src: ['fonts/*.*'],
                    dest: '<%%= config.app %>/'
                }, <% } else { %> {
                //for bootstrap less fonts
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.vendor %>/bootstrap/dist',
                    src: ['fonts/*.*'],
                    dest: '<%%= config.app %>/'
                }, <% } %> {
                //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.vendor %>/font-awesome',
                    src: ['fonts/*.*'],
                    dest: '<%%= config.app %>/'
                }]
            }
        },

        bower_concat: {
            dist: {
                // These are minified afterwards with `cssmin:bower` and `uglify:bower`.
                // Because Chrome Dev Tools will throw an 404 regarding the missing sourcemaps if
                // we use the already minified versions. Yep, that’s ugly.
                dest: '<%%= config.dist %>/<%%= config.vendor %>/libs.js',
                cssDest: '<%%= config.dist %>/<%%= config.vendor %>/libs.css',
                include: [
                    'jquery'<% if (includeSass) { %>,
                    'bootstrap-sass'<% } else { %> ,
                    'bootstrap'<% } %><% if (oldIeSupport) { %> ,
                    'jquery-placeholder'<% } %>
                ],
                exclude: [
                <% if (includeModernizr) { %>
                    'modernizr' <% } %>
                ],
                mainFiles: {
                    'jquery': ['dist/jquery.js'], /*<% if (includeModernizr) { %>
                    'modernizr': ['custom/modernizr.js'], <% } %>*/<% if (includeSass) { %>
                    'bootstrap-sass': ['assets/javascripts/bootstrap.js'] <% } else { %>
                    'bootstrap': ['dist/js/bootstrap.js']<% } %>
                }
            }
        },

        jsdoc: {
            dist: {
                src: [
                    '<%%= config.app %>/js/{,*/}*.js',
                    '!<%%= config.app %>/js/{,*/}*.min.js',
                    'test/{,*/}*.js'
                ],
                options: {
                    destination: '<%%= config.docs %>'
                }
            }
        },

        plato: {
            options: {
                jshint: grunt.file.readJSON('.jshintrc')
            },
            dist: {
                files: {
                    '<%%= config.reports %>': [
                        '<%%= config.app %>/js/{,*/}*.js',
                        '!<%%= config.app %>/js/{,*/}*.min.js',
                        'test/{,*/}*.js'
                    ]
                }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '<%%= config.app %>/css/*.css',
                        '<%%= config.app %>/img/**/*.jpg',
                        '<%%= config.app %>/img/**/*.png',
                        '<%%= config.app %>/img/**/*.gif',
                        '<%%= config.app %>/js/{,*/}*.js',
                        '*.html'
                    ]
                },
                options: {
                    proxy: '<%%= connect.dev.options.hostname %>:' +
                        '<%%= connect.dev.options.port %>',
                    watchTask: true,
                }
            }
        },

        compress: {
            dist: {
                options: {
                    archive: 'dist-v<%%= pkg.version %>.zip'
                },
                files: [{
                    src: ['<%%= config.dist %>/**'],
                    dest: './'
                }]
            },
            src: {
                options: {
                    archive: 'src-v<%%= pkg.version %>.zip'
                },
                files: [{
                        src: ['./*', '!./*.zip', '!./*.sublime*', ],
                        dest: './',
                        filter: 'isFile'
                    }, // includes files in path
                    {
                        src: ['<%%= config.app %>/**', '!<%%= config.app %>/css/**'],
                        dest: './'
                    }, // includes files in path and its subdirs
                ]
            }
        },
        <% if (includeModernizr) { %>
        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            devFile: '<%%= config.vendor %>/modernizr/modernizr.js',
            outputFile: '<%%= config.build %>/<%%= config.vendor %>/modernizr/modernizr.js',
            extra: {
                'shiv': true,
                'printshiv': false,
                'load': true,
                'mq': false,
                'cssclasses': true
            },
            extensibility: {
                'addtest': true,
                'prefixed': false,
                'teststyles': false,
                'testprops': false,
                'testallprops': false,
                'hasevents': false,
                'prefixes': false,
                'domprefixes': false
            },
            files: [
                '<%%= config.dist %>/js/{,*/}*.js',
                '<%%= config.dist %>/styles/{,*/}*.css',
                '!<%%= config.dist %>/scripts/vendor/*'
            ],
            uglify: true
        },
        <% } %>
        <% if (includeJade) { %>
        jade: {
            compile: {
                options: {
                    data: {
                        debug: true,
                        pretty: true
                    }
                },
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: '<%%= config.app %>/views', // Src matches are relative to this path.
                    src: ['*.jade', '!*/*.jade'],
                    //dest: '<%%= config.app %>', // Destination path prefix.
                    ext: '.html' // Dest filepaths will have this extension.
                }]
            }
        },
        <% } %>
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                // commit: false,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json', 'CHANGELOG.md'],
                // createTag: false,
                tagName: '%VERSION%',
                tagMessage: 'Version v%VERSION%',
                push: false,
                // pushTo: 'origin',
                // gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        },

        changelog: {
            release: {
                options: {
                    fileHeader: '# Changelog',
                    logArguments: [
                        '--pretty=%h - %ad: %s',
                        '--no-merges',
                        '--date=short'
                    ],
                    after: '<%%= pkpCopy.version %>',
                    dest: 'CHANGELOG.md',
                    insertType: 'prepend',
                    template: '## Version <%%= pkg.version %> ({{date}})\n\n{{> features}}',
                    featureRegex: /^(.*)$/gim,
                    partials: {
                        features: '{{#if features}}{{#each features}}{{> feature}}{{/each}}{{else}}{{> empty}}{{/if}}\n',
                        feature: '- {{{this}}}\n'
                    }
                }
            }
        },

        htmllint: {
            options: {
                ignore: ['Bad value “X-UA-Compatible” for attribute “http-equiv” on XHTML element “meta”.']
            },
            all: ['*.html']
        },

        bootlint: {
            options: {
                stoponerror: true
            },
            files: ['*.html']
        },

        githooks: {
            options: {
                hashbang: '#!/bin/sh',
                template: 'node_modules/grunt-githooks/templates/shell.hb',
                startMarker: '## GRUNT-GITHOOKS START',
                endMarker: '## GRUNT-GITHOOKS END',
                command: 'PATH=' + process.env.PATH + ' grunt',
                args: '--no-color'
            },
            install: {
                'post-merge': 'shell:bowerinstall'
            }
        },

        shell: {
            bowerinstall: {
                command: 'bower install'
            }
        },

        // watch
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['<%%= config.app %>/js/{,*/}*.js'],
                tasks: ['newer:jshint'],
                options: {
                    spawn: false
                }
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false
                }
            },
            <% if (includeSass) { %>
            compass: {
                files: ['<%%= config.app %>/scss/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer', 'compass:sourcemap'],
                options: {
                    spawn: false
                }
            }, <% } else { %>
            css: {
                files: ['<%%= config.app %>/less/{,*/}*.less'],
                tasks: ['less:dev', 'autoprefixer', 'clean:less'],
                options: {
                    spawn: false
                }
            }, 
            <% } %>
            html: {
                files: ['*.html'],
                tasks: ['newer:htmllint', 'newer:bootlint'],
                options: {
                    spawn: false,
                }
            },
            <% if (includeJade) { %>
            jade: {
                files: ['<%%= config.app %>/views/{,*/}*.jade'],
                tasks: ['newer:jade'],
                options: {
                    // nospawn: false
                }
            },
            <% } %>
        }

    });

    // List available Tasks
    grunt.registerTask('tasks',
        '`grunt tasks` shows all tasks which are registered for use.', ['availabletasks']
    );

    // Lint files
    grunt.registerTask('lint',
        '`grunt lint` lints JavasScript (JSHint) and HTML files (validate and Bootlint)', [
            'htmllint',
            'bootlint',
            'jshint'
        ]
    );

    /**
     * A task for development
     */
    grunt.registerTask('dev',
        '`grunt dev` will hint your files, build sources within the ' +
        'assets directory and generating docs / reports.', [
            <% if (includeJade) { %>'jade',<% } %>
            'lint',
            <% if (includeSass) { %>'compass:server',<% } else { %>'less:dev',<% } %>
            'copy:styles',
            'autoprefixer',
            <% if (includeSass) { %>'compass:sourcemap',<% } %>
            <% if (includeSass) { %>'clean:scss',<% } else { %>'clean:less',<% } %>
            'plato',
            'jsdoc',
        ]
    );

    // Start dev server and watching files
    grunt.registerTask('server',
        '`grunt server` starts a local dev server and runs `grunt watch`', [
            'connect:dev',
            'watch'
        ]
    );

    // Start browser sync and watching files
    grunt.registerTask('sync',
        '`grunt sync` starts a local dev server, sync browsers and runs `grunt watch`', [
            'dev',
            'connect:sync',
            'browserSync',
            'watch'
        ]
    );

    // Default task
    grunt.registerTask(
        'default',
        'Default Task. Just type `grunt` for this one. Calls `grunt dev` first ' +
        'and `grunt server` afterwards.', [
            'dev',
            'server'
        ]
    );

    /**
     * A task for your production ready build
     */
    grunt.registerTask('build',
        '`grunt build` builds production ready sources to dist directory.', [
            'clean:dist',
            <% if (includeJade) { %>'jade',<% } %>
            'lint',
            'uglify:minify',
            'uglify:concatenate',
            <% if (includeSass) { %>'compass:dist',<% } else { %>'less:dev',<% } %>
            'autoprefixer',
            <% if (includeSass) { %>'clean:scss',<% } else { %>'clean:less',<% } %>
            'uncss',
            'cssmin:assets',
            'imagemin',
            'processhtml',
            <% if (includeModernizr) { %>'modernizr', <% } %>
            'copy:assets',
            'bower_concat',
            'uglify:bower',
            'cssmin:bower',
            'usebanner',
            'clean:temp',
            'plato',
            'jsdoc'
        ]
    );

    // Start server to check production build
    grunt.registerTask('checkBuild',
        '`grunt checkBuild` starts a local server to make it possible to check ' +
        'the build in the browser.', ['connect:dist']
    );

    // Relase tasks
    grunt.registerTask('releasePatch',
        '`grunt releasePatch` builds the current sources, bumps version number (0.0.1) and creates zip.files.', ['bump-only:patch', 'build', 'clean:js', 'changelog', 'bump-commit', 'compress']
    );
    grunt.registerTask('releaseMinor',
        '`grunt releaseMinor` builds the current sources, bumps version number (0.1.0) and creates zip.files.', ['bump-only:minor', 'build', 'clean:js', 'changelog', 'bump-commit', 'compress']
    );
    grunt.registerTask('releaseMajor',
        '`grunt releaseMajor` builds the current sources, bumps version number (1.0.0) and creates zip.files.', ['bump-only:major', 'build', 'clean:js', 'changelog', 'bump-commit', 'compress']
    );

};

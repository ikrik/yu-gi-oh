/*jslint
 node:true
 */
module.exports = function (grunt) {
    'use strict';

    var lessFiles = {
        'public/stylesheets/style.css': 'app/less/style.less'
    };
    var concatCodeFiles = [
        {
            src: [
                'app/js/app.js',
                'app/js/**/*.js'
            ],
            dest: 'public/js/scripts.min.js'
        }
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assets_versioning: {
            options: {
                versionsMapFile: 'versions.map.json'
            },
            less: {
                files: [
                    {src: 'public/stylesheets/style.css', dest: 'public/stylesheets/style.css'}
                ]
            },
            javascript: {
                files: [
                    {src: 'public/js/scripts.min.js', dest: 'public/js/scripts.min.js'}
                ]
            }
        },
        less: {
            production: {
                options: {
                    cleancss: true
                },
                files: lessFiles
            },
            development: {
                options: {
                    cleancss: false,
                    modifyVars: {
                        'static-assets-path': '".."'
                    }
                },
                files: lessFiles
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            mergeCode: {
                files: concatCodeFiles
            },
            mergeDeps: {
                files: [
                    {
                        src: [
                            'bower_components/angular/angular.js',
                            'bower_components/angular-animate/angular-animate.js',
                            'bower_components/angular-aria/angular-aria.js',
                            'bower_components/async/dist/async.js',
                            'bower_components/angular-material/angular-material.js',
                            'bower_components/angular-material-icons/angular-material-icons.js',
                            'bower_components/angular-ui-router/release/angular-ui-router.js',
                            'bower_components/lodash/lodash.js',
                            'bower_components/restangular/dist/restangular.js',
                            'bower_components/moment/moment.js',
                            'bower_components/ng-focus-if/focusIf.js',
                            'public/js/scripts.min.js'
                        ],
                        dest: 'public/js/scripts.min.js'
                    }
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                mangle: false
            },
            frontend: {
                files: {
                    'public/js/scripts.min.js': ['public/js/scripts.min.js']
                }
            }
        },
        template: {
            options: {
                data: {
                    style: 'style.css',
                    javascript: 'scripts.min.js'
                }
            },
            production: {
                options: {
                    data: {
                        style: "<%= assets_versioning.less.versionsMap[0].versionedPath.replace(/^.*[\\\/]/, '') %>",
                        javascript: "<%= assets_versioning.javascript.versionsMap[0].versionedPath.replace(/^.*[\\\/]/, '') %>"
                    }
                },
                files: [
                    {'public/index.html': ['public/index.html']}
                ]
            },
            development: {
                files: [
                    {'public/index.html': ['public/index.html']}
                ]
            }
        },
        watch: {
            administratorJs: {
                files: ['client/**/*.js'],
                tasks: ['concat:administratorsApp']
            },
            administratorLess: {
                files: ['client/**/*.less'],
                tasks: ['less:development']
            },
            administratorHtml: {
                files: ['client/administrators/partials/**/*.html'],
                tasks: ['copy:administrators_angular_partials']
            },
            css: {
                files: ['less/*.less'],
                tasks: ['less']
            },
            all: {
                // Watch all js/less/html files
                files: ['app/**/*.js', 'app/**/*.less', 'less/*.less'],
                options: {
                    livereload: true
                },
                tasks: ['development', 'postcss']
            }
        },
        jslint: {
            // lint your project's client code
            app: {
                src: 'app/**/*.js',
                directives: {
                    browser: true,
                    predef: [
                        'angular'
                    ]
                },
                options: {
                    edition: 'latest', // specify an edition of jslint or use 'dir/mycustom-jslint.js' for own path
                    log: 'out/client-lint.log',
                    errorsOnly: true // only display errors
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: ['last 2 versions', 'Firefox > 10', 'android 2.3', 'android 4', 'opera 12']}),
                    require('cssnano')() // minify the result
                ]
            },
            all: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/stylesheets',
                        src: ['**/*.css'],
                        dest: 'public/stylesheets'
                    }
                ]
            }
        },
        copy: {
            app_angular_partials: {
                expand: true,
                cwd: 'app/views/',
                src: '**/*.html',
                dest: 'public/views/'
            },
            app_angular_seed: {
                src: 'app/index.html',
                dest: 'public/index.html'
            },
            app_angular_fonts: {
                files: [
                    {expand: true, cwd: 'bower_components/ubuntu-fontface/fonts/', src: '*', dest: 'public/fonts/', flatten: true, filter: 'isFile'}
                    // {expand: true, cwd: 'bower_components/font-awesome/fonts/', src: '*', dest: 'public/fonts/', flatten: true, filter: 'isFile'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-assets-versioning');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('test', ['jslint']);
    grunt.registerTask('default', [
        'concat:mergeCode',
        'concat:mergeDeps',
        'copy',
        'uglify',
        'less:production',
        'assets_versioning',
        'postcss',
        'template:production'
    ]);

    grunt.registerTask('development', [
        'concat:mergeCode',
        'concat:mergeDeps',
        'less:development',
        'copy',
        'template:development'
    ]);
};

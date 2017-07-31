module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            "copy-module": {
                src: 'src/move-es6.js',
                dest: 'dist/module',
                flatten: true,
                expand: true
            },
            "copy-regular": {
                src: 'src/move.js',
                dest: 'dist/',
                flatten: true,
                expand: true
            }
        },
        watch: {
            srcWatch: {
                files: 'src/*.js',
                tasks: ['jshint:def']
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/module/move-min.js': 'dist/module/move.js',
                    'dist/move-min.js': 'dist/move.js'
                }
            }
        },
        jshint: {
            def: {
                src: ['src/*.js'],
                options: {
                    browser: true,
                    devel: true,
                    esversion: 6
                }
            }
        },
        babel: {
            options: {
                presets: ['babel-preset-es2015'],
                sourceMap : false
            },
            dist: {
                files: {
                    'dist/module/move.js': 'src/move-es6.js',
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-babel");
    grunt.registerTask('build', ["jshint:def", "copy:copy-module", "copy:copy-regular", "babel:dist", "uglify:dist"]);
};
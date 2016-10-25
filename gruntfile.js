module.exports = function (grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        copy : {
            "copy-to-dist" : {
                src : 'src/*.js',
                dest :'dist/',
                flatten: true,
                expand: true
            }
        },
        watch :{
            srcWatch:{
                files :'src/*.js',
                tasks : ['jshint:def']
            }
        },
        uglify : {
            dist :{
                files: {
                    'dist/move-min.js': 'dist/*.js'
                }
            }
        },
        jshint : {
            def :{
                src :['src/*.js'],
                options : {
                    browser: true,
                    devel: true,
                    esversion : 6
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.registerTask('dev',["jshint:def"]);
    grunt.registerTask('build',["jshint:def","copy:copy-to-dist","uglify:dist"]);
};
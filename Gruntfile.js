'use strict';

module.exports = function (grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time at the end
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed MIT */\n',
        // Task configuration.
        clean: {
            files: ['dist', 'lib/_bower.js']
        },
        bower_concat: {
            all: {
                dest: 'lib/_bower.js',
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true,
                separator: ';'
            },
            dist: {
                src: ['lib/*.js', 'src/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                src: ['src/**/*.js']
            }
            // test: {
            //     options: {
            //         jshintrc: 'test/.jshintrc'
            //     },
            //     src: ['test/**/*.js']
            // }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src'],
                options: {
                    livereload: true
                }
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test']
            },
            html: {
                files: ['example/*.html'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    hostname: '*',
                    open: true,
                    livereload: 35729,
                    port: 9000
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify']);
    grunt.registerTask('build', ['jshint', 'clean', 'bower_concat','concat', 'uglify']);
    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('test', ['jshint', 'connect']);
};

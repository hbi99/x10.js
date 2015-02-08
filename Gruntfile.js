'use strict';

module.exports = function (grunt) {
	grunt.initConfig({

		// metadata
		pkg : grunt.file.readJSON('package.json'),
		meta: {
			copyright : 'Copyright (c) 2013-<%= grunt.template.today("yyyy") %>',
			banner    : '/* \n' +
						' * x10.js v<%= pkg.version %> \n' +
						' * <%= pkg.description %> \n' +
						' * \n' +
						' * <%= meta.copyright %>, <%= pkg.author.name %> <<%= pkg.author.email %>> \n' +
						' * Licensed under the <%= pkg.license.type %> License \n' +
						' */ \n',
			source    : [
						//	'lib/eval.js',
						//	'lib/worker.js',
							'lib/x10.js'
						]
		},

		// JShint version
		jshint: {
			files: {
				src: '<%= meta.source %>'
			}
		},

		// concatenation source files
		concat: {
			options: {
				stripBanners: 'all',
				banner: '<%= meta.banner %>'
			},
			// concat latest
			latest: {
				src: '<%= meta.source %>',
				dest: 'dist/x10.js'
			}
		},

		// uglifying concatenated file
		uglify: {
			options: {
				banner: '<%= meta.banner %>',
				mangle: true
			},
			// uglify latest
			latest: {
				src: ['<%= concat.latest.dest %>'],
				dest: 'dist/x10.min.js'
			}
		},

		// test tasks
		jasmine: {
			test: {
				src: '<%= meta.source %>',
				options: {
					specs: 'tests/*.js'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('default', [
		'jshint',
	//	'test',
		'concat:latest',
    	'uglify:latest'
	]);

	grunt.registerTask('test', [ 'jasmine' ]);

};


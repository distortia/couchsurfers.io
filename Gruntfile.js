module.exports = function(grunt){

	//configure tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify : {
			build: {
				src: 'scripts/*.js',
				dest: 'js/script.min.js'
			},
			dev: {
				options: {
				beautify: true,
				mangle: false,
				compress: false,
				preserveComments: 'all'
			},
			src: 'scripts/*.js',
			dest: 'js/script.min.js'
			}
		},

		sass: {
			dev: {
				options: {
					style: 'expanded',
					sourcemap: 'none',
				},
				files: {
					'./css/main.css' : 'sass/main.scss'
				}
			},
			build: {
				options:{
					style: 'compressed',
					sourcemap: 'none'
				},
				files: {
					'./css/main.css' : 'src/sass/application.scss'
				}
			}
		},

		jshint : {
			all: ['scripts/script.js', './gruntfile.js']
		},

		watch: {
			options: {
				livereload: true
			},
			html: {
				files: ['index.html'],
			},
			js: {
				files: ['scripts/*.js'],
				tasks: ['uglify:dev','jshint:all']
		    },
			sass: {
				files: ['sass/**/*.scss'],
				tasks: ['sass:dev']
		    }
		}
	});

	//load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	//register tasks
	grunt.registerTask('default', ['uglify:dev','sass:dev']);
	grunt.registerTask('build', ['uglify:build', 'sass:build']);
};

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        options: {
          sourceMap: true
        },
        files: {
          "public/assets/css/main.dev.css": "src/less/main.less"
        }
      },
      production: {
        options: {
					compress: true,
          plugins: [
            new(require('less-plugin-clean-css'))({
              keepSpecialComments: 0
            })
          ]
        },
        files: {
          "public/assets/css/main.min.css": "src/less/main.less"
        }
      }
    },
    postcss: {
      options: {
        map: false, // inline sourcemaps
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'public/assets/css/main.min.css'
      }
    },
		pug: {
			debug: {
				options: {
					pretty: true,
					data: {
						environment: 'development'
					}
				},
				files: [{
					cwd: "src/pug",
					src: "*.pug",
					dest: "src/prehtml",
					expand: true,
					ext: ".html"
				}]
			},
			release: {
				options: {
					pretty: true,
					data: {
						environment: 'production'
					}
				},
				files: [{
					cwd: "src/pug",
					src: "*.pug",
					dest: "src/prehtml",
					expand: true,
					ext: ".html"
				}]
			}
    },
    posthtml: {
      options: {
        use: [
          require('posthtml-bem')({
            elemPrefix: '__',
            modPrefix: '--',
            modDlmtr: '-'
          })
        ]
      },
      build: {
        files: [
          {
						expand: true,
						dot: true,
						cwd: 'src/prehtml/',
						src: ['*.html'],
						dest: 'public'
        	}
        ]
      }
    },
    concat: {
      dist: {
        src: ['src/js/lib/*.js', 'src/js/modules/*.js', 'src/js/app.js'],
        dest: './src/js/temp.js'
      }
    },
    babel: {
			options: {
				sourceMap: false,
				minified: true,
				presets: ['es2015']
			},
			dist: {
				files: {
					'public/assets/js/main.min.js': './src/js/temp.js'
				}
			}
    },
		open : {
			dev : {
				path: 'http://127.0.0.1:9001',
				app: 'Google Chrome'
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'public/'
				}
			}
		},
    watch: {
      scripts: {
        files: ['src/pug/*.pug', 'src/pug/**/*.pug', 'src/less/*.less', 'src/less/**/*.less', 'src/js/**/*.js', 'src/js/*.js'],
        tasks: [ 'pug:debug', 'posthtml','less:development', 'concat', 'babel' ],
        options: {
          spawn: false,
					livereload: true
        }
      }
    }
  });

  // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-posthtml');
  grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default', ['pug:debug', 'posthtml', 'less:development', 'concat', 'babel', 'connect',  'open', 'watch']);
	grunt.registerTask('prod', ['pug:release', 'posthtml', 'less:production', 'concat', 'babel', 'postcss']);


};
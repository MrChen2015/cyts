module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		uglify:{
		options:{
			stripBanners:true,
			banner:'/* <%=pkg.name%>-<%=pkg.version%> <%= grunt.template.today("yyyy-mm-dd") %> */\n/* description : <%= pkg.description%> */\n/* author : <%=pkg.author%> */\n/* license : <%=pkg.license%> */\n'
		},
		target:{
			files: {
        	'dist/js/output-<%=pkg.version%>.min.js': ['src/js/*.js']
      		}
		}
		
		},
		cssmin: {
			options: {
   			shorthandCompacting: false,
    		roundingPrecision: -1
  			},
		  target: {
		    files: {
		       'dist/css/output-<%=pkg.version%>.min.css': ['src/css/*.css']
		    }
		  }
		},
		jshint:{
			build: ["Gruntfile.js",'/src/js/*.js'],
			options:{
				jshintrc:".jshintrc"
			}
		},
		csslint:{
			build: ['/src/css/*.css'],
			options:{
				csslintrc:".csslintrc"
			}
		},
		watch:{
			livereload: {
        	options: {
        	  livereload: '<%=connect.server.options.livereload%>'  //监听前面声明的端口  35729
        	},
        	files:["Gruntfile.js","src/js/*.js","src/css/*.css","src/less/*.less","src/coffee/*.coffee","src/images/*.{png,jpg}","src/*.html"]
        },
			build:{
				files:["Gruntfile.js","src/js/*.js","src/css/*.css","src/less/*.less","src/coffee/*.coffee","src/images/*.{png,jpg}","src/*.html"],
				tasks:["coffee","less","jshint","uglify"],
				options:{spawn:false}
			},
			//run unit tests with karma (server needs to be already running) 
  			karma: {
  			  files: ['dist/js/*.js', 'test/*.js'],
  			  tasks: ['karma:unit:run'] //NOTE the :run flag 
  			}

		},
		clean:{
			build:["dist/js/*.js","dist/css/*.css"],
		},
		copy:{
			main:{
				expand:true,
				cwd:"dist",
				src:"**",
				dest:"old/<%= grunt.template.today('yyyy-mm-dd hh：MM：ss')%>/"
			}
		},
		karma:{
			options:{
				files:["test/*.js"]
			},
			unit:{
				files:[
					{ 
						src:["test/*.js"],
						port: 9999,
    					browsers: ['Chrome', 'Firefox']
					}
				],
				background: true,
    			singleRun: false
			}
		},
		coffee: {
  			compileWithMapsDir: {
  			  options: {
  			    sourceMap: true,
  			    sourceMapDir: 'src/js/maps/' // source map files will be created here 
  			  },
  			  files: [{
                    expand: true,
                    cwd: 'src/coffee',
                    src: ['**/*.coffee'],
                    dest: 'src/js',
                    ext: '.js'
                }]
  			},
		},
		 less: {
            development: {
                files: [{
                    expand: true,
                    cwd: 'src/less',
                    src: ['**/*.less'],
                    dest: 'src/css',
                    ext: '.css'
                }]
            }
        },
        connect: {
    		server: {
    		  options: {
    		    port: 9001,
    		    hostname:"*",
    		    keepalive: true,
    		    open:true,
    		    base: 'src'
    		    livereload: 35729  //声明给 watch 监听的端口
    		  }
   		 	}
  		}
  		 
	});
	
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-csslint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-karma");
	grunt.loadNpmTasks("grunt-contrib-coffee");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.registerTask("default",["coffee","less","jshint","csslint",/*"copy",手动复制吧 grunt copy命令*/"clean","uglify","cssmin","connect:server","watch"]);
	// grunt.log.writeln('Hello, world.');
};
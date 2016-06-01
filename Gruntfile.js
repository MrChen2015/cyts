module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		uglify:{
		options:{
			stripBanners:true,
			banner:'/* <%=pkg.name%>-<%=pkg.version%> <%= grunt.template.today("yyyy-mm-dd") %> */\n/* description : <%= pkg.description%> */\n/* author : <%=pkg.author%> */\n/* license : <%=pkg.license%> */\n'
		},
		// build:{
		// 	src:"src/js/base.js",
		// 	dest:"dist/base-<%=pkg.version%>.min.js"
		// }
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
			build:{
				files:["Gruntfile.js","src/js/*.js","src/css/*.css"],
				tasks:["jshint","uglify"],
				options:{spawn:false}
			}
		}

	});
	
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-csslint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.registerTask("default",["jshint","csslint","uglify","cssmin","watch"]);
	grunt.log.writeln('Hello, world.');
};
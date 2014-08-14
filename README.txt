#LIBZ-500 Web documentation
#created by sweiss 8/14/2014

#install nodejs with express: http://nodejs.org/download/

#Express configurations are found in app.js
#Port used is defined in bin/www
#Express http request are defined and handled in routes/newindex.js

#the file extention hjs is required as nodejs uses hogan to render the views,
#however, it is not required when running from libz

#running on local with nodejs:
#in command line: app ./bin/www
#running on local with nodemon to track file changes:

#in command line: nodemon bin/www

#The first document served is index.js

#the js framework in use is angularjs 

#angular-rout.js handles inner routings defined in public/javascript/application.js

#mainController is a rapper controller for the intire application

#each rout has its own controller 

#when creating a zip file for libz:

# new folder:  reportingsws/
#1 - fonts/
#2 - images/
#3 - stylesheets/
#4 - javascripts/
#5 - index.html
#6 - zassays.hjs
#7 - zhome.hjs
#8 - zsingletest.hjs
#9 - zspecchart.hjs
#10 - ztests.hjs
#11 - z_manual.pdf.hjs
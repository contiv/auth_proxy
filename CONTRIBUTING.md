#Contributing to Contiv-ui



##Developers - Table of contents
=================

  * [Setup](#setting-up-contiv-ui-on-mac-and-windows)
    * [Windows](#for-windows)
    * [Mac](#for-mac)
  * [Testing](#testing)
    * [Directives] (#writing-directive-tests)


###Setting up Contiv-ui on Mac and Windows
==========================================
###For Windows:
---------------
####Fix long path issue and clone the repo:
* install git, then run
```
$ git config --system core.longpaths true
$ git clone https://github.com/contiv/contiv-ui.git
```

####Install app dependencies
* install node.js
* In the directory of the contiv-ui repo, run:
```
$ npm install -g bower 
$ npm install -g gulp
$ npm install
```
* Build app with:
```
$ gulp dev-build
```

####Install nginx
* download nginx and unzip
* add nginx to System Path
  * If you are having issues with nginx not being a recognized command, check that you added it to your path correctly
* From contiv-nginx.conf(in the contiv-ui repo), copy from line 13 to line 50
* Paste into nginx.conf (in nginx_location/conf) after line 47
* In the section you just pasted, replace localhost with your server
* Change the root to point to the absolute path of contiv-ui/app instead of html

####Running nginx
* In the directory of nginx, to start nginx:
```
$ start nginx
```
Server is now running on localhost:8080  
If you make changes in your app folder, rerun the gulp command and hard refresh page  

* If you modify nginx.conf, restart server with:
```
$ nginx -s reload
```
* To stop nginx:
```
$ nginx -s stop
```

###For Mac:
-----------
####Install git and clone repo
```
$ git
$ git clone https://github.com/contiv/contiv-ui.git
```
####Install app dependencies
* install node.js
* In the directory of the contiv-ui repo, run:
```
$ sudo npm install npm -g
$ sudo npm install -g bower 
$ sudo npm install -g gulp
$ npm install
```
* Build app with:
```
$ gulp dev-build
```
####Install nginx
* install brew and nginx:
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 
$ brew install nginx
```
* From contiv-nginx.conf(in the contiv-ui repo), copy from line 13 to line 50
* Paste into nginx.conf (location: /usr/local/etc/nginx) after line 47
* In the section you just pasted, replace localhost with your backend server
  * This should point to the backend running contiv. It is fine to leave as localhost if you just want to view the UI.
* Change the root to point to the absolute path of contiv-ui/app instead of html

####Running nginx
* In the directory of nginx, to start nginx:
```
$ nginx
```
Server is now running on localhost:8080 
If you make changes in your app folder, rerun the gulp command and hard refresh page to view changes in the browser

* If you modify nginx.conf, restart server with:
```
$ nginx -s reload
```
* To stop nginx:
```
$ nginx -s stop
```

###Testing
==========
To run all tests:
```
$ npm test
```

####Writing Directive Tests
---------------------------
You must configure karma to pre-process the linked template html file. To do so:
* In the Karma.conf.js file:
 * add the location under preprocessors in the following format
 ```
 preprocessors: {
            'app/example/**/*.html':['ng-html2js']
        },
 ```
 * Include the module.js file, all other js files, and the html file.
 ```
 files: [
            'app/example/module.js',
            'app/example/**/*.js,
            'app/example/**/*.html
        ]
 ```
* In the test file, add the following to load the html:
 ```
 beforeEach(module('contiv.test.directives'));
 ```





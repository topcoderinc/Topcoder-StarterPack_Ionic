# 	[IBP ] Node / Heroku Buildpack Frontend
This is ionic app.

## Dependencies
- [nodejs 5+](https://nodejs.org)
- [bower](http://bower.io/)
- [ionic 1.3.1+](http://ionicframework.com/)
- [cordova 6+](https://cordova.apache.org/)
- [git](https://git-scm.com/)
- [gulp](http://gulpjs.com/)(Install gulp globally with command `npm install -g  gulp-cli`)
You must also install java, android sdk for android platform, xcode for ios platform.

## Configuration
Edit configuration in `config.json`,  You can use environment variable **BUILD_ENV** to load configurations for different environments.

Following variables can be configured:
- `APP_VERSION` the version of app
- `API_TITLE` the title of app
- `API_URL` the url of api server
- `API_TOKEN` the api token

## Backend
Please deploy backend codes through guides in [backend](https://github.com/topcoderinc/BP-Ionic-Heroku/tree/dev/Backend).

## Local deployment
I recommend you to test codes under Mac to test with ios and android platform easily.

Please make sure to configure url of api server rightly in `config.json`.

Please update global ionic,cordova to latest version with `npm install -g cordova ionic`. 
For example this is known bug that has been fixed since ios4.1.0 [ios bug](https://cordova.apache.org/announcements/2016/03/02/ios-4.1.0.html).

In the main project folder, run the following commands:
```bash
   
   npm i
   # must exists git in path
   bower install or gulp install
   ionic state reset --plugins
   
   gulp inject
   
   #verify codes by browser
   ionic serve 
   
   #command for android
   ionic platform add android
   ionic build android
   # test on emulate or real device
   ionic emulate android or ionic run android
   
   #command for ios
   ionic platform ios
   ionic build ios
   # test on emulate or real device
   ionic emulate ios or ionic run ios
```

##modular
It will use gulp to load modules.You can put modules in **src/components**, root directory of module may exist  **menu_{index}.html**(index is order of side menu) to show as menu.
You can also exist css or configuration files in modules.

If you delete entire directory from **src/components** you must run `gulp` again to make sure changes work.

It wiletect and load js,css from **bowser.json** properly, you only need to inject angular modules with environment variable **ANGULAR_MODULES**,
 currently it has default value **'ionic','ngResource','ya.nouislider'**.
 







# [IBP] IONIC STARTERPACK PUSH NOTIFICATIONS TopCoder Challenge README.md 


## Verification:

Follow the deployment guide downstairs or feel free to check the following unlisted youtube video: https://youtu.be/bvZn4Xnrnj0 where you can see the steps to test the solution.

## Dependencies:

- [ionic-platform-web-client] (https://github.com/driftyco/ionic-platform-web-client)
- [phonegap-plugin-push] (https://github.com/phonegap/phonegap-plugin-push)
- [cordova-plugin-datepicker] (https://github.com/VitaliiBlagodir/cordova-plugin-datepicker.git)

## Deployment: 

After adding the component into the www/components folder follow the README.md deployment up to "gulp inject". After that do the following:

1. ionic add ionic-platform-web-client

2. ionic plugin add phonegap-plugin-push --variable SENDER_ID="GCM_PROJECT_NUMBER"

	* (Use: GCM_PROJECT_NUMBER = 958692993542 This is the project number made in the Google Developer Console to test the solution. If you want you can use this number, or if you would like to set up your own profile: http://docs.ionic.io/v2.0.0-beta/docs/android-push-profiles)

3. ionic config set gcm_key <your-gcm-project-number>

	* (Again, feel free to use: <your-gcm-project-number> = 958692993542)

4. ionic plugin add https://github.com/VitaliiBlagodir/cordova-plugin-datepicker.git

	* (Install the previous date picker plugin to get a cool native date picker)

5. ionic config set dev_push false
	
	* (In order to enable full-featured pushes)

6. Do "ionic io init" and configure it from start as seen in: http://docs.ionic.io/docs/push-full-setup (In any case this is mandatory for iOS since as you'll see below the provisioning profile is device specific and thus not usefull to anyone else but me) OR set the following ap_id and api_key to test on Android device:

	ionic config set app_id 080c6c43
	ionic config set api_key efde28056a01ef00569508b7f4f28cc50406d4962c7036f7

7. Once those three steps you are ready to deploy on a device. Remember in both cases Android and iOS you need a real device to test the push notifications. This blog is quite usefull to know how to test on devices: http://www.neilberry.com/how-to-run-your-ionic-app-on-real-devices/. There's only a couple of clarifications that need to be made about the blog, namely: 

	7.1. Don't forget to change the token in ./config.js for your device token as shown in the console logs.

	7.2. About Android deployment: Once you tap on the build version those 7 times as it says on the blog. The Developer Option will appear back in the settings menu. Probably on top of "About Device". After that is adding platform, build it and run it. Also if you wanna check the console logs of the device go to the following url in Chrome: chrome://inspect/#devices

	7.3. About iOS deployment: When testing on Xcode, like the blog author says, you need a provisioning profile. Which we got from following this docs: http://docs.ionic.io/v2.0.0-beta/docs/ios-push-profiles. In this case. It was pointed out in the forums that the App ID: "com.ionicframework.myapp991187" was already taken. So I chose to use: "com.ionicframework.myapp991187pushnotifications" to test my own solution. Apple gives you a provisioning profile for a specific device you have registered in your Apple Developer Account. In my case I used an iPad. However since I cannot give you guys the iPad to test the provisioning profile won't work for you guys and since I don't have the iOS device you are going to be using for testing I cannot make a provisioning profile for such device. In this way I don't see a workaround but for you guys to make your own provisioning profile. And as previously said, Ionic  guide is pretty complete and cool, plus the blog post for deploying. In any case you can see the use of my own provisioning profile in the unlisted youtube video. Also, for iOS you'll need a different Authorization Key again due to the provisioning profile being Account Specific and more importantly Device Specific as you've probably noticed from the Ionic "iOS Push Profiles" guide.

## Description of The Component:

1. In ./config.js you can find:
	
	1.1. A constant named: PUSH_CONFIG with the profile tag, ionic authorization token, and device token (iOS or Android) as well as the url for the $http request in ./index.js

	1.2. The run function creates the push service and registers the app with the device token. This is the device token that should be placed in ./config.js as shown in the youtube video.

2. In ./index.html:

	In here you can find the html for the component view, using ionic native components as to get a native look and feel. Keeping it harmonic with the other components of the app like email.

3. In ./index.js

	3.1. Routing. Standard routing. Nothing more to say.

	3.2. Controller with:

		3.2.1. Date picker function using the plugin: https://github.com/VitaliiBlagodir/cordova-plugin-datepicker.git
		3.2.2. Time picker function using the plugin: https://github.com/VitaliiBlagodir/cordova-plugin-datepicker.git
		3.2.3. Schedule push notification function where it checks that both the notification text exists and that the date is not in the past.

4. In ./menu_6.html. Menu component pertaining to push. Nothing more to say.

That's it! Thank you for reading. 
-Auk in Tux
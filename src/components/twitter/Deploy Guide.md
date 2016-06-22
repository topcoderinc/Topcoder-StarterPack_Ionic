# 	[IBP ] [IBP] IONIC STARTERPACK FACEBOOK SHARING
This plugin can only run in Android and iOS, not in browser.

## Dependencies
- [InAppBrowser] (https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/)
- [ngCordova] (http://ngcordova.com/)

## Configuration

The config file in this component is `config.js` 
- `consumerKey` the twitter app id 
- `consumerSecretKey` the twitter app secret keey
- `description` the feed text content 
- `link` the link in the feed 

## Setup the Twitter App

If you are not planning to use your own Twitter APP ID (use mine), you can ignore this section.

Visit [http://apps.twitter.com/app/new](http://apps.twitter.com/app/new) to create a twitter app. 
Please pay attentions to:

* The OAuth callback url must set to: `http://localhost/callback`
* make sure it have the `read` and `write` permission

you can now change the `consumerKey` and `consumerSecretKey` in `config.js`.


## Run the Ionic App
Read the `README.md` in the project root to see the steps to run the app, the steps are NOT changed in this challenge.


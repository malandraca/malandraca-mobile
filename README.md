Local development





Building for release

From root

grunt build:android --device --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore malandraca-release-key.keystore ./platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk malandraca

zipalign -v 4 ./platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk malandraca.apk





Required cordoba plugin

cordova plugins add org.apache.cordova.inappbrowser
ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git
ionic browser add crosswalk

cordova plugins add https://github.com/bez4pieci/Phonegap-Cookies-Plugin.git


cordova plugin remove https://github.com/apache/cordova-plugin-whitelist.git





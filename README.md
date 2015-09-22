Local development





Building for release

From root

grunt build:android --device --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore malandraca-release-key.keystore ./platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk malandraca

zipalign -v 4 ./platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk malandraca.apk


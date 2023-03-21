# CS495Project
How to run project
1. Make sure you have expo app installed (Expo Go)
2. To run project on expo, enter following into command line while in CS495Project directory (The one with App.js in it):
    2a. Update dependencies - npm install
    2b. With npm - npx expo start (--tunnel for socketTimeoutError)
        With Yarn - yarn expo start
3. Easiest way from here is to scan QR code that is generated on device

Testing:
1. Used Expo Go to test on the fly on our personal mobile devices (iOS and Android)
2. Used the Pixel 4 Android simulator as a baseline for the look and feel of the app
3. Tested on multiple screen sizes including iPads
4. Ensured all navigation and buttons are working as expected
5. Will need to test with data from the database later

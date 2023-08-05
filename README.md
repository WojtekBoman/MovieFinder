# Movie Finder
A mobile application that allows you to search for movies by title.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Screenshots](#screenshots)
* [Setup](#setup)

## General info
Mobile application developed with React Native CLI and The Movie Database (https://api.themoviedb.org/3)

## Technologies
Project is created with:
* React Native
* Redux Toolkit
* React Navigation
* React Native Paper

## Screenshots

![3](https://github.com/WojtekBoman/movie-finder/assets/47774969/bfc67b09-cd27-460c-a9d1-7e80e43d4a38)
![4](https://github.com/WojtekBoman/movie-finder/assets/47774969/d6c8e9b7-d536-4983-8c5c-ecc1b0bb4a53)
![5](https://github.com/WojtekBoman/movie-finder/assets/47774969/055e0d45-43ea-4927-bd79-306bea0ed5cd)

## Setup

### Important info
To search for videos in the application, it is necessary to provide a private api key. To be able to use the application, create a file called .env in the root of the project and put the following in it.
```bash
API_KEY=your_key
```
To obtain an api key, you must create an account at The Movie Database. After accessing the keys, place the API Read Access Token in the .env file in the format shown above.

### Step 1: Install dependencies

To install application dependencies, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm install

# OR using Yarn
yarn
```

### Step 2: Start the Metro Server

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).


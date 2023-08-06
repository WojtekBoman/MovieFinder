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

![1](https://github.com/WojtekBoman/MovieFinder/assets/47774969/1f62e069-38ae-44ca-91b3-46c3682d144e)
![2](https://github.com/WojtekBoman/MovieFinder/assets/47774969/c403aac6-612d-4b88-800f-b2ea71d7b71e)
![3](https://github.com/WojtekBoman/MovieFinder/assets/47774969/87852591-af9d-474b-b6c1-31fdb254704d)
![4](https://github.com/WojtekBoman/MovieFinder/assets/47774969/324b7b68-0d64-4fb4-af0e-bca92aaabbf1)

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
yarn install
```

### Step 2: Start the Metro Server

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 3: Start your Application

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


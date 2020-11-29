const admin = require('firebase-admin')
const flamelink = require('flamelink')
const serviceAccount = require('../serviceAccountKey.json')

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount), // required
  databaseURL: 'https://trahsure-aliven.firebaseio.com', // required
  storageBucket: 'trahsure-aliven.appspot.com' // required if you want to use any Storage functionality
}

const firebaseApp = admin.initializeApp(firebaseConfig)

const flamelinkApp = flamelink({
  firebaseApp,
  env: 'production', // optional, defaults to `production`
  locale: 'en-US', // optional, defaults to `en-US`
  dbType: 'rtdb' // optional, defaults to `rtdb` - can be 'rtdb' or 'cf' (Realtime DB vs Cloud Firestore)
})

module.exports = flamelinkApp

// Web Version
// var firebaseConfig = {
//   apiKey: "AIzaSyAL7HKd7ssdzMfoYp2o1ZpZQ1bzYNwPRJY",
//   authDomain: "trahsure-aliven.firebaseapp.com",
//   databaseURL: "https://trahsure-aliven.firebaseio.com",
//   projectId: "trahsure-aliven",
//   storageBucket: "trahsure-aliven.appspot.com",
//   messagingSenderId: "245501926255",
//   appId: "1:245501926255:web:ee866d282beb71f1e9a69a",
//   measurementId: "G-X7X23HQ47L"
// };
// // Initialize Firebase

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const app = flamelink({
// 	firebaseApp,
// 	env: 'production', // optional, defaults to `production`
// 	locale: 'en-US', // optional, defaults to `en-US`
// 	dbType: 'rtdb', // optional, defaults to `rtdb` - can be 'rtdb' or 'cf' (Realtime DB vs Cloud Firestore)
// });

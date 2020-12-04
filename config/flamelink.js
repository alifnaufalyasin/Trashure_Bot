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

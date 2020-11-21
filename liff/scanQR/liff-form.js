var firebaseConfig = {
  apiKey: "AIzaSyAL7HKd7ssdzMfoYp2o1ZpZQ1bzYNwPRJY",
  authDomain: "trahsure-aliven.firebaseapp.com",
  databaseURL: "https://trahsure-aliven.firebaseio.com",
  projectId: "trahsure-aliven",
  storageBucket: "trahsure-aliven.appspot.com",
  messagingSenderId: "245501926255",
  appId: "1:245501926255:web:ee866d282beb71f1e9a69a",
  measurementId: "G-X7X23HQ47L"
};
// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

const app = flamelink({
	firebaseApp,
	env: 'production', // optional, defaults to `production`
	locale: 'en-US', // optional, defaults to `en-US`
	dbType: 'rtdb', // optional, defaults to `rtdb` - can be 'rtdb' or 'cf' (Realtime DB vs Cloud Firestore)
});

window.onload = function () {
  let myLiffId = "1655250356-dqegQDlM"
  initializeLiff(myLiffId)
}

/**
 * Initialize LIFF
 * @param {string} myLiffId The LIFF ID of the selected element
 */
function initializeLiff(myLiffId) {
  liff
    .init({
      liffId: myLiffId,
    })
    .then(() => {
      const profile = liff.getContext()
      const userId = profile.userId
      liff.scanCode()
        .then((result) => {
          const kode = result.value
          liff
            .sendMessages([
              {
                type: "text",
                text: "TrashID: "+kode,
              },
            ])
            .then(() => {
              console.log("message sent")
              liff.closeWindow()
            })
            .catch((err) => {
              alert(err)
            })
        })
      let data = { userId: userId }
    })
    .catch((err) => {
      window.location = "./form.html"
    })
}

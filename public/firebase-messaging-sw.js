// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBV5EG2ZT3vwBPAk7CAlEy3fTSkGe4HIco",
  authDomain: "liberty-86279.firebaseapp.com",
  projectId: "liberty-86279",
  storageBucket: "liberty-86279.appspot.com",
  messagingSenderId: "262163037529",
  appId: "1:262163037529:web:c70d40d9ddcd017007a048",
  measurementId: "G-F7F5KN32RZ"
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body
  }

  self.registration.showNotification(notificationTitle,
    notificationOptions)
})
import {initializeApp} from 'firebase/app'
import { getAnalytics } from "firebase/analytics"
import 'firebase/auth'
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import {getUserData} from '@authModule'
import {API} from "./utility/API"

const firebaseConfig = {
  apiKey: "AIzaSyBV5EG2ZT3vwBPAk7CAlEy3fTSkGe4HIco",
  authDomain: "liberty-86279.firebaseapp.com",
  projectId: "liberty-86279",
  storageBucket: "liberty-86279.appspot.com",
  messagingSenderId: "262163037529",
  appId: "1:262163037529:web:c70d40d9ddcd017007a048",
  measurementId: "G-F7F5KN32RZ"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const messaging = getMessaging(app)

export const _getToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BKYjY-SeKxZzBzNcbnwT3AIIF7A5zDZc278JLJJMnDUmJwbbKoRhjA9Kkt-Z_N7dR4l3-hKhv_R3Vlex7Kw7tEI'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken)
      setTokenFound(true)
      if (getUserData().user_type_id > 0) {
        API.post('/user/store-notification', {user_id: getUserData().id, token: currentToken})
      } else {
        API.post('/admin/store-notification', {user_id: getUserData().id, token: currentToken})
      }
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.')
      setTokenFound(false)
      // shows on the UI that permission is required
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err)
    // catch error while creating client token
  })
}

export const onMessageListener = () => new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log(payload)
      resolve(payload)
    })
  })

export default app
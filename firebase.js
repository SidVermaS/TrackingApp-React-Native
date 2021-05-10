import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC0lt32aKmQEyhvjn48z_kw5b-EJkeeCEw",
  authDomain: "temporal-nebula-312802.firebaseapp.com",
  projectId: "temporal-nebula-312802",
  storageBucket: "temporal-nebula-312802.appspot.com",
  messagingSenderId: "717498203737",
  appId: "1:717498203737:web:a7d0c449153b6cd2e27b48"
}

let app
if(firebase?.apps?.length===0)  {
  app=firebase.initializeApp(firebaseConfig)
} else  {
  if(firebase.app)  {
    app=firebase?.app()
  }
}
const db=app?.firestore()
const auth=firebase?.auth()

export {db,auth}
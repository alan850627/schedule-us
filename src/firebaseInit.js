import firebase from 'firebase'

// Required for side-effects
require('firebase/firestore')

// Initialize Firebase
let config = {
  apiKey: 'AIzaSyB5wODSP7vrqJGgeWq0Gn5PIqvno9O3-k8',
  authDomain: 'schedule-us-689d0.firebaseapp.com',
  databaseURL: 'https://schedule-us-689d0.firebaseio.com',
  projectId: 'schedule-us-689d0',
  storageBucket: 'schedule-us-689d0.appspot.com',
  messagingSenderId: '685116488347'
}
// Here we are initializing the Firebase connection.
const firebaseApp = firebase.initializeApp(config)

export default firebaseApp.firestore()

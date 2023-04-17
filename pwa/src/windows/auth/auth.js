import { initializeApp } from 'firebase/app'
import config from '../../config'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const app = initializeApp(config.firebaseConfig);
const auth = getAuth();

const authenticate = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('logged in')
           const user = userCredential.user
          resolve(user)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })

     
    })
  },

  signup: (email, password) => {
    return new Promise((resolve, reject) => {
      console.log('signup')
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('user saved')
          const user = userCredential.user
          resolve(user)

          // ...
        })
        .catch((error) => {
          console.log(error)
          reject(error)
          const errorCode = error.code
          const errorMessage = error.message
          // ..
        })
    })
  },
  setPersistence : (type) =>{
    auth.setPersistence(type);
  },
  getauth: ()=>{
    return auth;
  }

}

export default authenticate

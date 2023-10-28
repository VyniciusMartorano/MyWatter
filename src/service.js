import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDDrODpdZfmDXeBnfll8a90ZkWgyEeVWTw",
    authDomain: "water-5d9e7.firebaseapp.com",
    projectId: "water-5d9e7",
    storageBucket: "water-5d9e7.appspot.com",
    messagingSenderId: "927085670869",
    appId: "1:927085670869:web:cb01d23fdaa6218c380d5c",
    measurementId: "G-D6H3GWXTY5"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const storage = getStorage(app)

export default db
export { auth, provider, storage }
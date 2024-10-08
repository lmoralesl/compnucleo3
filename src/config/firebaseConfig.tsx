import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDkjMPR3iuDinWQNi1M8ieyWRb6qHm8xQ0",
  authDomain: "compnucleo3-d5440.firebaseapp.com",
  projectId: "compnucleo3-d5440",
  databaseURL:"https://compnucleo3-d5440-default-rtdb.firebaseio.com/",
  storageBucket: "compnucleo3-d5440.appspot.com",
  messagingSenderId: "79533993678",
  appId: "1:79533993678:web:74c989f85aa61893876a9f"
};


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const dbRealTime = getDatabase(firebase);

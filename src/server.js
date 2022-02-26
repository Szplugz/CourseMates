// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkjsEr3mWkZbJUZeB8I4aEBg31NCGHUqw",
  authDomain: "testberry-85409.firebaseapp.com",
  projectId: "testberry-85409",
  storageBucket: "testberry-85409.appspot.com",
  messagingSenderId: "354205073568",
  appId: "1:354205073568:web:56fa0beeb68b17964549c5",
  measurementId: "G-0LLDHRG45D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// get database
const database = getDatabase(app);

/*
// initialize express app
const PORT = process.env.PORT || 3001;
const main = express();

main.listen(PORT, () => 
    {
        console.log(`Server listening on ${PORT}`);     // Note the use of the ` quote instead of ' or " -- ` encloses a formatted string
    });
*/

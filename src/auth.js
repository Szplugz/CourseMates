import { getAuth, signInWithCustomToken } from "firebase/auth";

const uid = 'testuserhackillinois';
let token;

const auth = getAuth()
    .createCustomToken(uid)
    .then((customToken) => {
        token = customToken;
    })

signInWithCustomToken(auth, token)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
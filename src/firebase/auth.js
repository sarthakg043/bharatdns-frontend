import {auth} from './firebase-config'
import { GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from 'firebase/auth'

export const doCreateUserWithEmaillAndPassword = async (email, password) =>{
    return createUserWithEmailAndPassword(auth, email, password)
};

export const doSignInWithEmaillAndPassword = async (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password)
};

export const doSignInWithGoogle = async () => {
    const provider = GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // save to firestore by
    // result.user
    return result
};

export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordReset = (email) =>{
    return sendPasswordResetEmail(auth, email)
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password)
};

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    })
};
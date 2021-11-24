import { createAsyncActionDirect, Store } from 'pullstate';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, getRedirectResult, signInWithRedirect, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";
import { initializeFirebase } from './firebase';
import { getDatabase, ref, onValue, set, child, get } from "firebase/database";
import User from '../firebase/domain/User';

initializeFirebase();
const provider = new GoogleAuthProvider();
const db = getDatabase();

export const UserStore = new Store({
    user: {
        authenticated: false,
        uid: undefined,
        displayName: undefined,
        email: undefined,
        photoURL: undefined,
        lists: [],
    },
    initialized: false
});

export const getUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userObj = new User(user.uid, !user.isAnonymous, user.displayName, user.email, user.photoURL);
            UserStore.update(state => {
                state.user.authenticated = user.isAnonymous;
                state.user.uid = user.uid;
                state.user.displayName = user.displayName;
                state.user.email = user.email;
                state.user.photoURL = user.photoURL;
            });
            let dbUser = undefined;
            readUser(user.uid)
                .then(readUser => {
                    if (readUser === null) {
                        writeUser(user);
                    }
                });
            return dbUser;
        } else {
            console.log('user logged off')
        }
    });
};

export const readUser = async (uid) => {
    console.log('readUser', uid);
    const dbRef = ref(db);
    return await get(child(dbRef, `users/${uid}`))
        .then(snapshot => snapshot.exists() ? snapshot.val() : null)
        .catch(error => {
            console.error(error);
        });
};

export const writeUser = (user) => {
    const newUser = new User(user.uid, user.isAnonymous, user.displayName, user.email, user.photoURL);
    set(ref(db, 'users/' + user.uid), { ...newUser });
};

export const authenticateUser =
    createAsyncActionDirect(async () => {
        const auth = getAuth();
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                signInWithPopup(auth, provider)
                    .then((result) => {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;
                        // The signed-in user info.
                        const user = result.user;

                        UserStore.update(state => {
                            state.user.authenticated = true;
                            state.user.uid = user.uid;
                            state.user.displayName = user.displayName;
                            state.user.email = user.email;
                            state.user.photoURL = user.photoURL;
                            state.initialized = true;
                        });

                        // ...
                    }).catch((error) => {
                        console.log('error', error);
                        // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // The email of the user's account used.
                        const email = error.email;
                        // The AuthCredential type that was used.
                        const credential = GoogleAuthProvider.credentialFromError(error);
                        // ...
                    });
            });

    });

export const logoutUser =
    createAsyncActionDirect(async () => {
        const auth = getAuth();
        auth.signOut()
        .then(() => {
            UserStore.update(state => {
                state.user.authenticated = false;
                state.user.uid = undefined;
                state.user.displayName = undefined;
                state.user.email = undefined;
                state.user.photoURL = undefined;
                state.initialized = true;
            });
        })
    });
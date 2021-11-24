export default class User {
    constructor(uid, authenticated, displayName, email, photoURL) {
        this.uid = uid;
        this.authenticated = authenticated;
        this.displayName = displayName;
        this.email = email;
        this.photoURL = photoURL;
    }
};
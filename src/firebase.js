import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyDkMSFbdu6s9leKXQuSBXW6s2cAPZIZCcc",
    authDomain: "projeto-react-42f79.firebaseapp.com",
    databaseURL: "https://projeto-react-42f79.firebaseio.com",
    projectId: "projeto-react-42f79",
    storageBucket: "projeto-react-42f79.appspot.com",
    messagingSenderId: "873997791329",
    appId: "1:873997791329:web:0e49e38738f3a70528fa20"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

class Firebase {
    constructor() {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        this.firebase = firebase.database();
    }

    login(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }

    logout() {
        return firebase.auth().signOut()
    }

    async register(nome, email, password) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)

        const uid = firebase.auth().currentUser.uid;

        return firebase.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isAuthenticated() {
        return new Promise(resolve => {
            firebase.auth().onAuthStateChanged(resolve)
        })
    }

    getCurrentUser() {
        return firebase.auth().currentUser && firebase.auth().currentUser.email
    }

    async getUserName(callback) {
        //Verificar se existe algum usuário logado aqui tbm
        if (!firebase.auth().currentUser) {
            return null
        }

        const uid = firebase.auth().currentUser.uid;
        await firebase.database().ref('usuarios').child(uid).once('value').then(callback)

    }


}

export default new Firebase();
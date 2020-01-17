import firebase from "firebase";

let firebaseConfig = {
    apiKey: "AIzaSyATszp3VXTBMCW9yY6epVkTjiU-qux7oPY",
    authDomain: "potracheno-2.firebaseapp.com",
    databaseURL: "https://potracheno-2.firebaseio.com",
    projectId: "potracheno-2",
    storageBucket: "",
    messagingSenderId: "725837136584",
    appId: "1:725837136584:web:2eabba26aed1da44b95bfd"
};

export default class DatabaseService {
    static _instance;

    constructor() {
        this._fb = firebase;
        this._fb.initializeApp(firebaseConfig);
    }

    static getInstance() {
        if(this._instance===undefined){
            this._instance = new DatabaseService();
        }
        return this._instance;
    }

    addItem(item) {
        this._fb.database().ref('/expends').push(item);
    }
    get expends(){
        return this._fb.database().ref('expends');
    }
}

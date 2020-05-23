import firebase from "firebase"
import "@firebase/firestore"

const config = {
    apiKey: "AIzaSyAovwrQlVKpw8XzDTvbSLOMDJmAkIUeC5I",
    authDomain: "todo-manager-62648.firebaseapp.com",
    databaseURL: "https://todo-manager-62648.firebaseio.com",
    projectId: "todo-manager-62648",
    storageBucket: "todo-manager-62648.appspot.com",
    messagingSenderId: "710368551737",
    appId: "1:710368551737:web:a54059e4d7db37dd827ee8",
    measurementId: "G-B6GPJ2M04C"
}

class Fire {
    constructor(callback){
        this.init(callback)
    }
    init(callback){
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user)
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error)
                })
            }
        })
    }

    getTodoList(callback) {
        let ref = this.ref.orderBy("name")

        this.unsubscribe =  ref.onSnapshot(snapshot => {
           const lists = []

           snapshot.forEach(doc => {
               lists.push({id: doc.id, ...doc.data()})
           })

           callback(lists)
        })
    }

    get ref(){
        return firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .collection("lists")
    }

    get userId(){
        return firebase.auth().currentUser.uid
    }

    detach() {
        this.unsubscribe()
    }

    addList(list){
        let ref = this.ref

        ref.add(list)
    }

    updateList(list){
        let ref = this.ref
        ref.doc(list.id).update(list)
    }
}



export default Fire
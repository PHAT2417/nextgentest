// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { collection, getDocs, getFirestore, addDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGaRx9jjEUrdCkUxFn38NkDBbFyDH38DU",
    authDomain: "todo-13f04.firebaseapp.com",
    databaseURL: "https://todo-13f04-default-rtdb.firebaseio.com",
    projectId: "todo-13f04",
    storageBucket: "todo-13f04.appspot.com",
    messagingSenderId: "474422267194",
    appId: "1:474422267194:web:18a8a2174214fc0d2b5403",
    measurementId: "G-T350RVQZ0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

async function getData(){
    const querySnapshot = await getDocs(collection(db, "todo"));
    const ulContainer = document.getElementById("UL")
    ulContainer.innerHTML = ""
querySnapshot.forEach((item) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(item.id, " => ", item.data());
    //<li><input type="checkbox" id="myCheck" >Hit the gym<button></li>
   

    const litag = document.createElement("li")
    const inputtag = document.createElement("input")
    const spantag = document.createElement("span")
    const buttontag = document.createElement("button")

    spantag.innerText = item.data().name
    inputtag.type = "checkbox"
    inputtag.checked = item.data().isDone
    buttontag.innerText = "delete"

    litag.appendChild(inputtag)
    litag.appendChild(spantag)
    litag.appendChild(buttontag)

    buttontag.onclick = async () => {
        await deleteDoc(doc(db, "todo", item.id));
        getData()
    }

    ulContainer.appendChild(litag)
});
}

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

document.getElementById("addButton").onclick = async () => {
    let inputtag = document.getElementById("Input")

    const docRef = await addDoc(collection(db, "todo"), {
        name: inputtag.value,
        isDone: false
    });

    getData()
    inputtag.value = ""
}


getData()
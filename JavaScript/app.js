$(document).ready(function () {
    let userName;
    let myList = document.getElementById('myList');
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyBcDDXBDCHU-z8L5B51_rR2HfjanthZqsQ",
        authDomain: "wunderlist-imadityajain.firebaseapp.com",
        projectId: "wunderlist-imadityajain",
        storageBucket: "wunderlist-imadityajain.appspot.com",
        messagingSenderId: "704610357878",
        appId: "1:704610357878:web:906f8bbd2aff778fb08557",
        measurementId: "G-LHZCHSR4CP"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    // checking for user logged in or not

    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("user sign in successfully!");
        } else {
            alert("Your login session is expired or logged out, login again to continue.");
            location.href = "Login.html";
        }
    });

    // fetching todos
    function renderData(individualDoc) {
        let li = $("<li></li>");
        let parentDiv = $("<div></div>");
        $(parentDiv).addClass("parentdiv");
        $(parentDiv).attr('data-id', individualDoc.id);

        let todoDiv = $("<div></div>");
        $(todoDiv).text(individualDoc.data().userEvent);

        let trash = $("<button></button>");
        let i = $("<i></i>");
        $(i).addClass("fas fa-trash");
        $(trash).append(i);
        $(trash).addClass("deleteBtn");

        $(parentDiv).append(todoDiv);
        $(parentDiv).append(trash);

        $(li).append(parentDiv);
        $("#myList").append(li);

        $(".deleteBtn").click(function (e) {
            e.preventDefault();
            let id = e.target.parentElement.parentElement.getAttribute('data-id');
            auth.onAuthStateChanged(user => {
                if (user) {
                    db.collection(user.uid).doc(id).delete();
                }
            })
        });
    }


    // fetching username
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('users').doc(user.uid).get().then(snapshot => {
                userName = snapshot.data().Name;
                $(".user").html(userName);
            });
        }
    });

    // create to do

    const date = new Date();
    time = date.getTime();
    let counter = time;
    $("#addToDoBtn").click(function (e) {
        e.preventDefault();
        let userEvent = $("#userInput").val();
        let id = counter += 1;
        document.getElementById('form').reset();
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection(user.uid).doc('_' + id).set({
                    id: '_' + id,
                    userEvent
                }).then(() => {
                    console.log("Todo Added SuccessFully!");
                }).catch(err => {
                    console.log(err.message);
                });
            }
        })
    });

    $("#logoutBtn").click(function (e) {
        e.preventDefault();
        auth.signOut();
        location.href = "Login.html"
    });

    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection(user.uid).onSnapshot(snapshot => {
                let changes = snapshot.docChanges();
                changes.forEach(change => {
                    if (change.type === 'added') {
                        renderData(change.doc)
                    } else if (change.type === 'removed') {
                        let li = myList.querySelector('li [data-id=' + change.doc.id + ']').parentElement;
                        $(li).css('display', 'none');
                    }
                })
            })
        }
    })

});
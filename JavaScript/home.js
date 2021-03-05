$(document).ready(function () {
    let userName;

    var scroll_pos = 0;
    $(document).scroll(function () {
        scroll_pos = $(this).scrollTop();
        if (scroll_pos > 50) {
            $("#header").css({ 'background-color': 'white', 'box-shadow': '0 8px 8px rgba(0,0,0,0.12)' });
        } else {
            $("#header").css({ 'background-color': 'transparent', 'box-shadow': 'none' });
        }
    });

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

    // fetching username
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('users').doc(user.uid).get().then(snapshot => {
                userName = snapshot.data().Name;
                $("#avatar").attr('src', `https://joeschmoe.io/api/v1/${userName}`);
                $(".user").html(userName);
            });
        }
    });

    $("#createTodoBtn").click(function (e) {
        e.preventDefault();
        location.href = "App.html";
    });

    $("#header_logoutbtn").click(function (e) {
        e.preventDefault();
        auth.signOut();
        location.href = "Login.html"
    });

});


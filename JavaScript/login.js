$(document).ready(function () {
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

    $("#loginForm_btn").click(function (e) {
        e.preventDefault();
        let user_emailVal = $("#user_email").val();
        let user_passVal = $("#user_pass").val();
        auth.signInWithEmailAndPassword(user_emailVal, user_passVal).then(() => {
            console.log("Login Successfully");
            location.href = "Home.html";
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            $("#signinErrorMsg").show();
            $("#signInErrorMsg").html(errorMessage);
        });
    });
});
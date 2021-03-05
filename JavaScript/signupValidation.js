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

    $("#signUpWithGoogle").click(function (e) {
        var provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        firebase.auth().languageCode = 'it';
        // To apply the default browser preference instead of explicitly setting it.
        // firebase.auth().useDeviceLanguage();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    });

    $("#form_signUpBtn").click(function (e) {
        e.preventDefault();
        let letter = /^[a-zA-z," "]+$/;
        let digit = /^[0-9]+$/;
        let sRate = 0;
        let count = 0;

        $.fn.sendData = (user_nameVal, user_emailVal, user_phoneVal, user_passVal, user_CPassVal) => {
            firebase.auth().createUserWithEmailAndPassword(user_emailVal, user_passVal)
                .then((userCredential) => {
                    location.href = "Login.html";
                    return db.collection('users').doc(userCredential.user.uid).set({
                        Name: user_nameVal,
                        Email: user_emailVal,
                        Phone: user_phoneVal,
                        Password: user_passVal,
                        Confirm_Password: user_CPassVal
                    });
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    $("#signupErrorMsg").show();
                    $("#signUpErrorMsg").html(errorMessage);
                });
        }


        $.fn.successValidation = (user_nameVal, user_emailVal, user_phoneVal, user_passVal, user_CPassVal) => {
            let form_group = document.querySelectorAll(".form-group");
            count = form_group.length;
            for (let i in form_group) {
                if (form_group[i].className != "form-group error") {
                    if (form_group[i].className == "form-group success") {
                        sRate++;
                    }
                }
            }

            if (count == sRate) {
                document.getElementById("signUpForm").reset();
                $(form_group).removeClass("success");
                $.fn.sendData(user_nameVal, user_emailVal, user_phoneVal, user_passVal, user_CPassVal);
            }
        }

        $.fn.setSuccessIndication = (input) => {
            let parentElements = input.parentElement;
            $(parentElements).removeClass("error");
            $(parentElements).addClass("success");
        }

        $.fn.setErrorIndication = (input, errorMsg) => {
            let parentElements = input.parentElement;
            $(parentElements).addClass("error");
            $(parentElements).removeClass("success");
            let small = parentElements.querySelector(".errorMsg");
            $(small).html(errorMsg);
        }

        $.fn.validUserName = (user_nameVal) => {
            if (user_nameVal.match(letter)) {
                return true;
            } else {
                return false;
            }
        }

        $.fn.validUserEmail = (user_emailVal) => {
            let atSymbol = user_emailVal.indexOf("@");
            let dot = user_emailVal.lastIndexOf(".");
            if (dot - atSymbol < 4) {
                return false;
            } else if (atSymbol != user_emailVal.lastIndexOf("@")) {
                return false;
            } else if (atSymbol < 3) {
                return false;
            } else {
                return true;
            }
        }

        $.fn.validUserPhone = (user_phoneVal) => {
            if (user_phoneVal.match(digit)) {
                return true;
            } else {
                return false
            }
        }

        $.fn.validate = (user_nameVal, user_emailVal, user_phoneVal, user_passVal, user_CPassVal) => {
            if (user_nameVal === "") {
                $.fn.setErrorIndication(user_name, "Name cannot be set empty!");
            } else if (!$.fn.validUserName(user_nameVal)) {
                $.fn.setErrorIndication(user_name, "Name must be contain alphabetical letters only!");
            } else {
                $.fn.setSuccessIndication(user_name);
            }

            if (user_emailVal === "") {
                $.fn.setErrorIndication(user_email, "Email cannot be set empty!");
            } else if (!$.fn.validUserEmail(user_emailVal)) {
                $.fn.setErrorIndication(user_email, "Invalid email address!");
            } else {
                $.fn.setSuccessIndication(user_email);
            }

            if (user_phoneVal === "") {
                $.fn.setErrorIndication(user_phone, "Mobile no. cannot be set empty!");
            } else if (!$.fn.validUserPhone(user_phoneVal)) {
                $.fn.setErrorIndication(user_phone, "Mobile no. must be contain digits only!");
            } else if (user_phoneVal.length < 10 || user_phoneVal.length > 10) {
                $.fn.setErrorIndication(user_phone, "Mobile no. must be 10 digit long!");
            } else {
                $.fn.setSuccessIndication(user_phone);
            }

            if (user_passVal === "") {
                $.fn.setErrorIndication(user_pass, "Password cannot be set empty!");
            } else if (user_passVal.length < 8 || user_passVal.length > 15) {
                $.fn.setErrorIndication(user_pass, "Password must be 8 to 15 character long!");
            } else {
                $.fn.setSuccessIndication(user_pass);
            }

            if (user_passVal.length > 8 || user_passVal.length < 15) {
                if (user_CPassVal.length == 0) {
                    $.fn.setErrorIndication(user_CPass, "Confirm password can not be set empty!");
                } else if (user_passVal.length != user_CPassVal.length) {
                    $.fn.setErrorIndication(user_CPass, "Password does not matched!");
                } else {
                    if (user_CPassVal != user_passVal) {
                        $.fn.setErrorIndication(user_CPass, "Password does not matched!");
                    } else {
                        $.fn.setSuccessIndication(user_CPass);
                    }
                }
            }

            $.fn.successValidation(user_nameVal, user_emailVal, user_phoneVal, user_passVal, user_CPassVal);
        }

        let user_nameVal = $("#user_name").val();
        let user_emailVal = $("#user_email").val();
        let user_phoneVal = $("#user_phone").val();
        let user_passVal = $("#user_pass").val();
        let user_CPassVal = $("#user_CPass").val();

        $.fn.validate(user_nameVal, user_emailVal, user_phoneVal, user_passVal, user_CPassVal);
    });
});
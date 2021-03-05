$(document).ready(function () {
    var scroll_pos = 0;
    $(document).scroll(function () {
        scroll_pos = $(this).scrollTop();
        if (scroll_pos > 50) {
            $("#header").css({ 'background-color': 'white', 'box-shadow': '0 8px 8px rgba(0,0,0,0.12)' });
        } else {
            $("#header").css({ 'background-color': 'transparent', 'box-shadow': 'none' });
        }
    });

    $("#header_signUpBtn, #hero_signUpBtn").click(function (e) {
        e.preventDefault();
        location.href = "Signup.html"
    });

    $("#header_logInBtn").click(function (e) {
        e.preventDefault();
        location.href = "Login.html"
    });

    $(".navbar-toggler").click(function (e) {
        e.preventDefault();
        $("#navbarNav").css('backgroundColor', '#fff');
    });
});




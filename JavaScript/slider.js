// Testimonial Slider
let slider1 = document.getElementById("glide_1");

if (slider1) {
    new Glide(slider1, {
        type: "carousel",
        startAt: 0,
        perView: 1,
        animationDuration: 800,
        animationTimingFunc: "linear"
    }).mount();
}
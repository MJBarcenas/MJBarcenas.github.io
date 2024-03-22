let introductions = ["Michael Justin", "a Software Developer", "a Passionate Person"];

function main() {
    var elements = document.querySelector('#introduction');
    var toRotate = introductions;
    var period = 2000;
    if (toRotate) {
        new TxtType(elements, introductions, period);
    }

    const el = document.querySelector(".nav");
    const observer = new IntersectionObserver(
        ([e]) => e.target.classList.toggle("fixed", e.intersectionRatio < 1), { threshold: [1] }
    );

    observer.observe(el);

    const scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach(el => scrollObserver.observe(el));
}

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span id="introduction">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = main();

let menuButton = document.querySelector("#menu-button");
let menu = document.querySelector("#menu");

menuButton.isOpened = false;
menuButton.addEventListener('click', () => {
    if (menuButton.isOpened) {
        menuButton.isOpened = false;
        menu.style.display = "none";

        menuButton.className = "fa-solid fa-bars";
    } else {
        menuButton.isOpened = true;
        menu.style.display = "flex";

        menuButton.className = "fa-solid fa-xmark";
    }
});

menu.addEventListener('click', () => {
    menu.style.display = "none";
    menuButton.className = "fa-solid fa-bars";
});
let introductions = ["Hi, I'm Michael Justin", "I'm a Software Developer", "I'm a Passionate Person"];
var elements = document.querySelector('#introduction');

function showHacker(intro_index) {
    let iterations = 0;
    let hackerCode = setInterval(() => {
        elements.innerText = introductions[intro_index].split("")
            .map((letter, index) => {
                if (letter == " ") {
                    return letter;
                }

                if (index < iterations) {
                    return introductions[intro_index][index];
                }

                let randomChar = String.fromCharCode([Math.floor(Math.random() * 26) + 97]);
                return randomChar;
            })
            .join("");
        // console.log(intro_index);
        if (iterations >= introductions[intro_index].length) {
            clearInterval(hackerCode);
            setTimeout(() => {
                if (intro_index >= introductions.length - 1) {
                    showHacker(0);
                } else {
                    showHacker(intro_index + 1);
                }
            }, 2000);
        }
        iterations += 1 / 3;
    }, 30);
}

function main() {
    showHacker(0);

    // var elements = document.querySelector('#introduction');
    // var toRotate = introductions;
    // var period = 2000;
    // if (toRotate) {
    //     new TxtType(elements, introductions, period);
    // }

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
        let style = window.getComputedStyle(menuButton);
        if (style.display != "none") {
            menu.style.display = "none";
            menuButton.className = "fa-solid fa-bars";
        }
    });

    let scrollToTopButton = document.querySelector("#contact i");
    scrollToTopButton.addEventListener("click", () => {
        document.body.srollTop = 0;
        document.documentElement.scrollTop = 0;

    });
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
        for (let i = 0; i < 5; i++) {
            let randomChar = String.fromCharCode([Math.floor(Math.random() * 26) + 97]);
            this.txt = fullTxt.substring(0, this.txt.length) + randomChar;
            this.el.innerHTML = '<span id="introduction">' + this.txt + '</span>';
        }
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
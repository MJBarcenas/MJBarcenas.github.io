let introductions = ["Hi, I'm Michael Justin", "I'm a Software Developer"];
var elements = document.querySelector("#introduction");

function showHacker(intro_index) {
  let iterations = 0;
  let hackerCode = setInterval(() => {
    elements.innerText = introductions[intro_index]
      .split("")
      .map((letter, index) => {
        if (letter == " ") {
          return letter;
        }

        if (index < iterations) {
          return introductions[intro_index][index];
        }

        let randomChar = String.fromCharCode([
          Math.floor(Math.random() * 26) + 97,
        ]);
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

var particles = [];

function addParticle() {
  particles.push({
    x: Math.random(),
    y: Math.random(),
    xVel: (Math.random() - 0.5) * 0.2,
    yVel: (Math.random() - 0.5) * 0.2,
    size: Math.random() * 50 + 50,
  });
}

function render() {
  var elem = document.getElementById("container");
  elem.innerHTML = "";

  for (i = 0; i < particles.length; i++) {
    var newParticle =
      "<div class='blob' style='width:" +
      particles[i].size +
      "px; height:" +
      particles[i].size +
      "px; top:" +
      particles[i].y * window.innerHeight +
      "px; left:" +
      particles[i].x * window.innerWidth +
      "px;'></div>";
    elem.innerHTML += newParticle;
  }
}

function dataUpdate() {
  if (particles.length < 5 && Math.random() < 0.05) {
    addParticle();
  }

  for (i = 0; i < particles.length; i++) {
    particles[i].x += particles[i].xVel / 35;
    particles[i].y += particles[i].yVel / 35;
    if (
      particles[i].x > 1.2 ||
      particles[i].x < -0.2 ||
      particles[i].y > 1.2 ||
      particles[i].y < -0.2
    ) {
      particles.splice(i, 1);
    }
  }
}

function frame() {
  dataUpdate();
  render();

  window.requestAnimationFrame(frame);
}

function main() {
  showHacker(0);

  // var elements = document.querySelector('#introduction');
  // var toRotate = introductions;
  // var period = 2000;
  // if (toRotate) {
  //     new TxtType(elements, introductions, period);
  // }

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => scrollObserver.observe(el));

  let menuButton = document.querySelector("#menu-button");
  let menu = document.querySelector("#menu");

  menuButton.isOpened = false;
  menuButton.addEventListener("click", () => {
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

  menu.addEventListener("click", () => {
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

  let cursor = document.querySelector("#cursor");
  document.addEventListener("mousemove", (e) => {
    const x = event.clientX;
    const y = event.clientY;
    document.getElementById(
      "cursor"
    ).style.background = `radial-gradient(600px at ${x}px ${y}px, rgba(32, 12, 121, 0.3), transparent 80%)`;
  });
}

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    for (let i = 0; i < 5; i++) {
      let randomChar = String.fromCharCode([
        Math.floor(Math.random() * 26) + 97,
      ]);
      this.txt = fullTxt.substring(0, this.txt.length) + randomChar;
      this.el.innerHTML = '<span id="introduction">' + this.txt + "</span>";
    }
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span id="introduction">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = main();
let nav = document.querySelector("nav");
window.onscroll = () => {
  if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
    nav.style.backgroundColor = "#0f172abf";
    // background-color: #0f172abf;
  } else {
    nav.style.backgroundColor = "unset";
  }
};
// window.requestAnimationFrame(frame);

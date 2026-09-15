/* =====================================
   LOADING
===================================== */

window.addEventListener("load", () => {

    const loadingScreen =
        document.getElementById("loading-screen");

    setTimeout(() => {

        loadingScreen.classList.add("loaded");

    }, 2100);

});



/* =====================================
   MOBILE MENU
===================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });



/* =====================================
   COUNTDOWN
===================================== */

/*
    開催日が決定したら、ここを変更。

    例：
    const targetDate =
        new Date("2026-10-15T20:00:00+09:00");

    現在は開催日未定なので null。
*/

const targetDate = null;


function updateCountdown() {

    const countdown =
        document.getElementById("countdown");

    const tbaMessage =
        document.querySelector(".tba-message");


    /*
        開催日未定
    */

    if (!targetDate) {

        countdown.classList.add("tba");

        if (tbaMessage) {
            tbaMessage.style.display = "block";
        }

        return;
    }


    /*
        開催日決定後
    */

    if (tbaMessage) {
        tbaMessage.style.display = "none";
    }


    const now = new Date();

    const difference =
        targetDate.getTime() -
        now.getTime();


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);



/* =====================================
   PARTICLES
===================================== */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


let particles = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


function createParticles() {

    particles = [];

    const count =
        Math.min(
            Math.floor(window.innerWidth / 8),
            140
        );


    for (let i = 0; i < count; i++) {

        particles.push({

            x: Math.random() *
                canvas.width,

            y: Math.random() *
                canvas.height,

            size:
                Math.random() * 1.5 + 0.3,

            speed:
                Math.random() * 0.25 + 0.05,

            opacity:
                Math.random() * 0.4 + 0.05

        });

    }

}


createParticles();


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(p => {

        p.y -= p.speed;


        if (p.y < 0) {

            p.y =
                canvas.height;

            p.x =
                Math.random() *
                canvas.width;

        }


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(255,255,255,${p.opacity})`;


        ctx.fill();

    });


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();



/* =====================================
   CURSOR EFFECT
===================================== */

const cursor =
    document.querySelector(".cursor-glow");


document.addEventListener(
    "mousemove",
    (event) => {

        cursor.style.left =
            event.clientX + "px";

        cursor.style.top =
            event.clientY + "px";

    }
);



/* =====================================
   SCROLL REVEAL
===================================== */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


document.querySelectorAll(
    ".section, .entry-section, .organizer"
).forEach(section => {

    observer.observe(section);

});



/* =====================================
   HERO PARALLAX
===================================== */

const heroLogo =
    document.querySelector(".hero-logo");


window.addEventListener(
    "scroll",
    () => {

        if (!heroLogo) return;


        const scroll =
            window.scrollY;


        if (scroll < window.innerHeight) {

            heroLogo.style.transform =
                `translateY(${scroll * 0.12}px)`;

        }

    }
);



/* =====================================
   SMOOTH ANCHOR
===================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                targetId === "#" ||
                !targetId
            ) {

                event.preventDefault();

                return;

            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});

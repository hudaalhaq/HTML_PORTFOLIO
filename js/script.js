/* ===========================
    NAVBAR SCROLL
=========================== */

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>60){

        header.classList.add("sticky");

    }else{

        header.classList.remove("sticky");

    }

});


/* ===========================
    TYPING EFFECT
=========================== */

const jobs=[

"Automation Engineer",

"Industrial R&D",

"PLC Programmer",

"Electrical Designer",

"Automation Developer"

];

let speed=100;

let index=0;

let char=0;

let current="";

let isDeleting=false;

const typing=document.querySelector(".hero-left h2");

function typeEffect(){

    current=jobs[index];

    if(!isDeleting){

        typing.textContent=current.substring(0,char++);

        if(char>current.length){

            isDeleting=true;

            setTimeout(typeEffect,1500);

            return;

        }

    }

    else{

        typing.textContent=current.substring(0,char--);

        if(char==0){

            isDeleting=false;

            index++;

            if(index>=jobs.length){

                index=0;

            }

        }

    }

    setTimeout(typeEffect,isDeleting?45:speed);

}

typeEffect();


/* ===========================
    SCROLL REVEAL
=========================== */

const reveal=document.querySelectorAll("section");

function showSection(){

    reveal.forEach(sec=>{

        const top=sec.getBoundingClientRect().top;

        const visible=window.innerHeight-120;

        if(top<visible){

            sec.classList.add("show");

        }

    });

}

window.addEventListener("scroll",showSection);

showSection();


/* ===========================
    COUNTER
=========================== */

const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

    counter.innerText="0";

    const update=()=>{

        const target=+counter.getAttribute("data-target");

        const c=+counter.innerText;

        const increment=target/120;

        if(c<target){

            counter.innerText=`${Math.ceil(c+increment)}`;

            setTimeout(update,20);

        }

        else{

            counter.innerText=target;

        }

    }

    update();

});


/* ===========================
    ACTIVE MENU
=========================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-120;

        if(pageYOffset>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")=="#"+current){

            link.classList.add("active");

        }

    });

});


/* ===========================
    BACK TO TOP
=========================== */

const topButton=document.createElement("button");

topButton.innerHTML="↑";

topButton.id="topButton";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        topButton.classList.add("show");

    }

    else{

        topButton.classList.remove("show");

    }

});

topButton.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ===========================
    MOBILE NAVIGATION (rebuilt)
=========================== */

const navToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("nav");

if(navToggle && mainNav){

    const navBackdrop = document.createElement("div");
    navBackdrop.className = "nav-backdrop";
    document.body.appendChild(navBackdrop);

    const navIcon = navToggle.querySelector("i");

    const openNav = () => {
        mainNav.classList.add("nav-open");
        navBackdrop.classList.add("show");
        navIcon.classList.remove("fa-bars");
        navIcon.classList.add("fa-xmark");
        document.body.style.overflow = "hidden";
    };

    const closeNav = () => {
        mainNav.classList.remove("nav-open");
        navBackdrop.classList.remove("show");
        navIcon.classList.remove("fa-xmark");
        navIcon.classList.add("fa-bars");
        document.body.style.overflow = "";
    };

    navToggle.addEventListener("click", () => {
        mainNav.classList.contains("nav-open") ? closeNav() : openNav();
    });

    navBackdrop.addEventListener("click", closeNav);

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (e) => {
        if(e.key === "Escape") closeNav();
    });

    window.addEventListener("resize", () => {
        if(window.innerWidth > 1024) closeNav();
    });

}

/* ===========================
    FEATURED PROJECTS CAROUSEL
    Satu logic native-scroll untuk semua ukuran layar.
    Beda hanya jumlah kartu yang digeser tiap klik next/prev:
    - Desktop (>=1025px): 3 kartu sekaligus (karena tampil 3 per baris)
    - Mobile/Tablet: 1 kartu
=========================== */

const carouselTrack = document.getElementById("carouselTrack");
const carouselPrev = document.getElementById("prevBtn");
const carouselNext = document.getElementById("nextBtn");
const carouselDotsWrap = document.getElementById("carouselDots");
const carouselWrapper = document.querySelector(".carousel-wrapper");

if(carouselTrack && carouselDotsWrap && carouselWrapper){

    const slides = Array.from(carouselTrack.children);

    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        if(i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            slides[i].scrollIntoView({behavior:"smooth", inline:"start", block:"nearest"});
        });
        carouselDotsWrap.appendChild(dot);
    });

    const dots = Array.from(carouselDotsWrap.children);

    const getCardStep = () => {
        const gap = parseFloat(getComputedStyle(carouselTrack).gap) || 0;
        return slides[0].getBoundingClientRect().width + gap;
    };

    const scrollByCards = (dir) => {
        const distance = getCardStep();
        carouselTrack.scrollBy({left: dir * distance, behavior:"smooth"});
    };

    if(carouselPrev) carouselPrev.addEventListener("click", () => scrollByCards(-1));
    if(carouselNext) carouselNext.addEventListener("click", () => scrollByCards(1));

    const syncActiveDot = () => {
        const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;
        const scrollLeft = carouselTrack.scrollLeft;

        let activeIndex;

        if(scrollLeft >= maxScroll - 4){
            activeIndex = slides.length - 1;
        } else if(scrollLeft <= 4){
            activeIndex = 0;
        } else {
            const trackLeft = carouselTrack.getBoundingClientRect().left;
            let closestDistance = Infinity;
            activeIndex = 0;
            slides.forEach((slide, i) => {
                const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
                if(distance < closestDistance){
                    closestDistance = distance;
                    activeIndex = i;
                }
            });
        }

        dots.forEach(d => d.classList.remove("active"));
        if(dots[activeIndex]) dots[activeIndex].classList.add("active");

        carouselWrapper.classList.toggle("at-start", scrollLeft <= 4);
        carouselWrapper.classList.toggle("at-end", scrollLeft >= maxScroll - 4);

        if(carouselPrev) carouselPrev.disabled = scrollLeft <= 4;
        if(carouselNext) carouselNext.disabled = scrollLeft >= maxScroll - 4;
    };

    let scrollTimer;
    carouselTrack.addEventListener("scroll", () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(syncActiveDot, 100);
    });

    window.addEventListener("resize", () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(syncActiveDot, 150);
    });

    syncActiveDot();

}
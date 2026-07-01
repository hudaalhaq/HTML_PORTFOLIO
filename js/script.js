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
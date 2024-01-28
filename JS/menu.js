let first = document.getElementById('hr1');
let second = document.getElementById('hr2');
let third = document.getElementById('hr3');
let menu = document.querySelector('.phoneMenu');
let count = 0;

document.querySelector('menu').addEventListener('click',()=>{
    if(count%2 === 0){
        showMenu();
    }else{
        hideMenu();
    }
    count++;
});
function showMenu() {
    disableScroll();
    first.classList.remove("revind1");
    second.classList.remove("revind2");
    third.classList.remove("revind3");
    first.classList.add("rotateDown");
    second.classList.add("remove");
    third.classList.add("rotateUp");

    menu.classList.remove("removePhoneMenu");
    menu.classList.add("showPhoneMenu");
}
function hideMenu() {
    first.classList.add("revind1");
    second.classList.add("revind2");
    third.classList.add("revind3");
    first.classList.remove("rotateDown");
    second.classList.remove("remove");
    third.classList.remove("rotateUp");

    menu.classList.remove("showPhoneMenu");
    menu.classList.add("removePhoneMenu");

    enableScroll();
}
function disableScroll() {
    document.body.classList.add("stop-scrolling");
}
  
function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}

window.onresize = ()=>{
    if(window.innerWidth > 600){
        enableScroll();
    }else{
        if(Array.from(menu.classList).find(element => element == "showPhoneMenu") !== undefined){
            disableScroll();
        }
    }
}

// SCROLL SECTIONS ACTIVE LINK
const sections = document.querySelectorAll(".segment");
const nav_links=document.querySelectorAll(".nav_menu li a");

function scrollActive(){
    const scrollY = window.scrollY+200;

    // Resolve home page issue
    const homeSectionOffset=document.getElementById('Home').offsetTop;
    const homeSectionHeight=document.getElementById('Home').clientHeight;
    if(scrollY>=homeSectionOffset && scrollY<homeSectionOffset+homeSectionHeight){
        nav_links.forEach((link) => {
            link.classList.remove('active-link');
        });
        return;
    }

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            nav_links.forEach((link) => {
                link.classList.remove('active-link');
            });
            nav_links[index].classList.add('active-link');
        }
    });
    
}
window.addEventListener("scroll", scrollActive);
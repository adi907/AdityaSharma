let menu = document.querySelector('.phoneMenu');

let count = 0;

document.querySelector('menu').addEventListener('click',()=>{
    if(count%2 === 0){
        showMenu();
        count=1;
    }else{
        hideMenu();
        count=0;
    }
});
function showMenu() {
    disableScroll();

    // hamburgerIcon.classList.remove("showIcon");
    // crossIcon.classList.remove("hideIcon");

    // hamburgerIcon.classList.add("hideIcon");
    // crossIcon.classList.add("showIcon");

    menu.classList.remove("removePhoneMenu");
    menu.classList.add("showPhoneMenu");
}
function hideMenu() {

    // crossIcon.classList.remove("showIcon");
    // hamburgerIcon.classList.remove("hideIcon");

    // crossIcon.classList.add("hideIcon");
    // hamburgerIcon.classList.add("showIcon");

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
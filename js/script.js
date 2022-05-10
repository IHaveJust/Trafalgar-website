/* =====================Menu navigation============================================== */

const menuLinks = document.querySelectorAll(".menu__link[data-goto]");

if(menuLinks.length){
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e){
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({  
                top: gotoBlockValue,
                behavior: "smooth"
            });
            closeModal();
            e.preventDefault();
        }
    }
}

/* =====================Menu navigation============================================== */
/* =============================================================================== */
/* =====================Modal window============================================== */

const btnBurger = document.querySelector(".menu__icon");
const menuBody  = document.querySelector(".menu__body");

function toggleModal()
{
    btnBurger.classList.toggle("menu__icon_active");
    menuBody.classList.toggle("menu__body_active");
    document.body.classList.toggle("body_lock");
}

function closeModal()
{
    btnBurger.classList.remove("menu__icon_active");
    menuBody.classList.remove("menu__body_active");
    document.body.classList.remove("body_lock");
}

btnBurger.addEventListener("click", function(e){
    toggleModal();
})

document.addEventListener("click", function(e){
    const activeModal = document.querySelector(".menu__body_active");
    /*
    checking whether click was on the
    modal window or the burger button
    */
    const path = e.composedPath().includes(activeModal) || e.composedPath().includes(btnBurger);
    if(!path){
        closeModal();
    }
})


/* =====================Modal window============================================== */

/* =====================Carousel============================================== */

let width;

const cards      = document.querySelectorAll(".testimonials__card");
const sliderLine = document.querySelector(".testimonials__cards");
const btnPrev    = document.querySelector(".testimonials__prev");
const btnNext    = document.querySelector(".testimonials__next");
const allButtons = document.querySelector(".testimonials__buttons");
const allDots    = Array.from(document.querySelectorAll(".testimonials__dot"));
let count        = 0;


/*the function of changing the size of the block 
with cards and each card separately depending 
on the current size of the bounding block*/
function init(){
    width = document.querySelector(".testimonials__block").offsetWidth;
    sliderLine.style.width = width * cards.length + "px";
    cards.forEach(item => {
        item.style.width = width * 0 + "px";
        item.style.height = "auto";
    });
    roll();
    activateDots();
}

/*Move all the cards*/
function roll(){
    sliderLine.style.transform = "translate(-" + width * count + "px)";
}

/*function for tracking the current card and highlighting its dot button*/
function activateDots(){
    if(document.querySelector("._selected")){
        document.querySelector("._selected").classList.toggle("_selected");
    }
    allDots[count].classList.toggle("_selected");
}

/*Move cards to the left*/
btnNext.addEventListener("click", function(){
    count++;
    if(Math.abs(count) == cards.length){
        count = 0;
    }
    roll();
    activateDots();
})

/*Move cards to the right*/
btnPrev.addEventListener("click", function(){
    count--;
    if(count < 0){
        count = cards.length - 1;
    }
    roll();
    activateDots();
})

/*Take all the buttons except for prev and next
and move all the cards to the required number
of pixels when clicking on the dot button*/
allButtons.addEventListener("click", function(e){
    if(e.target.classList.contains("testimonials__dot")){
        count = allDots.indexOf(e.target);
        roll();
        activateDots();
    }
})

window.addEventListener("resize", init);
init();

/* =====================Carousel============================================== */

/* =====================Spoilers in footer============================================== */

const itemsToHide = Array.from(document.getElementsByClassName("footer__block-items"));
const company = document.querySelector(".footer__company");
const region = document.querySelector(".footer__region");
const help = document.querySelector(".footer__help");
const block = document.querySelector(".footer__second-block");

/*window.addEventListener("resize", function(e){
    if(e.target.innerWidth <= 768){
        itemsToHide.forEach(item => {
            item.classList.add("_spoiled");
        })
    } else{
        itemsToHide.forEach(item => {
            item.classList.remove("_spoiled");
        })
    }
})*/

block.addEventListener("click", function(e){
    const arr = Array.from(block.childNodes);
    e.target.parentNode.classList.toggle("_spoiled");

})

/* =====================Spoilers in footer============================================== */

/* =====================Smooth surfacing of content============================================== */

function onEntry(entry){
    entry.forEach(change => {
        if (change.isIntersecting){
            change.target.classList.add("element-show");
        } else{
            change.target.classList.remove("element-show");
        }
    })
}

let options = {threshold: [0]};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".element-animation");

for(let elm of elements){
    observer.observe(elm);
}

/* =====================Smooth surfacing of content============================================== */
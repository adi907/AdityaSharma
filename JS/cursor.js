// Cursor JS
const cursor1 = document.querySelector('.cursor-1');
const cursor2 = document.querySelector('.cursor-2');

window.addEventListener('mousemove',(e)=>{
    let cHeight=e.pageY;
    let cWidth=e.pageX;

    cursor1.style.top=`${cHeight}px`;
    cursor1.style.left=`${cWidth}px`;
    cursor2.style.top=`${cHeight}px`;
    cursor2.style.left=`${cWidth}px`;
});

function handleCursorEvents(element) {
    element.onmouseenter = () => {
        cursor1.classList.add('active');
        cursor2.classList.add('active');
    }

    element.onmouseleave = () => {
        cursor1.classList.remove('active');
        cursor2.classList.remove('active');
    }
}

document.querySelectorAll('.special-cursor').forEach(handleCursorEvents);
document.querySelectorAll('a').forEach(handleCursorEvents);
document.querySelectorAll('img').forEach(handleCursorEvents);

    

const TypeWriter = function(txtElement, words, wait){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function(){
    // Current Index of Word 
    const current = this.wordIndex % this.words.length;
    const fulltxt = this.words[current];
    
    // check if deleting
    if(this.isDeleting){
        // remove a char
        this.txt = fulltxt.substring(0,this.txt.length-1);
    }else{
        // add a char
        this.txt = fulltxt.substring(0,this.txt.length+1);
    }
    
    // Insert txt into element
    this.txtElement.innerHTML = '<span class = "txt">' + this.txt + '</span>';
    
    // Initial Type Speed
    let typeSpeed = 100;
    if(this.isDeleting){
        typeSpeed /= 2;
    }
    
    // If word is complete
    if(!this.isDeleting && this.txt === fulltxt){
        typeSpeed = this.wait; // to make a pause at end
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        this.wordIndex++;
    }
    
    setTimeout(()=>this.type(),typeSpeed);
}

// init typeWriter
window.onload = function(){
    // TypeWriter fore roles.
    const txtElement = document.querySelector(".role");
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement,words,wait);
    
    
    // TypeWriter fore Footer.
    const txtElementFooter = document.querySelector(".footer");
    const wordsFooter = JSON.parse(txtElementFooter.getAttribute('data-words'));
    const waitFooter = txtElementFooter.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElementFooter,wordsFooter,waitFooter);
}
let wp=document.getElementById('Wp');
let insta=document.getElementById('Insta');

wp.addEventListener('click',()=>{
    window.open("https://wa.me/919654875810");
})

insta.addEventListener('click',()=>{
    window.open("https://www.instagram.com/adii907_/")
})

const api_submitReview='https://prod-23.westus.logic.azure.com:443/workflows/a2f00812298e469a988f883e4e80d5fe/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gxmk6K1GFxMyUTbiRwKroDR9-zM1lIMKinF3hvMFHk0';

function getDetails(){
    const details={};
    let device="";
    if(screen.width>768){
        // console.log("Laptop")
        device= "laptop";
        details.name=document.getElementById('name').value;
        details.email= document.getElementById('email').value;
        details.subject= document.getElementById('subject').value;
        details.message=document.getElementById('Reviewmessage').value;
    }else{
        // console.log("Mobile")
        device="mobile";
        details.name=document.getElementById('name_Mob').value;
        details.email= document.getElementById('email_Mob').value;
        details.subject= document.getElementById('subject_Mob').value;
        details.message=document.getElementById('Reviewmessage_Mob').value;
    }
    
    console.log(details);
    if(validateDetails(details,device)){
        createRecord(details);
    }
}

function validateDetails(details,device){
    if(!validateName(details.name,device)){
        hideLoadingOverlay();
        return false;
    }

    if(!validateMail(details.email,device) ){
        hideLoadingOverlay();
        return false;
    }

    if(!validateText(details.subject,device)||!validateText(details.message,device)){
        hideLoadingOverlay();
        return false;
    }
return true;
}

async function createRecord(details){
    showLoadingOverlay();

    console.log(details)
    
    var myHeaders=new Headers();
    myHeaders.append("Content-Type","application/json");
    
    var record=JSON.stringify({details});

    const options={
        method:'POST',
        headers:myHeaders,
        body:record,
        redirect:'follow'
    }
    
    try{
        const response=await fetch(api_submitReview,options);
        const result= await response.json();
        console.log(result);

        hideLoadingOverlay();

        if(result.status===200){
            // Notification Alert Box
            document.getElementById("alertBox").style.display = "block";
              
            document.getElementById("cancelBtn").addEventListener("click", () => {
              alertBox.style.display = "none";
            });
              
            setTimeout(() => {
                document.getElementById("alertBox").style.display = "none";
            }, 3000);


        }else{
            document.getElementById('error-msg').innerText="Sorry, can not process the data. Please try again 🙏🏼";
        }
        
    }catch(error){
        console.log("Error: ", error);
    } 
    
}

/* Validation Code */

function validateName(name,device){

    if (!name) {
        if(device==="laptop"){
            document.getElementById('error-msg').innerText='Username cannot be empty';
        }
        if(device==="mobile"){
            document.getElementById('error-msg_Mob').innerText='Username cannot be empty';
        }
        
        return false;
    }

    // Regular expression to allow only letters and optional spaces
    var regex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    if(!regex.test(name)){
        if(device==="laptop"){
            document.getElementById('error-msg').innerText='Name cannot contain numbers or symbols';
        }
        if(device==="mobile"){
            document.getElementById('error-msg_Mob').innerText='Name cannot contain numbers or symbols';
        }
        return false
    }

    if(device==="laptop"){
        document.getElementById('error-msg').innerText = "";    
    }
    if(device==="mobile"){
        document.getElementById('error-msg_Mob').innerText = "";    
    }
return true;
}

function validateMail(email,device){

    if(!email){
        if(device==="laptop"){
            document.getElementById('error-msg').innerText='Email cannot be empty';
        }
        if(device==="mobile"){
            document.getElementById('error-msg_Mob').innerText='Email cannot be empty';
        }
        return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
        if(device==="laptop"){
            document.getElementById('error-msg').innerText = "";
        }
        if(device==="mobile"){
            document.getElementById('error-msg_Mob').innerText = "";
        }
        return true;
    }else {
        if(device==="laptop"){
            document.getElementById('error-msg').innerText = 'Invalid email address';
        }
        if(device==="mobile"){
            document.getElementById('error-msg_Mob').innerText = 'Invalid email address';
        }
      return false;
    }
}

function validateText(text,device){
    if(!text){
        if(device==="laptop"){
            document.getElementById('error-msg').innerText='Subject/Message Fields cannot be empty';
        }
        if(device==="mobile"){
            document.getElementById('error-msg_Mob').innerText='Subject/Message Fields cannot be empty';
        }
        return false;
    }

    if(device==="laptop"){
        document.getElementById('error-msg').innerText='';
    }
    if(device==="mobile"){
        document.getElementById('error-msg_Mob').innerText='';
    }
    return true;
}

// Loading screen
function showLoadingOverlay() {
    let loadingOverlay = document.getElementById("loading-overlay");
    loadingOverlay.style.display = "block";
}

function hideLoadingOverlay() {
    let loadingOverlay = document.getElementById("loading-overlay");
    loadingOverlay.style.display = "none";
}
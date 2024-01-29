let submitBtn=document.getElementById('sbmBtn');

const api_submitReview='https://prod-23.westus.logic.azure.com:443/workflows/a2f00812298e469a988f883e4e80d5fe/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gxmk6K1GFxMyUTbiRwKroDR9-zM1lIMKinF3hvMFHk0';

// submitBtn.addEventListener('click',)

async function createRecord(){
    showLoadingOverlay();

    let name=document.getElementById('name').value;
    let email= document.getElementById('email').value;
    let subject= document.getElementById('subject').value;
    let message=document.getElementById('Reviewmessage').value;
    console.log(message)


    if(!validateName(name)){
        hideLoadingOverlay();
        return;
    }

    if(!validateMail(email) ){
        hideLoadingOverlay();
        return;
    }

    if(!validateText(subject)||!validateText(message)){
        hideLoadingOverlay();
        return;
    }
    
    var myHeaders=new Headers();
    myHeaders.append("Content-Type","application/json");
    
    var record=JSON.stringify({
        name:name,
        email:email,
        subject:subject,
        message:message
    });

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

function validateName(name){

    if (!name) {
        document.getElementById('error-msg').innerText='Username cannot be empty';
        return false;
    }

    // Regular expression to allow only letters and optional spaces
    var regex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    if(!regex.test(name)){
        document.getElementById('error-msg').innerText='Name cannot contain numbers or symbols';
        return false
    }

    document.getElementById('error-msg').innerText = "";    
return true;
}

function validateMail(email){

    if(!email){
        document.getElementById('error-msg').innerText='Email cannot be empty';
        return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
        document.getElementById('error-msg').innerText = "";
        return true;
    }else {
      document.getElementById('error-msg').innerText = 'Invalid email address';
      return false;
    }
}

function validateText(text){
    if(!text){
        document.getElementById('error-msg').innerText='Subject/Message Fields cannot be empty';
        return false;
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
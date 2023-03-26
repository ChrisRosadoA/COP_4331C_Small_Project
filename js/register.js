const urlBase = 'https://projectreich.com/LAMPAPI';
const extension = 'php';

let error = "";
let firstName = "";
let lastName = "";
let username = "";
let password = "";
let repeatPassword = "";
let email = "";
let phone = "";

let errorColor = '#E02745';
let successColor = '#248439';

function register() {

    firstName = document.getElementById('firstName').value;
    lastName = document.getElementById('lastName').value;
    username = document.getElementById('username').value;
    password = document.getElementById('loginPassword').value;
    repeatPassword = document.getElementById('repeatPassword').value;
    // email = document.getElementById('email').value;
    // phone = document.getElementById('phoneNumber').value;

    email = "dummy@gmail.com";
    phone = "123 456 7890";

    document.getElementById('registerResult').innerHTML = "";

    //Check if the credentials are valid
    if (firstName == "" || lastName == "" || username == "" || password == "" || repeatPassword == "" || email == "" || phone == "") {
        document.getElementById('registerResult').innerHTML = "Please fill out all the required fields.";
        document.getElementById('registerResult').style.color = errorColor;
        return;
    }

    //check if username has spaces
    if (username.includes(" ")) {
        document.getElementById('registerResult').innerHTML = "Username cannot have spaces.";
        document.getElementById('registerResult').style.color = errorColor;
        return;
    }

    //check if username has spaces
    if (password.includes(" ")) {
        document.getElementById('registerResult').innerHTML = "Password cannot have spaces.";
        document.getElementById('registerResult').style.color = errorColor;
        return;
    }


    //Check if password is same as repeat
    if (password != repeatPassword) {
        document.getElementById('registerResult').innerHTML = "The passwords do not match.";
        document.getElementById('registerResult').style.color = errorColor;
        return;
    }

    //Check if password or username is too short 
    if (username.length < 7) {
        document.getElementById('registerResult').innerHTML = "The username is too short.";
        document.getElementById('registerResult').style.color = errorColor;
        return;
    }

    if (password.length < 8) {
        document.getElementById('registerResult').innerHTML = "The password is too short.";
        document.getElementById('registerResult').style.color = errorColor;
        return;
    }

    // check email
    // if (!isValidEmail(email)) {
    //     document.getElementById('registerResult').innerHTML = "The email is not in a valid format.";
    //     document.getElementById('registerResult').style.color = "red";
    //     return;
    // }
    
    // check phone
    // if (formatPhoneNumber(phone) == -1) {
    //     document.getElementById('registerResult').innerHTML = "The phone number is invalid.";
    //     document.getElementById('registerResult').style.color = "red";
    //     return;
    // }
    phone = formatPhoneNumber(phone);
    

    hash = md5(password);
    let tmp = {Login: username, Password: hash, FirstName: firstName, LastName: lastName, Email: email, PhoneNumber: phone};

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + "/Register." + extension;

    let xhr = new XMLHttpRequest();
  	xhr.open("POST", url, true);
  	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  	try
  	{
        console.log(xhr);
  		xhr.onreadystatechange = function()
  		{
  			// Registered succesfully
  			if (this.readyState == 4 && this.status == 200)
  			{
  				let jsonObject= JSON.parse( xhr.responseText);
  				// error = jsonObject.error;

  				// if (error != ""){
  				// 	document.getElementById("registerResult").innerHTML = error;
  				// 	document.getElementById("registerResult").style.color = '#E02745';

  				// 	return;
  				// }

  				document.getElementById("registerResult").innerHTML = "Successfully registered, redirecting to login page.";
  				document.getElementById("registerResult").style.color = successColor;

  				// Clear all the fields
  				document.getElementById("firstName").value = "";
       			document.getElementById("lastName").value = "";
  				document.getElementById("username").value = "";
  				document.getElementById("loginPassword").value = "";
  				document.getElementById("repeatPassword").value = "";
                //document.getElementById('email').value = "";
                //document.getElementById('phoneNumber').value = "";

				// Wait for 2 seconds to show the "Successfully registered" message then redirect to the login page
				window.setTimeout(function (){window.location.href = "index.html";}, 1000);
                // window.location.href = "color.html";

                window.location.href = "https://projectreich.com";  // Edit made by Jared Reich on 3/26/2023
                
                document.getElementById("registerResult").innerHTML = "Successfully registered, redirecting to login page.";
  				document.getElementById("registerResult").style.color = successColor;
            }
            else if (this.status == 409) {
                document.getElementById("registerResult").innerHTML = "This username is already in use.";
  				document.getElementById("registerResult").style.color = errorColor;
            }

  		};
        console.log(jsonPayload);
  		xhr.send(jsonPayload);
  	}
  	// Register not successful
  	catch(err)
  	{
  		document.getElementById("registerResult").innerHTML= err.message;
  		document.getElementById("registerResult").style.color = errorColor;
        console.log("Could not register successfully.");
  	}


    console.log(tmp);
}

function isValidEmail(email) {
    //regex
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}

function formatPhoneNumber(phoneNumber) {
    
    const digits = phoneNumber.replace(/\D/g, '');
    
    
    if (digits.length !== 10) {
      // Return -1 to indicate an invalid phone number format
      return -1;
    }
    
    const formattedPhoneNumber = `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6, 10)}`;
    
    return formattedPhoneNumber;
}
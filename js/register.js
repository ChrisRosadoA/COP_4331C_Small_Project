const urlBase = 'http://projectreich.com/LAMPAPI';
const extension = 'php';

let error = "";
let firstName = "";
let lastName = "";
let username = "";
let password = "";
let repeatPassword = "";
let email = "";
let phone = "";

function register() {

    firstName = document.getElementById('firstName').value;
    lastName = document.getElementById('lastName').value;
    username = document.getElementById('username').value;
    password = document.getElementById('loginPassword').value;
    repeatPassword = document.getElementById('repeatPassword').value;
    email = document.getElementById('email').value;
    phone = document.getElementById('phoneNumber').value;

    document.getElementById('registerResult').innerHTML = "";

    //Check if the credentials are valid
    if (firstName == "" || lastName == "" || username == "" || password == "" || repeatPassword == "" || email == "" || phone == "") {
        document.getElementById('registerResult').innerHTML = "Please fill out all the required fields.";
        document.getElementById('registerResult').style.color = "red";
        return;
    }


    //Check if password is same as repeat
    if (password != repeatPassword) {
        document.getElementById('registerResult').innerHTML = "The passwords do not match.";
        document.getElementById('registerResult').style.color = "red";
        return;
    }

    //Check if password or username is too short

    if (username.length < 7) {
        document.getElementById('registerResult').innerHTML = "The username is too short.";
        document.getElementById('registerResult').style.color = "red";
        return;
    }

    if (password.length < 8) {
        document.getElementById('registerResult').innerHTML = "The password is too short.";
        document.getElementById('registerResult').style.color = "red";
        return;
    }

    

    hash = md5(password);
    let tmp = {userName: username, password: hash, firstName: firstName, lastName: lastName, email: email, phone: phone};

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + "/Register." + extension;

    let xhr = new XMLHttpRequest();
  	xhr.open("POST", url, true);
  	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  	try
  	{
  		xhr.onreadystatechange = function()
  		{
  			// Registered succesfully
  			if (this.readyState == 4 && this.status == 200)
  			{
  				let jsonObject= JSON.parse( xhr.responseText);
  				error = jsonObject.error;

  				if (error != ""){
  					document.getElementById("registerResult").innerHTML = error;
  					document.getElementById("registerResult").style.color = '#E02745';

  					return;
  				}

  				document.getElementById("registerResult").innerHTML = "Successfully registered, redirecting to login page.";
  				document.getElementById("registerResult").style.color = 'green';

  				// Clear all the fields
  				document.getElementById("firstName").value = "";
       			document.getElementById("lastName").value = "";
  				document.getElementById("username").value = "";
  				document.getElementById("loginPassword").value = "";
  				document.getElementById("repeatPassword").value = "";
                document.getElementById('email').value = "";
                document.getElementById('phoneNumber').value = "";

				// Wait for 2 seconds to show the "Successfully registered" message then redirect to the login page
				window.setTimeout(function (){window.location.href = "index.html";}, 1000);

  			}

  		};
  		xhr.send(jsonPayload);
  	}
  	// Register not successful
  	catch(err)
  	{
  		document.getElementById("registerResult").innerHTML= err.message;
  		document.getElementById("registerResult").style.color = '#E02745';
  	}


    console.log(tmp);
}
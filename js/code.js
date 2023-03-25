const urlBase = 'https://projectreich.com/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
	var hash = md5( password );

	console.log(login);
	console.log(password);
	
	document.getElementById("loginResult").innerHTML = "";

	if (login == "" || password =="") {
		document.getElementById('loginResult').innerHTML = "Please fill out all the required fields.";
        document.getElementById('loginResult').style.color = "red";
        return;
	}

	let tmp = {login:login,password:hash};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	console.log(xhr);
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
				
				if( userId < 1 )
				{		
					document.getElementById("loginResult").style.color = 'red';
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				// console.log(userId);
				// console.log(firstName);
				// console.log(lastName);

				saveCookie();

				// console.log(document.cookie);
	
				window.location.href = "color.html";

				document.getElementById("addContactResult").style.color = 'green';
				document.getElementById("addContactResult").innerHTML = "Welcome " + firstName + " " + lastName + " here are your contacts.";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log(err);
		document.getElementById("addContactResult").style.color = 'red';
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

// Event handler for the input element
const loginElement = document.getElementById('loginResult');
const passwordElement = document.getElementById('loginResult');

// loginElement.addEventListener('keydown', (event) => {
// 	if (event.keyCode === 13) {
// 		doLogin();
// 	}
// });

// passwordElement.addEventListener('keydown', (event) => {
// 	if (event.keyCode === 13) {
// 		doLogin();
// 	}
// });

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		// document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
		console.log("Logged in as " + firstName + " " + lastName + " with a user ID of " + userId);
	}

	
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addColor()
{
	let newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	let tmp = {color:newColor,userId,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddColor.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchColor()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchColors.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}


// COLOR.HTML PAGE

function toggleContact() {

	// console.log(userId);
	// console.log(firstName);
	// console.log(lastName);
	// console.log(document.cookie[2]);

	let slider = document.getElementById("toggle-slider-contact");
	let buttonVal = document.getElementById("toggle-button");


	document.getElementById("addContactResult").innerHTML = "";
	
	// When slider is open, then close it
	if (slider.classList.contains("open")) {
		slider.style.display = "none";
		slider.classList.remove("open");
		buttonVal.innerHTML = "Add Contact";
		//slider.style.height = "0px";
		console.log("Closing");
	} 
	else {
		slider.style.display = "block";
		slider.classList.add("open");
		
		buttonVal.innerHTML = "Close";
		//slider.style.height = "250px";
		console.log("Opening");
	}
}

function addContact() {

	let first = document.getElementById("addFirstName").value;
	let last = document.getElementById("addLastName").value;
	let email = document.getElementById("addEmail").value;
	let phone = document.getElementById("addPhone").value;
	let address = document.getElementById("addAddress").value;
	

	document.getElementById("addContactResult").innerHTML = "";

	//Check if edit credentials are valid

	if (first == "" || last == "" || email == "" || phone == "" || address == "") {
		document.getElementById("addContactResult").innerHTML = "Please complete all fields";
		document.getElementById("addContactResult").style.color = '#DE2C2C';
		return;
	}
	
	if (!isValidEmail(email)) {
		document.getElementById('addContactResult').innerHTML = "The email is not in a valid format.";
		document.getElementById("addContactResult").style.color = 'red';
		return;
	}

	if (formatPhoneNumber(phone) == -1) {
		document.getElementById('addContactResult').innerHTML = "The phone number is invalid.";
		document.getElementById("addContactResult").style.color = 'red';
		return;
	}
	phone = formatPhoneNumber(phone);
	

	let url = urlBase + '/AddContact.' + extension;

	let xhr = new XMLHttpRequest();
  	xhr.open("POST", url, true);

	let contact = {FirstName: first, LastName: last, Email: email, PhoneNumber: phone, Address: address, UserID: userId};
	//console.log(contact);
	let jsonPayload = JSON.stringify(contact);

  	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  	try
  	{
		//console.log(xhr);
  		xhr.onreadystatechange = function()
  		{
  			if (this.readyState == 4 && this.status == 200)
  			{
				document.getElementById("addContactResult").innerHTML = "Contact successfully added!";
				document.getElementById("addContactResult").style.color = 'green';

				console.log("updating new table");
				showTable();
			}
		};
		xhr.send(jsonPayload);
  	}
  	catch(err)
  	{
  		document.getElementById("addContactResult").innerHTML = err.message;
		console.log(err);
  	}
	//console.log(xhr);
	
}

function compareStrings(a, b) {
	a = a.toLowerCase();
	b = b.toLowerCase();

	if (ascending)
		return (a < b) ? -1 : (a > b) ? 1 : 0;
	else 
		return (a > b) ? -1 : (a < b) ? 1 : 0;
}

function compareNums(a, b) {
	a = a.replace(/\D/g, '');
	b = b.replace(/\D/g, '');

	if (ascending)
		return (a < b) ? -1 : (a > b) ? 1 : 0;
	else 
		return (a > b) ? -1 : (a < b) ? 1 : 0;
}




// Loading contacts into the table from database

let index = 0;
let remaining = 0;

let sortType = 0; // 0 for first name, 1 for last name, 2 for email, 3 for phone, 4 for address
let ascending = true; // 0 for ascending, 1 for descending

function showTable() {
	
	let tmp = {userId:userId};
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase +'/DisplayContact.' + extension;

	let xhr = new XMLHttpRequest();

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	try 
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );

				var table = document.getElementById("contactList");
				//table.innerHTML = "<thead><tr></tr>";

				
				// contactList = jsonObject.results;
				// console.log(contactList);

				console.log(jsonObject.results);
				

				if (!!jsonObject.results) {

					jsonObject.results = jsonObject.results.sort(function(a, b) {
						switch(sortType) {
							case 0: 
								return compareStrings(a["FirstName"], b["FirstName"]);
							case 1:
								return compareStrings(a["LastName"], b["LastName"]);
							case 2:
								return compareStrings(a["Email"], b["Email"]);
							case 3:
								return compareNums(a["PhoneNumber"], b["PhoneNumber"]);
							case 4:
								return compareStrings(a["Address"], b["Address"]);
						}
					})
					
					console.log("Loading table...");
					var html = "";

					remaining = jsonObject.results.length;

					html = loadContacts(jsonObject.results);

					document.getElementById("contactList").innerHTML = html;
				}
				else {
					document.getElementById("contactList").innerHTML = 
					"<tr>" +
						"<td><input id='addFirstName' placeholder='Add first name' ></td>" +
						"<td><input id='addLastName' placeholder='Add last name'></td>" +
						"<td><input id='addEmail' placeholder='Add email'></td>" +
						"<td><input id='addPhone' placeholder='Add phone number'></td>" +
						"<td><input id='addAddress' placeholder='Add address'></td>" +
						"<td>" +
							"<button class='btn' onclick='addContact()' id='addBtn'>Add Contact</button>" +
						"</td>" +
					"</tr>";
				}
			}
		}

		xhr.send(jsonPayload);

	}
	catch (err)
	{
		// document.getElementById()
	}
}

// sets the sorting type to the input
function setSortType(val) {
	if (sortType == val) ascending = !ascending;

	sortType = val;

	showTable();
}


//Appends row to the inner html of the table
function addRow(contactList, i) {

	var firstName = contactList[i]["FirstName"];

	var lastName = contactList[i]["LastName"];

	var phoneNumber = contactList[i]["PhoneNumber"];
	// formatted_phone = "("+phoneNumber.substring(0,3)+")"+phoneNumber.substring(3,6)+"-"+phoneNumber.substring(6,11);

	var email = contactList[i]["Email"];

	var address = contactList[i]["Address"];

	var row = "<tr class='' id='contact" + i + "'>" +
					"<td><span id='contactFirstName" + i + "'>"   + firstName + "</span></td>" +
					"<td><span id='contactLastName" + i + "'>"   + lastName + "</span></td>" +
					"<td><span id='contactEmail" + i + "'>"   + email + "</span></td>" +
					"<td><span id='contactPhone" + i + "'>"   + phoneNumber + "</span></td>" +
					"<td><span id='contactAddress" + i + "'>"   + address + "</span></td>" +
					"<td>" +
						"<button class='btn-edit' onclick='editContact(" + i + "," + contactList[i]["ID"] + ")' id='editBtn" + i + "'>Edit</button>" +
						"<button class='btn-delete' onclick='deleteContact(" + contactList[i]["ID"] + ")' id='deleteBtn" + i + "'>Delete</button>" +
					"</td>" +
				"</tr>";

	return row;

}

//Loads contacts from the appened tables. Puts the edit row as the first entry
function loadContacts(contactList) {
	var html = "";

	for (let i = 0; i < contactList.length; i++) {
		row = addRow(contactList, i);

		html += row;
	}

	var editRow = "<tr>" +
						"<td><input id='addFirstName' placeholder='Add first name' ></td>" +
						"<td><input id='addLastName' placeholder='Add last name'></td>" +
						"<td><input id='addEmail' placeholder='Add email'></td>" +
						"<td><input id='addPhone' placeholder='Add phone number'></td>" +
						"<td><input id='addAddress' placeholder='Add address'></td>" +
						"<td>" +
							"<button class='btn' onclick='addContact()' id='addBtn'>Add</button>" +
						"</td>" +
					"</tr>";


	return editRow + html; //putting edit row as the first entry
}

//Deletes contact based on database id
function deleteContact(id) {

	console.log(id);

	let tmp = {ID:id};

	let jsonPayload = JSON.stringify(tmp);
	let url = urlBase + "/DeleteContact." + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try 
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				console.log("Deleting contact: " + id);
				let confirmation = confirm("Do you want to delete this contact?");

				if (confirmation == false) {
					return;
				}
				showTable();
			}
		}
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log(err);
	}
}

//Toggles contact edit mode specific to contact
function toggleDetails(id) {
	console.log("togglind for contact: " + id);

	var listItem = document.getElementById("info" + id);

	if (listItem.style.display == "none") {
		console.log("Showing contact " + id + " data");
		listItem.style.display = "block";
	}
	else {
		console.log("closing contact " + id + " data");
		listItem.style.display = "none";
	}
}

//Searches for contacts based on query string from input field
function searchContact() {
	
	var input = document.getElementById("searchBar").value;

	console.log(input);

	let result = [];
	
	let tmp = {Search:input, UserID:userId};
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + "/SearchContacts." + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );

				var table = document.getElementById("contactList");

				result = jsonObject.results;

				if (!!result) {
					result = result.sort(function(a, b) {
						return compareStrings(a["FirstName"], b["FirstName"]);
					})

					var html = "";

					remaining = result.length;

					html = loadContacts(result);

					document.getElementById("contactList").innerHTML = html;
				}
			}
		}
		xhr.send(jsonPayload);
	} 
	catch (err) 
	{
		console.log(err);
	}

}

// Edits contact list 
function editContact(id, contactId) {

	console.log("Editting contact " + id);

	var row = document.getElementById("contact" + id);

	var button = document.getElementById("editBtn" + id);

	var firstNameElem = document.getElementById("contactFirstName" + id);
	var lastNameElem = document.getElementById("contactLastName" + id);
	var emailElem = document.getElementById("contactEmail" + id);
	var phoneElem = document.getElementById("contactPhone" + id);
	var addressElem = document.getElementById("contactAddress" + id);

	var firstNameVal = document.getElementById("contactFirstName" + id).innerHTML;
	var lastNameVal = document.getElementById("contactLastName" + id).innerHTML;
	var emailVal = document.getElementById("contactEmail" + id).innerHTML;
	var phoneVal = document.getElementById("contactPhone" + id).innerHTML;
	var addressVal = document.getElementById("contactAddress" + id).innerHTML;

	// console.log(row);
	// console.log("this is the first val"+firstNameVal)

	if (row.classList.contains("editing")) {

		var editFirstName = document.getElementById("editFirstName" + id).value;
		var editLastName = document.getElementById("editLastName" + id).value;
		var editEmail = document.getElementById("editEmail" + id).value;
		var editPhone = document.getElementById("editPhone" + id).value;
		var editAddress = document.getElementById("editAddress" + id).value;

		//Check if edit credentials are valid
		if (editFirstName == "" || editLastName == "" || editEmail == "" || editPhone == "" || editAddress == "") {
			document.getElementById("addContactResult").innerHTML = "Please complete all fields";
			document.getElementById("addContactResult").style.color = 'red';
			return;
		}
		if (!isValidEmail(editEmail)) {
			document.getElementById('addContactResult').innerHTML = "The email is not in a valid format.";
			document.getElementById("addContactResult").style.color = 'red';
        	return;
		}
		if (formatPhoneNumber(editPhone) == -1) {
			document.getElementById('addContactResult').innerHTML = "The phone number is invalid.";
			document.getElementById("addContactResult").style.color = 'red';
			return;
		}
		editPhone = formatPhoneNumber(editPhone);

		firstNameElem.innerHTML = editFirstName;
		lastNameElem.innerHTML = editLastName;
		emailElem.innerHTML = editEmail;
		phoneElem.innerHTML = editPhone;
		addressElem.innerHTML = editAddress;
		
		console.log("Finished editing");

		row.classList.toggle("editing");

		button.innerHTML = "Edit";
	}
	else {

		row.classList.toggle("editing");

		button.innerHTML = "Done";

		// console.log(" Adding input eleemnts now ");
		// console.log(firstNameElem.innerHTML);
		firstNameElem.innerHTML = "<input type='firstName' id='editFirstName" + id + "' placeholder='Add first name' value='" + firstNameVal + "'>";
		lastNameElem.innerHTML = "<input type='lastName' id='editLastName" + id + "' placeholder='Add last name' value='" + lastNameVal + "'>";
		emailElem.innerHTML = "<input type='email' id='editEmail" + id + "' placeholder='Add email' value='" + emailVal + "'>";
		phoneElem.innerHTML = "<input type='phone' id='editPhone" + id + "' placeholder='Add phone number' value='" + phoneVal + "'>";
		addressElem.innerHTML = "<input type='address' id='editAddress" + id + "' placeholder='Add address' value='" + addressVal + "'>";

		

		console.log("Started editing");
	}

	let tmp = {firstname: editFirstName, lastname: editLastName, phone: editPhone, email: editEmail, address: editAddress, id: contactId};
	
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/UpdateContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
  	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  	try
  	{
  		xhr.onreadystatechange = function()
  		{
  			if (this.readyState == 4 && this.status == 200)
  			{
				document.getElementById("addContactResult").innerHTML = "Contact successfully updated!";
				document.getElementById("addContactResult").style.color = 'green';
				
				showTable();	// Show added contact to the table
			}
		};
		xhr.send(jsonPayload);
  	}
  	catch(err)
  	{
  		document.getElementById("addContactResult").innerHTML = err.message;
  	}
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


<?php
	$inData = getRequestInfo();
	
	$firstname = $inData["firstname"];
	$lastname = $inData["lastname"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	$address = $inData["address"];
	$userid = $inData["userid"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		// Insert new contact into the database
		$stmt = $conn->prepare("INSERT INTO Contacts (FirstName,LastName,PhoneNumber,Email,Address,UserID) VALUES (?,?,?,?,?,?)"); // UserID needs to be actual user ID
		$stmt->bind_param("ssssss", $firstname, $lastname, $phone, $email, $address, $userid);
		$stmt->execute();
		$stmt->close();

		// Get contact that was just created and return its ID
		$stmt = $conn->prepare("Select * from Contacts where UserID=? ORDER BY ID DESC LIMIT 1");
		$stmt->bind_param("i", $userid);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		$contactID = $row["ID"];
		returnWithInfo($contactID, "Contact Successfully Created");
		$stmt->close();

		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithInfo( $id, $msg )
	{
		$retValue = '{"ID":' . $id . ',' . '"Result":"' . $msg . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
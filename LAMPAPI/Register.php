<?php
	$inData = getRequestInfo();
 
        $FirstName = $inData["firstname"];
        $LastName = $inData["lastname"];
        $Login = $inData["login"];
        $Password = $inData["password"];
	
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		// Check if User already exists
 		$stmt = $conn->prepare("Select * from Users where Login = ?");
 		$stmt->bind_param("s", $Login);
		$stmt->execute();
		$result = $stmt->get_result();
		$stmt->close();

		// Throw error if user already exists
		if ($result->num_rows != 0)
		{
			http_response_code(409);
			returnWithError("User already exists.");
			exit();
		}

		// Create new User
		$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $FirstName, $LastName, $Login, $Password);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("User Successfully Registered");
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
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
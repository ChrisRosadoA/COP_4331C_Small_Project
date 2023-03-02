<?php
	$inData = getRequestInfo();

	$id = $inData["id"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE ID=?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
		$result = $stmt->get_result();

		if($conn->affected_rows)
		{
			returnWithError("Successfully deleted Contact id={$id} from Contacts");
                }
                else
                {
                        returnWithError("No Records Found");
                }

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
         
        function returnWithError( $err ) 
        { 
                $retValue = '{"error":"' . $err . '"}'; 
                sendResultInfoAsJson( $retValue ); 
        } 
         
        function returnWithInfo( $id ) 
        { 
                $retValue = '{"id":' . $id . '","error":""}'; 
                sendResultInfoAsJson( $retValue ); 
        }
?>
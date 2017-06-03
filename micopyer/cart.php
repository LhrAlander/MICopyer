<?php
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "xiaomi";
	$db_username=$_GET['username'];
	$db_goodsid=array();

	// 创建连接
	$conn = new mysqli($servername, $username, $password,$dbname);

	// 检测连接
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "select * from usergoods where username='".$db_username."'";
	$result = mysqli_query($conn,$sql);
	while($row = mysqli_fetch_assoc($result)){
		array_push($db_goodsid,$row["goodsid"]);
		array_push($db_goodsid,$row["num"]);
		array_push($db_goodsid,$row["gettype"]);
	}
	echo json_encode($db_goodsid);
	
		
?>
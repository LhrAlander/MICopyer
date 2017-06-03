<?php
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "xiaomi";
	$db_username=$_GET['username'];
	$db_password=$_GET['password'];
	$password;
	// 创建连接
	$conn = new mysqli($servername, $username, $password,$dbname);

	// 检测连接
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "insert into user value('$db_username','$db_password')";
	if(!mysqli_query($conn,$sql))
		echo "error happened";
	else
		echo "Successed";
?>
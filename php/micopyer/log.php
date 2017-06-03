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
	$sql = "select * from user where account='".$db_username."'";
	$result = mysqli_query($conn,$sql);
	while($row = mysqli_fetch_assoc($result)){
		$password=$row['password'];
	}
	if($password==$db_password)
		echo $db_username;
	else
		echo 'false';
?>
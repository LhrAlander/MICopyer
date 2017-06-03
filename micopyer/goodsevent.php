<?php
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "xiaomi";
	$db_username=$_GET['username'];
	$db_goodsid=array();
	$event=$_GET['event'];
	$goodsid=$_GET['goodsid'];
	$num=-1;
	$goodstype=$_GET['gettype'];
	if($event==3)
		$num=$_GET['num'];

	// 创建连接
	$conn = new mysqli($servername, $username, $password,$dbname);
	$username = $_GET['username'];
	// 检测连接
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	if($event==1)
		$sql = "delete from usergoods where username='".$username."' and goodsid='".$goodsid."'";
	else if($event==2){
		$sql = "insert into usergoods value('$username','$goodsid',1,'$goodstype')";
		echo "here add goods";
	}
	else if($event==3)
		$sql = "update usergoods set num='$num' where username = '".$username."' and goodsid='".$goodsid."'";
	if(!mysqli_query($conn,$sql))
		echo "error happened";
	else
		echo "Successed";
?>
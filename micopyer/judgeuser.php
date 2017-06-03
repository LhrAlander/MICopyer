<?php
	$event=$_GET['event'];
	$username='NULL';
	$url='NULL';
	if($event=='user'){
		echo judgeuser();
		//setcookie("username","",time()-1);
	}
	if($event=='login')
		login();
	if($event=='logout')
		logout();
	if($event=='url'){
		$toURL=$_GET['url'];
		setcookie("url",$toURL,time()+3600);
		echo $_COOKIE["url"];
	}
	function judgeuser(){
		if(isset($_COOKIE["username"]))
		{
			$name=$_COOKIE["username"];
			return $name;
		}
		else
		{
			return 'NULL';
		}
	}
	function login(){
		$username=$_GET['username'];
		setcookie("username",$username,time()+3600);
		if(isset($_COOKIE["url"]))
		{
			$url=$_COOKIE["url"];
			echo $url;
		}
		else
		{
			echo 'NULL';
		}
	}
	function logout(){
		setcookie("username","",time()-3600);
		echo judgeuser();
	}
?>



$(init)

function init(){

	var error_time=0;
	var number=Math.floor(Math.random(1)*6);
	var code1='rhadx';
	var code2='33kxd';
	var code3='dx2kd';
	var code4='fanyd';
	var code5='dyppd';
	var code6='khx28';
	var code0='aphkd';
	$("#captcha-img").attr('src',"../img/code"+number+".jpg");

	//扫码和账号登录切换
	$(".navtab-link:eq(1)").click(function(){
		$(".navtab-link:eq(1)").css("color","#f56600");
		$(".navtab-link.now").css("color","#666");
		$(".tabs-con.tabs_con.now").css("display","none");
		$(".tabs-con.tabs_con:eq(1)").css("display","block");
	});

	$(".navtab-link.now").click(function(){
		$(".navtab-link:eq(1)").css("color","#666");
		$(".navtab-link.now").css("color","#f56600");
		$(".tabs-con.tabs_con.now").css("display","block");
		$(".tabs-con.tabs_con:eq(1)").css("display","none");
	});

	//立即登录按钮事件
	$("#login-button").click(function(){
		var username=$("#username").val();
		var pwd=$("input#pwd").val();
		if(username=="")
		{
			$(".labelbox.login_user:eq(0)").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("请输入帐号");
			error_time++;

		}
		else if(username.length<3 && username!="")
		{
			$(".labelbox.login_user:eq(0)").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("用户名不正确");
			error_time++;
		}

		else if(username!="" && username.length>=3)
		{
			if(pwd==""){
			$(".labelbox.login_user:eq(1)").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("请输入密码");
			error_time++;
			}
			else{
				$.ajax({
					type:"GET",
					url:"/phpbin/micopyer/log.php",
					data:{username:username,password:pwd},
					success:function(data){
						console.log(data);
						if(data==username){
							console.log(username);
							$.ajax({
								type:"GET",
								url:"/phpbin/micopyer/judgeuser.php",
								data:{username:username,event:"login"},
								success:function(data){
									console.log(data);
									window.location.href=data;
								}
							});
							
						}else{
							$(".labelbox.login_user:eq(0)").css("border","1px solid #f56600");
							$("#error-outcon").css("display","block");
							$("span.error-con").text("用户名或密码不正确");
						}
					}
				});
			}

		}
		
	});

	$("#username").keypress(function(){
		$("#error-outcon").css("display","none");
		$(".labelbox.login_user:eq(0)").css("border","1px solid #e0e0e0");
	});


	$("input#pwd").keypress(function(){
		$("#error-outcon").css("display","none");
		$(".labelbox.login_user:eq(1)").css("border","1px solid #e0e0e0");
	});

	// $("#captcha-code").keypress(function(){
	// 	$("#error-outcon").css("display","none");
	// 	$(".labelbox.code_label").css("border","1px solid #e0e0e0");
	// });

	// $("#captcha-img").click(function(){
	// 	number=Math.floor(Math.random(1)*6);
	// 	$("#captcha-img").attr('src',"../img/code"+number+".jpg");
	// });
}



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


	$("#login-button").click(function(){
		var username=$("#username");
		var pwd=$("input#pwd");
		if(username.val()=="")
		{
			$(".labelbox.login_user:eq(0)").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("请输入帐号");
			error_time++;

		}
		if(username.val().length<3 && username.val()!="")
		{
			$(".labelbox.login_user:eq(0)").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("用户名不正确");
			error_time++;
		}

		if(username.val()!="" && username.val().length>=3)
		{
			if(pwd.val()==""){
			$(".labelbox.login_user:eq(1)").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("请输入密码");
			error_time++;
			}
		}

		if(error_time>8)
		{
			$("#captcha").css("display","block");


		}

		if(error_time>8 && username.val()!="" && pwd.val()!="" && $("#captcha-code").val()=="")
		{
			$(".labelbox.code_label").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("请输入图片验证码");
		}

		if(error_time>8 && username.val()!="" && pwd.val()!="" && $("#captcha-code").val().length>5)
		{
			$(".labelbox.code_label").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("验证码不正确");
		}


		if(error_time>8 && number==0 && $("#captcha-code").val().toLowerCase()!=code0 && $("#captcha-code").val()!="")
		{
			$(".labelbox.code_label").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("验证码不正确");
			number=Math.floor(Math.random(1)*6);
			$("#captcha-img").attr('src',"../img/code"+number+".jpg");
		}

		if(error_time>8 && number==1 && $("#captcha-code").val().toLowerCase()!=code1 && $("#captcha-code").val()!="")
		{
			$(".labelbox.code_label").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("验证码不正确");
			number=Math.floor(Math.random(1)*6);
			$("#captcha-img").attr('src',"../img/code"+number+".jpg");
		}

		if(error_time>8 && number==2 && $("#captcha-code").val().toLowerCase()!=code2 && $("#captcha-code").val()!="")
		{
			$(".labelbox.code_label").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("验证码不正确");
			number=Math.floor(Math.random(1)*6);
			$("#captcha-img").attr('src',"../img/code"+number+".jpg");
		}

		if(error_time>8 && number==3 && $("#captcha-code").val().toLowerCase()!=code3 && $("#captcha-code").val()!="")
		{
			$(".labelbox.code_label").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("验证码不正确");
			number=Math.floor(Math.random(1)*6);
			$("#captcha-img").attr('src',"../img/code"+number+".jpg");
		}

		if(error_time>8 && number==4 && $("#captcha-code").val().toLowerCase()!=code4 && $("#captcha-code").val()!="")
		{
			$(".labelbox.code_label").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("验证码不正确");
			number=Math.floor(Math.random(1)*6);
			$("#captcha-img").attr('src',"../img/code"+number+".jpg");
		}

		if(error_time>8 && number==5 && $("#captcha-code").val().toLowerCase()!=code5 && $("#captcha-code").val()!="")
		{
			$(".labelbox.code_label").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("验证码不正确");
			number=Math.floor(Math.random(1)*6);
			$("#captcha-img").attr('src',"../img/code"+number+".jpg");
		}

		if(error_time>8 && number==6 && $("#captcha-code").val().toLowerCase()!=code6 && $("#captcha-code").val()!="")
		{
			$(".labelbox.code_label").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("验证码不正确");
			number=Math.floor(Math.random(1)*6);
			$("#captcha-img").attr('src',"../img/code"+number+".jpg");
		}

		//组长这块交给你了
	
		if(username.val()=="数据库里找不到" && pwd.val()=="也找不到")
		{
			$(".labelbox.login_user:eq(0)").css("border","1px solid #f56600");
			$("#error-outcon").css("display","block");
			$("span.error-con").text("用户名或密码不正确");
			error_time++;
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

	$("#captcha-code").keypress(function(){
		$("#error-outcon").css("display","none");
		$(".labelbox.code_label").css("border","1px solid #e0e0e0");
	});

	$("#captcha-img").click(function(){
		number=Math.floor(Math.random(1)*6);
		$("#captcha-img").attr('src',"../img/code"+number+".jpg");
	});
	


}
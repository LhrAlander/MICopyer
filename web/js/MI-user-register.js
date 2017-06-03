$(init)
var flag=true;
var time=60;
function init(){

	var send_time=5;
	var number=Math.floor(Math.random(1)*6);
	var code1='rhadx';
	var code2='33kxd';
	var code3='dx2kd';
	var code4='fanyd';
	var code5='dyppd';
	var code6='khx28';
	var code0='aphkd';
	$(".icode_image.code-image.chkcode_img").attr('src',"../img/code"+number+".jpg");

	var phonenum=$("#phonenum");
	var codestr=$("#codestr");
	//手机号失去焦点事件
	$("#phonenum").blur(function(){

		if(phonenum.val()=="")
		{	

			$(".err_tip:eq(0)").css("display","block");
			$(".numerror_tip").text("请输入手机号码");
			$(".labelbox:eq(0)").css("border","1px solid #f56600");
			$(".wrapper").css("margin-top","13px");
		}

		if(phonenum.val().length!=11 && phonenum.val()!="")
		{
			$(".err_tip:eq(0)").css("display","block");
			$(".labelbox:eq(0)").css("border","1px solid #f56600");
			$(".numerror_tip").text("手机号码格式错误");
			$(".wrapper").css("margin-top","13px");
		}

		if(validate(phonenum.val())==false && phonenum.val().length==11)
			{
			$(".err_tip:eq(0)").css("display","block");
			$(".labelbox:eq(0)").css("border","1px solid #f56600");
			$(".numerror_tip").text("手机号码格式错误");
			$(".wrapper").css("margin-top","13px");
		}
	});



	$("#phonenum").keypress(function(){
		$(".err_tip:eq(0)").css("display","none");
		$(".labelbox:eq(0)").css("border","1px solid #e0e0e0");
		$(".wrapper").css("margin-top","23px");
	});

	$("#codestr").blur(function(){
		if(codestr.val()=="")
		{
			$(".err_tip:eq(1)").css("display","block");
			$(".labelbox:eq(1)").css("border","1px solid #f56600");
			$(".codeerror_tip").text("请输入图片验证码");
			$(".wrapper").css("margin-top","13px");
		}

		if(codestr.val().length<=3 && codestr.val()!="" || codestr.val().length>5 )
		{
			$(".err_tip:eq(1)").css("display","block");
			$(".labelbox:eq(1)").css("border","1px solid #f56600");
			$(".codeerror_tip").text("图片验证码错误");
			$(".wrapper").css("margin-top","13px");
			codestr.val("");
		}

	});

	$("#codestr").keypress(function(){
		$(".err_tip:eq(1)").css("display","none");
		$(".labelbox:eq(1)").css("border","1px solid #e0e0e0");
		$(".wrapper").css("margin-top","23px");
	});

	//变换验证码
	$(".icode_image.code-image.chkcode_img").click(function(){
		number=Math.floor(Math.random(1)*6);
		$(".icode_image.code-image.chkcode_img").attr('src',"../img/code"+number+".jpg");
	});

	$(".submit-step:eq(0)").click(function(){

		if(number==0 && codestr.val().toLowerCase()==code0 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".step1").css("display","none");
			$(".address-place.ff6").text("+86"+ " "+phonenum.val());
			$(".regbox:eq(1)").css("display","block");
			$(".wrapper").css("margin-top","30px");
			timecout();
			randnum=Math.floor(Math.random(1)*8999)+1000;
			console.log(randnum);

		}
		if(number==1 && codestr.val().toLowerCase()==code1 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".step1").css("display","none");
			$(".address-place.ff6").text("+86"+ " "+phonenum.val());
			$(".regbox:eq(1)").css("display","block");
			$(".wrapper").css("margin-top","30px");
			timecout();
			randnum=Math.floor(Math.random(1)*8999)+1000;
			console.log(randnum);
		}
		if(number==2 && codestr.val().toLowerCase()==code2 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".step1").css("display","none");
			$(".address-place.ff6").text("+86"+ " "+phonenum.val());
			$(".regbox:eq(1)").css("display","block");
			$(".wrapper").css("margin-top","30px");
			timecout();
			randnum=Math.floor(Math.random(1)*8999)+1000;
			console.log(randnum);
		}
		if(number==3 && codestr.val().toLowerCase()==code3 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".step1").css("display","none");
			$(".address-place.ff6").text("+86"+ " "+phonenum.val());
			$(".regbox:eq(1)").css("display","block");
			$(".wrapper").css("margin-top","30px");
			timecout();
			randnum=Math.floor(Math.random(1)*8999)+1000;
			console.log(randnum);
		}
		if(number==4 && codestr.val().toLowerCase()==code4 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".step1").css("display","none");
			$(".address-place.ff6").text("+86"+ " "+phonenum.val());
			$(".regbox:eq(1)").css("display","block");
			$(".wrapper").css("margin-top","30px");
			timecout();
			randnum=Math.floor(Math.random(1)*8999)+1000;
			console.log(randnum);
		}
		if(number==5 && codestr.val().toLowerCase()==code5 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".step1").css("display","none");
			$(".address-place.ff6").text("+86"+ " "+phonenum.val());
			$(".regbox:eq(1)").css("display","block");
			$(".wrapper").css("margin-top","30px");
			timecout();
			randnum=Math.floor(Math.random(1)*8999)+1000;
			console.log(randnum);
		}
		if(number==6 && codestr.val().toLowerCase()==code6 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".step1").css("display","none");
			$(".address-place.ff6").text("+86"+ " "+phonenum.val());
			$(".regbox:eq(1)").css("display","block");
			$(".wrapper").css("margin-top","30px");
			timecout();
			randnum=Math.floor(Math.random(1)*8999)+1000;
			console.log(randnum);
		}

		if(number==0 && codestr.val().toLowerCase()!=code0 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".err_tip:eq(1)").css("display","block");
			$(".labelbox:eq(1)").css("border","1px solid #f56600");
			$(".codeerror_tip").text("图片验证码错误");
			$(".wrapper").css("margin-top","13px");
		}
		if(number==1 && codestr.val().toLowerCase()!=code1 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".err_tip:eq(1)").css("display","block");
			$(".labelbox:eq(1)").css("border","1px solid #f56600");
			$(".codeerror_tip").text("图片验证码错误");
			$(".wrapper").css("margin-top","13px");
		}
		if(number==2 && codestr.val().toLowerCase()!=code2 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".err_tip:eq(1)").css("display","block");
			$(".labelbox:eq(1)").css("border","1px solid #f56600");
			$(".codeerror_tip").text("图片验证码错误");
			$(".wrapper").css("margin-top","13px");
		}
		if(number==3 && codestr.val().toLowerCase()!=code3 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".err_tip:eq(1)").css("display","block");
			$(".labelbox:eq(1)").css("border","1px solid #f56600");
			$(".codeerror_tip").text("图片验证码错误");
			$(".wrapper").css("margin-top","13px");
		}
		if(number==4 && codestr.val().toLowerCase()!=code4 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".err_tip:eq(1)").css("display","block");
			$(".labelbox:eq(1)").css("border","1px solid #f56600");
			$(".codeerror_tip").text("图片验证码错误");
			$(".wrapper").css("margin-top","13px");
		}
		if(number==5 && codestr.val().toLowerCase()!=code5 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".err_tip:eq(1)").css("display","block");
			$(".labelbox:eq(1)").css("border","1px solid #f56600");
			$(".codeerror_tip").text("图片验证码错误");
			$(".wrapper").css("margin-top","13px");
		}
		if(number==6 && codestr.val().toLowerCase()!=code6 && codestr.val()!="" && phonenum.val().length==11)
		{
			$(".err_tip:eq(1)").css("display","block");
			$(".labelbox:eq(1)").css("border","1px solid #f56600");
			$(".codeerror_tip").text("图片验证码错误");
			$(".wrapper").css("margin-top","13px");
		}
	});
	var code=$(".resendcode");

	//随机生成四位数验证码
	var randnum=Math.floor(Math.random(1)*8999)+1000;

	$(".resendcode").blur(function(){

		if(code.val()=="")
		{
			$(".err_tip:eq(2)").css("display","block");
			$(".labelbox.wap_resend_label.err_laebl").css("border","1px solid #f56600");
			$(".meserror_tip").text("请输入短信验证码");
		}

		if(code.val().length<4 && code.val()!="" )
		{
			$(".err_tip:eq(2)").css("display","block");
			$(".labelbox.wap_resend_label.err_laebl").css("border","1px solid #f56600");
			$(".meserror_tip").text("验证码错误或已过期");
		}
	});

	$(".resendcode").keypress(function(){
		$(".err_tip:eq(2)").css("display","none");
		$(".labelbox.wap_resend_label.err_laebl").css("border","1px solid #e0e0e0");
	});

	$(".submit-step:eq(1)").click(function(){
		if(code.val()!=randnum)
		{
			$(".err_tip:eq(2)").css("display","block");
			$(".labelbox.wap_resend_label.err_laebl").css("border","1px solid #f56600");
			$(".meserror_tip").text("验证码错误或已过期");
		}
		else{
			$(".regbox:eq(1)").css("display","none");
			$(".regbox:eq(2)").css("display","block");
			$(".wrapper").css("margin-top","10px");
			$(".register-ph-num").text(phonenum.val());
		}
		
	});

	$(".resendcode").keypress(function(){
		$(".err_tip:eq(2)").css("display","none");
		$(".labelbox.wap_resend_label.err_laebl").css("border","1px solid #e0e0e0");
	});
	var remain=$("a.remain");
		

	$(".remain").click(function(){
		if(!flag){
    		return;
  		}
  		else
  		{	
  			if(time==0)
  			{
  				time=60;
  			}
  			timecout();
  			send_time--;
			flag=false;
			if (send_time<=0) {
			$(".err_tip.send-left-times").css("display","block");
			$(".err_tip.send-left-times").text("您今天已经发送太多短信，请换个时间或者改用其他号码");
			$(".wrapper").css("margin-top","13px");
			}
			if(send_time==2)
			{
			$(".err_tip.send-left-times").css("display","block");
			$(".err_tip.send-left-times").text("您今天还能发送2条短信");
			$(".wrapper").css("margin-top","13px");
			}
			if(send_time==1)
			{
			$(".err_tip.send-left-times").css("display","block");
			$(".err_tip.send-left-times").text("您今天还能发送1条短信");
			$(".wrapper").css("margin-top","13px");
			}
			randnum=Math.floor(Math.random(1)*8999)+1000;
			console.log(randnum);
  	}
});



	$(".btn332.btn_reg_2.change-view").click(function(){
		$(".step1").css("display","block");
		$(".regbox:eq(1)").css("display","none");
		$("#phonenum").val("");
		$("#codestr").val("");
	});

	$(".icon_error.err_icontip").css("display","none");
	$(".err_passtip").css("color","#555");


	var setpass=$(".set-password");
	var repass=$(".repassword");
	$(".set-password").blur(function(){
		
		if(checkpass(setpass.val())!="")
		{
			$(".icon_error.err_icontip").css("display","inline-block");
			$(".err_passtip").css("color","#ff6700");
			$(".labelbox:eq(3)").css("border","1px solid #ff6700");
			$(".labelbox:eq(4)").css("border","1px solid #e0e0e0");
			$(".err_passtip").text(checkpass(setpass.val()));
		}
		else{
			$(".icon_error.err_icontip").css("display","none");
			$(".err_passtip").css("color","#555");
			$(".err_passtip").text("密码长度8~16位，数字、字母、字符至少包含两种");
			$(".labelbox:eq(3)").css("border","1px solid #e0e0e0");
			$(".labelbox:eq(4)").css("border","1px solid #e0e0e0");
		}

	});

	$(".set-password").keypress(function(){
			$(".icon_error.err_icontip").css("display","none");
			$(".err_passtip").css("color","#555");
			$(".err_passtip").text("密码长度8~16位，数字、字母、字符至少包含两种");
			$(".labelbox:eq(3)").css("border","1px solid #e0e0e0");
			$(".labelbox:eq(4)").css("border","1px solid #e0e0e0");
	});

	$(".repassword").keypress(function(){
			$(".icon_error.err_icontip").css("display","none");
			$(".err_passtip").css("color","#555");
			$(".err_passtip").text("密码长度8~16位，数字、字母、字符至少包含两种");
			$(".labelbox:eq(3)").css("border","1px solid #e0e0e0");
			$(".labelbox:eq(4)").css("border","1px solid #e0e0e0");
	});

	$(".repassword").blur(function(){
		if(repass.val()=="" && setpass.val()!="")
		{
			$(".icon_error.err_icontip").css("display","inline-block");
			$(".err_passtip").css("color","#ff6700");
			$(".err_passtip").text("请输入确认密码");
			$(".labelbox:eq(3)").css("border","1px solid #e0e0e0");
			$(".labelbox:eq(4)").css("border","1px solid #ff6700");
		}
		if(setpass.val()!=repass.val() && repass.val()!="")
		{
			$(".icon_error.err_icontip").css("display","inline-block");
			$(".err_passtip").css("color","#ff6700");
			$(".err_passtip").text("密码输入不一致");
			$(".labelbox:eq(3)").css("border","1px solid #e0e0e0");
			$(".labelbox:eq(4)").css("border","1px solid #ff6700");
		}
	});
//注册提交按钮事件
	$(".submit-step:eq(2)").click(function(){
			if(checkpass(setpass.val())=="" && setpass.val()==repass.val() && repass.val()!="")
			{
				$(".regbox:eq(2)").css("display","none");
				$(".regbox:eq(3)").css("display","block");
				var account=phonenum.val(),
					pswd=setpass.val();
				console.log('account:'+account+'pswd: '+pswd);
				$.ajax({
					type:"GET",
					url:"/phpbin/micopyer/registe.php",
					data:{username:account,password:pswd},
					success:function(data){
						console.log(data);
					}
				});
			}
	});



}

function timecout(){
	var sendmes=setInterval(function(){

		if(time==0){
				clearInterval(sendmes);
				// time=60;
                $(".color333.send-status").text("重新发送");
                $(".color333.send-status").css("color","#333");
                $(".color333.send-status").css("cursor","pointer");
                flag=true;
                return;  
            }
       if(time<=60 && time>0){
            time--;
            flag=false;
            $(".color333.send-status").text("重新发送("+time+")");
			$(".color333.send-status").css("cursor","not-allowed");
			$(".color333.send-status").css("color","#9d9d9d");	
        	}     

		},1000);
}



function validate(obj){
      var reg = /^[0-9]*$/;
      return reg.test(obj);
};

function checkpass(v){  
    	var numasc = 0;  
        var charasc = 0;  
        var otherasc = 0;  
        if(0==v.length){  
            return "请输入密码";  
        }else if(v.length<8||v.length>16){  
            return "密码长度8~16位，数字、字母、字符至少包含两种";  
        }else{  
            for (var i = 0; i < v.length; i++) {  
                var asciiNumber = v.substr(i, 1).charCodeAt();  
                if (asciiNumber >= 48 && asciiNumber <= 57) {  
                    numasc += 1;  
                }  
                if ((asciiNumber >= 65 && asciiNumber <= 90)||(asciiNumber >= 97 && asciiNumber <= 122)) {  
                    charasc += 1;  
                }  
                if ((asciiNumber >= 33 && asciiNumber <= 47)||(asciiNumber >= 58 && asciiNumber <= 64)||(asciiNumber >= 91 && asciiNumber <= 96)||(asciiNumber >= 123 && asciiNumber <= 126)) {  
                    otherasc += 1;  
                }  
            }  
            if(0==numasc && 0==charasc)  {  
                return "密码长度8~16位，数字、字母、字符至少包含两种";  
            }else if(0==numasc && 0==otherasc){  
                return "密码长度8~16位，数字、字母、字符至少包含两种";  
            }else if(0==charasc && 0==otherasc){  
                return "密码长度8~16位，数字、字母、字符至少包含两种";  
            }else{  
                return "";  
            }  
        }  
};  


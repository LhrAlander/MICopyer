//修改盒子高度修正bug
var height=$('.goods-detail-info').height()+90;
height+='px';
console.log(height);
//$('.goods-detail-info').css('heigth', height);    

//脡脤脝路碌茫禄梅脢脗录镁
$('.goodspiclist').children().click(function(event) {
	$(this).addClass('current').siblings().removeClass('current');
	var path=$(this).children()[0].src.replace(/60/g,"482");
	$(".tran-pic").attr("src",path);
	$('.goods-bigpic').children().attr('src',path);
});

//脡脤脝路禄脴赂麓脗楼脰梅驴貌脢脗录镁
$(".answer-input").click(function(event) {
	$(this).css('border-color', '#ff6700');
	$(this).siblings().css({
		border: '1px solid #ff6700',
		color: 'white',
		background:'#ff6700'
	});
});

//脤谩脦脢驴貌碌茫禄梅脢脗录镁
$(".input-block").click(function(event) {
	$(this).css('border-color', '#ff6700');
});
//脥脝录枚脗脰虏楼脭虏碌茫脢脗录镁
$(".pager").click(function(event) {
	$(this).addClass('pager-active');
	$(this).siblings().removeClass('pager-active');
	var n=$(this).children('.dot').text();
	if(n==2||n==4){
		if(n==2)
			$(".xm-carousel-col-5-list").eq(0).css('margin-left', '-1240px');
		else
			$(".xm-carousel-col-5-list").eq(1).css('margin-left', '-1240px');
	}
	if(n==1||n==3){
		if(n==1)
			$(".xm-carousel-col-5-list").eq(0).css('margin-left', '0');
		else
			$(".xm-carousel-col-5-list").eq(1).css('margin-left', '0');
	}
});



//脡脤脝路脤谩脦脢拢卢脢媒戮脻脤卯鲁盲陆脳露脦拢潞
$.getJSON("../data/goods/question.json", function(result) {
					var data = result.helpful;
					var template = $.templates("#goodsQuestionTmpl");
					var htmlOutput = template.render(data);
					$('.goods-detail-question').append(htmlOutput);
});

$(".question-order .order-block .questionhelp").click(function(event) {
	$(this).addClass('current').siblings().removeClass('current');
	$.getJSON("../data/goods/question.json", function(result) {
					var data = result.helpful;
					var template = $.templates("#goodsQuestionTmpl");
					var htmlOutput = template.render(data);
					$('.goods-detail-question ul').remove();
					$('.more-question').remove();
					$('.goods-detail-question').append(htmlOutput);
	});
});
$(".question-order .order-block .questionnew").click(function(event) {
	$(this).addClass('current').siblings().removeClass('current');
	$.getJSON("../data/goods/question.json", function(result) {
					var data = result.new;
					var template = $.templates("#goodsQuestionTmpl");
					var htmlOutput = template.render(data);
					$('.goods-detail-question ul').remove();
					$('.more-question').remove();
					$('.goods-detail-question').append(htmlOutput);
	});
});

$(window).scroll(function(event) {
	var height=$(".goods-detail-nav").offset().top;
	var scroll=$(this).scrollTop();
	if(scroll>=height)
		$(".goods-subbar").css('top', '0').css('display', 'block');
	else
		$(".goods-subbar").css('top','821px').css('display', 'none');
});

$(function(){
	for(var i=0;i<3;i++)
	if(i==0||i==2)
		$(".goods-info-userfaq").children().children('.scroll').eq(i).click(function(event) {
			$(".goods-detail-desc").hide();
			var height=$(".goods-detail-nameblock").eq(1).offset().top-$(".goods-subbar").height();
			$("html,body").animate({scrollTop: height}, 800);
});
	else
		$(".goods-info-userfaq").children().children('.scroll').eq(i).click(function(event) {
			$(".goods-detail-desc").hide();
			var height=$(".goods-detail-nameblock").eq(2).offset().top-$(".goods-subbar").height();
			$("html,body").animate({scrollTop: height}, 800);
});

})
//fixed bar
$(".detail-nav a").click(function(event) {
	var href=$(this).attr("href");
	if(href!='#detail-desc'){
		$(".goods-detail-desc").hide();
		var pos=$(href).offset().top-$(".goods-subbar").height();
	}
	else{
		$(".goods-detail-desc").show();
		var pos=$(href).offset().top;
	}
	$("html,body").animate({scrollTop:pos}, 800);
});
//碌录潞陆bar item碌茫禄梅脢脗录镁
$(".good-menu .detail-list").children().click(function(event) {
	var href=$(this).children().attr("href");
	if(href!='#detail-desc'){
		$(".goods-detail-desc").hide();
		var pos=$(href).offset().top-$(".goods-subbar").height();
	}
	else{
		$(".goods-detail-desc").show();
		var pos=$(href).offset().top;
	}
	$("html,body").animate({scrollTop:pos}, 800);
});

$(window).scroll(function(event) {
	var scroll=$(this).scrollTop();
	var descheight=$("#detail-desc").offset().top;
	var specheight=$("#detail-spec").offset().top-$(".goods-subbar").height();
	var comheight=$("#detail-comment").offset().top-$(".goods-subbar").height();
	var quesheight=$("#detail-question").offset().top-$(".goods-subbar").height();
	if($(".goods-detail-desc").css('display')!='none'){
	if(scroll>=descheight&&scroll<specheight){
		$(".good-menu .detail-list li").eq(0).addClass('current').siblings().removeClass('current');
		$(".goods-detail-nav .detail-list li").eq(0).addClass('current').siblings().removeClass('current');
	}
	}
	if(scroll>=specheight&&scroll<comheight){
		$(".good-menu .detail-list li").eq(1).addClass('current').siblings().removeClass('current');
		$(".goods-detail-nav .detail-list li").eq(1).addClass('current').siblings().removeClass('current');
	}
	if(scroll>=comheight&&scroll<quesheight){
		$(".good-menu .detail-list li").eq(2).addClass('current').siblings().removeClass('current');
		$(".goods-detail-nav .detail-list li").eq(2).addClass('current').siblings().removeClass('current');
	}
	if(scroll>=quesheight){
		$(".good-menu .detail-list li").eq(3).addClass('current').siblings().removeClass('current');
		$(".goods-detail-nav .detail-list li").eq(3).addClass('current').siblings().removeClass('current');
	}
});

//脤谩脦脢掳麓脜楼碌茫禄梅脢脗录镁
$(".question-btn").click(function(event) {
	if($(".question-input .input-block").val()=="")
		$(".modal").eq(0).css('top', '50%');
	else
		$(".modal").eq(1).css('top', '50%');
	$(".modal-back").fadeIn();
});
$(".modal-back").click(function(event) {
	$(".modal").css('top', '-25%');
	$(".modal-choose-regions").fadeOut(500);
	$(this).fadeOut(1000);
	$(".modal-null").css('top', '-25%');
	$(".modal-report").css('top', '-25%');
});
$(".actions .btn").eq(0).click(function(event) {
	$(".modal").css('top', '-25%');
	$(".modal-null").css('top', '-25%');
	$(".modal-report").css('top', '-25%');
	$(".modal-back").fadeOut(1000);
});
$(".modal-report .actions .btn").click(function(event) {
	$(".modal-report").css('top', '-25%');
	$(".modal-back").fadeOut(1000);
});
$(".modal-null .actions .btn").click(function(event) {
	$(".modal-null").css('top', '-25%');
	$(".modal-back").fadeOut(1000);
});
$(".modal-bd .close").click(function(event) {
	$(".modal").css('top', '-25%');
	$(".modal-null").css('top', '-25%');
	$(".modal-report").css('top', '-25%');
	$(".modal-back").fadeOut(1000);
});
$('.actions .btn').click(function(event) {
	$(".modal").css('top', '-25%');
	$(".modal-back").fadeOut(1000);
});
$(".actions .btn-candel").click(function(event) {
	$(".modal").css('top', '-25%');
	$(".modal-back").fadeOut(1000);
});

//脥录脝卢脧锚脟茅路脜麓贸虏脵脳梅
$(".goods-bigpic").click(function(event) {
	var wh=$(window).height()-130;
	var marginlt=-wh/2;
	wh += 'px';
	marginlt += 'px';
	console.log(wh);
	var path=$(this).children().attr("src").replace(/482/g,"558");
	$(".tran-pic").attr("src",$(".goods-bigpic").children().attr("src"));
	$(".zoom-big-block .img").css('background-image', "url("+path+")").css({
		width: wh,
		height: wh,
		backgroundSize: wh,
		marginLeft: marginlt
	});
	for(var i=0;i<4;i++)
		if($(".goodspiclist li").eq(i).is('.current'))
			$(".zoom-sml-list li").eq(i).addClass('current').siblings().removeClass('current');
	if($(".zoom-sml-list li").first().is('.current'))
		$(".zoom-big-nav .left-nav").hide();
	if($(".zoom-sml-list li").last().is('.current'))
		$(".zoom-big-nav .right-nav").hide();

	var top1=$(window).scrollTop();
	$(".tran-pic").css({'display':'block'});
	$(".tran-back").fadeIn(100);
	$(".tran-pic").animate({width: wh, height: wh,top:top1,left:'50%','margin-left':marginlt}, 500,function(){$(".good-pic-zoom").show();
		setTimeout(function(){
			$(".tran-pic").css({
				width: '482px',
				height: '482px',
				display: 'none',
				top: '220px',
				left: '248px',
				'margin-left': '0'
			});
		$(".tran-back").hide();
		},200);
		
	});

});

$(".zoom-sml-list li").click(function(event) {
	$(this).addClass('current').siblings().removeClass('current');
	var path=$(this).children().attr("src").replace(/60/g,"558");
	$(".zoom-big-block .img").css('background-image', 'url('+path+')');	
	$(".zoom-big-nav .left-nav").show();
	$(".zoom-big-nav .right-nav").show();
	if($(".zoom-sml-list li").first().is('.current'))
		$(".zoom-big-nav .left-nav").hide();
	if($(".zoom-sml-list li").last().is('.current'))
		$(".zoom-big-nav .right-nav").hide();
});
$(".zoom-big-nav .nav-block").click(function(event) {
	if($(this).is('.left-nav')){
		var index;
		for(var i=0;i<4;i++){
			if($(".zoom-sml-list li").eq(i).is('.current'))
				index=i-1;	
		}
		$(".zoom-sml-list li").eq(index).addClass('current').siblings().removeClass('current');
		 var path=$(".zoom-sml-list li").eq(index).children().attr("src").replace(/60/g,"558");
		 $(".zoom-big-block .img").css('background-image', 'url('+path+')');
	}	
	else{
		var index;
		for(var i=0;i<4;i++){
			if($(".zoom-sml-list li").eq(i).is('.current'))
				index=i+1;
		}
		$(".zoom-sml-list li").eq(index).addClass('current').siblings().removeClass('current');
		 var path=$(".zoom-sml-list li").eq(index).children().attr("src").replace(/60/g,"558");
		 $(".zoom-big-block .img").css('background-image', 'url('+path+')');
	}
	$(".zoom-big-nav .left-nav").show();
	$(".zoom-big-nav .right-nav").show();
	if($(".zoom-sml-list li").first().is('.current'))
		$(".zoom-big-nav .left-nav").hide();
	if($(".zoom-sml-list li").last().is('.current'))
		$(".zoom-big-nav .right-nav").hide();

});
$(".exit-btn").click(function(event) {
	$(".good-pic-zoom").hide();
	$(".zoom-big-nav .left-nav").show();
	$(".zoom-big-nav .right-nav").show();
});

$(".goods-info-address i").click(function(event) {
	$(".search-section .search-input").val("");
	$(".modal-back").fadeIn();
	$(".modal-choose-regions").fadeIn('fast');
});
$(".modal-choose-regions .close").click(function(event) {
	$(".modal-back").fadeOut(900);
	$(".modal-choose-regions").fadeOut(500);
});
$(function(){
	$(".search-section .search-input").on('input',function(){
		var value=$(this).text();
		if(value==null)
			$(".search-section .search-close").hide();
		else
			$(".search-section .search-close").show();
	})
})

$(".search-section .search-close").click(function(event) {
	$(".search-section .search-input").val("");	
	$(".search-section .search-close").hide();
});



$(".choose-address").click(function(event) {
	$(".modal-choose-regions .choosebox").hide();
	$(".modal-choose-regions .choosebox-select").show();
});

$(".choosebox-select .switch-type").click(function(event) {
	$(".modal-choose-regions .choosebox").show();
	$(".modal-choose-regions .choosebox-select").hide();
});

var province=['卤卤戮漏','脤矛陆貌','潞脫卤卤','脡陆脦梅','脛脷脙脡鹿脜','脕脡脛镁','录陋脕脰','潞脷脕煤陆颅','脡脧潞拢','陆颅脣脮','脮茫陆颅','掳虏禄脮','赂拢陆篓','陆颅脦梅','脡陆露芦','潞脫脛脧','潞镁卤卤','潞镁脛脧','鹿茫露芦','鹿茫脦梅','潞拢脛脧','脰脴脟矛','脣脛麓篓','鹿贸脰脻','脭脝脛脧','脦梅虏脴','脡脗脦梅','赂脢脣脿','脟脿潞拢','脛镁脧脛','脨脗陆庐'];
var city=['潞录脰脻脢脨','脛镁虏篓脢脨','脦脗脰脻脢脨','录脦脨脣脢脨','潞镁脰脻脢脨','脡脺脨脣脢脨','陆冒禄陋脢脨','谩茅脰脻脢脨','脰脹脡陆脢脨','脤篓脰脻脢脨','脌枚脣庐脢脨'];
var district=['脡脧鲁脟脟酶','脧脗鲁脟脟酶','陆颅赂脡脟酶','鹿掳脢没脟酶','脦梅潞镁脟酶','卤玫陆颅脟酶','脧么脡陆脟酶','脫脿潞录脟酶','脥漏脗庐脧脴','麓戮掳虏脧脴','陆篓碌脗脢脨','赂禄脩么脢脨','脕脵掳虏脢脨'];
var area=['掳脵脮脡脮貌','虏脰脟掳陆脰碌脌','鲁莽脧脥陆脰碌脌','露芦潞镁陆脰碌脌','禄脝潞镁脮貌','戮露脡陆脮貌','脕录盲戮陆脰碌脌','脕脵脝陆陆脰碌脌','冒碌脛帽脮貌','脛脧脭路陆脰碌脌','脝驴脪陇脮貌','脟脟脣戮陆脰碌脌','脠脢潞脥陆脰碌脌','脤脕脝脺脮貌','脦氓鲁拢陆脰碌脌','脧脨脕脰陆脰碌脌','脨脟脟脜陆脰碌脌','脫脿潞录陆脰碌脌','脭脣潞脫陆脰碌脌','脰脨脤漏陆脰碌脌'];
for(var i=0;i<province.length;i++){
	$(".options-box .options-list").eq(0).append('<li class="option">'+province[i]+'</div>');
}
for(var i=0;i<city.length;i++){
	$(".options-box .options-list").eq(1).append('<li class="option">'+city[i]+'</div>');
}
for(var i=0;i<district.length;i++){
	$(".options-box .options-list").eq(2).append('<li class="option">'+district[i]+'</div>');
}
for(var i=0;i<area.length;i++){
	$(".options-box .options-list").eq(3).append('<li class="option">'+area[i]+'</div>');
}

$(".options-box .options-list:eq(0) .option").click(function(event) {
	if($(this).text()=='脮茫陆颅'){
		$(".select-box .select-item:eq(0)").text($(this).text()).css('color', '#424242');
		$(".select-box .select-item:eq(1)").removeClass('hide');
		$(this).parent().addClass('hide');
		$(this).parent().next().removeClass('hide');
	}
});
$(".options-box .options-list:eq(1) .option").click(function(event) {
	if($(this).text()=='潞录脰脻脢脨'){
		$(".select-box .select-item:eq(1)").text($(this).text()).css('color', '#424242');
		$(".select-box .select-item:eq(2)").removeClass('hide');
		$(this).parent().addClass('hide');
		$(this).parent().next().removeClass('hide');
	}
});
$(".options-box .options-list:eq(2) .option").click(function(event) {
	if($(this).text()=='脫脿潞录脟酶'){
		$(".select-box .select-item:eq(2)").text($(this).text()).css('color', '#424242');
		$(".select-box .select-item:eq(3)").removeClass('hide');
		$(this).parent().addClass('hide');
		$(this).parent().next().removeClass('hide');
	}
});
$(".options-box .options-list:eq(3) .option").click(function(event) {
	$(".select-box .select-item:eq(3)").text($(this).text()).css('color', '#424242');
	for(var i=0;i<3;i++){
		$(".user-defalut-address .address-info .item").eq(i).text($(".select-box .select-item").eq(i).text());
	}
	$(".modal-back").fadeOut(900);
	$(".modal-choose-regions").fadeOut(500);
});
$(".select-box .select-item").click(function(event) {
	$(this).css('color', '#ff6700');
	var text=$(this).attr("data-info");
	$(this).text(text);
	$(this).nextAll().addClass('hide');
	$(".options-box .options-list:eq("+$(this).index()+")").removeClass('hide').siblings().addClass('hide');
});

$(".goods-info-cart .goods-like").click(function(event) {
	if($(".goods-like .liked").css('display')=="none"){
		$(".goods-like .liked").show();
		$(".goods-like .liked").eq(1).animate({'font-size':'50px','opacity':'0',left:'25px'}, 500,function(){$(".goods-like .liked").eq(1).hide().css({'font-size':'24px','opacity':'1',left:'40px'});});
	}
	else{
		$(".goods-like .liked").hide();
	}
});
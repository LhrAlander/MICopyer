/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-05-10 13:50:25
 * @version $Id$
 */

$(".search-text").focus(function(){
	$(this).siblings('.search-hotwords').hide();
	$(this).siblings('.keywords').show();
	$(this).css('border','1px solid #ff6700');
	$(this).siblings('.search-btn').css('border','1px solid #ff6700');
	
})

$(".search-text").blur(function(){
	$(this).siblings('.search-hotwords').show();
	$(this).siblings('.keywords').hide();
	$(this).css('border','1px solid #b0b0b0');
	$(this).siblings('.search-btn').css('border','1px solid #b0b0b0');
})


$('.goodspiclist').children().click(function(event) {
	$(this).addClass('current').siblings().removeClass('current');
	var path=$(this).children()[0].src.replace(/60/g,"482");
	$(".tran-pic").attr("src",path);
	$('.goods-bigpic').children().attr('src',path);
});

$(".answer-input").click(function(event) {
	$(this).css('border-color', '#ff6700');
	$(this).siblings().css({
		border: '1px solid #ff6700',
		color: 'white',
		background:'#ff6700'
	});
});

$(".input-block").click(function(event) {
	$(this).css('border-color', '#ff6700');
});

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

$(".comment-order-title .right-title").click(function(event) {
	if($(this).is('.current')){
		$(this).removeClass('current');
		$(".comment-box-list").children().show();
	}
	else{
		$(this).addClass('current');
		$(".comment-box-list li").each(function() {
			if($(this).children('.user-comment').children('.user-comment-content').children('.content-img').length<=0)
				$(this).hide();
		});
	}
});
$(".question-order .order-block .questionhelp").click(function(event) {
	$(this).addClass('current').siblings().removeClass('current');
});
$(".question-order .order-block .questionnew").click(function(event) {
	$(this).addClass('current').siblings().removeClass('current');
});

$(window).scroll(function(event) {
	var height=$(".goods-detail-nav").offset().top;
	var scroll=$(this).scrollTop();
	if(scroll>=height)
		$(".goods-subbar").css('top', '0');
	else
		$(".goods-subbar").css('top','821px');
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
$(".actions .btn-candel").click(function(event) {
	$(".modal").css('top', '-25%');
	$(".modal-back").fadeOut(1000);
});


$(".goods-bigpic").click(function(event) {
	var path=$(this).children().attr("src").replace(/482/g,"558");
	$(".tran-pic").attr("src",$(".goods-bigpic").children().attr("src"));
	$(".zoom-big-block .img").css('background-image', "url("+path+")");
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
	$(".tran-pic").animate({width: '558px', height: '558px',top:top1,left:'50%','margin-left':'-279px'}, 500,function(){$(".good-pic-zoom").show();
		$(".tran-pic").css({
		width: '482px',
		height: '482px',
		display: 'none',
		top: '220px',
		left: '248px',
		'margin-left': '0'
	});
		$(".tran-back").hide();});

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

$(".input-block .answer-btn").click(function(event) {
	if($(this).parent().children('.answer-input').val()==''){
		$(".modal-null").css('top', '50%');
		$(".modal-back").fadeIn();
	}
	else{
		$(".modal-report").css('top', '50%');
		$(".modal-back").fadeIn();
		$(this).parent().children('.answer-input').val('');
	}
});

$(".choose-address").click(function(event) {
	$(".modal-choose-regions .choosebox").hide();
	$(".modal-choose-regions .choosebox-select").show();
});

$(".choosebox-select .switch-type").click(function(event) {
	$(".modal-choose-regions .choosebox").show();
	$(".modal-choose-regions .choosebox-select").hide();
});

var province=['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆'];
var city=['杭州市','宁波市','温州市','嘉兴市','湖州市','绍兴市','金华市','衢州市','舟山市','台州市','丽水市'];
var district=['上城区','下城区','江干区','拱墅区','西湖区','滨江区','萧山区','余杭区','桐庐县','淳安县','建德市','富阳市','临安市'];
var area=['百丈镇','仓前街道','崇贤街道','东湖街道','黄湖镇','径山镇','良渚街道','临平街道','鸬鸟镇','南苑街道','瓶窑镇','乔司街道','仁和街道','塘栖镇','五常街道','闲林街道','星桥街道','余杭街道','运河街道','中泰街道'];
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
	if($(this).text()=='浙江'){
		$(".select-box .select-item:eq(0)").text($(this).text()).css('color', '#424242');
		$(".select-box .select-item:eq(1)").removeClass('hide');
		$(this).parent().addClass('hide');
		$(this).parent().next().removeClass('hide');
	}
});
$(".options-box .options-list:eq(1) .option").click(function(event) {
	if($(this).text()=='杭州市'){
		$(".select-box .select-item:eq(1)").text($(this).text()).css('color', '#424242');
		$(".select-box .select-item:eq(2)").removeClass('hide');
		$(this).parent().addClass('hide');
		$(this).parent().next().removeClass('hide');
	}
});
$(".options-box .options-list:eq(2) .option").click(function(event) {
	if($(this).text()=='余杭区'){
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
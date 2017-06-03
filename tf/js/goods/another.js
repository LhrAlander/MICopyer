init();
function init(){
	$.getJSON("../data/goods/question.json", function(result) {
		initNavItem();
		initSearchBox();
		initHomeSlider();
		initcarousel(result);
		initcomments(result);
		initnewestcomments(result);
	});
}

function initcarousel(result){
	var data = result.carousel;
	var template = $.templates("#goodsCarouselTmpl");
	var htmlOutput = template.render(data);
	$('.xm-carousel-wrapper').eq(0).html(htmlOutput);
	data = result.recommend;
	htmlOutput = template.render(data);
	$('.xm-carousel-wrapper').eq(1).html(htmlOutput);
}

function initcomments(result){
	var data = result.comments;
	var template = $.templates("#goodsCommentsTmpl");
	var htmlOutput = template.render(data);
	$('.goods-detail-comment-list').append(htmlOutput);
	initCommentsEvents();
}

function initnewestcomments(result){
	var data = result.newestcomments;
	var template = $.templates("#goodsNewestCommentsTmpl");
	var htmlOutput = template.render(data);
	$('.goods-detail-comment-time').append(htmlOutput);
}


function initCommentsEvents(){
	//商品回复楼主框事件
	$(".answer-input").click(function(event) {
		$(this).css('border-color', '#ff6700');
		$(this).siblings().css({
			border: '1px solid #ff6700',
			color: 'white',
			background:'#ff6700'
		});
	});

	//提问框点击事件
	$(".input-block").click(function(event) {
		$(this).css('border-color', '#ff6700');
	});

	//只显示图片评论选择框
	$(".comment-order-title .right-title").click(function(event) {
		console.log($(this));
		if($(this).hasClass('current')){
			$(this).removeClass('current');
			$(".comment-box-list").children().show();
		}
		else{
			console.log('no');
			$(this).addClass('current');
			$(".comment-box-list li").each(function() {
				if($(this).children('.user-comment').children('.user-comment-content').children('.content-img').length<=0)
					$(this).hide();
			});
		}
	});

	//回复按钮点击事件
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
}




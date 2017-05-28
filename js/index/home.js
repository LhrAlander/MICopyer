var index=0;
var interval;
var items=$('.home-viewport .viewport-item');
var pageitems=$('.controls-page .page-item');
var homestarcur=0,
	homestarinterval;
function inithome(){
	$.getJSON("data/index/home.json", function(result) {
					var data = result;
					var template = $.templates("#homeSliderTmpl");
					var htmlOutput = template.render(data);
					$('.home .container .home-slider').html(htmlOutput);
					var items = $('.home-slider .slider-list-item');
					items.each(function(){
						$(this).on('mouseover',addSliderItemHover);
					});
					$('.home-slider-list').find('.star-goods').eq(0).children('.link').attr('href','mi6.html');

					template = $.templates("#homeStarTmpl");
					htmlOutput = template.render(data);
					$('.home-star').html(htmlOutput);
					$('.home-star-title .more .prev').on('click',function(){
						if($(this).hasClass('active'))
							homeStarSlide2Right();
					});
					$('.home-star-title .more .next').on('click',function(){
						if($(this).hasClass('active'))
							homeStarSlide2Left();
					});

				});
	var pageitems=$('.controls-page .page-item');
	pageitems.each(function(){
		$(this).click(function(){
			if($(this).index()!=index){
				clearInterval(interval);
				var pre=index;
				index=$(this).index();
				toggleImgs(items,pre,index);
				toggleViewports(pageitems,pre,index);
				interval = setInterval(homeViewportInterval,3500);
			}
			
		});
	});
	$('.controls-direction .prev').on('click', function() {
		clearInterval(interval);
		var pre = index;
		index=(index+4)%5;
		toggleImgs(items,pre,index);
		toggleViewports(pageitems,pre,index);
		interval = setInterval(homeViewportInterval,3500);
	});
	$('.controls-direction .next').on('click', function() {
		clearInterval(interval);
		var pre = index;
		index=(index+1)%5;
		toggleImgs(items,pre,index);
		toggleViewports(pageitems,pre,index);
		interval = setInterval(homeViewportInterval,3500);
	});

	interval = setInterval(homeViewportInterval,3500);
	homestarinterval = setInterval(homeStarInterval,6000);
 }

function addSliderItemHover(){
	$(this).children('ul').css('display', 'flex');
	$(this).css('background','#ff6700');
	$(this).on('mouseout',function(){
		$(this).children('ul').css('display','none');
		$(this).css('background','none');
	})

}

function homeViewportInterval(){
		
		var pre = index;
		index = (index+1)%5
		toggleImgs(items,pre,index);
		toggleViewports(pageitems,pre,index);
		
}

function toggleImgs(obj,pre,after) {
	$(obj).eq(pre).fadeOut(500);
	$(obj).eq(after).fadeIn(500);

}
function toggleViewports(obj,pre,after) {
	$(obj).eq(pre).toggleClass('active');
	$(obj).eq(after).toggleClass('active');
}

function homeStarSlide2Right(){
	var item = $('.home-star-listbox ul');
	$(item).animate({marginLeft:'0'},200);
	$('.home-star-title .more .prev').toggleClass('active');
	$('.home-star-title .more .next').toggleClass('active');
}
function homeStarSlide2Left(){
	var item = $('.home-star-listbox ul');
	$(item).animate({marginLeft:'-1240px'},200);
	$('.home-star-title .more .prev').toggleClass('active');
	$('.home-star-title .more .next').toggleClass('active');
}
function homeStarInterval(){
	if(homestarcur==0){
		homeStarSlide2Left();
		homestarcur=1;
	}else{
		homeStarSlide2Right();
		homestarcur=0;
	}
}
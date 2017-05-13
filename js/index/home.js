var index=0;
var interval;
var items=$('.home-viewport .viewport-item');
var pageitems=$('.controls-page .page-item');
function inithome(){
	$.getJSON("data/index/home.json", function(result) {
					var data = result;
					var template = $.templates("#homeSliderTmpl");
					var htmlOutput = template.render(data);
					$('.home .container .home-slider').html(htmlOutput);
					var items = $('.home-slider .slider-list-item');
						items.each(function(){
						$(this).on('mouseover',addSliderItemHover);
					})
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
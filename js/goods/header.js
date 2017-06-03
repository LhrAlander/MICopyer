//³õÊ¼»¯navItem
function initNavItem(){
	$.getJSON("../data/index/headerNavItem.json", function(result) {
					var data = result.category;
					var template = $.templates("#headerNavItemTmpl");
					var htmlOutput = template.render(data);
					$('.nav-list').html(htmlOutput);
					addheaderHover();
				});
	
}
function initHomeSlider(){
	$('.home-slider').hide();
	$.getJSON("../data/index/home.json", function(result) {
					var data = result;
					var template = $.templates("#homeSliderTmpl");
					var htmlOutput = template.render(data);
					$('.home .container .home-slider').html(htmlOutput);
					var items = $('.home-slider .slider-list-item');
					items.each(function(){
						$(this).on('mouseover',addSliderItemHover);
					});
		});
	var t=0,
		n=0;
		
	$('.header-gif').on({
		mouseenter: function(e){
			$('.home-slider').show();
		},
		mouseleave: function(e){
			t=setTimeout(function(e){
				if($('.header-gif:hover').length==0 && $('.home-slider:hover').length==0)
				$('.home-slider').hide();
			},0);
			
		}
	});
	$('.home-slider').on({
		mouseenter: function() {
			t && (clearTimeout(t),t=null);
		},
		mouseleave: function(){
			if($('.header-gif:hover').length==0){
				$('.home-slider').hide();
			}
		}
	})
}
function addSliderItemHover(){
	$(this).children('ul').css('display', 'flex');
	$(this).css('background','#ff6700');
	$(this).on('mouseout',function(){
		$(this).children('ul').css('display','none');
		$(this).css('background','none');
	})

}
//mouseroverÌî³äÊý¾Ý
function addheaderHover() {
	var t=0,
		n=0;
	$('.header-nav .nav-item').on({
		mouseenter: function(e){
			var index=$(this).index();
			if(index<7){
				$.getJSON("../data/index/headerNavMenu.json", function(result) {
					var data = result[index].items;
					var template = $.templates("#headerNavMenuTmpl");
					var htmlOutput = template.render(data);
					$('.nav-menu-list').html(htmlOutput)
				});
			}
			t && (clearTimeout(t), t = null),
			n=setTimeout(function(e){
				if(index<7){
				$('.header-nav-menu').stop(!0, !1).slideDown(200)
				}
				else {

					$('.header-nav-menu').stop(!0, !1).slideUp(200)
				}
			},200)
		},
		mouseleave: function(e){
			var index=$(this).index();
			n && (clearTimeout(n), n = null);               
			if($('.nav-item:hover').length==0 && $('.header-nav-menu:hover').length==0){
				t=setTimeout(function(e){
					$('.header-nav-menu').stop(!0, !0).slideUp(200)
				},200)
			}
		}
	});

	$('.header-nav-menu').on({
		mouseenter: function() {
			t && (clearTimeout(t),t=null);
		},
		mouseleave: function() {
			if($('.nav-item:hover').length==0){
			t = setTimeout(function(){
				$('.header-nav-menu').slideUp()
			}, 200);
			}
		}
	})
}	

//searchboxµÄÌí¼Ó£º
function initSearchBox(){
	$.getJSON("../data/index/headerNavItem.json", function(result) {
					var data = result;

					var template = $.templates("#headerSearchTmpl");
					var htmlOutput = template.render(data);
					$('.header-search').html(htmlOutput);
					$('.header-search').on('mouseover',searchBoxMouseover);
					$('.header-search').on('mouseout',searchBoxMouseout);

					$('.search-text').on('focus',searchBoxFoucs);
					$('.search-text').on('blur',function(){
						$(this).css('border','1px solid #e0e0e0');
						$('.search-btn').css('border','1px solid #e0e0e0');
						$('.search-hotwords').fadeToggle(300);
						$('.search-keywordlist').hide();

					});
					
				});
}
function searchBoxMouseover(e){
	if($('.search-text').is(':focus'))return;
	$('.search-text').css('border','1px solid #B5B5B5');
	$('.search-btn').css('border','1px solid #B5B5B5');
}
function searchBoxMouseout(e){
	if($('.search-text').is(':focus'))return;
	$('.search-text').css('border','1px solid #e0e0e0');
	$('.search-btn').css('border','1px solid #e0e0e0');
	
}
function searchBoxFoucs(e){
	$(this).css('border', '1px solid #ff6700');
	$('.search-btn').css('border','1px solid #ff6700');
	$('.search-hotwords').fadeToggle(300);
	$('.search-keywordlist').show();
}

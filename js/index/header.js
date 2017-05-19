//初始化navItem
function initNavItem(){
	$.getJSON("data/index/headerNavItem.json", function(result) {
					var data = result.category;
					var template = $.templates("#headerNavItemTmpl");
					var htmlOutput = template.render(data);
					$('.nav-list').html(htmlOutput);
					addheaderHover();
				});
	
}
//mouserover填充数据
function addheaderHover() {
	$('.header-nav .nav-item').on({
		mouseenter: function(e){
			var index=$(this).index();
			if(index<7){
				$.getJSON("data/index/headerNavMenu.json", function(result) {
					var data = result[index].items;
					var template = $.templates("#headerNavMenuTmpl");
					var htmlOutput = template.render(data);
					$('.nav-menu-list').html(htmlOutput)
				});
			}
			if(index<7){
				$('.header-nav-menu').slideDown()
			}
			else $('.header-nav-menu').slideUp()
		},
		mouseleave: function(e){
			var index=$(this).index();
			if(index<7 && $('.nav-item:hover').length==0 && $('.header-nav-menu:hover').length==0){
				$('.header-nav-menu').slideUp()
			}
		}
	});
	var t=0;
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

//searchbox的添加：
function initSearchBox(){
	$.getJSON("data/index/headerNavItem.json", function(result) {
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

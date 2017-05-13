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
var headerFlag = false;
var timeoutid=null;
var timeinid=null;
function addheaderHover() {
	var headerItems = $('.header-nav');
	headerItems = headerItems.eq(0).children('.nav-list').eq(0).children('.nav-item');
	
	for (var i = 0; i < headerItems.length; i++) {
		var index = i;
		headerItems.eq(i).mouseover(function(event) {
			clearTimeout(timeinid);
			var cxt = $(this);
			var index = cxt.index();
			if(!headerFlag)
				timeoutid = setTimeout(function() {
					headerItemHover(index);
				}, 400);
			else
				headerItemHover(index);
		});


		$('.nav-menu-list').eq(0).mouseover(function(){
			clearTimeout(timeinid);
		});

		headerItems.eq(i).mouseout(function(event) {
			clearTimeout(timeoutid);
			var x = event.clientX,
				y = event.clientY;
			if (x <= 571 && y <= 141 ||
				x >= 1125 && y <= 141 ||
				x > 571 && x < 1125 && y <= 51) {
				if (headerFlag == true) {
					
					if(headerFlag)
						timeinid = setTimeout(function(){
							headerFlag = false;
							$('.header-nav-menu').slideUp(300);
						},400);
					
				}
			}
		});
	}
	$('.header-nav-menu').on('mouseout', judgeUp);
}

function headerItemHover(index) {
	if (index < 7) {
				$.getJSON("data/index/headerNavMenu.json", function(result) {
					var data = result[index].items;
					var template = $.templates("#headerNavMenuTmpl");
					var htmlOutput = template.render(data);
					$('.nav-menu-list').eq(0).html(htmlOutput);
				});
			}


	if (headerFlag) {
		if (index > 6) {
			headerFlag = false;
			$('.header-nav-menu').delay(200).slideUp(300);
		}
	} else {
		if (index < 7) {
			headerFlag = true;
			$('.header-nav-menu').slideDown(300);
		}
	}
}

function judgeUp(e) {
	var x = event.clientX,
		y = event.clientY;
	if (x <= 571 && y <= 141 ||
		x >= 1125 && y <= 141 ||
		y >= 368
	) {
		if (headerFlag == true) {
			if(headerFlag)
				timeinid=setTimeout(function(){
					headerFlag = false;
			$('.header-nav-menu').delay(200).slideUp(300);
				},400);
			
		}
	}
}
//searchbox的添加：
function initSearchBox(){
	$.getJSON("data/index/headerNavItem.json", function(result) {
					var data = result;

					var template = $.templates("#headerSearchTmpl");
					var htmlOutput = template.render(data);
					$('.header-search').html(htmlOutput);
					$('.search-text').on('focus',searchBoxFoucs);
					$('.search-text').on('blur',function(){
						$(this).css('border','1px solid #e0e0e0');
						$('.search-btn').css('border','1px solid #e0e0e0');
						$('.search-hotwords').fadeToggle(300);
						$('.search-keywordlist').hide();

					})
				});
}

function searchBoxFoucs(e){
	$(this).css('border', '1px solid #ff6700');
	$('.search-btn').css('border','1px solid #ff6700');
	$('.search-hotwords').fadeToggle(300);
	$('.search-keywordlist').show();
}

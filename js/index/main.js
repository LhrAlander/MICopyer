var commendPage = 0;
function initmain(){
	$.getJSON("data/index/main.json", function(result) {
		initSmart(result);
		initMatch(result);
		initParts(result);
		initAround(result);
		initCommend(result);
		initComment(result);
		initContent(result);
		initVideo(result);
	});
	
}

function initSmart(result){
		var pre = 0;
		var data = result.smart.hot;
		var template = $.templates("#mainSmartChangeTmpl");
		var htmlOutput = template.render(data);
		data = result.smart;
		template = $.templates("#mainSmartTmpl");
		$('#smart').append(template.render(data));
		$('#smart').append(htmlOutput);
		var items=$('#smart .more-tab-list li');
		items.each(function(){
			$(this).on('mouseover',function(){
				if(!$(this).hasClass('active')){
					toggleFlags(items,pre,$(this).index(),'active');
					pre = $(this).index();
					$('#smart .main-body-change').remove();
					switch(pre){
						case 0:
							$('#smart').append($.templates("#mainSmartChangeTmpl").render(result.smart.hot));
							break;
						case 1:
							$('#smart').append($.templates("#mainSmartChangeTmpl").render(result.smart.electric));	
							break;
						case 2:
							$('#smart').append($.templates("#mainSmartChangeTmpl").render(result.smart.router));
							break;
					}
				}
			});
		});
}


function initMatch(result){
	var pre = 0;
	var data = result.match;
	var template = $.templates("#mainCasualTmpl");
	var htmlOutput = template.render(data);
	$('#match').append(htmlOutput);
	data = result.match.hot;
	template = $.templates("#mainCasualChangeTmpl");
	$('#match').append(template.render(data));
	var items=$('#match .more-tab-list li');
	items.each(function(){
		$(this).on('mouseover',function(){
				if(!$(this).hasClass('active')){
					toggleFlags(items,pre,$(this).index(),'active');
					pre = $(this).index();
					$('#match .main-body-change').remove();
					switch(pre){
						case 0:
							$('#match').append($.templates("#mainCasualChangeTmpl").render(result.match.hot));
							break;
						case 1:
							$('#match').append($.templates("#mainCasualChangeTmpl").render(result.match.earhone));	
							break;
						case 2:
							$('#match').append($.templates("#mainCasualChangeTmpl").render(result.match.electricsource));
							break;
						case 3:
							$('#match').append($.templates("#mainCasualChangeTmpl").render(result.match.SDcard));
							break;
					}
				}
			});
	});
}

function initParts(result){
	var pre = 0;
	var data = result.parts;
	var template = $.templates("#mainCasualTmpl");
	var htmlOutput = template.render(data);
	$('#parts').append(htmlOutput);
	data = result.parts.hot;
	template = $.templates("#mainCasualChangeTmpl");
	$('#parts').append(template.render(data));
	var items=$('#parts .more-tab-list li');
	items.each(function(){
		$(this).on('mouseover',function(){
				if(!$(this).hasClass('active')){
					toggleFlags(items,pre,$(this).index(),'active');
					pre = $(this).index();
					$('#parts .main-body-change').remove();
					switch(pre){
						case 0:
							$('#parts').append($.templates("#mainCasualChangeTmpl").render(result.parts.hot));
							break;
						case 1:
							$('#parts').append($.templates("#mainCasualChangeTmpl").render(result.parts.protect));	
							break;
						case 2:
							$('#parts').append($.templates("#mainCasualChangeTmpl").render(result.parts.paste));
							break;
						case 3:
							$('#parts').append($.templates("#mainCasualChangeTmpl").render(result.parts.other));
							break;
					}
				}
			});
	});

}


function initAround(result){
	var pre = 0;
	var data = result.around;
	var template = $.templates("#mainCasualTmpl");
	var htmlOutput = template.render(data);
	$('#around').append(htmlOutput);
	data = result.around.hot;
	template = $.templates("#mainCasualChangeTmpl");
	$('#around').append(template.render(data));
	var items=$('#around .more-tab-list li');
	items.each(function(){
		$(this).on('mouseover',function(){
			if(!$(this).hasClass('active')){
			toggleFlags(items,pre,$(this).index(),'active');
			pre = $(this).index();
			$('#around .main-body-change').remove();
			switch(pre){
				case 0:
					$('#around').append($.templates("#mainCasualChangeTmpl").render(result.around.hot));
					break;
				case 1:
					$('#around').append($.templates("#mainCasualChangeTmpl").render(result.around.clothes));	
					break;
				case 2:
					$('#around').append($.templates("#mainCasualChangeTmpl").render(result.around.MIRabbit));
					break;
				case 3:
					$('#around').append($.templates("#mainCasualChangeTmpl").render(result.around.around));
					break;
				case 4:
					$('#around').append($.templates("#mainCasualChangeTmpl").render(result.around.bag));
					break;

						}
					}
					});
		});
		
}

function initCommend(result){

	var data=result.command;
	var template = $.templates("#mainCommandTmpl");
	var htmlOutput = template.render(data);
	$('#recommend').html(htmlOutput);
	var next=$('#recommend .next');
	var pre=$('#recommend .prev');
	next.on('click',function(){
		commentToLeft();
	});
	pre.on('click',function(){
		commentToRight();
	});
}


function initComment(result){
	var data=result.comment;
	var template = $.templates("#mainCommentTmpl");
	var htmlOutput = template.render(data);
	$("#comment").html(htmlOutput);
}


function initContent(result){
	var data=result.content;
	var template = $.templates("#mainContentTmpl");
	var htmlOutput = template.render(data);
	$("#content").html(htmlOutput);
	var items=$('#content .content-item');
	var spec=items.eq(0).children('.pagers-wrapper').children('ul').children('li');
	spec.eq(3).remove();
	spec=$('#content .content-item').children('div.carousel-wrapper').children("ul.item-list");
	for(var i=1;i<4;i++){
		spec.css('width', '1184px');
	}
	items=$('#content .content-item');




	items.each(function(){
		var pagers=$(this).children('.pagers-wrapper').children('ul.pagers').children('li.pager');
		pagers.on('click',cntSlide());
		pagers=$(this).children('div.controls').children('a.control-prev');
		pagers.on('click',function(){
			var contentPage=$(this).parent('div.controls').prev('div.pagers-wrapper').children('ul.pagers').children('li.pager');
			for(var i=0;i<contentPage.length;i++){
				if(contentPage.eq(i).hasClass('pager-active')){
					contentPage=i;
					break;
				}
			}
			if(contentPage>0){
				var item=$(this).parent('div.controls').prev('div.pagers-wrapper').prev('div.carousel-wrapper').children('ul.item-list');
				contentPage--;
				var currentMarginLeft=contentPage*(-296);
				currentMarginLeft+='px';
				$(item).animate({marginLeft:currentMarginLeft},200);
				item=$(this).parent('div.controls').prev('div.pagers-wrapper').children('ul.pagers').children('li.pager');
				toggleFlags(item,contentPage,contentPage+1,'pager-active');
			}
		});
		pagers=$(this).children('div.controls').children('a.control-next');
		pagers.on('click',function(){
			var num=$(this).parent('div.controls').prev('div.pagers-wrapper').prev('div.carousel-wrapper').children('ul.item-list').children('li');
			var contentPage=$(this).parent('div.controls').prev('div.pagers-wrapper').children('ul.pagers').children('li.pager');
			for(var i=0;i<contentPage.length;i++){
				if(contentPage.eq(i).hasClass('pager-active')){
					contentPage=i;
					break;
				}
			}
			if(contentPage<num.length-1){
				var item=$(this).parent('div.controls').prev('div.pagers-wrapper').prev('div.carousel-wrapper').children('ul.item-list');
				contentPage++;
				var currentMarginLeft=contentPage*(-296);
				currentMarginLeft+='px';
				$(item).animate({marginLeft:currentMarginLeft},200);
				item=$(this).parent('div.controls').prev('div.pagers-wrapper').children('ul.pagers').children('li.pager');
				toggleFlags(item,contentPage,contentPage-1,'pager-active');
			}
		});
	});




}


function initVideo(result){
	var data = result.video;
	var template = $.templates("#mainVideoTmpl");
	var htmlOutput = template.render(data);
	$("#video").append(htmlOutput);
}





function cntSlide(){
	var pre=0;
	return function(){
		pre=$(this).parent('ul.pagers').children('li.pager');
		for(var i=0;i<pre.length;i++){
			if(pre.eq(i).hasClass('pager-active')){
				pre=i;
				break;
			}
		}
		cur=$(this).index();
		var item=$(this).parent('ul.pagers').parent('div.pagers-wrapper').prev('div.carousel-wrapper').children('ul.item-list');
		
		var currentMarginLeft=cur*(-296);
		currentMarginLeft+='px';
		$(item).animate({marginLeft:currentMarginLeft},200);
		item=$(this).parent('ul.pagers').children('li.pager');
		toggleFlags(item,pre,cur,'pager-active');
	}
}






function toggleFlags(obj,pre,after,classname){
	obj.eq(pre).toggleClass(classname);
	obj.eq(after).toggleClass(classname);
	
}

function commentToLeft(){
	if(commendPage<3){
			commendPage++;
			commentSlide();
		}
}

function commentSlide(){
	var currentMarginLeft=commendPage*(-1240);
			currentMarginLeft+='px';
			$('#recommend ul').animate({marginLeft:currentMarginLeft},100);
			judgePage();
}
function commentToRight(){
	if(commendPage>0){
			commendPage--;
			commentSlide();
		}
	
}



function judgePage(){
	if(commendPage<3&&commendPage>0){
		$('#recommend .next').addClass('active');
		$('#recommend .prev').addClass('active');
	}
	if(commendPage==0)
		$('#recommend .prev').removeClass('active');
	if(commendPage==3)
		$('#recommend .next').removeClass('active');
}


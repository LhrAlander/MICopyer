var cartgoods,
	cart;
$(document).ready(function() {
	$.getJSON("/tf/data/cartgoods.json",function(result){
		cartgoods=result;
		$.getJSON("/tf/data/cart.json",function(result){
			cart=result;
			initTopBar();
		});
	});
	init();
});


function initTopBar(){
	initCart();
}

var topbartimeid;
function initHomePage() {
	$('.cart-mini').hover(function() {
		clearTimeout(topbartimeid);
		$(this).css({
			backgroundColor: '#ff6700',
			color: '#fff'
		});
		$('.cart-menu').slideDown(300);
	});
	$('.topbar-cart').mouseleave(function() {
		$('.cart-mini').css({
			backgroundColor: '#424242',
			color: '#b0b0b0'
		});
		topbartimeid = setTimeout(function(){
			$('.cart-menu').slideUp(300);
		},300);
	});
	$('div.topbar-cart a.cart-mini').on('click',function(){
		window.location.href = 'http://localhost:8080/micar1/src/cart-empty.html';
		
	});
}

function initCart(){
	$.ajax({
		type: "GET",
		url: "/phpbin/micopyer/judgeuser.php",
		data: {
			event: 'user'
		},
		success: function(data) {
				initHomePage();
				var template,
					htmlOutput;
				template = $.templates("#headerCartMenuTmpl");
				htmlOutput = template.render();
				$('div.cart-menu').append(htmlOutput);
			if(data=='NULL'){
				$('.topbar div.topbar-cart a.cart-mini').css({
					backgroundColor: '#424242',
					color: '#b0b0b0'
				});
				$('.topbar div.topbar-cart a.cart-mini i').html('&#xe614;');
				$('.topbar div.topbar-cart a.cart-mini span').html('( 0 )');
				
				$('div.cart-menu ul').hide();
				$('div.cart-menu div.cart-total').hide();
				initLogin();
			}else{
				$('.cart-tip').hide();
				$('div.cart-menu ul').show();
				$('div.cart-menu div.cart-total').show();
				
				reloadUserInfo(data);
				initCartItems(data);
			}
		}
	});
}

var userinfotimeid;
function reloadUserInfo(username){
	console.log(username);
	var template,
		htmlOutput;
	template = $.templates("#headerUserInfoTmpl");
	htmlOutput = template.render();
	$('div.user-info a').eq(0).remove();
	$('div.user-info a').eq(0).html('消息通知');
	$('div.user-info a').eq(1).html('我的订单');
	$('div.user-info').prepend(htmlOutput);
	$('div.user-info .user .name').html(username);
	$('.topbar div.topbar-cart a.cart-mini').css({
		backgroundColor: '#424242',
		color: '#b0b0b0'
	});
	$('div.user-info span.user').unbind().on({
		mouseover:function(){
			clearTimeout(userinfotimeid);
			$('div.user-info span.user ul').slideDown(300);
			$(this).css({
				backgroundColor: '#fff',
				color: '#ff6700'
			});
			$(this).children('span.name').css('color', '#ff6700');
		},
		mouseleave:function(){
			if(!$('div.user-info span.user:hover').length){
				userinfotimeid=setTimeout(function(){
					$('div.user-info span.user ul').slideUp(300,function(){
						$('div.user-info span.user').css('backgroundColor', '#333333');
						$(this).children('span.name').css('color', '#b0b0b0');
					});
					
				},300);
			}
		}
	});
	initLogout();
}

function initCartItems(username){
	$.ajax({
		type: "GET",
		url: "/phpbin/micopyer/cart.php",
		data: {
			username:username
		},
		success: function(data) {
			var result=$.parseJSON(data),
				totalprice=0,
				totalnum=0;
			pageToCart(result);
			if(result.length>0){
				console.log($('.topbar div.topbar-cart'));
				$('.topbar div.topbar-cart a').css({
					backgroundColor: '#ff6700',
					color: '#fff'
				});
				for(var i=0;i<result.length;i++){
					var goodsid=result[i],
						goodsnum=parseInt(result[++i]),
						getype=result[++i],
						template,
						htmlOutput;
					totalnum+=goodsnum;
					var data=getGoodsInfo(goodsid);
					data.num=goodsnum;
					totalprice+=goodsnum*data.price;
					template = $.templates("#headerCartItemTmpl");
					htmlOutput = template.render(data);
					$('div.cart-menu ul.items').append(htmlOutput);
				}
				$('div.cart-menu ul.items li').first().children('div.cart-item').addClass('first');
				$('div.cart-menu div.cart-total .total em').html(totalnum);
				$('div.cart-menu div.cart-total .price em').html(totalprice.toFixed(2));
			

				$('.topbar div.topbar-cart').unbind().on({
					mouseover:function(){
						clearTimeout(topbartimeid);
						$('.topbar div.topbar-cart a.cart-mini').css({
							backgroundColor: '#fff',
							color: '#ff6700'
						});
						$('.cart-menu').slideDown(300);
					},
					mouseleave:function(){
						console.log('mouseleave');
						if(!$('div.topbar-cart:hover').length){
							topbartimeid = setTimeout(function() {
								$('.cart-menu').slideUp(300,function(){
									console.log(1);
									$('.topbar div.topbar-cart a.cart-mini').css({
										backgroundColor: '#ff6700',
										color: '#fff'
									});
								});
							}, 300);
						}	
						
					}
				});
				$('.topbar div.topbar-cart a.cart-mini i').html('&#xe600;');
				$('.topbar div.topbar-cart a.cart-mini span').html('( '+totalnum+' )');
			}
			else{
				console.log('bibe');
				$('.topbar div.topbar-cart a.cart-mini').css({
					backgroundColor: '#424242',
					color: '#b0b0b0'
				});
				$('.topbar div.topbar-cart a.cart-mini i').html('&#xe614;');
				$('.topbar div.topbar-cart a.cart-mini span').html('( 0 )');
				$('div.cart-menu .cart-tip').show();
				$('div.cart-menu ul').hide();
				$('div.cart-menu div.cart-total').hide();
			}
		}
	});
}

function pageToCart(result){
	if(result.length>0){
		var cartbtn=$('div.cart-menu div.cart-total a');
		cartbtn.unbind().on('click',function(){

		console.log(1);
			window.location.href = 'http://localhost:8080/micar1/src/cart-empty.html';
		});
	}
}



function initLogin(){
	$('div.user-info a').first().unbind().on('click',function(){
		$.ajax({
			type: "GET",
			url: "/phpbin/micopyer/judgeuser.php",
			data: {
				event: 'url',
				url: 'http://localhost:8080/tf'
			},
			success: function(data) {
				window.location.href = 'http://localhost:8080/web/src/MI-user-load.html';
			}
		});
	});
}
function initLogout(){
	$('div.user-info span.user ul.menu a').last().unbind().on('click',function(){
		console.log(1);
		$.ajax({
			type: "GET",
			url: "/phpbin/micopyer/judgeuser.php",
			data: {
				event: 'logout'
			},
			success: function(data) {
				window.location.href = 'http://localhost:8080/tf';
			}
		});
	});
}


function getGoodsInfo(goodsid){
	var type,
		good,
		data={};
	for(var key in cartgoods){
		type=key;
		if(goodsid<=parseInt(cartgoods[key])){
			break;
		}
	}
	good=cart[type].items;
	for(var i=0;i<good.length;i++){
		if(good[i].goodsid==goodsid){
			good=good[i];
			break;
		}
	}
	good.category=type;
	good.imgsrc=good.imgsrc.substr(3);
	good.imgsrc='/tf/'+good.imgsrc;
	console.log(good.imgsrc);
	return good;
}


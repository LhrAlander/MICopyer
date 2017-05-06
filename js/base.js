$(document).ready(function() {
	initHomePage(); //初始化主页
});

function initHomePage() {
	$('.cart-mini').hover(function() {
		$('.cart-menu').slideDown(300);
	});
	$('.topbar-cart').mouseleave(function() {
		$('.cart-menu').slideUp(300);
	});
}
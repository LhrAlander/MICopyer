function init(){
	initNavItem();
	initSearchBox();
	initHomeSlider();
	overall();
	addScrollEvent();
	videoPlay();
	showContent();
	picSwitch($('.J_kindsChoice'), ".J_dotItem", [".J_itemPic", ".J_textItem"]);
	photo.init();
	picShow();
}
function overall(){
	$('body').animate({scrollTop:140},'slow');
	$('.section').eq(0).addClass('preload').addClass('is-visible');
}
function addScrollEvent(){
	$(window).scroll(function(){
		$('.section').each(function(){
			var	l = function() {
					return !!document.createElement("video").canPlayType
				}(),
				i=$(this),
				h=i.offset().top;
			if(h >= $(window).scrollTop() && h < ($(window).scrollTop()+$(window).height()/2)){
				i.addClass('preload').addClass('is-visible');
				i.next().addClass('preload').find(".video").attr('preload','auto'),i.hasClass("J_fragmentPerfor") , l && i.find(".video").length && i.find(".video")[0].play();
				i.next().next().addClass('preload');
			}
		});
		if($('.section-top').offset().top < $(window).scrollTop()){
			$('.nav-bar-hidden').css({'margin-top':10});
		}
		else {
			$('.nav-bar-hidden').css({'margin-top':-60});
		}

	});
}
function videoPlay(){
	var s = $("#J_videoModal");
	$(".J_play").on("click", function() {
	var i = $(this).attr("data-video");
	s.on("show.bs.modal", function() {
		s.find(".modal-bd").html('<iframe id="miPlayerIframe" width="880" height="536" src="src/miPlayer.html?vurl=' + i + '&auto=1" frameborder="0" allowfullscreen="" scrolling="no"></iframe>')
	}).modal("show").one("hidden.bs.modal", function() {
		s.find(".modal-bd").empty()
	})
})
}
function showContent(){
	var i = this,
	t = [];
	$('.J_btnShowMore').on('click',function(){
		var e = $(this).data("id"),
			n = $(".J_fragment0" + e).find(".fragment");
		t[e] ? ($(".J_fragment0" + e).removeClass("is-show"), $(".J_showNext0" + e).removeClass("aftershow"), $(window).off("scroll.visibleWatcher"), n.removeClass("section"), setTimeout(function() {
		}, 1e3), t[e] = !1) : ($(".J_fragment0" + e).addClass("is-show"), $(".J_showNext0" + e).addClass("aftershow"), t[e] = !0, n.addClass("section"), $(window).off("scroll.visibleWatcher"), n.eq(0).addClass("preload"), setTimeout(function() {
		}, 1e3))
	});
}
function picSwitch(i,t,e){
	var n = this;
	i.on("click", t, function() {
		var i = $(this),
			t = i.index();
		i.addClass("active").siblings().removeClass("active"), $.each(e, function(i, e) {
			n.fadeFun($(e), t)
		})
	})
}
function fadeFun(i, t) {
	i.eq(t).fadeIn().siblings().fadeOut()
}
var flagPic=0;
var tempindex=0;
function picShow(){
	$('.J_dot').on('click',function(){
		console.log(tempindex++);
		var t=$(this);
		if(flagPic){
			t.removeClass('active');
			flagPic=0;
		}
		else {
			t.addClass('active');
			flagPic=1;
		}
		$('.J_screenPic').eq(flagPic).fadeIn().siblings().fadeOut();
	})
}
var photo = {
		init: function() {
			this.$videoList = $(".J_photospic"), this.$sliderBtns = $(".J_vBtns"), this.isMoving = !1, this.index = 1, this.initPage(), this.bindEvent()
		},
		initPage: function() {
			var i = this.$videoList.find("li").eq(0);
			this.liW = i.width() + parseInt(i.css("marginRight")), this.liLen = this.$videoList.find("li").length, this.$videoList.css({
				width: this.liW * this.liLen,
				marginLeft: -this.liW
			})
		},
		bindEvent: function() {
			this.$sliderBtns.on("click", "a", $.proxy(this.onBtnClick, this))
		},
		onBtnClick: function(i) {
			var t = $(i.currentTarget),
				e = t.data("type");
			if ("prev" === e) {
				if (0 === this.index) return !1;
				this.index = this.index - 1
			} else {
				if (this.index === this.liLen - 1) return !1;
				this.index = this.index + 1
			}
			this.move(this.index)
		},
		move: function(i) {
			this.$sliderBtns.find("a").removeClass("hide"), i === this.liLen - 1 && this.$sliderBtns.find(".v-next").addClass("hide"), 0 === i && this.$sliderBtns.find(".v-prev").addClass("hide"), this.$videoList.animate({
				marginLeft: -i * this.liW + "px"
			})
		}
	};
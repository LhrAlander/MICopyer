var cartgoods,
	cart,
	username,
	selectednum=0;
function init(){
	//初始化各种事件
	$.getJSON("../data/cartgoods.json",function(result){
		cartgoods=result;
		$.getJSON("../data/cart.json",function(result){
			cart=result;
			$.ajax({
				type:"GET",
				url:"/phpbin/micopyer/judgeuser.php",
				data:{event:'user'},
				success:function(data){
					username=data;
					console.log(username);
					addEvents();
				}
			});
		});
		
	});
	
}



function addEvents(){
	//头部
	initHeader();
	//商品小项目
	
}

function initHeader(){
	//TODO 根据状态加载头部右边的html结构
	console.log(username);
	if(username=='NULL'){
		$('div.header-info span.name').html('登录');
		$('div.header-info a.link').html('注册');
		$('span.user i').css('display', 'none');
		$('.cart-empty').css('display', 'block');
		$('.header-info a.user-name').css('width', '40px').unbind().hover(function(){
			$(this).css('color', '#757575');
		});
		var data,
			template,
			htmlOutput;
		data=cart.recommand;
		data.title='为您推荐';
		template = $.templates("#cartRecommendTmpl");
		htmlOutput = template.render(data);
		$('div.page-main div.container').append(htmlOutput);
		initEmptyCart();
		}
	else {
		$('span.user i').css('display', 'inline-block');
		$('.cart-empty').css('display', 'none');
		$('div.header-info span.name').html(username);
		$('div.header-info a.link').html('我的订单');
		initHeaderEvents();
		initGoods();
	}
	
}

function initEmptyCart(){
	var loginbtn=$('.cart-empty .btn-left');
	loginbtn.unbind().on('click',function(){
		$.ajax({
				type:"GET",
				url:"/phpbin/micopyer/judgeuser.php",
				data:{event:'url',url:'http://localhost:8080/micar1/src/cart-empty.html'},
				success:function(data){
					window.location.href='http://localhost:8080/web/src/MI-user-load.html';
				}
			});
		
	});
}


function initHeaderEvents(){
	var username=$('div.header-info a.user-name'),
		usermenu=$('div.header-info span.user ul.menu'),
		logout=usermenu.find('li').eq(4);
		$('.header-info a.user-name').css('width', '120px').unbind();
		var timeid;
	//已登录
	if(username.length>0){
		username.unbind();
		username.on({
			mouseenter:function(){
				clearTimeout(timeid);
				usermenu.slideDown(300);
			},
			mouseout:function(){
				if(!$('div.header-info span.user:hover').length)
					timeid=setTimeout(function(){
						usermenu.slideUp(300);
					}, 300);
			}
		});
		usermenu.unbind().on({
			mouseout:function(){
			if(!$('div.header-info span.user:hover').length)
				timeid=setTimeout(function(){
						usermenu.slideUp(300);
					}, 300);
			},
			mouseenter:function(){
				clearTimeout(timeid);
			}
		});
		logout.unbind().on('click',function(){
			$.ajax({
				type:"GET",
				url:"/phpbin/micopyer/judgeuser.php",
				data:{event:'logout'},
				success:function(data){
					console.log('successed');
					reloadPage();
				}
			});
			
		});
	}
	//TODO 未登陆状态的登陆界面与操作界面
}

function initGoods(){
	//TODO 根据数据填充商品界面栏
	//购物车中有商品的时候
	$.ajax({
		type:"GET",
		url:"/phpbin/micopyer/cart.php",
		data:{username:username},
		success:function(data){
			var result=JSON.parse(data);
			if(result.length>0){
				fillGoodsPage(result);
				initGoodsEvents();
			}else{
				$('.cart-empty').css('display', 'block');
				if(username!='NULL'){
					$('.cart-empty .btn-right').hide();
					$('.cart-empty .btn-left').html('马上去购物');
					$('.cart-empty h2').css('marginBottom', '15px');
					$('.cart-empty p').remove();
				}
				var data,
					template,
					htmlOutput;
				data=cart.recommand;
				data.title='为您推荐';
				template = $.templates("#cartRecommendTmpl");
				htmlOutput = template.render(data);
				$('div.page-main div.container').append(htmlOutput);
				initRecommendEvents();
			}
		}
	});
}


function fillGoodsPage(result){
	var template = $.templates("#cartGoodsListTmpl"),
		htmlOutput = template.render();
		$('.cart-box').prepend(htmlOutput);
	for(var i=0;i<result.length;i++){
		var goodsid=result[i],
			goodsnum=result[++i],
			getype=result[++i];
		addGood(goodsid,getype,goodsnum);
	}
	
	//加购区
	data=cart.raise;
	template = $.templates("#cartRaiseTmpl");
	htmlOutput = template.render(data);
	$('.cart-box').append(htmlOutput);
	initRaiseEvents();

	template = $.templates("#cartBoxFooterTmpl");
	htmlOutput = template.render();
	$('.cart-box').append(htmlOutput);
	calculateAmount();



	data=cart.other;
	data.title='买购物车中商品的人还买了';
	template = $.templates("#cartRecommendTmpl");
	htmlOutput = template.render(data);
	$('div.page-main div.container').append(htmlOutput);
	initRecommendEvents();
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
	good.gettype='buy';
	good.category=type;
	return good;
}
function initRecommendEvents(){
	var recommenditems=$('div.cart-recommend li');
	recommenditems.each(function(){
		var buybtn=$(this).find('a.btn'),
			goodsid=$(this).attr('goodsid');
		buybtn.unbind();
		buybtn.on('click',function(){
			console.log('正在添加');
			addGood(goodsid,'buy',1);
			changeDB(goodsid,2,'buy');
		});
	});
}
function initRaiseEvents(){
	var raiseitems=$('div.raise-buy-box .item');
	//隐藏对应的raiseboxitem
		var items=$('div.page-main div.cart-box div.list-body div.item-box'),
			data,
			index;
		items.each(function(){
			var goodsid=$(this).attr('goodsid');
			data=getGoodsInfo(goodsid);
			switch(data.category){
				case 'earphone':
					index=0;
					break;
				case 'fan':
					index=1;
					break;
				case 'towel':
					index=2;
					break;
				case 'photo':
					index=3;
					break;
				case 'led':
					index=4;
					break;
			}
			console.log(index);
			raiseitems.eq(index).hide();
		});
		



	raiseitems.each(function(){
		$(this).on('click',function(){
			var type;
			switch($(this).index()){
				case 0:
					type='earphone';
					break;
				case 1:
					type='fan';
					break;
				case 2:
					type='towel';
					break;
				case 3:
					type='photo';
					break;
				case 4:
					type='led';
					break;
			}
			addRaiseGood(type,$(this).index());

		});
		
	});
}

function addRaiseGood(type,index){
	var coverbox=$('body').find('div.allback'),
		data=cart[type],
		template = $.templates("#cartModalTmpl"),
		htmlOutput = template.render(data),
		modalBox;
	$('body').append(htmlOutput);
	modalBox=$('body').find('div.modal');
	coverbox.toggleClass('hide');
	modalBox.animate({top: "50%"},300);
	initModalBoxEvents(modalBox,index);
}
function initModalBoxEvents(obj,index){
	var closebtn=$(obj).find('span.close'),
		goods=$(obj).find('li'),
		buybtn=$(obj).find('a.btn');
	closebtn.on('click',function(){
		$(obj).remove();
		$('body').find('div.allback').toggleClass('hide');
	});
	goods.each(function(){
		$(this).on({
			mouseover:function(){
				var radioicon=$(this).find('i.icon-radio');
				if(!radioicon.hasClass('selected'))
					radioicon.css('backgroundColor', '#e0e0e0');
			},
			mouseout:function(){
				var radioicon=$(this).find('i.icon-radio');
				if(!radioicon.hasClass('selected'))
					radioicon.css('backgroundColor', '#fff');
			},
			click:function(){
				var radioicon=$(this).find('i.icon-radio'),
					addbtn=$('body').find('div.modal-footer').children(),
					preindex=-1,
					items=obj.find('li').find('i.icon-radio');
					items.each(function(){
						if($(this).hasClass('selected')){
							$(this).removeClass('selected').css('backgroundColor', '#fff');
						}
					});
				radioicon.css('backgroundColor', '#ff6700');
				radioicon.addClass('selected');
				addbtn.addClass('btn-primary');

			}
		});
	});
	buybtn.on('click',function(){
		var items=obj.find('li').find('i.icon-radio'),
			goodsid,
			gettype='bargain'
		items.each(function(){
			if($(this).hasClass('selected')){
				goodsid=$(this).parent().attr('goodsid');
				return false;
			}
		});
		if($(this).hasClass('btn-primary')){
			addGood(goodsid,gettype,1);
			changeDB(goodsid,2,gettype);
			$(obj).remove();
			$('body').find('div.allback').toggleClass('hide');
			$('div.raise-buy-box .item').eq(index).hide();
		}
	})

}

function initGoodsEvents(){
	var items=$('div.page-main div.cart-box div.list-body div.item-box');//购物车内的物品
	//全选按钮
	initAllCheck();
	//购物车内有商品
	if(items.length>0){
		items.each(function(){
			initCheckBox(this);
			initChangeNum(this);
			initNumInput(this);
			initDelete(this);
			//initSubBox(this);
		});
	}
}
function initAllCheck(){
	var allcheckbtn=$('div.list-head div.col-check i.icon-hook'),
		items=$('div.page-main div.cart-box div.list-body div.item-box');
	allcheckbtn.unbind();
	allcheckbtn.on({
		click:function(){
			allcheckbtn.parent().toggleClass('icon-checkbox-selected');
			if(allcheckbtn.parent().hasClass('icon-checkbox-selected'))
				allcheckbtn.css('color', '#fff');
			else{
				selectednum=0;
				//judgeClearRaiseBox();
			}
			items.each(function(){
				var checkbox=$(this).find('i.icon-checkbox'),
					getype=$.parseJSON($(this).attr('goodsinfo')).gettype;
				if(allcheckbtn.parent().hasClass('icon-checkbox-selected')){
					checkbox.addClass('icon-checkbox-selected');
					if(getype=='buy')
						selectednum++;
				}
				else{
					checkbox.removeClass('icon-checkbox-selected');
				}
			});
			judgeClearRaiseBox();
			calculateAmount();
		},
		mouseenter:function(){
			if(!allcheckbtn.parent().hasClass('icon-checkbox-selected'))
				allcheckbtn.css('color', '#757575');
		},
		mouseout:function(){
			if(!$('div.item-table i.icon-hook:hover').length&&!allcheckbtn.parent().hasClass('icon-checkbox-selected'))
				allcheckbtn.css('color', '#fff');
		}
		
	});
}
function initCheckBox(obj){
	var checkbox=$(obj).find('i.icon-checkbox'),
		gettype;
	checkbox.unbind();
	checkbox.on({
		click:function(){
			gettype=$.parseJSON($(obj).attr('goodsinfo')).gettype;
			checkbox.toggleClass('icon-checkbox-selected');
			if(checkbox.hasClass('icon-checkbox-selected')){
				checkbox.css('color', '#fff');
				if(gettype=='buy')
					selectednum++;
			}
			else{
				if(gettype=='buy')
					selectednum--;
			}
			checkAllSelected();
			calculateAmount();
			console.log(selectednum);
			judgeClearRaiseBox();
		},
		mouseenter:function(){
			if(!checkbox.hasClass('icon-checkbox-selected'))
				checkbox.css('color', '#757575');
		},
		mouseout:function(){
			if(!$('div.item-table i.icon-hook:hover').length&&!checkbox.hasClass('icon-checkbox-selected'))
				checkbox.css('color', '#fff');
		}
	});
	
}
//判断是否隐藏raisebuybox
function judgeClearRaiseBox(){
	var raisebox=$('.raise-buy-box'),
		raiseitems=raisebox.find('.item'),
		cartbar=$('.cart-bar'),
		goods=$('.cart-box .list-body .item-box'),
		btn=$('.cart-bar a.btn'),
		tip=$('#no-select-tip');
	if(selectednum==0){
		raisebox.hide();
		cartbar.css('marginTop', '20px');
		btn.css({
			background: '#e0e0e0',
			color: '#b0b0b0',
			border: '#e0e0e0'
		});
		tip.show();
		goods.each(function(){
			var gettype=$.parseJSON($(this).attr('goodsinfo')).gettype,
				goodsid=$(this).attr('goodsid');
			if(gettype=='bargain'){
				$(this).remove();
				changeDB(goodsid,1);
			}
		});
	}else{
		raisebox.show();
		raiseitems.each(function(){
			$(this).show();
		});
		btn.css({
			background: '#ff6700',
			color: '#fff',
			border: '#ff6700'
		});
		tip.hide();
	}
}

//加减号按钮点击事件
function initChangeNum(obj){
	var datainfo=$(obj).attr('goodsinfo'),
		goodsid=$(obj).attr('goodsid'),
		maxnum=$.parseJSON(datainfo).maxnum,
		plusbtn=$(obj).find('a.plus'),
		minusbtn=$(obj).find('a.minus'),
		numbox=$(obj).find('div.change-goods-num').children('input'),
		namebox=$(obj).find('h3.name').children('a'),
		totaldiv=$(obj).find('div.col-total'),
		price=parseFloat($(obj).find('div.col-price').text()),
		currentnum,
		descp=$(obj).find('p.col-num-p'),
		totalstr;
		
		plusbtn.unbind();
		plusbtn.on('click',function(){
			var descstr='还可买 ';
			currentnum=parseInt(numbox.val());
			if(currentnum<maxnum){
				currentnum++;
				numbox.val(currentnum);
				totalstr=(price*currentnum).toFixed(1)+'元';
				totaldiv.html(totalstr);
				if(currentnum<maxnum){
					descstr+=(maxnum-currentnum)+' 件';
					descp.css('display','block').html(descstr);
				}else{
					descp.css('display','none');
				}
				changeDB(goodsid,3,'buy',currentnum);
			}else{
				//TODO 超过最大购买数量的提示框内容
				var str='商品'+namebox.html()+'已达到最大购买数量，无法继续添加，可直接前往购物车下单购买';
				showVertify(str,false);
			}

			calculateAmount();
		});
		minusbtn.unbind();
		minusbtn.on('click',function(){
			var descstr='还可买 ';
			currentnum=numbox.val();
			if(currentnum>1){
				currentnum--;
				numbox.val(currentnum);
				totalstr=price*currentnum+'元';
				totaldiv.html(totalstr);
				descstr+=(maxnum-currentnum)+' 件';
				descp.css('display','block').html(descstr);
				if(currentnum==1)
					descp.css('display','none');
				changeDB(goodsid,3,'buy',currentnum);
			}
			calculateAmount();
		});
}
//手动输入物品数量时间
function initNumInput(obj){
	var datainfo=$(obj).attr('goodsinfo'),
		goodsid=$(obj).attr('goodsid'),
		maxnum=$.parseJSON(datainfo).maxnum,
		totaldiv=$(obj).find('div.col-total'),
		price=parseFloat($(obj).find('div.col-price').text()),
		numinput=$(obj).find('div.change-goods-num').children('input'),
		numbox=$(obj).find('div.change-goods-num').children('input'),
		totaldiv=$(obj).find('div.col-total'),
		descp=$(obj).find('p.col-num-p'),
		totalstr,
		currentnum=numinput.val();
		numinput.unbind();
		numinput.on('change',function(){
			var descstr='还可买 ';
			currentnum=parseFloat($(this).val());
			if(currentnum<=0){
				currentnum=1;
			}
			else if(currentnum>maxnum){
				var str='该商品数量不能大于';
				str+=maxnum;
				showVertify(str);
				currentnum=maxnum;
			}
			else if(currentnum>0&&currentnum<=maxnum){
				currentnum=$(this).val();
				descstr+=(maxnum-currentnum)+' 件';
				descp.css('display','block').html(descstr);
			}
			else{
				currentnum=1;
			}
			numbox.val(currentnum);
			numbox.attr('value', currentnum);
			totalstr=(price*currentnum).toFixed(1)+'元';
			console.log(totalstr);
			totaldiv.html(totalstr);
			if(currentnum==1||currentnum==maxnum)
				descp.css('display','none');
			calculateAmount();
			changeDB(goodsid,3,'buy',currentnum);
		});
}

function initDelete(obj){
	var delbtn=$(obj).find('a.del'),
		getype=$(obj).attr('goodsinfo');
	getype=$.parseJSON(getype).gettype;
	delbtn.unbind();
	delbtn.on('click',function(){
		var str='确定删除吗 ?'
		showVertify(str,true,1,obj);
		if(getype=='bargain'){
			var goodsid=$(obj).attr('goodsid');
			console.log(goodsid);
			bargainVertify(goodsid,obj);
			changeDB(goodsid,1);
		}
		
		calculateAmount();
	});

}
//加价购点击事件 已弃用
function initSubBox(obj){
	var subgood=$(obj).find('div.extend-buy'),
		type,
		datainfo,
		data={};
	if(subgood.length>0){
		subgood.each(function(){
			datainfo=$.parseJSON($(this).attr('datainfo'));
			$(this).on('click',function(){
				var type=chooseSubGoods(this),
					_this=$(this).parent();
				datainfo.type=type;
				var template = $.templates("#cartSubTmpl"),
					htmlOutput = template.render(datainfo);
				htmlOutput=$(htmlOutput).html();
				_this.hide();
				subgood.first().parent().before(htmlOutput);
				var delbtn=$(subgood.first().parent()).prev('div.item-sub-box').find('a.del');
				delbtn.on('click',function(){
					var str='该商品参与了优惠活动，删除后有可能无法获得优惠商品，确定删除吗？'
					
					if(showVertify(str,false)){
						console.log(1);
						_this.show();
						$(this).parents('div.item-sub-box').remove();
					}
					calculateAmount();
				});
				calculateAmount();
			});
		});
	}

}

//添加商品到购物车
function addGood(goodsid,gettype,num){
	var data={},
		flag=true;
	data=getGoodsInfo(goodsid);
	data.gettype=gettype;
	data.num=num;
	template = $.templates("#cartGoodsListBodyTmpl");
	htmlOutput = template.render(data);
	$('.cart-box .list-body').append(htmlOutput);
	initGoodsEvents();
	if(gettype=='bargain'){
		var cur = $('div.item-box').last();
		cur.find('div.col-num').html(1);
		cur.find('i.icon-checkbox').css({
			backgroundColor: '#fff',
			borderColor: '#fff',
			color:'#ff6700',
			cursor:'default'
		}).unbind();
		cur.find('a.del').unbind().on('click',function(){
			var str='该商品参与了优惠活动，删除后有可能无法获得优惠商品，确定删除吗？';
			showVertify(str,true,1,cur);
			bargainVertify(goodsid,cur);
		});

	}
	else if(gettype=='buy')
		selectednum++;
	calculateAmount();
}

function bargainVertify(goodsid,obj){
	var vertifybox=$('body').find('div.goods-del-alert'),
		yesbtn=vertifybox.find('button.btn-yes');
		yesbtn.unbind().on('click',function(){
			var data=getGoodsInfo(goodsid),
				coverbox=$('body').find('div.allback'),
				index;
			switch(data.category){
				case 'earphone':
					index=0;
					break;
				case 'fan':
					index=1;
					break;
				case 'towel':
					index=2;
					break;
				case 'photo':
					index=3;
					break;
				case 'led':
					index=4;
					break;
			}
			$(obj).remove();
			$('div.raise-buy-box div.item').eq(index).show();
			coverbox.toggleClass('hide');
			vertifybox.animate({top: '-80%'}, 800).remove();
			calculateAmount();
			changeDB(goodsid,1);
			reloadPage()
		});
}

//下滑出提示框
function showVertify(str,canceljudge,type,obj){
	//TODO
	console.log(str);
	var data={},
	template = $.templates("#cartVertifyTmpl"),
	htmlOutput;
	data.cancel='';
	data.str=str;
	if(canceljudge)
		data.cancel='取消';
	htmlOutput = template.render(data);
	$('body').append(htmlOutput);
	//显示提示框
	var vertifybox=$('body').find('div.goods-del-alert'),
		coverbox=$('body').find('div.allback');
	coverbox.toggleClass('hide');
	vertifybox.css('position', 'fixed');
	vertifybox.animate({top: '20%'}, 800);
	vertifybox.find('h3').css('fontSize', '18px');
	//提示框按钮事件
	var cancelbtn=vertifybox.find('button.btn-cancel'),
		yesbtn=vertifybox.find('button.btn-yes'),
		closebtn=vertifybox.find('a.close').children('i');
	cancelbtn.unbind().on('click',function(){
		coverbox.toggleClass('hide');
		vertifybox.animate({top: '-80%'}, 800).remove();
	});
	closebtn.unbind().on('click',  function() {
		coverbox.toggleClass('hide');
		vertifybox.animate({top: '-80%'}, 800).remove();
	});
	if(type==1){
		yesbtn.unbind();
		yesbtn.on('click',function(){
			coverbox.toggleClass('hide');
			vertifybox.animate({top: '-80%'}, 800).remove();
			var goodsid=$(obj).attr('goodsid');
			changeDB(goodsid,1);
			selectednum--;
			console.log(selectednum);
			$(obj).remove();
			calculateAmount();
			reloadPage();
		});
	}else{
		yesbtn.unbind();
		yesbtn.on('click',function(){
			coverbox.toggleClass('hide');
			vertifybox.animate({top: '-80%'}, 800).remove();
		});
		
	}
	return true;
}

//重新刷新页面
function reloadPage(){
	$('.cart-box').empty();
	$('.cart-recommend').remove();
	init();
}

function chooseSubGoods(obj){
	return '绿色';
}






//判断是否全选
function checkAllSelected(){
	var items=$('div.page-main div.cart-box div.list-body div.item-box'),
		flag=true,
		headcheckbox=$('div.page-main div.cart-box div.list-head i.icon-checkbox');
	items.each(function(){
		var checkbox=$(this).children('div.item-table').children('div.col-check').children('i.icon-checkbox');
		flag=checkbox.hasClass('icon-checkbox-selected');
		if(!flag)
			return false;
	});
	if(flag)
		headcheckbox.addClass('icon-checkbox-selected');
	else
		headcheckbox.removeClass('icon-checkbox-selected');

}

//计算商品数量和总价格
function calculateAmount(){
	var items=$('div.page-main div.cart-box div.list-body div.item-box'),
		bar=$('div.page-main div.cart-box div.cart-bar'),
		amount=0,
		selected=0,
		price=0;
	items.each(function(){
		var checkbox=$(this).children('div.item-table').children('div.col-check').children('i.icon-checkbox'),
			numbox=$(this).children('div.item-table').children('div.col-num').children('div.change-goods-num').children('input'),
			subbox=$(this).children('div.item-sub-box').children('div.item-table'),
			pricebox=$(this).children('div.item-table').children('div.col-total');
		if(numbox.length==1)
			amount+=parseFloat(numbox.val());
		else
			amount+=parseInt($(this).find('div.col-num').html());
		amount+=subbox.length;
		if(checkbox.hasClass('icon-checkbox-selected')){
			if(numbox.length==1)
				selected+=parseFloat(numbox.val());
			else
				selected+=parseInt($(this).find('div.col-num').html());
			price+=parseFloat(pricebox.text());
			if(subbox.children('div.col-total').length>0)
				price+=parseFloat(subbox.children('div.col-total').text());
		}
	});
	//为bar填充数据
	var amountspan=bar.children('div.section-left').children('span.cart-total').children('i').eq(0),
		selectedspan=bar.children('div.section-left').children('span.cart-total').children('i').eq(1),
		priceem=bar.children('span.total-price').children('em');
		amountspan.text(amount);
		selectedspan.text(selected);
		price=price.toFixed(2);
		priceem.text(price);
}



function changeDB(goodsid,type,getype,num){//type:1为删除物品 2为添加物品 3为改变数量
	$.ajax({
		type: "GET",
		url: "/phpbin/micopyer/goodsevent.php",
		data:{username:username,event:type,goodsid:goodsid,num:num,gettype:getype},
		success: function(data) {
			console.log(data);
		}
	});
}




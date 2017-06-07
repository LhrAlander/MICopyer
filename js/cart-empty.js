$(document).ready(function(){
    //cart-bar 
    $(window).scroll(function(){
        initScroll();
    });
    
    //init
    init();
    //func
    ifchecked();
    ifdel();
    change_item_sub_box();
    modle_choose();
    changenum();
    xm_recommend_append();
    
    
});

function init(){
    //header
    showname();  
    recommend_hover();
    showbarnum();
    recommend_title();
}

function recommend_title(){
    
    if($("div.cart-empty").hasClass("hide")){
        $("div.cart-recommend h2.xm-recommend-title span").html("买购物车中商品的人还买了");
    }
    else{
        $("div.cart-recommend h2.xm-recommend-title span").html("为您推荐");
    }
}
function showname(){
    $(".header .name").hover(function(){
        $(".header .menu").slideDown(300);
    });
    $(".header .user").mouseleave(function(){
        $(".header .menu").slideUp(300); 
    }); 
}
function initScroll(){
    var length=$('.cart-box').height();
    length+=90;
    //不滚动的时候
    if($(window).height()<=length){
        $('.cart-bar').addClass('cart-bar-fixed');
    }
    //滚动的时候
    $(window).bind("scroll", function(){ 
        // 当前窗口的滚动距离
        var top = $(this).scrollTop(); 
        if($(window).height()+top<=length){
            $('.cart-bar').addClass('cart-bar-fixed');
        }else{
            $('.cart-bar').removeClass('cart-bar-fixed');
        }
   });
}

function minus(thisobj){   
    //thisobj is <a class="minus">
    //minpar  is <div class="change-goods-num">
    var minpar =$(thisobj).parent();
    //numnode is <input type="text" value="1"/> 商品数量
    var numnode =$(thisobj).next();
    var num =$(numnode).val();
    //pricenode is <div class="col col-price">  商品单价
    var pricenode =minpar.parent().prev();
    var price =$(pricenode).text();
    //totalnode is <div class="col col-total">  商品总价
    var totalnode =minpar.parent().next();
    var p=$(minpar).next(); 
    if(num<=1){
        $(numnode).val("1");
        $(totalnode).text(price);
    }
    else{
        num--;
        $(numnode).val(num);
        if(num>1){
            $(p).html("还可买"+parseInt(10-num)+"件");
            $(totalnode).text(parseInt(num)*parseInt(price)+"元");
        }
        else {
            $(p).html("");
            $(totalnode).text(price);
        }  
    } 
    showbarnum();   
}
function plus(thisobj){ 
    //thisobj is <a class="plus">
    //minpar  is <div class="change-goods-num">
    var minpar =$(thisobj).parent();
    //numnode is <input type="text" value="1"/> 商品数量
    var numnode =$(thisobj).prev();
    var num =$(numnode).val();
    //pricenode is <div class="col col-price">  商品单价
    var pricenode =minpar.parent().prev();
    var price =$(pricenode).text();
    //totalnode is <div class="col col-total">  商品总价
    var totalnode =minpar.parent().next();
    var p=$(minpar).next();

    if(num>=10){
        $(numnode).val("10");
        $(totalnode).text(parseInt(price)*10+"元");
    } 
    else{
        num++;
        $(numnode).val(num);
        if(num<10){
            $(p).html("还可买"+parseInt(10-num)+"件");
            $(totalnode).text(parseInt(num)*parseInt(price)+"元");   
        }
        else {
            $(p).html("");
            $(totalnode).text(parseInt(price)*10+"元");
        }  
    }   
   showbarnum();  
}
function changenum(){
    $(".change-goods-num .minus").click(function(){
        minus(this);
    });//minus
    $(".change-goods-num .plus").click(function(){
        plus(this); 
     });//plus
}

function allselect(thisobj){
    //allselect
    //thisobj is <div class="col col-check">全选</div>
    if($(thisobj).hasClass("icon-checkbox-selected")){
        $("div.item-box div[class$='check']>i").removeClass("icon-checkbox-selected");
        $(thisobj).css("color","#424242"); 
    }    
    else{
         $(thisobj).css("color","#fff");
         $("div.item-box div[class$='check']>i").addClass("icon-checkbox-selected");      
    }    
    showbartip();
    showbarnum();
   
}
function select(thisobj){
  //select
    //thisobj is <div class="col col-check">
    $(thisobj).toggleClass("icon-checkbox-selected");
    if($(thisobj).hasClass("icon-checkbox-selected"))
        $(thisobj).css("color","#fff");
    else
        $(thisobj).css("color","#424242"); 
    //被选中的item-box
    var cbox=$("div.list-body div.item-box div[class$='check']").find("i.icon-checkbox-selected");
    //全部的item-box
    var box=$("div.list-body div.item-box div[class$='check']").find("i.icon-checkbox");

    if(cbox.length==box.length){
        $("#selectall").addClass("icon-checkbox-selected");
    }
    else
        $("#selectall").removeClass("icon-checkbox-selected");     

    showbartip();
    showbarnum(); 
}
function selecthover(){
    //selects hover
    $("div[class='item-box'] div[class$='check']>i").hover(function(){
        if($(this).hasClass("icon-checkbox-selected")){
            $(this).css("color","#fff");
        }
        else{
            $(this).css("color","#424242");
        } 
    });
    $("div[class='item-box'] div[class$='check']>i").mouseleave(function(){       
            $(this).css("color","#fff");  
    });
}
function ifchecked(){
    $("#selectall").click(function(){
        allselect(this);
    });
    $("div[class='item-box'] div[class$='check']>i:not(#selectall)").click(function(){ 
        select(this);
    });
    selecthover();
}

function back_alert_show(){
    $("div[class^='allback']").removeClass("hide");
    $("div.goods-del-alert.hide").removeClass("hide");
    $("div.goods-del-alert").animate({top:'12%'},0.1);
}
function back_alert_hide(){
    $("div.goods-del-alert").animate({top:'-100%'},0.1);
    $("div[class^='allback']").delay(0.3).animate({opacity:0.5},function(){
        $(this).addClass("hide");
    }); 
}
function alert(thisobj){
    back_alert_show();
    $("div[class^='allback']").on('click',function(){
        back_alert_hide();
    });
    $("div.goods-del-alert button:eq(0)").on('click',function(){
        back_alert_hide();
    });
    $("div.goods-del-alert a").on('click',function(){
        back_alert_hide();
    });
    $("div.goods-del-alert button:eq(1)").on('click',function(){
        back_alert_hide(); 
        thisobj.remove();
        
        $("div.list-body div.item-sub-box div.extend-buy").css("display","block");
        
        var minlen=$(".list-body div.item-box").length;
        if(minlen<=1){
            $(".header-title>p").css("display","none");
            $(".cart-empty").removeClass("hide");
            $(".cart-box").addClass("hide"); 
            recommend_title();
        } 
        showbarnum();
    });

}

function ifdel(){
 //col-action
    $(".list-body div>.col-action").click(function(){
        var par=$(this).parent().parent();
         alert(par);
    }); 
}

function showbartip() {
    var checktotal =$("div.list-body div.item-box div#col-check i");
    var temp=1;
     if($("#selectall").hasClass("icon-checkbox-selected")){
         $("#no-select-tip").addClass("hide");
         $("div.list-body div[class$='post hide']").removeClass("hide");
         $("div.raise-buy-box.hide").removeClass("hide");
     }  
     else{
         checktotal.each(function(i,txt){
             if($(txt).hasClass("icon-checkbox-selected")){
                temp=0;
                $("#no-select-tip").addClass("hide");
             }
         });
         if(temp==1){
            $("#no-select-tip").removeClass("hide"); 
            $("div.list-body div[class$='post']").addClass("hide");
            $("div.raise-buy-box").addClass("hide");
         }      
     }
}
function showbarnum(){
    //bartotalpricenode is <span class="total-price">
    var bartotalpricenode =$("div[class^='cart-bar'] .total-price>em");   
    // bartotalfirsti and bartotalsecondi is <i>1</i>件商品，已选择 <i>1</i>
    var bartotalfirsti=$("div[class^='cart-bar'] div.section-left span i:eq(0)");
    var bartotalsecondi=$("div[class^='cart-bar'] div.section-left span i:eq(1)");
    //获取每一个item-box中的小计
    var colsum =$("div.list-body div.item-box div[class$='col-total']");
    //获取每一个item-box中的数量
    var colnum =$("div.list-body div.item-box div[class$='col-num'] input");  
    var goodsum =0;
    var goodnum =0;
    var checknum =0;
    

    colsum.each(function(i,val){ 
        var check = $(this).prevAll("#col-check").children("i");  
        if(check.hasClass('icon-checkbox-selected') || check.hasClass('icon-checkbox-show')){
            goodsum = goodsum + parseFloat($(val).text());
        }
    });
    colnum.each(function(i,txt){
        var check = $(this).parent('div.change-goods-num').parent('div.col-num').prevAll("#col-check").children("i");
        goodnum =goodnum + parseInt($(txt).val());
        if(check.hasClass('icon-checkbox-selected') || check.hasClass('icon-checkbox-show')){
            checknum = checknum + parseInt($(txt).val());
            
        }
    });

    
    $(bartotalpricenode).html(goodsum.toFixed(2));
    $(bartotalfirsti).html(goodnum);
    $(bartotalsecondi).html(checknum);

}

function recommend_hover(){
        
//xm-recommend xm-recommend-tips 
    $(".xm-recommend li").hover(function(){     
          $(".xm-recommend-tips>a").removeClass("btn-primary");  
          $(".xm-recommend-tips>a").addClass("btn-inprimary");
          $(".xm-recommend-tips>a").css("display","block"); 
        
          $(".xm-recommend-tips>a ").hover(function(){
              $(".xm-recommend-tips>a").removeClass("btn-inprimary"); 
              $(".xm-recommend-tips>a").addClass("btn-primary");
          });
          $(".xm-recommend-tips>a ").mouseleave(function(){
              $(".xm-recommend-tips>a").removeClass("btn-primary"); 
              $(".xm-recommend-tips>a").addClass("btn-inprimary");
          });
          
     });
     $(".xm-recommend li").mouseleave(function(){
          $(".xm-recommend-tips>a").css("display","none"); 
     });

}
function xm_recommend_append(){
    $("div.xm-recommend li dd.xm-recommend-tips a").click(function(){
        
        var parentdiv=$('<div></div>');        //创建一个父div
        parentdiv.addClass('item-box');    //添加css样式
        var childdiv=$('<div></div>');        //创建一个子div
        childdiv.addClass('item-table');    //添加css样式
        childdiv.appendTo(parentdiv);        //将子div添加到父div中

        var postnode=$("div.item-box.post");
        if($("div.item-box").length>0){
            postnode.before( parentdiv); 
        }
        else
        parentdiv.appendTo('div.list-body');  


        var child1=$('<div></div>');
        child1.attr('id','col-check');        //给div设置id
        child1.addClass('col col-check');  
        var child2=$('<div></div>');
        child2.addClass('col col-img');
        var child3=$('<div></div>');
        child3.addClass('col col-name');
        var child4=$('<div>25元</div>');  //动态获取单价
        child4.addClass('col col-price');
        var child5=$('<div></div>');
        child5.addClass('col col-num');
        var child6=$('<div>25元</div>');   //动态计算总价
        child6.addClass('col col-total');
        var child7=$('<div></div>');
        child7.addClass('col col-action');
        child1.appendTo( childdiv);
        child2.appendTo( childdiv);
        child3.appendTo( childdiv);
        child4.appendTo( childdiv);
        child5.appendTo( childdiv);
        child6.appendTo( childdiv);
        child7.appendTo( childdiv);

        var child1_par=$('<i></i>');
        child1_par.addClass('iconfont icon-checkbox icon-checkbox-selected');
        var child1_cld=$('<i>&#xe626;</i>');
        child1_cld.addClass('iconfont icon-hook');
        child1_par.appendTo(child1);
        child1_cld.appendTo(child1_par);


        var child2_par=$('<a></a>');
        child2_par.attr('href','#');
        child2_par.attr('target','_blank');
        var child2_cld=$('<img src="../img/item_table_img_1.jpg" width="80px" height="80px"/>'); //动态获取src
        child2_par.appendTo(child2);
        child2_cld.appendTo(child2_par);



        var child3_h3par=$('<h3></h3>');
        child3_h3par.addClass('name');
        var child3_h3cdl=$('<a  href="#" target="_blank" >小米手环2腕带 绿色</a>');//动态获取文字内容
        child3_h3par.appendTo(child3);
        child3_h3cdl.appendTo(child3_h3par);

        var child5_divpar=$('<div></div>');
        child5_divpar.addClass('change-goods-num');
        var child5_divpar_cld1=$('<a></a>');
        child5_divpar_cld1.addClass('minus');
        var child5_divpar_cld2=$('<input type="text" value="1"/>');
        var child5_divpar_cld3=$('<a></a>');
        child5_divpar_cld3.addClass('plus');
        child5_divpar.appendTo(child5);
        child5_divpar_cld1.appendTo(child5_divpar);
        child5_divpar_cld2.appendTo(child5_divpar);
        child5_divpar_cld3.appendTo(child5_divpar);
        var child5_divpar_cld1i=$('<i></i>');
        child5_divpar_cld1i.addClass('fa fa-minus');
        var child5_divpar_cld3i=$('<i></i>');
        child5_divpar_cld3i.addClass('fa fa-plus');
        child5_divpar_cld1i.appendTo(child5_divpar_cld1);
        child5_divpar_cld3i.appendTo(child5_divpar_cld3);
        var child5_ppar=$('<p></p>');
        child5_ppar.addClass('col-num-p');
        child5_ppar.appendTo(child5);
    
        

        var child7_par=$('<a></a>');
        child7_par.addClass('del');
        var child7_cld=$('<i>&#xe643;</i>');
        child7_cld.addClass('iconfont');
        child7_par.appendTo(child7);
        child7_cld.appendTo(child7_par);
        
        //on click
        child1_par.on('click',function(){
            select(this);
            selecthover();
        });
        
        child5_divpar_cld1.on('click',function(){
            minus(this);
        });
        child5_divpar_cld3.on('click',function(){
            plus(this);
        });
        child7.on('click',function(){
            var thispar=$(this).parent().parent();
            alert(thispar);
        });
        if($("div[class^=cart-box]").hasClass('hide')){
            $(".header-title>p").css("display","block");
            $(".cart-empty").addClass("hide");
            $(".cart-box").removeClass("hide");
            recommend_title();
            init();
        }
        showbarnum();
    });
}

function raise_buy_box_append(){
    var parentdiv=$('<div></div>');        //创建一个父div
    parentdiv.addClass('item-box');    //添加css样式
    var childdiv=$('<div></div>');        //创建一个子div
    childdiv.addClass('item-table');    //添加css样式
    childdiv.appendTo(parentdiv);        //将子div添加到父div中
    
    var postnode=$("div.item-box.post");
    if($("div.item-box").length>0){
        postnode.before( parentdiv); 
    }
    else
        parentdiv.appendTo('div.list-body');

    var child1=$('<div></div>');
    child1.attr('id','col-check');        //给div设置id
    child1.addClass('col col-check');  
    var child2=$('<div></div>');
    child2.addClass('col col-img');
    var child3=$('<div></div>');
    child3.addClass('col col-name');
    var child4=$('<div>25元</div>');  //动态获取单价
    child4.addClass('col col-price');
    var child5=$('<div></div>');
    child5.addClass('col col-num');
    var child6=$('<div>25元</div>');   //动态计算总价
    child6.addClass('col col-total');
    var child7=$('<div></div>');
    child7.addClass('col col-action');
    child1.appendTo( childdiv);
    child2.appendTo( childdiv);
    child3.appendTo( childdiv);
    child4.appendTo( childdiv);
    child5.appendTo( childdiv);
    child6.appendTo( childdiv);
    child7.appendTo( childdiv);

    var child1_par=$('<i></i>');
    child1_par.addClass('iconfont icon-checkbox-show');
    var child1_cld=$('<i>&#xe626;</i>');
    child1_cld.addClass('iconfont icon-hook');
    child1_par.appendTo(child1);
    child1_cld.appendTo(child1_par);


    var child2_par=$('<a></a>');
    child2_par.attr('href','#');
    child2_par.attr('target','_blank');
    var child2_cld=$('<img src="../img/item_table_img_1.jpg" width="80px" height="80px"/>'); //动态获取src
    child2_par.appendTo(child2);
    child2_cld.appendTo(child2_par);

    var child3_divpar=$('<div></div>');
    child3_divpar.addClass('tags');
    var child3_divcdl=$('<span>加价购</span>');
    child3_divcdl.addClass('tag tag-orange');
    child3_divpar.appendTo(child3);
    child3_divcdl.appendTo(child3_divpar);
    var child3_h3par=$('<h3></h3>');
    child3_h3par.addClass('name');
    var child3_h3cdl=$('<a  href="#" target="_blank" >小米手环2腕带 绿色</a>');//动态获取文字内容
    child3_h3par.appendTo(child3);
    child3_h3cdl.appendTo(child3_h3par);

    var child5_divpar=$('<div></div>');
    child5_divpar.addClass('change-goods-num');
    var child5_divpar_cld1=$('<a></a>');
    child5_divpar_cld1.addClass('minus');
    var child5_divpar_cld2=$('<input type="text" value="1"/>');
    var child5_divpar_cld3=$('<a></a>');
    child5_divpar_cld3.addClass('plus');
    child5_divpar.appendTo(child5);
    child5_divpar_cld1.appendTo(child5_divpar);
    child5_divpar_cld2.appendTo(child5_divpar);
    child5_divpar_cld3.appendTo(child5_divpar);
    var child5_divpar_cld1i=$('<i></i>');
    child5_divpar_cld1i.addClass('fa fa-minus');
    var child5_divpar_cld3i=$('<i></i>');
    child5_divpar_cld3i.addClass('fa fa-plus');
    child5_divpar_cld1i.appendTo(child5_divpar_cld1);
    child5_divpar_cld3i.appendTo(child5_divpar_cld3);
   
    var child5_ppar=$('<p></p>');
    child5_ppar.addClass('col-num-p');
    child5_ppar.appendTo(child5);

    var child7_par=$('<a></a>');
    child7_par.addClass('del');
    var child7_cld=$('<i>&#xe643;</i>');
    child7_cld.addClass('iconfont');
    child7_par.appendTo(child7);
    child7_cld.appendTo(child7_par);
    
     //on click
    child5_divpar_cld1.on('click',function(){
        minus(this);
    });
    child5_divpar_cld3.on('click',function(){
        plus(this);
    });
    child7.on('click',function(){
        var thispar=$(this).parent().parent();
        alert(thispar);
        var raise_buy_box=$("div.raise-buy-box div:hidden");
        console.log(raise_buy_box);
        raise_buy_box.css("display","flex");
    });
}

function model_init(){
    $("div[class^='modal'] div.modal-body li i").removeClass("other");
    $("div[class^='modal'] div.modal-body li i").removeClass("icon-radio");
    $("div[class^='modal'] div.modal-body li i").addClass("icon-radio"); 
    $("div[class^='modal'] div.modal-body li i").css("background-color"," #fff");
    $("div.modal-footer a").removeClass("btn-primary");
    $("div.modal-footer a").removeClass("btn-gray");
    $("div.modal-footer a").addClass("btn-gray");
}
function model(){
    
    //on
    $("div[class^='modal'] div.modal-body li").on('mouseover',function(){  
        var inode=$(this).children('i');
        if( inode.is(".icon-radio")){   
            inode.css("background-color","#e0e0e0");
        } 
    });
    $("div[class^='modal'] div.modal-body li").on('mouseout',function(){
        var inode=$(this).children('i');
        if( inode.is(".icon-radio")){
            inode.css("background-color","#fff");
        } 
    });
    
    
    $("div[class^='modal'] div.modal-body li i").on('click',function(){
         var modalfoot=$(this).parent().parent().parent().next().children('a');
         if($(this).hasClass("icon-radio")){
            $(this).removeClass("icon-radio");
            $(this).addClass("other");
            $(this).css("background-color"," #ff6700");
            modalfoot.addClass("btn-primary");
         }
         else{
            $(this).addClass("icon-radio");
            $(this).removeClass("other"); 
            $(this).css("background-color"," #e0e0e0");
            modalfoot.removeClass("btn-primary");
         }
    });
    $("div[class^='modal'] div.modal-header span").on('click',function(){
        $("div[class^='modal']").animate({top:'-50%'},0.1); $("div[class^='allback']").delay(0.3).animate({opacity:0.5},function(){
                $(this).addClass("hide");
        }); 
    });
    $("div.modal-footer a").on('click',function(){
        if($(this).hasClass("btn-primary")){
            $("div[class^='modal']").animate({top:'-50%'},0.1); $("div[class^='allback']").delay(0.3).animate({opacity:0.5},function(){
                $(this).addClass("hide");
            }); 
            raise_buy_box_append();
            var raise_buy_box=$("div.raise-buy-box div");
            raise_buy_box.each(function(i,thisdiv){   
                if($(thisdiv).hasClass("check")){
                    
                    $(thisdiv).removeClass("check");
                    $(thisdiv).css("display","none");
                }
            });
            showbarnum();
        }
    });
}
function modle_choose(){
//raise-buy-box
    $("div.raise-buy-box div").click(function(){
        //show
        $(this).addClass("check");
        $("div[class^='allback']").removeClass("hide");
        $("div[class^='modal']").removeClass("hide");
        $("div[class^='modal']").animate({top:'50%'},0.1);
        model_init();
    });
    model();
}
function change_item_sub_box(){
//item-sub-box
    $("div.list-body div.item-sub-box div.extend-buy").click(function(){
        var thisobj = $(this);
        var par= thisobj.parent();
        thisobj.css("display","none");
        
        var parentdiv=$('<div></div>');        //创建一个父div
        parentdiv.addClass('item-table');    //添加css样式
        parentdiv.appendTo(par);  
        
        var child2=$('<div></div>');
        child2.addClass('col col-img');
        var child3=$('<div></div>');
        child3.addClass('col col-name');
        var child4=$('<div>14.9元</div>');  //动态获取单价
        child4.addClass('col col-price');
        var child5=$('<div>1</div>');
        child5.addClass('col col-num');
        var child6=$('<div>14.9元</div>');   //动态计算总价
        child6.addClass('col col-total');
        var child7=$('<div></div>');
        child7.addClass('col col-action');
        var child8 =$('<i></i>');
        child8.addClass('arrow');
        
        child2.appendTo( parentdiv);
        child3.appendTo( parentdiv);
        child4.appendTo( parentdiv);
        child5.appendTo( parentdiv);
        child6.appendTo( parentdiv);
        child7.appendTo( parentdiv);
        child8.appendTo( parentdiv);



        var child2_par=$('<a href="#" target="_blank"></a>');
        var child2_cld=$('<img src="../img/item_table_img_2.jpg" width="60px" height="60px"/>'); //动态获取src
        child2_par.appendTo(child2);
        child2_cld.appendTo(child2_par);



        var child3_divpar=$('<div></div>');
        child3_divpar.addClass('tags');
        var child3_divcdl=$('<span>加价购</span>');
        child3_divcdl.addClass('tag tag-orange');
        child3_divpar.appendTo(child3);
        child3_divcdl.appendTo(child3_divpar);
        var child3_h3par=$('<h3></h3>');
        child3_h3par.addClass('name');
        var child3_h3cdl=$('<a  href="#" target="_blank" >小米手环2腕带 绿色</a>');//动态获取文字内容
        child3_h3par.appendTo(child3);
        child3_h3cdl.appendTo(child3_h3par);

        var child7_par=$('<a></a>');
        child7_par.addClass('del');
        var child7_cld=$('<i>&#xe643;</i>');
        child7_cld.addClass('iconfont');
        child7_par.appendTo(child7);
        child7_cld.appendTo(child7_par);
        //on click
        child7.on('click',function(){
            var thispar=$(this).parent();
            alert(thispar);
        });
        //barnum
        //bartotalpricenode is <span class="total-price">
        var bartotalpricenode =$("div[class^='cart-bar'] .total-price>em");   
        // bartotalfirsti and bartotalsecondi is <i>1</i>件商品，已选择 <i>1</i>
        var bartotalfirsti=$("div[class^='cart-bar'] div.section-left span i:eq(0)");
        var bartotalsecondi=$("div[class^='cart-bar'] div.section-left span i:eq(1)");
        var thisprice=$(child4).text(); 
        var goodsum = parseFloat(bartotalpricenode.text())+parseFloat(thisprice);
        var goodnum = parseInt(bartotalfirsti.text())+1;
        var checknum =parseInt(bartotalsecondi.text())+1;
      
        
        $(bartotalpricenode).html(goodsum.toFixed(2));
        $(bartotalfirsti).html(goodnum);
        $(bartotalsecondi).html(checknum);
        
    });
}


































# MICopyer
## 内容
模仿小米商城页面
## 成员


<table>
    <tr>
        <th>姓名</th>
        <th>任务</th>
    </tr>
    <tr>
        <td>林海瑞（组长）</td>
        <td>公共文件的编写,数据处理,js编写</td>
    </tr>
    <tr>
        <td>滕飞</td>
        <td>完成主页框架编写，商品页面编写</td>
    </tr>
    <tr>
        <td>杨贺晨吉</td>
        <td>完成购物车的编写</td>
    </tr>
    <tr>
        <td>庄子遥</td>
        <td>完成商品页面的编写</td>
    </tr>
    <tr>
        <td>孔志鹏</td>
        <td>完成用户注册和登录的界面编写</td>
    </tr>
</table>

****
## 功能：
1.实现www.mi.com主页<br/>
2.实现用户的注册与登录<br/>
4.实现两个商品页面和一个购物车页面<br/>
3.实现单个用户的购物车的添加与删除<br/>
## 数据表：
数据库名称：xiaomi
 1.用户数据表 users：
<table><tr><th>字段名称</th><th>类型</th></tr><tr><td>account</td><td>varchar(20)</td></tr><tr><td>password</td><td>varchar(20)</td></tr></table>
2.用户购物车数据表 usergoods：
<table><tr><th>字段名称</th><th>类型</th></tr><tr><td>username</td><td>varchar(20)</td></tr><tr><td>goodsid</td><td>int</td></tr><tr><td>num</td><td>int</td></tr><tr><td>gettype</td><td>varchar(20)</td></tr></table>

##文件说明：
因为在最后的一点的时间里各个成员递交的代码杂乱，没有时间做整合工作，所以独立了出来三个文件夹；
<table><tr><th>文件夹</th><th>作用</th></tr><tr><td>tf</td><td>入口文件夹，包含了主页和两个商品页面</td></tr><tr><td>car1</td><td>购物车页面</td></tr><tr><td>web</td><td>用户登录和注册页面</td></tr></table>
使用时将三个文件夹放在根目录下即可使用。

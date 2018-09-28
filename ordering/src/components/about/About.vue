<template>
	<div class="about">
		<div class="nav-list">
			<ul>
				<router-link v-on:click.native="changActive($event)"  tag="li" to="/about/Deliver">新闻</router-link>
				<router-link v-on:click.native="changActive($event)"  tag="li" to="/about/Contact" id="active">联系我们</router-link>
				<router-link v-on:click.native="changActive($event)"  tag="li" to="/about/orderingGuide">点餐文档</router-link>
				<router-link v-on:click.native="changActive($event)" tag="li" to="/about/History">历史订单</router-link>
		    </ul>
		</div>
		<div class="nav-item">
			<router-view></router-view>
	<!-- 		<Contact></Contact> -->
		</div>
	</div>
</template>

<script type="text/javascript">
	import Contact from '../about/Contact'
	import Deliver from '../about/Deliver'
	import History from '../about/History'
	import orderingGuide from '../about/orderingGuide'
	export default{
		name: "about",
		components:{
			Contact,Deliver,History,orderingGuide
		},
		methods:{
			changActive:function (event) {
				var li=document.getElementsByTagName('li');
				for (var i = li.length - 1; i >= 0; i--) {
					li[i].id="";
				}
				event.target.id="active";
			}
		}
	}
</script>

<style type="text/css" scoped="">
	.about{
		position: relative;
		/*margin: 10px 10px;*/
		/*overflow: hidden;*/
	}
	.nav-list{
		position: absolute;
        width: 40%;
		left: 0;
		height: auto;margin: 10px 10px;
	}
	.nav-list li{
        margin-bottom: 15px;
        padding: 10px 15px;
        width: 310px;
        background: white;
        border:1px lightgray solid;
        border-radius: 5px;
        cursor: pointer;
	}
	#active{
		background: #f8f9fa;
	}
	a{
        color: black;
	}
	a:hover{
		text-decoration-line: none;
	}
	.nav-item{
		
		position: absolute;
		right: 0;
        border:1px lightgray solid;
        width: 60%;
        margin-top: 10px;
        border-radius: 5px;
	}

</style>
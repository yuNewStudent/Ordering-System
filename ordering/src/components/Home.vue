<template>
	<div class="home row">
		<div id="home" class="col-sm-12 text-center">
			<div class="background">
				<h1>欢迎大家品尝pizza!</h1>
				<h2>这里有你非常喜欢的pizza</h2>
			    <!-- 通过点击来改变路由 -->
		        <button @click="changePath" class="btn">Let's Order!</button>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name:"home",
		methods:{
			changePath:function () {
				//返回历史列表中的前一个页面
				// this.$router.go(-1);  

				// this.$router.replace("/Menu");
				// this.$router.replace({name:"Admin"});


				// this.$router.push({name:"Admin"});
				this.$router.push("/Menu");
			}
		}
	}
</script>

<style type="text/css" scoped>
	#home{
		background: url('.././assets/pizza.jpg') no-repeat ;
		/*background-size: cover; */
		height: 100vh;
	}
	.background{
		background: rgba(255,255,255,.7);
		margin: 100px 100px;
		padding: 20px;
	}
	h1,h2{
		margin: 50px 0;
	}
	button{
		padding: 5px;
		border-radius: 5px;
		border:none;
		background: rgba(60, 133, 48,.7);
		color: white;
		cursor: pointer;
	}
</style>
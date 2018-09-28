<template>
	<div class="login">
		<div class="icon">
			<img src=".././assets/icon.png">
		</div>
		<form  @submit.prevent="onSumbit()">
			<div class="form-group">
				<label for="email">邮箱</label>
			    <input type="text" name="email" v-model="email">
			</div>

			<div class="form-group">
				<label for="password">密码</label>
				<input type="password" name="password" v-model="password">
			</div>

			<div class="form-group">
			    <input type="submit" name="submit" value="登录">
			</div>
		</form>
	</div>
</template>

<script type="text/javascript">

	import axios from 'axios'

	export default {
		name:"login",
		data(){
			return {
				email:"",
				password:"",
				userItems:[]
			}
		},
        
        //组件内守卫
		beforeRouteEnter:function(to,from,next){
			next(function(vm){
				vm.$store.dispatch("setUser",null);
			})
		},

		//登录页面
		methods:{
            onSumbit:function () {
            	axios.get("users.json").then((res)=>{
            		var users=res.data;
            		for (let key in users){
            			if (this.email==users[key].email&&this.password==users[key].password) {
            				alert("登录成功");
            				this.$store.dispatch("setUser",this.email);
            				this.$router.replace("/");
            			    return
            			}
            		}
            	    alert("账号或密码错误");
            	    this.$store.dispatch("setUser",null);
            	});
            }
		}
	}
</script>

<style type="text/css" scoped="">
	.login{
		margin-top: 10px;
		border-radius: 5px;
		border: 1px solid rgba(128, 128, 128,.5);
	}
	.icon{
		text-align: center;
		margin-top: 20px;
	}
	.form-group{
		margin: 0 20px;
	}
	.form-group:nth-child(2){
		margin: 10px 20px;
	}
	label{
		display: block;
	}
	input{
		display: block;
		width: 100%;
		border-radius: 5px;
		border: 1px solid rgba(128, 128, 128,.5);
		padding: 5px;
	}
	input[type="submit"]{
		background: #1d9636;
		color: white;
		margin: 20px 0;
	}
</style>
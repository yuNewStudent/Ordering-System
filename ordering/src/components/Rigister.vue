<template>
	<div class="rigister">
		<div class="icon">
			<img src=".././assets/icon.png">
		</div>
		<form @submit.prevent="onSumbit()">
			<div class="form-group">
				<label for="email">邮箱</label>
			    <input type="text" name="email" v-model="email" @blur="showErrorEmail" placeholder="邮箱" @focus="restEmail">
			    <span class="errorEmail" v-if="errorEmail">请输入正确的邮箱</span>
			</div>

			<div class="form-group">
				<label for="password">密码</label>
				<input type="password" name="password" v-model="password" placeholder="密码" @blur="showErrorPassword" @focus="restPassword">
				<span class="errorPassword" v-if="errorPassword">请输入6-10的字母和数字</span>
			</div>

			<div class="form-group">
				<label for="password">确认密码</label>
				<input type="password" name="comfirmPassword" v-model="comfirmPassword" placeholder="确认密码" @blur="showErrorComfirmPassword" @focus="restErrorComfirmPassword">
				<span class="errorComfirmPassword" v-if="errorComfirmPassword">两次密码不一致</span>
			</div>

			<div class="form-group">
			    <input type="submit" name="submit" value="注册">
			</div>
		</form>
	</div>
</template>

<script type="text/javascript">
	import axios from 'axios'
	export default {
		name:"rigister",
		data(){
			return {
				email:"",
				password:"",
				comfirmPassword:"",
				errorComfirmPassword:false,
				errorEmail:false,
				errorPassword:false
			}
		},
		methods:{
			showErrorEmail(){
				//正则表达式匹配邮箱输入是否正确
				let reg=/^[0-9a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
				if (this.email.match(reg)) {
					return
				}else{
					this.errorEmail=true;        
				}
			},
			restEmail(){
                    this.errorEmail=false;
			},
			showErrorPassword(){
				let reg=/^\S{6,12}/;
				if (this.password.match(reg)) {
					return 
				}
				this.errorPassword=true;
			},
			restPassword(){
				this.errorPassword=false;
			},
			showErrorComfirmPassword(){
				if (this.comfirmPassword==this.password) {
					return
				}
				this.errorComfirmPassword=true;
			},
			restErrorComfirmPassword(){
				this.errorComfirmPassword=false;
			},


            onSumbit:function () {

            	//判断密码是否一致
            	if (!(this.errorComfirmPassword||this.errorEmail||this.errorPassword)&&(this.email&&this.password&&this.comfirmPassword)) {
            		const formData={
            			email:this.email,
            			password:this.password,
            			comfirmPassword:this.comfirmPassword
            		};

            		//使用axios传输数据
            		axios.post('users.json',formData).then((data)=>{
            			alert("注册成功");

            			this.$router.replace("/Login");//跳转至登录页面
            		})
            	}
            }
		}
	}
</script>

<style type="text/css" scoped>
	.rigister{
		margin-top: 10px;、
		border-radius: 5px;
		border: 1px solid rgba(128, 128, 128,.5);
	}
	.icon{
		text-align: center;
		margin-top: 20px;
	}
	.form-group{
		margin: 0 20px;
		position: relative;
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

	.errorEmail,.errorPassword,.errorComfirmPassword{
       position: absolute;
       right: 10px;
       bottom: 7px;
       display: inline-block;
       color: red;
	}
</style>
<template>
	<div class="admin">
		<div class="fl newPizza">
			<h3>添加新的pizza</h3>
			<!-- new piiza -->
			<form>
				<p><label for="pizzaName">品种</label><input v-model="newPizza.name" type="text" name="pizzaName"></p>
				<p><label for="description">描述</label><textarea v-model="newPizza.description" name="description" rows="5"></textarea></p>
				<p><b>选项1:</b></p>
				<p><label for="pizzaOnesize">尺寸</label><input v-model="newPizza.size1" type="text" name="pizzaOnesize"></p>
				<p><label for="pizzaOneprice">价格</label><input v-model="newPizza.price1" type="text" name="pizzaOneprice"></p>
                <p><b>选项2:</b></p>
				<p><label for="pizzaOnesize">尺寸</label><input v-model="newPizza.size2" type="text" name="pizzaTwosize"></p>
				<p><label for="pizzaTwoprice">价格</label><input v-model="newPizza.price2" type="text" name="pizzaTwoprice"></p>
				<p class="addPizza"><button class="addPizzaBtn" @click.prevent="addPizza">添加</button></p>
			</form>
		</div>
		<div class="fr PizzaList" >
			<h3>菜单</h3>
			<table>
				<thead>
					<tr>
						<td class="piizaName">品种</td>
						<td>删除</td>
					</tr>
				</thead>
				<tbody v-for="getMenuItem in getMenuItems">
					<tr>
						<td class="piizaName">{{getMenuItem.name}}</td>
						<td><button class="removePizzaItem" @click.prevent="removePizzaItem(getMenuItem)">x</button></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script type="text/javascript">
	import axios from "axios"
	export default {
		name:"admin",
		data(){
			return {
				newPizza:{},
				// getMenuItems:[]
			}
		},

		computed:{
			getMenuItems:{
				get(){
					return this.$store.state.menu.getMenuItems;
					// console.log(this.$store.state.getMenuItems);
				},
				set(){

				}
			}
		},

		methods:{
			addPizza(){
				var pizzaDatas={};
				pizzaDatas.name=this.newPizza.name,
				pizzaDatas.description=this.newPizza.description,
				pizzaDatas.options=[
				    {size:this.newPizza.size1,price:this.newPizza.price1},
				    {size:this.newPizza.size2,price:this.newPizza.price2}
				];
				
                //向数据库内新增pizza种类
                axios.post("newPizza.json",pizzaDatas).then(data=>{
                	// this.$router.push({"name":"Menu"});
                	this.$store.commit("addMenuItem",pizzaDatas);
                });
 
			},

			//删除菜单内的pizza
			removePizzaItem(getMenuItem){
				axios.delete("newPizza/"+getMenuItem.id+".json").then(()=>{
                     this.$store.commit("removeMenueItem",getMenuItem);
				});
			}
		},

		//从数据库里加载所有菜单内pizza
		created:function () {
			// axios.get("newPizza.json").then(res=>{
			// 	return res.data
			// }).then(data=>{
			// 	// console.log(data)
			// 	let menuArray=[];
			// 	for(let key in data){
			// 		data[key].id=key;
			// 		menuArray.push(data[key]);
			// 	}
			// 	this.getMenuItems=menuArray;
			// })
		}
	}
</script>

<style type="text/css" scoped="">
	.newPizza{
		width: 70%;
		font-size: 14px;
	}
	.PizzaList{
		width: 25%;
	}
	h3{
		margin: 30px 0;
	}
	table{
		width: 100%;
	}
	td{
		padding: 5px;
	}
	thead tr{
	    border-top: 1px solid rgba(128, 128, 128, .5);

	}
	tbody tr{
		border-top: 1px solid rgba(128, 128, 128, .7);
	}
	.piizaName{
		width:70%;
	}
	.removePizzaItem{
		width: 22px;
		background: transparent;
		color: red;
		outline: none;
		cursor: pointer;
		border-radius: 5px;
		border: none;
	}
	label{
		vertical-align: top;
		display: inline-block;
	}
	input,textarea{
		width: 90%;
        border-radius: 5px;
        border: 1px solid rgba(128, 128, 128, .5);
		display: inline-block;
		margin-left: 20px;
		padding: 5px;
	}
	p{
		margin-bottom: 10px;
	}
	.addPizza{
		text-align: center;
	}
	.addPizzaBtn{
		width:90%;
		color: white;
		background: rgba(0, 158, 0, 1);
		padding: 5px;
		outline: none;
		cursor: pointer;
		border-radius: 5px;
		border: none;
	}
</style>
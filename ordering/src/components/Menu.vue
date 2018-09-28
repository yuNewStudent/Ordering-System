<template>
	<div class="menu" style="overflow: hidden">
		<div class="menu-box fl">
			<table>
				<thead>
					<tr>
						<td>尺寸</td>
						<td>价格</td>
						<td>加入</td>
					</tr>
				</thead>
				<tbody v-for="getMenuItem in getMenuItems" :key="getMenuItem.name">
					<tr class="pizza-name">
						<td colspan="3"><strong>{{getMenuItem.name}}</strong></td>
					</tr>
					<tr v-for="pizzaOption in getMenuItem.options">
						<td class="pizza-size">{{pizzaOption.size}}寸</td>
						<td class="pizza-price">{{pizzaOption.price}}</td>
						<td><button @click.prevent="addOption(getMenuItem,pizzaOption)" class="addChart">+</button></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="chart-box fr">
			<div v-if="pizzaOptionItems.length>0">
				<table>
					<thead>
						<tr>
							<td>品种</td>
							<td>尺寸</td>
							<td>价格</td>
							<td>数量</td>
					    </tr>
					</thead>
					<tbody v-for="pizzaOptionItem in pizzaOptionItems">
						<tr>
							<td>{{pizzaOptionItem.name}}</td>
							<td>{{pizzaOptionItem.size}}</td>
							<td>{{pizzaOptionItem.price}}</td>
							<td><button class="reducebtn" @click="reduceOptionItem(pizzaOptionItem)">-</button><span>{{pizzaOptionItem.quantity}}</span><button class="addbtn" @click="addOptionItem(pizzaOptionItem)">+</button></td>
						</tr>
					</tbody>
					<tfoot><tr>
						<td colspan="4">总价：<span>{{resultPrice}}</span>RMB</td>
					</tr></tfoot>
				</table>
				<button class="accountBtn">提交</button>
			</div>

		    <div v-else>购物车暂无商品</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import axios from "axios"
	export default {
		data:function(){
			return {
				name: "menu",
				pizzaOptionItems:[],

			}
		},
		computed:{

			resultPrice:function(){
				var resultPrice=0;
				for(let index in this.pizzaOptionItems){
					resultPrice+=this.pizzaOptionItems[index].price*this.pizzaOptionItems[index].quantity;
					// console.log(index);
				}
				return resultPrice;
			},

			//在vuex中获取数据
			getMenuItems(){
				return this.$store.state.menu.getMenuItems;
			}

			// getMenuItems:{
			// 	get(){
			// 		return this.$store.state.getMenuItems;
			// 		console.log(this.$store.state.getMenuItems);
			// 	},
			// 	set(){

			// 	}
			// }

		},
		methods:{

			//点击添加时，加至购物车
			addOption(getMenuItem,pizzaOption){
                

                //如果购物车已有商品，则需判断是否有相同的
				if (this.pizzaOptionItems.length>0) {
					for (var i = this.pizzaOptionItems.length - 1; i >= 0; i--) {

						//如果购物车商品的尺寸和名字相同，则只需增加数量
						if (this.pizzaOptionItems[i].name==getMenuItem.name&&this.pizzaOptionItems[i].size==pizzaOption.size) {
							this.pizzaOptionItems[i].quantity++;
							return
						}
					}

					//如果购物车商品的尺寸或名字不同，则在购物车内增加
					this.pizzaOptionItems.push({
							name:getMenuItem.name,
							price:pizzaOption.price,
		                    size:pizzaOption.size,
		                    quantity:1
						});
				}else{
					this.pizzaOptionItems.push({
						name:getMenuItem.name,
						price:pizzaOption.price,
	                    size:pizzaOption.size,
	                    quantity:1
					});
				}
				
				
			},

			updateMenuItem(){
				axios.get("newPizza.json").then(res=>{
					
					return res.data
				}).then(data=>{
					// console.log(data)
					let menuArray=[];
					for(let key in data){
						data[key].id=key;
						menuArray.push(data[key]);
					}
					this.$store.commit("setMenuItems",menuArray);
				})
			},

			//购物车内增加数量
			reduceOptionItem(pizzaOptionItem){
				pizzaOptionItem.quantity--
				if (pizzaOptionItem.quantity<=0) {
					this.removeOptionItem(pizzaOptionItem);
				}
			},
			//购物车内减少数量
			addOptionItem(pizzaOptionItem){
				pizzaOptionItem.quantity++
			},


			//当购物车内某商品数量为0时，从购物车内删除
			removeOptionItem:function(pizzaOptionItem){
                this.pizzaOptionItems.splice(this.pizzaOptionItems.indexOf(pizzaOptionItem),1);
			},
		},
		created(){
            this.updateMenuItem();
		}
		// beforeRouteEnter:(to,from,next)=>{
		// // 	next((vm)=>{
		// // 		alert("hello"+vm.name);
		// // 	})
		// // },
		// // // beforeRouteUpdate:(to,from,next)=>{
		// // // 	alert("我更新了吗");
		// // // },
		// // beforeRouteLeave:(to,from,next)=>{
		// // 	if (confirm("确定离开吗")) {
		// // 		next();
		// // 	}else{
		// // 		next(false);
		// // 	}
		// },
	}
</script>

<style type="text/css" scoped="">
	.menu-box{
		width: 60%;
	}
	table{
		width: 100%;
	}
	tr{
		border-top: 1px solid rgba(128, 128, 128, .3);
	}
	td{
		padding: 5px;
	}
	.pizza-name{
		border-top: 1px solid rgba(128, 128, 128, 1);
	}
	.pizza-size{
		width: 55%;
	}
    .addChart{
    	width: 25px;
    	height: 27px;
    	background: white;
    	color: #4caf50;
    	border:1px solid #4caf50;
    	border-radius: 5px;
    	outline: none;
    	cursor: pointer;
    }



    .chart-box{
    	width: 35%;
    }


    .accountBtn{
    	width: 100%;
    	color: white;
    	background: #4caf50;
    	padding: 5px;
    	outline: none;border-radius: 5px;
    	border:none;
    }

    .reducebtn,.addbtn{
    	border:none;
    	width: 15px;
    	background: transparent;
    	cursor: pointer;
    	outline: none;
    }
</style>
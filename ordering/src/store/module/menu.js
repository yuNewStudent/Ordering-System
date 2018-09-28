// export default const menu={

// }
const state={
   getMenuItems:[]
}

const getters={

}

const mutations={
	setMenuItems(state,data){
        state.getMenuItems=data;
	},
	addMenuItem(state,data){
		
        state.getMenuItems.push(data);
	},
	removeMenueItem(state,data){
		state.getMenuItems.forEach(function(item,index){
			if (item==data) {
				state.getMenuItems.splice(index,1);
			}
		});
	},
}

const actions={}

export default {
	state,
	getters,
	mutations,
	actions
}
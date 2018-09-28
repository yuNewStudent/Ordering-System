// export default const menu={

// }
const state={
    currentUser:null,
    isLogin:false
}

const getters={
	//获取属性
    currentUser:(state)=>{
        return state.currentUser;
    },
    isLogin: (state)=>{
        return state.isLogin;
    }
}

const mutations={
	
	setUser(state,user){
		if (user) {
			state.currentUser=user;
			state.isLogin=true;
		}else{
			state.currentUser=null;
			state.isLogin=false
		}
	}
}

const actions={
	setUser({commit},user){
        	commit("setUser",user);

        }
}

export default {
	state,
	getters,
	mutations,
	actions
}
import Vue from 'vue'
import Vuex from 'vuex'

import menu from './module/menu.js'
import status from './module/status.js'
import users from './module/users.js'

Vue.use(Vuex)

export const store=new Vuex.Store({
	modules:{
        menu,
        status,
        users
	}
})
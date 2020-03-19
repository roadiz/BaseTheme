import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '~/@types/store/root-state'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
    modules: {}
}

export default new Vuex.Store<RootState>(store)

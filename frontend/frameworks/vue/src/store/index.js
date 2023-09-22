import {createStore} from 'vuex'
import {mainModule} from './mainModule.js'

export default createStore({
   modules: {
       post: mainModule
   }
})

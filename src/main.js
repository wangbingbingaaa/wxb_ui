import Vue from 'vue'
import App from './App.vue'
import wxbUI from './components/index'

Vue.config.productionTip = false
Vue.use(wxbUI)
new Vue({
    render: h => h(App),
}).$mount('#app')

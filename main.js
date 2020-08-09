// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { DataSet, DataView} from "vis-network"
import Network from "./components/Network.vue"
import "vis-network/styles/vis-network.css"

export { Network, DataSet, DataView}

Vue.component('network', Network);

import Vue from 'vue'
import App from './App.vue'
// import router from './router/index'
// import Chart from './emane/chartjs.vue'
import Phy from './emane/phy.vue'
import Mac from './emane/mac.vue'
import Transport from './emane/transport.vue'
import VueRouter from 'vue-router'
import Container from './emane/chartcontainer.vue'
import Cont from './emane/chartjs.vue'
import Home from './Home.vue'
import ChartJS from './emane/randomChart.vue'
import Increment from './components/incrementButton'

// Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {path: '/phy', component: Phy},
  {path: '/mac', component: Mac},
  {path: '/transport', component: Transport},
  {path: '/chartjs', component: Cont},
  {path: '/chart', component: ChartJS},
  {path: '/', component: Home}

]

const router = new VueRouter({
  routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
   data() {
    return {
      nodes: [
        {id: 1, label: 'circle', shape: 'circle'},
        {id: 2, label: 'ellipse', shape: 'ellipse'},
        {id: 3, label: 'database', shape: 'database'},
        {id: 4, label: 'box', shape: 'box'},
        {id: 5, label: 'diamond', shape: 'diamond'},
        {id: 6, label: 'square', shape:'square'},
        {id: 7, label: 'dot', shape:'dot'},
        {id: 8, label: 'triangle', shape: 'triangle'},
      ],
      edges: [
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 5, to: 6},
        {from: 5, to: 7},
        {from: 6, to: 8}
      ],
      options: {
        nodes: {
          borderWidth: 4
        },
        edges: {
          color: 'lightgray'
        }
      }
    }
  },
  counter: 0,
});

var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})

<!--
/*<template>
  <div id="app">
  <img alt="Vue logo" src="./assets/logo.png">
    <h1>Let's go somewhere!</h1>
    <h2>Layers stuff</h2>
    <input type="text" v-model="layerName" @keyup.enter="addLayer">
    <ul>
      <li v-for="layer of layers" :key="layers.id">
      {{layers.location}}
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
*/
-->

<template>
  <div class="wrapper">
    <h2>Vue app with vis-network to connect to Emane</h2>
    <button v-on:click="counter += 1">Add 1</button>
    <p>The button above has been clicked {{ counter }} times.</p>
    <network
      class="network"
      ref="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options">
      @click="networkEvent('click')"
      @double-click="networkEvent('doubleClick')"
      @oncontext="networkEvent('oncontext')"
      @hold="networkEvent('hold')"
      @release="networkEvent('release')"
      @select="networkEvent('select')"
      @select-node="networkEvent('selectNode')"
      @selectEdge="networkEvent('selectEdge')"
      @deselectNode="networkEvent('deselectNode')"
      @deselectEdge="networkEvent('deselectEdge')"
      @dragStart="networkEvent('dragStart')"
      @dragging="networkEvent('dragging')"
      @drag-end="networkEvent('dragStart')"
      @hover-node="networkEvent('hoverNode')"
      @hover-edge="networkEvent('hoverEdge')"
      @blur-node="networkEvent('blurNode')"
      @blur-edge="networkEvent('blurEdge')"
      @zoom="networkEvent('zoom')"
      @show-popup="networkEvent('showPopup')"
      @hide-popup="networkEvent('hidePopup')"
      @start-start-stabilizing="networkEvent('startStabilizing')"
      @stabilization-progress="networkEvent('stabilizationProgress')"
      @stabilization-iterations-done="networkEvent('stabilizationIterationsDone')"
      @stabilized="networkEvent('stabilized')"
      @resize="networkEvent('resize')"
      @init-redraw="networkEvent('initRedraw')"
      @before-drawing="drawBg"
      @after-drawing="networkEvent('afterDrawing')"
      @animation-finished="networkEvent('animationFinished')"
      @config-change="networkEvent('configChange')"
      @nodes-mounted="networkEvent('nodes-mounted')"
      @nodes-add="networkEvent('nodes-add')"
      @nodes-update="networkEvent('nodes-update')"
      @nodes-remove="networkEvent('nodes-remove')"
      @nodes-add="networkEvent('events-add')"
      @edges-update="networkEvent('edges-update')"
      @edges-remove="networkEvent"('edges-remove')
      </network>

      <counter>
        var counter ={ count:0 }
      </counter>

      <button v-on:click="addNode">Add Node</button>
      <button v-on:click="addEdge">Add Edge</button>
      <button v-on:click="resetNetwork">Reset Network</button>
      <button v-on:click="removeNode">Remove Node</button>
      <button v-on:click="removeEdge">Remove Edge</button>

      <div class="events">
        <p>
          Network Events:
          <br />
          {{networkEvents}}
        </p>
      </div>

      <div id="app">
        <network ref="network"
          :nodes="nodes"
          :edges="edges"
          :options:="options">
        </network>
      </div>

    </div>
</template>

<script>
  import { Network } from "vue-vis-network";

  let defNodes = [
    { id: 1, label: "Phy"},
    { id: 2, label: "Mac"},
    { id: 3, label: "Network", shape: "image", image: "ups.png", imagePadding:4, size:25},
    { id: 4, label: "Transport", shape: "image", image: "ups.png", imagePadding:{ top: 10, right: 15, bottom: 10}, shapeProperties: { useImageSize:true } },
    { id: 5, label: "Application", shape: "image", image: "device.svg", imagePadding:5, shapeProperties: { useImageSize: true } }

    ]

    let defEdges = [
      { id: 1, from: 1, to: 3 },
      { id: 2, from: 1, to: 2 },
      { id: 3, from: 2, to: 4 },
      { id: 4, from: 2, to: 5 },
      { id: 5, from: 3, to: 4}
    ]

    export default {
      data: () => ({
        networkEvents: "",
        network: {
          nodes: defNodes.slice(0),
          edges: defEdges.slice(0),
          options: {
            nodes: {
              shape: "circle",
              size: 24,
              color: {
                border: 'grey',

                highlight: {
                  border: 'black',
                  background: 'white'
                },
                hover: {
                  border: 'orange',
                  background: 'grey'
                }
              },
                font:{color:'black'},
                  shapeProperties: {
                  useBorderWithImage:true
              }
            }
          }
        }
      }),
      components: {
        Network
      },
      methods: {
        drawBg(ctx) {
          let mapBgWidth = document.getElementById("scream").width;
          let mapBgHeight = document.getElementById("scream").height;

          ctx.drawImage(
            document.getElementById("scream"),
            -mapBgWidth / 2,
            -mapBgHeight / 2
          );
        },
        networkEvent(eventName) {
          if ( this.networkEvents.length > 500) this.networkEvents = "";
          this.networkEvents += '${eventName},';
        },
        addNode() {
          const id = new Date().getTime();
          this.network.nodes.push({id, label: "New Node"});
      },
        addEdge() {
          const n1 = Math.floor(Math.random() * this.network.nodes.length);
          const n2 = Math.floor(Math.random() * this.network.nodes.length);
          this.network.edges.push({
            id: '${this.network.nodes[n1].id}-${this.network.nodes[n2].id}',
            from: this.network.nodes[n1].id,
            to: this.network.nodes[n2].id
          });
        },
        resetNetwork() {
          this.network = {
          nodes: defNodes.slice(0),
          edges: defEdges.slice(0),
          options: {}
          };
        },
        removeNode() {
          this.network.nodes.splice(0, 1);
        },
        removeEdge() {
          this.network.edges.splice(0, 1);
        }
    }
};
</script>

<style>
* {
  font-family: sans-serif;
}

.wrapper {
  padding: 20px 50px;
  text-align: center;
}
.events {
  text-align: left;
  height: 70px;
}
.network {
  height: 400px;
  border: 1px solid #ccc;
  margin: 5px 0;
}
</style>
<!---
/*
<script>
import axios from 'axios';

const baseURL = "http://localhost:3000/layers";
*/
/*
export default {
  name: "app",
  data () {
    return {
      layers: [],
      layerName: ''
    };
  },
  async created() {
    try {
      const res = await axios.get(baseURL);

      this.layers = res.data;
    } catch(e) {
      console.error(e);
    }
  },
  methods: {
    async addLayer() {
      const res = await axios.post(baseURL, {name: this.layerName});

      this.layers = [...this.layers, res.data];

      this.layerName = '';
    }
  }
};

</script>
*/
/*
<style>
//#app {
  //font-family: 'Avenir', Helvetica, Ariel,
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
  //color: #6c5ce7;
  //margin-top: 60px;
//}

ul{
    margin: 0px;
    padding: 0px;
}

li {
  list-style: none;
}
h1 {
  color: #a29bfe
}
</style>
*/
-->

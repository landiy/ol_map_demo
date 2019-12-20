import Vue from 'vue'
import Map from './Map'

const mapv = require('mapv')

window.mapv = mapv

new Vue({
  el: '#app',
  components: { Map },
  template: '<Map/>'
})

import Vue from 'vue'
import axios from 'axios'
import { backend } from '../api'

Vue.prototype.$axios = axios
Vue.prototype.$backend = backend

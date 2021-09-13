import Vue from 'vue';
import _ from 'lodash';
import 'jquery.qrcode';
import 'bootstrap/dist/css/bootstrap.min.css';
require('bootstrap-icons/font/bootstrap-icons.css');

import '@/styles/custom.css';
import App from '@/App.vue';
import router from '@/router/index.js'

Object.defineProperties(Vue.prototype, {
    '_': {
        value: _,
    }
});

var app = new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App/>',
    router,
});
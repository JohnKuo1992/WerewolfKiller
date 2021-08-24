import Vue from 'vue';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
require('bootstrap-icons/font/bootstrap-icons.css');

import '@/styles/custom.css';
import App from '@/App.vue';

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
});
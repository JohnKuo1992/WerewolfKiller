import Vue from 'vue'
import VueRouter from 'vue-router'
import hostSettingPage from "@/components/hostSettingPage.vue";
import HostPage from "@/components/hostPage.vue";

import GameRoom from '@/components/gameRoom.vue'
import Player from '@/components/player.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
            path: '/',
            component: hostSettingPage,
        },
        {
            path: '/gameRoom/:gameData',
            component: GameRoom,
        },
        {
            path: '/host/:hostData',
            component: HostPage,
        },
        {
            path: '/player/:playerData',
            component: Player,
        },
    ]
})
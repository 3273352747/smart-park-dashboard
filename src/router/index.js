import { createRouter,createWebHistory } from "vue-router"
import HomeView from '../views/HomeView.vue'
import DeviceView from '../views/DeviceView.vue'
import OverviewView from "../views/overviewView.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/devices',
            name: 'devices',
            component: DeviceView,
        },
        {
            path: '/overview',
            name: 'overview',
            component: OverviewView,
        },
    ],
})

export default router
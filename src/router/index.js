import { createRouter,createWebHistory } from "vue-router"
import HomeView from '../views/HomeView.vue'
import DeviceView from '../views/DeviceView.vue'
import OverviewView from "../views/OverviewView.vue"
import WorkOrderView from "../views/WorkOrderView.vue"
import DataQueryView from "../views/DataQueryView.vue"

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
        {
            path: '/work-order',
            name: 'work-order',
            component: WorkOrderView,
        },
        {
            path: '/data-query',
            name: 'data-query',
            component: DataQueryView,
        },
    ],
})

export default router
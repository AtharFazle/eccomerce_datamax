import { lazy, type ComponentType } from "react"
import type { LayoutType } from "../types/Layout.type"

export interface RouteInterface{
    path: string,
    component:ComponentType
    isProtected?:boolean,
    layout?:LayoutType
}

export const routes:RouteInterface[] = [
    {
        path:"/",
        component:lazy(() => import("@/components/pages/home")),
    },
    {
        path:"/login",
        component:lazy(() => import("@/components/pages/login")),
    },
    {
        path:"/register",
        component:lazy(() => import("@/components/pages/register")),
    },
    {
        path:"/dashboard",
        component:lazy(() => import("@/components/pages/dashboard")),
        isProtected:true
    },
    {
        path:"/transactions",
        component:lazy(() => import("@/components/pages/transactions")),
        isProtected:true
    },
    {
        path:"/packages",
        component:lazy(() => import("@/components/pages/packages")),
        isProtected:true
    },
    {
        path:"/payment-success",
        component:lazy(() => import("@/components/pages/payment-success")),
        isProtected:true
    },
    {
        path:"/payment-confirmation",
        component:lazy(() => import("@/components/pages/payment-confirmation")),
        isProtected:true
    },
    {
        path:"/packages/:id",
        component:lazy(() => import("@/components/pages/packages/page-detail")),
        isProtected:true
    },
    {
        path:"/checkout",
        component:lazy(() => import("@/components/pages/checkout")),
        isProtected:true
    },

]
export function route(route:RouteInterface){
    return route
}
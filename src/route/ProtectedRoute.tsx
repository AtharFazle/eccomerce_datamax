import React from 'react'
import { Navigate } from 'react-router-dom'
import type { LayoutType } from '../types/Layout.type'

type Props = {
    children: React.ReactNode,
    layout?:LayoutType
}

const ProtectedRoute = (props: Props) => {

    const isAuthenticated = () => {

        const token = localStorage.getItem('user')
        return !!token
    }

    // alert(isAuthenticated())

    if(!isAuthenticated()) {
        return <Navigate to="/login" replace />
    }else {
        if(props.layout) {
            return <props.layout>{props.children}</props.layout>
        }else {
            return <>{props.children}</>
        }
    }
}

export default ProtectedRoute
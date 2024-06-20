// import useContext
import React, { useContext } from "react"

// import context
import { AuthContext } from "../context/AuthContext"

// import react router dom
import { Routes, Route, Navigate } from "react-router-dom"

// import view home
import Home from "../views/home"

// import view register
import Register from "../views/auth/register"

// import view login
import Login from "../views/auth/login"
import Dashboard from "../views/admin/dashboard"
import UserIndex from "../views/admin/users/index"
import UserCreate from "../views/admin/users/create"
import UserEdit from "../views/admin/users/edit"

export default function AppRoutes(){
    // destructure context "isAuthenticated"
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <Routes>
            {/* route index */}
            <Route path="/" element={<Home />} />

            {/* route /register */}
            <Route path="/register" element={isAuthenticated ? <Navigate to={'/admin/dashboard'} replace /> : <Register /> } />

            {/* route /login */}
            <Route path="/login" element={isAuthenticated ? <Navigate to={'/admin/dashboard'} replace /> : <Login /> } />
            <Route path="/admin/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to={'/login'} replace /> } />
            <Route path="/admin/users" element={isAuthenticated ? <UserIndex /> : <Navigate to={'/login'} replace /> } />
            <Route path="/admin/users/create" element={isAuthenticated ? <UserCreate /> : <Navigate to={'/login'} replace /> } />
            <Route path="/admin/users/:id/edit" element={isAuthenticated ? <UserEdit /> : <Navigate to={'/login'} replace /> } />
        </Routes>
    )
}
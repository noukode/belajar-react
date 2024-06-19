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
        </Routes>
    )
}
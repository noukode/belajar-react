// import react dan hooks createContext, useState, dan useEffect
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";


//Membuat context untuk menyimpan status otentikasi
export const AuthContext = createContext()

//Membuat provider otentikasi dengan context yang dibuat sebelumnya
export const AuthProvider = ({ children }) => {
  // Menggunakan use state untuk menyimpan status otentikasi berdasarkan keberadaan token di cookies
  const [ isAuthenticated, setIsAuthenticated ] = useState(!!Cookies.get('token'))

  // Menggunakan useEffect untuk memantau perubahan pada token di cookies
  useEffect(() => {
    const handleTokenChange = () => {
      setIsAuthenticated(!!Cookies.get('token'))
    }

    // Menambahkan event listener pada storage untuk memantau perubahan pada token
    window.addEventListener('storage', handleTokenChange)

    // Mengembalikan sebuah fungsi yang akan dipanggil saat komponen di-unmount untuk membersihkan event listener
    return () => {
      window.removeEventListener('storage', handleTokenChange)
    }
  }, [])

  // Mengembalikan provider dengan nilai isAuthenticated dan setIsAuthenticated yang diperoleh dari useState
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
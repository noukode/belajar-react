import SidebarMenu from "../../../components/SidebarMenu";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/api";
import { useEffect, useState } from "react";


export default function UserIndex(){
  const [users, setUsers] = useState([])

  const fetchDataUsers = async () => {
    const token = Cookies.get('token')

    if(token){
      Api.defaults.headers.common['Authorization'] = token

      try{
        const response = await Api.get('/api/admin/users')
        setUsers(response.data.data)
      }catch(error){
        console.error("There was an error fetching the users!", error)
      }
    }else{
      console.error("Token is not available")
    }
  }
  
  const deleteUser = async (id) => {
    const token = Cookies.get('token')

    if(token){
      Api.defaults.headers.common['Authorization'] = token
  
      try{
        await Api.delete(`/api/admin/users/${id}`)

        fetchDataUsers();
      }catch(error){
        console.error("There was an error deleting the users!", error)
      }
    }else{
      console.error("Token is not available")
    }

  }

  // use effect 1 kali
  useEffect(() => {
    fetchDataUsers()
  }, [])

  return(
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>USERS</span>
              <Link to={'/admin/users/create'} className="btn btn-sm btn-success rounded shadow-sm border-0">ADD USER</Link>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Email Address</th>
                    <th scope="col" style={{ width: "17%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.length > 0 ? users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="d-flex justify-content-center">
                          <Link to={`/admin/users/${user.id}/edit`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                          <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                        </td>
                      </tr>
                    ))
                    : 
                    <tr>
                      <td colSpan="4" className="text-center">
                        <div className="alert alert-danger mb-0">
                          Data Belum tersedia!
                        </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
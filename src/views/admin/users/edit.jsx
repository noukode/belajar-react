import { useNavigate, useParams } from "react-router-dom";
import SidebarMenu from "../../../components/SidebarMenu";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Api from "../../../services/api";
const token = Cookies.get('token')

export default function UserEdit(){
  const navigate = useNavigate();

  const { id } = useParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [validation, setValidation] = useState([])

  const fetchDataUser = async () => {
    Api.defaults.headers.common['Authorization'] = token
    Api.get(`/api/admin/users/${id}`)
    .then(response => {
      setName(response.data.data.name);
      setEmail(response.data.data.email);
    })
  }


  // use effect 1x
  useEffect(() => {
    fetchDataUser();
  }, [])

  const updateUser = async (e) => {
    e.preventDefault()

    Api.defaults.headers.common['Authorization'] = token
    Api.put(`/api/admin/users/${id}`, {
      name: name,
      email: email,
      password: password,
    }).then(() => {
      navigate('/admin/users')
    })
    .catch(error => {
      setValidation(error.response.data)
    })
  }
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header">
              EDIT USER
            </div>
            <div className="card-body">
              {
                validation.errors && (
                  <div className="alert alert-danger mt-2 pb-0">
                    {
                      validation.errors.map((error, index) => (
                        <p key={index}>{error.path} : {error.msg}</p>
                      ))
                    }
                  </div>
                )
              }
              <form onSubmit={updateUser}>
                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Full Name</label>
                  <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
                </div>
                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Email Address</label>
                  <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
                </div>
                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Password</label>
                  <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-sm btn-primary">UPDATE</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import SidebarMenu from "../../../components/SidebarMenu";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/api";
import { useState } from "react";
const token = Cookies.get('token');


export default function UserCreate(){
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validation, setValidation] = useState([])

  const storeUser = async (e) => {
    e.preventDefault()

    Api.defaults.headers.common['Authorization'] = token;
    await Api.post('/api/admin/users', {
      name: name,
      email: email,
      password: password,
    }).then(() => {
      navigate('/admin/users')
    }).catch(error => {
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
              ADD USER
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
              <form onSubmit={storeUser}>
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
                <button type="submit" className="btn btn-sm btn-primary">SAVE</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
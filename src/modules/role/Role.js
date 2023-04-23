import React, { useContext, useEffect, useState } from 'react'
import CommonMessage from '../../helper/message/CommonMessage';
import PageHeading from '../../components/pageheading/PageHeading';
import { Link } from 'react-router-dom';
import api from '../../api/Api';
import MessageContext from '../../components/message/context/MessageContext';
import { dateFormate } from '../../helper/CommonFunction';
const Role = () => {
  const path = '/roles';
  const {name, created_at, action, role, add} = CommonMessage;
  const {showMessage} = useContext(MessageContext);  //show message
  const [loader, setLoader]= useState(false)// lodader
  const [roles, setRoles] = useState([])
  useEffect(()=>{
    getRole();
  },[])
   // Get Role
   const getRole = async() =>{
    setLoader(true);
    try {
      const res = await api.get(path)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false);
        setRoles(resData.roles)
      }
    } catch (error) {
      setLoader(false)
      const message = error.response.data.message;
        showMessage({
            message:message,
            type:'danger'
        });
    }
  }
  // End
   // HandleDelete
    const handleDelete = () => {
      // 
    }
    // End
  return (
  <>
    <PageHeading heading={role}/>
    <div className="card shadow mb-4">
            <div className="card-header py-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0 font-weight-bold text-primary">{role}</h6>
                    <Link to={'/roles/create'} className="btn btn-primary btn-user">{add}</Link>
                </div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellpacing="0">
                        <thead>
                            <tr>
                                <th>{name}</th>
                                <th className='text-center'>{created_at}</th>
                                <th className='text-center'>{action}</th>
                            </tr>
                        </thead>
                        <tbody>
                          {roles.length>0 ? 
                            roles.map((role)=>(
                              <tr key={role._id}>      
                                <td>{role.name ? role.name:''}</td>
                                <td className='text-center'>{dateFormate(role.createdAt)}</td>
                                <td className='text-center'>
                                  <Link to={`${path}/edit/${role._id}`} className='text-success mr-2'><i className='fa fa-edit'></i></Link>
                                  <a href='javascript:;' onClick={()=>handleDelete(1)} className='text-danger'>
                                    <i className='fa fa-trash'></i>
                                  </a>
                                  </td>
                              </tr>
                            )) 
                          :<tr>
                            <td>f
                              </td>
                              </tr>
                              }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  </>
  )
}

export default Role;


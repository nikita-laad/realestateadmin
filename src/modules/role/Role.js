import React from 'react'
import CommonMessage from '../../helper/message/CommonMessage';
import PageHeading from '../../components/pageheading/PageHeading';
import { Link } from 'react-router-dom';
const Role = () => {
  const {name, created_at, action, role, add} = CommonMessage;
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
                            <tr>
                              <td>nmae</td>
                              <td className='text-center'>created_at</td>
                              <td className='text-center'>
                                <Link to={'/roles/edit/'+1} className='text-success mr-2'><i className='fa fa-edit'></i></Link>
                                <a href='javascript:;' onClick={()=>handleDelete(1)} className='text-danger'>
                                  <i className='fa fa-trash'></i>
                                </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  </>
  )
}

export default Role;


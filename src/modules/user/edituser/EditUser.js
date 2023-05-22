import PageHeading from "../../../components/pageheading/PageHeading";
import { Link} from "react-router-dom";
import CommonMessage from "../../../helper/message/CommonMessage";
import UserMessage from '../UserMessage';
import EditUserLogic from "./EditUserLogic";
const EditUSer = () => {
  //Message
  const {enter_name, update, cancel, name, role, select_role, status,email, mobile, enter_email, enter_mobile,} = CommonMessage;
  const {edit_user,   password, enter_password} = UserMessage;
  const {handleSubmit, handleChange, loader, formValues, errors, roleLoader, roles, Status} = EditUserLogic()
  return (
    <>
      <PageHeading heading={edit_user}/>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">{edit_user}</h6>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{name}<span className="text-danger">*</span></label>
                    <input type="text" className="form-control form-control-user" name='name' value={formValues.name} placeholder={enter_name} onChange={handleChange}/>
                    {errors.name && <label className="text-danger mb-0"> {errors.name}</label>}
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{email}<span className="text-danger">*</span></label>
                    <input type="email" className="form-control form-control-user"  placeholder={enter_email} name='email' onChange={handleChange} value={formValues.email}/>
                    {errors.email && <label className="text-danger mb-0"> {errors.email}</label>}
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{mobile}<span className="text-danger">*</span></label>
                    <input type="text" className="form-control form-control-user"  placeholder={enter_mobile} name='mobile' onChange={handleChange} value={formValues.mobile}/>
                    {errors.mobile && <label className="text-danger mb-0"> {errors.mobile}</label>}
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-2">
                    <label>{password}<span className="text-danger">*</span></label>
                    <input type="password" className="form-control form-control-user" placeholder={enter_password} name='password' onChange={handleChange} autoComplete="password"/>
                    {errors.password && <label className="text-danger mb-0"> {errors.password}</label>}
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-0">
                    <label>{role}<span className="text-danger">*</span></label>
                    <select className="form-control" value={formValues.roleId} name="roleId" onChange={handleChange}>
                      <option>{select_role}</option>
                      {roles && roles.length>0 ?
                       roles.map((role)=>(
                        <option value={role._id} key={role._id}>{role ? role.name:''}</option>
                       ))
                        :
                        ''}
                    </select>
                    {roleLoader && <span className="spinner-border spinner-border-sm ml-n3"></span>}
                    {errors.roleId && <label className="text-danger mb-0"> {errors.roleId}</label>}
                  </div>              
                </div>
                <div className="col-lg-6 col-md-6">
                <div className="form-group mb-0">
                  <label>{status}<span className="text-danger">*</span></label>
                  <Status handleChange={handleChange} value={formValues.status}/>
                  {errors.status && <label className="text-danger mb-0"> {errors.status}</label>}
                </div>              
              </div>
              </div>
          </div>
          <div className="card-footer">
            <Link to='/users' className="btn btn-outline-primary mr-2">{cancel}</Link>
            <button type="submit" className="btn btn-primary btn-user" disabled={loader}>
              {loader && <span className="spinner-border spinner-border-sm me-1"></span>}
              {update}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditUSer;

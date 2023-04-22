import { Link } from "react-router-dom";
import PageHeading from "../../components/pageheading/PageHeading";
import CommonMessage from "../../helper/message/CommonMessage";
const RoleEdit = () => {
  const {edit_role, enter_name, update, cancel, name} = CommonMessage
  return (
    <>
      <PageHeading heading={edit_role}/>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">{edit_role}</h6>
        </div>
        <form>
          <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="form-group mb-0">
                    <label>{name}<span className="text-danger">*</span></label>
                    <input type="text" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder={enter_name}/>
                  </div>              
                </div>
              </div>
          </div>
          <div className="card-footer">
            <Link to='/roles' className="btn btn-outline-primary mr-2">{cancel}</Link>
            <button type="submit" className="btn btn-primary btn-user">{update}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default RoleEdit;


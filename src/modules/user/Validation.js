import CommonMessage from "../../helper/message/CommonMessage";
import UserMessage from "./UserMessage";
// User validation
export const userValidaions =(values)=>{
  const {password_required,name_required, name_more_than_characters, status_required, email_required, email_format, mobile_required, mobile_more_than_characters, mobile_cannot_more_than_characters,password_more_than_characters, password_cannot_more_than_characters, password_formate, } =CommonMessage;
  const {role_required } = UserMessage
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
   const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  // Name
  if (!values.name){
    errors.name = name_required
  }else if(values.name.length <3){
    errors.name = name_more_than_characters
  }
  // Email
  if(!values.email){
    errors.email= email_required;
  }else if(!regex.test(values.email)){
    errors.email = email_format;
  }
  // Mobile
  if(!values.mobile){
    errors.mobile= mobile_required;
  } else if(values.mobile.length<10){
      errors.mobile = mobile_more_than_characters;
  } else if(values.mobile.length >15){
    errors.mobile = mobile_cannot_more_than_characters;
} 
  // Password
  if(!values.password){
    errors.password= password_required;
  } else if(values.password.length<8){
      errors.password = password_more_than_characters;
  } else if(values.password.length>16){
      errors.password = password_cannot_more_than_characters;
  }else if(!regexPassword.test(values.password)){
    errors.password = password_formate;
  }
  //Role
  if (!values.roleId){
    errors.roleId = role_required;
  }
  if (!values.status){
    errors.status = status_required
  }
  return errors;
}
// End
// User validation
export const editUserValidaions =(values)=>{
    const {name_required, status_required} =CommonMessage;
    const { name_more_than_characters, email_required, email_format, mobile_required, mobile_more_than_characters, mobile_cannot_more_than_characters, role_required } = UserMessage
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // Name
    if (!values.name){
      errors.name = name_required
    }else if(values.name.length <3){
      errors.name = name_more_than_characters
    }
    // Email
    if(!values.email){
      errors.email= email_required;
    }else if(!regex.test(values.email)){
      errors.email = email_format;
    }
    // Mobile
    if(!values.mobile){
      errors.mobile= mobile_required;
    } else if(values.mobile.length<10){
        errors.mobile = mobile_more_than_characters;
    } else if(values.mobile.length >15){
      errors.mobile = mobile_cannot_more_than_characters;
  } 
    //Role
    if (!values.roleId){
      errors.roleId = role_required;
    }
    if (!values.status){
      errors.status = status_required;
    }
    return errors;
  }
  // End
import MessageContext from '../../../components/message/context/MessageContext';
import  { useContext, useEffect, useRef, useState } from 'react';
import PropertyMessage from '../PropertyMessage';
import CommonMessage from '../../../helper/message/CommonMessage';
import createAPI from '../../../api/Api';
import Status from '../../../components/status/Status';
import { LIMIT, ORDERBY, STATUS, STATUSCODE } from '../../../helper/Constent';
import LogOutLogic from '../../../helper/auth/LogOutLogic';
const PropertyLogic = () => {
  const {logOut} = LogOutLogic();
  const apiCreator = createAPI();
  const api = apiCreator(); 
   // Base path
   const path = '/properties';
   // End
   const {showMessage} = useContext(MessageContext);//Show message
   // Message
   const {success, danger} = CommonMessage;
   const {delete_property_message} = PropertyMessage;
   // End
 
   const [loader, setLoader]= useState(false)// lodader
   const [allProperties, setAllProperties] = useState([])
 // filter
 const [sortDirection, setSortDirection] = useState(ORDERBY.DESC);
 const [sortColumn, setSortColumn] = useState(ORDERBY.CREATEDAT);
 const [searchTerm, setSearchTerm] = useState("");
 const [totalPages, setTotalPages] = useState(LIMIT.ITEMZERO);
 const [perPage, setPerPage] = useState(LIMIT.ITEMTEN);
 const [page, setPage] = useState(LIMIT.ITEMONE);
 const [onlyActive, setOnlyActive] = useState("");
 const [currentStatus, setCurrentStatus]= useState("");
 const [getStatus, setgetStatus] = useState(STATUS);
 // Search
 const seach = (e)=>{
    setSearchTerm(e.target.value)
    getProperties()
 };
 // End
 // Sorting
 const handleSort = (column) => {
   if (sortColumn === column) {
       // if the same column is clicked again, toggle sort direction
       setSortDirection(sortDirection === ORDERBY.ASC ? ORDERBY.DESC : ORDERBY.ASC);
   } else {
       // if a different column is clicked, set sort column to the new column and sort direction to ascending
       setSortColumn(column);
       setSortDirection(ORDERBY.ASC);
   }
   getProperties()
 };
 // End
 // Pagination
 const handlePreviousPage = () => {
   if (page > LIMIT.ITEMONE) {
     setPage(page - LIMIT.ITEMONE);
     getProperties();
   }
 };
 const handleNextPage = () => {
   if (page < totalPages) {
     setPage(page + LIMIT.ITEMONE);
     getProperties();
   }
 };
 const current = (page) =>{
   setPage(page)
   getProperties();
 };
 const statusSearch = (e)=>{
  setCurrentStatus(e.target.value)
   getProperties()
 }
 // End
   // Get property
   useEffect(()=>{
     getProperties();
   },[sortColumn, sortDirection, currentStatus, searchTerm])
   // End
    // Get property api
    const getProperties = async() =>{
     setLoader(true);
     try {
      const body = {
        searchTerm: searchTerm,
        sortColumn: sortColumn,
        sortDirection: sortDirection,
        page: page, // new pagination params
        perPage: perPage, // new pagination params,
        onlyActive: onlyActive,
        status: currentStatus
      };
       const res = await api.post(path, body)
       const resData = res.data;
       if(resData.status === true){
         setAllProperties(resData.properties)
         setTotalPages(resData.totalPages)
       }
     }catch (error) {
      const errorResponse = error.response.data;
      if(errorResponse.status=== STATUSCODE.UNAUTHENTICATED){
          logOut();
      }
      const message = errorResponse.message;
      showMessage({
          message:message,
          type: danger
      });
    }finally{
      setLoader(false);
    }
   }
   // End
 
   // Delete property
   // Dialog box
   const [dialog, setDiaLog] = useState({
     message:'',
     isLoading: false
   });
   const [deleteLoader, setDeleteLoader] = useState(false)
   // end
   const idPropertyRef = useRef();
   const handleDiaLog = (message, isLoading)=>{
     setDiaLog({
       message:message,
       isLoading:isLoading
     })
   }
   
   const handleDelete = (id) =>{
     handleDiaLog(delete_property_message, true)
     idPropertyRef.current = id;
   }
   const areUSureDelete = async (choose) =>{
     if(choose){
       setDeleteLoader(true);
       try {
         const res = await api.delete(`${path}/${idPropertyRef.current}`);
         const resData = res.data;
         if(resData.status === true){
           const newProperties = allProperties.filter((property)=>property._id !==idPropertyRef.current)
           setAllProperties(newProperties);
           showMessage({
             message:resData.message,
             type:success
           });
           setDeleteLoader(false);
         }
       
       } catch (error) {
         const message = error.response.data.message;
         showMessage({
             message:message,
             type:danger
         });
         setDeleteLoader(false);
       }
       handleDiaLog("", false)
     }else{
       handleDiaLog("", false)
     }
   }
   // end

  return {
    loader, allProperties, handleDelete, deleteLoader,  areUSureDelete, path, dialog, getStatus, currentStatus,
    seach, current, handleSort ,handleNextPage, handlePreviousPage, statusSearch, Status,page,perPage, searchTerm, totalPages
  };
};

export default PropertyLogic;

import {  useState } from "react";
import { useOutletContext , useParams} from "react-router-dom";
import { useEffect } from "react";
import { API_URLS } from "../services/api.url";
import useApi from "../hooks/useApi";
import { DeleteOutline } from "@mui/icons-material";
import Email from "./Email";
import NoMails from "./common/NoMails";
import { Checkbox, List , ListItem } from "@mui/material";
import{Box} from '@mui/material';
import { EMPTY_TABS } from "../constants/constant";
const Emails = ()=>{
    const[selectedEmails, setSelectedEmails] = useState([]);
    const[refreshScreen, setRefreshScreen] = useState(false);
    const {openDrawer} = useOutletContext();
    const{type} = useParams();
    const getEmailService =  useApi(API_URLS.getEmailFromType)
    const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);
   const deleteEmailService = useApi(API_URLS.deleteEmail);
   useEffect(()=>{
   getEmailService.call({}, type);
   }, [type, refreshScreen])


   const selectAllEmails =(e)=>{
    if(e.target.checked){
        const emails = getEmailService?.response?.map(email => email._id);
        setSelectedEmails(emails);
    }
    else{
       setSelectedEmails([]);
    }
   }
   const deleteSelectedEmails=(e)=>{
    if(type ==='bin'){
     deleteEmailService.call(selectedEmails);
    }
    else{
        moveEmailsToBinService.call(selectedEmails);
    }
    setRefreshScreen(prevState => !prevState);
   }
   return(
        <Box style ={openDrawer ? {marginLeft: 250, width:'Calc(100%- 250px)' }: {width: '100%'}}> 
    
    <Box  style ={{padding: '20px 10px 0 10px ', display: 'flex', alignItems: 'center'}}>
<Checkbox size="small"  onChange={(e)=> selectAllEmails(e)}/>
<DeleteOutline onClick={(e)=> deleteSelectedEmails(e)}/>
    </Box>
    <List>
        {
           getEmailService ?.response?.map(email => (
                 <Email
                 key ={email._id}
                 email={email}
                 selectedEmails={selectedEmails}
                 setRefreshScreen={setRefreshScreen}  
                 setSelectedEmails={setSelectedEmails}
                 />
           ))
        }
    </List>
    {
        getEmailService?.response?.length === 0 && 
           <NoMails message={EMPTY_TABS[type]} />
    }
    </Box>
    
    )

}
export default Emails;
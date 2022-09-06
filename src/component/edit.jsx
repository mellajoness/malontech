import React, { useEffect,useState } from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import {PUT_SERVICE } from "../services/backend";
import styles from './css/crud.module.css';

const EditUser =()=> {
    let navigate = useNavigate();
    const location = useLocation();
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const [name,setName]=useState('');
    const [phone,setPhone]=useState('');
    const [website,setWebsite]=useState('');

    useEffect(()=>{
        let data=location.state
        console.log('data',data)
    
      },[])

      const editItem=async()=>{
        console.log('click')
        const payload = {
            "id":location.state.id,
            "name":name || location.state.name,
            "phone":phone || location.state.phone,
            "website":website || location.state.website,   
          };
          console.log('my  body',payload)
          const endpoint = `/users/${location.state.id}`;
        
        try {
          const response = await PUT_SERVICE(payload, endpoint);      
          if(response!==null)
          {
             navigate("/")    
          }
          else
          {
              error(response.message)
          }
        } catch (e) {
          error('Kindly check internet connections')
          return e.response;
        }

      }
    return ( 
        <React.Fragment>
          <div className={styles.parent}>
            <div className={styles.formdiv}>
                   <div>
                   <input className={styles.input}
                       type="text"
                       placeholder="Enter name"
                       value={name || location.state.name} 
                       onChange={(e)=>setName(e.target.value)}
                    />
                    </div>

                   <div>
                    <input className={styles.input}
                       type="text"
                       placeholder="Enter phone number"
                       value={phone || location.state.phone} 
                       onChange={(e)=>setPhone(e.target.value)}
                    />
                    </div>

                    <div>
                    <input className={styles.input}
                       type="text"
                       placeholder="Enter website"
                       value={website || location.state.website} 
                       onChange={(e)=>setWebsite(e.target.value)}
                    />
                    </div>

                    <button  className={styles.btn} onClick={editItem}>Proceed</button>
                </div>
            </div>
        </React.Fragment>

     );
}
 
export default EditUser;
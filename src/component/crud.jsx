import React, { useState,useEffect } from "react";
import { GET_SERVICE,GET_SERVICE_GRAPH,POST_SERVICE,PUT_SERVICE } from "../services/backend";
import styles from './css/crud.module.css';
import { BiTrash,BiEdit } from 'react-icons/bi';
import Graph from "./graph";
import { useNavigate } from "react-router";

const Crud =props=> {
  let navigate = useNavigate();
  const [list,setList]=useState([]);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [website,setWebsite]=useState('');
  const [clicked,SetClicked]=useState(false);
  const [editItemlist,setEditItem]=useState({})
  useEffect(()=>{
    getList() 
  },[])

    const getList=async()=>{
        const endpoint = '/users';
        console.log('endpoint',endpoint)
        setLoading(!loading)
          try {
            const response = await GET_SERVICE(endpoint)
            .then(response => response.json())
            .then(data=> {
                console.log('endpoint',data)
            //   setLoading(loading)
            if(data)
               {
                setList(data)
               }
            else
              {
                setError(response.message)
              }
          })
         }
            catch (e) {
            //   setLoading(loading)
              setError('Kindly check internet connections')
              return e.response;
              }
    }; 


    const addItem=async()=>{
        const payload = {
          "name":name,
          "phone":phone,
          "website":website,   
        };
        console.log('my  body',payload)
        const endpoint = '/users';
      
      try {
        const response = await POST_SERVICE(payload, endpoint);
           setLoading(loading)
           SetClicked(clicked)           
        if(response!==null)
        {
            setName('')
            setPhone('')
            setWebsite('')
            setList((list) => [...list, response]);
        }
        else
        {
            SetClicked(clicked)
            error(response.message)
        }
      } catch (e) {
        SetClicked(clicked)
        setLoading(loading)
        error('Kindly check internet connections')
        return e.response;
      }
      }

      const deleteItem=(item)=>{
        const DeletedResident=list.filter(newItem=>newItem.id !==item.id);
        setList(DeletedResident)    
      } 
      
      const editItem=async(item)=>{
          console.log('edit index',item)
          navigate(
             "/edit",
             {state:item}
      )
    }

    return ( 
        <React.Fragment>  
          <div>
            <div className={styles.parent}>
                <div className={styles.formdiv}>
                   <div>
                   <input className={styles.input}
                       type="text"
                       placeholder="Enter name"
                       value={name } 
                       onChange={(e)=>setName(e.target.value)}
                    />
                    </div>

                   <div>
                    <input className={styles.input}
                       type="text"
                       placeholder="Enter phone number"
                       value={phone} 
                       onChange={(e)=>setPhone(e.target.value)}
                    />
                    </div>

                    <div>
                    <input className={styles.input}
                       type="text"
                       placeholder="Enter website"
                       value={website} 
                       onChange={(e)=>setWebsite(e.target.value)}
                    />
                    </div>

                    <button style={{background:name.length=='' || phone.length=='' || website.length=='' ?  '#acacac': ''}} className={styles.btn} onClick={addItem} disabled={name.length=='' || phone.length=='' || website.length==''}>Add Item</button>
                </div>

               <div className={styles.itemdiv}>
                  <table>
                   <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Website</th>
                      <th>Actions</th>
                    </tr>
                    {list.map(item=>
                    <tr key={item.id}>                    
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.website}</td>
                      <td style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                        <div onClick={()=>deleteItem(item)}><BiTrash style={{color:'red',height:'34px',width:'22px',cursor:'pointer'}} /></div>
                        <div  onClick={()=>editItem(item)}><BiEdit style={{color:'green',height:'34px',width:'22px',cursor:'pointer'}}/></div>
                      </td>
                    </tr>
                    )} 
                    </tbody>
                  </table>               
               </div>

              
            </div>


            <Graph/>
          </div>  
        </React.Fragment>
     );
}
 
export default Crud;
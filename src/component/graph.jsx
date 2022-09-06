import React, { useState,useEffect } from "react";
import Chart from "react-apexcharts";
import { GET_SERVICE_GRAPH } from "../services/backend";

const Graph=()=>{  
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const [years,setYears]=useState([])
    const [yearsTwo,setYearsTwo]=useState([])
    const [countItem,setCountItem]=useState([])
    const [arr,setArr] =useState(['a', 'b', 'a', 'a', 'c', 'c']);
    const [options,setOptions]=useState({ 
        chart: {
          id: "basic-bar"
        },
        xaxis: {
            categories: []
        }
      },
    )
    const [series,setSeries]=useState([
        {
          name: "series-1",
          data: []
        }
      ]
    )
  
    useEffect(()=>{
        getGraph()       
      },[])

    const getGraph=async()=>{
        const endpoint = '/actors/get-awards?nconst=nm0001667';
        console.log('endpoint',endpoint)
        setLoading(!loading)
          try {
            const response = await GET_SERVICE_GRAPH(endpoint)
            .then(response => response.json())
            .then(data=> {
              if(data)
                {
                    data.resource.awards.map(res=>{
                      countItem.push(res.year)
                        years.push(res.year);
                        let uniqueChars = [...new Set(years)];
                       
                        uniqueChars.sort(function(a, b) {
                          if( a === Infinity ) 
                            return 1; 
                          else if( isNaN(a)) 
                            return -1;
                          else 
                            return a - b;
                        });
                        
                        console.log('sort asc',uniqueChars);
                        setYearsTwo(uniqueChars)
                        setOptions({
                          chart: {
                              id: "basic-bar"
                            },
                            xaxis: {
                                categories:uniqueChars
                            }
                          },
                         )
                      })
                      
                
                  
                  
                   const count = {};
                   
                   for (const list of data.resource.awards) {
                    
                    let arr=[]
                    arr.push(list.year)
                    console.log('list',list);
                    for (const element of arr) {
                       
                     if (count[element]) {
                       count[element] += 1;
                     } else {
                       count[element] = 1;
                     }
                   }
                  }
                   console.log('new counts',Object.values(count));
                  //  console.log('new count',count)
                //   console.log('data',years)
                  // let arr= data.resource.awards;
                  // let count = 1;
                  // for (let i = 0; i < years.length; i++) {
                  //   if (years[i] === years[i + 1]) {
                  //     count++;
                  //   } else {                      
                  //       console.log(`${years[i]} occur ${count} times`);
                  //       count = 1;
                  //   }
                  // }
                  setSeries([{
                    name: "count",
                    data:Object.values(count)
                  }])    
                 
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


    return (
      <div className="app">
         {/* {countItem.map(item=>
         <div>
             <div>{item}</div>
         </div>
        )} */}
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type="bar"
              width="70%"
            />
          </div>
        </div>
      </div>
    );
  }


export default Graph;
import React, {useState, useEffect} from "react";
import { CalCont, CalDay } from "../../styled";
import { Heading } from ".";

const Cal = (props:{next:Function})=>{


    const months = [
        {name:"January", days:31, offset:0},
        {name:"Febuary", days:28, offset:3},
        {name:"March", days:31,offset:3},
        {name:"April", days:30,offset:6},
        {name:"May", days:31,offset:1},
        {name:"June", days:30,offset:4},
        {name:"July", days:31,offset:6},
        {name:"August", days:31,offset:2},
        {name:"September", days:30,offset:5},
        {name:"October", days:31,offset:0},
        {name:"November", days:30,offset:3},
        {name:"December", days:31,offset:5},
    ]


    const handleClick = (day:number, month:number)=>{
      let choice = new Date(`${month}/${day}/${2023}`)
      props.next(choice, true)


    }

    return (
    
    <CalCont>
    
    {months.map((month:any, i:number)=>{
        if(i == 0){
            return(
            <div className="text-left">
        <Heading size={1} >{month.name}</Heading>
        <div >
        { Array.from({length:month.days},(v,k)=>k+1).map((v:any, k:any)=>
        <CalDay onClick={()=>handleClick(v,i+1)} >
                                       <Heading size={1} >{v}</Heading>
        </CalDay>
       
        )} 
        </div>
        </div> 
            )
           
            } 
        else{
            return( 
                <div className="text-left">
                    <Heading size={1} >{month.name}</Heading>
                    <div >
                    { Array.from({length:month.offset},(v,k)=>k+1).map((v:any, k:any)=>
                    <CalDay  >
                    
                    </CalDay>
                   
                    )} 
                
                    { Array.from({length:month.days},(v,k)=>k+1).map((v:any, k:any)=>
                    <CalDay onClick={()=>handleClick(v,i+1)} >
                                       <Heading size={1} >{v}</Heading>

                    </CalDay>
                   
                    )} 
                    </div>
                    </div>
                )
            }
        }
        )
    }
    

              
    
    </CalCont>
    )

}

export default Cal;
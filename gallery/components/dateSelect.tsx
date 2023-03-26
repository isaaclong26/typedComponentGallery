import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { ClearDropDown } from '../../styled';
import {v4 as uuidv4} from "uuid"
import { ClearButton, Input } from '..';


interface Month {
    name: string;
    days: number;
    number: number;
  }
  
  const months: Month[] = [
    { name: "January", days: 31, number: 1 },
    { name: "February", days: 28, number: 2 },
    { name: "March", days: 31, number: 3 },
    { name: "April", days: 30, number: 4 },
    { name: "May", days: 31, number: 5 },
    { name: "June", days: 30, number: 6 },
    { name: "July", days: 31, number: 7 },
    { name: "August", days: 31, number: 8 },
    { name: "September", days: 30, number: 9 },
    { name: "October", days: 31, number: 10 },
    { name: "November", days: 30, number: 11 },
    { name: "December", days: 31, number: 12 }
  ];
  

const DateSelect = (props: {done:Function})=>{

    const [selectedMonth, setSelectedMonth] = useState<Month | undefined>(undefined);
    const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);
    const [year, setYear] = useState<number | undefined>(undefined);


    const handleYearChange = (e:any) => {
        const year = e.target.value.replace(/[^0-9]/g, "").split("").slice(0,4).join("");  
        setYear(year)
      }
      const handleMonthSelect=(e:any)=>{
            let target = months.filter((m:Month)=> m.name===e)[0]

            setSelectedMonth(target)
        
      }
      const handleDaySelect=(e:any)=>{
        console.log(e)
        setSelectedDay(e)
    
  }


return (
    <div className="row">
        <div className="col-lg-4">

            {selectedMonth? 
            <ClearButton 
            fontSize="1rem"
            padding=" .4rem .75rem"
            style={{borderWidth: '1px', borderColor: "#0d6efd" , fontWeight: "400"}}
            borderRadius
            onClick={()=>{setSelectedMonth(undefined)}}>{selectedMonth.name}</ClearButton>    
                :
            <ClearDropDown
            id="month-select"
            title={'Month'}
            onSelect={handleMonthSelect}

        >
            {months.map(month => (
            <Dropdown.Item
                key={month.number}
                eventKey={month.name}
            >
                {month.name}
            </Dropdown.Item>
            ))}
        </ClearDropDown>
        }
    </div>

    <div className="col-lg-2">
    {selectedDay? 

            <ClearButton 
            fontSize="1rem"
            padding=" .4rem .75rem"
            style={{borderWidth: '1px', borderColor: "#0d6efd" , fontWeight: "400"}}
            borderRadius
            onClick={()=>{setSelectedMonth(undefined)}}>{selectedDay}</ClearButton>    
                :
        <ClearDropDown
                id="day-select"
                title={selectedDay || 'Day'}
                onSelect={handleDaySelect}
                style={{
                    backgroundColor:"transparent",
                }}
            >
                {Array.from({length:selectedMonth? selectedMonth.days : 31 },(v,k)=>k+1).map((v:any, k:any)=>(
                <Dropdown.Item
                    eventKey={v.toString()}
                    key={uuidv4()}
                >
                    {v}
                </Dropdown.Item>
                ))}
        </ClearDropDown>
        }

    </div>

    <div className="col-lg-4 mx-auto"
    
    >

        <Input 
        value={year? year.toString() :  ""}
        onChange={handleYearChange}
        style={{borderWidth: '1px', borderColor: "#0d6efd" , textAlign:"center", fontWeight: "400"}} label="Year"/>
    </div>
  </div>
)

}


export {DateSelect}
import React, {useEffect, useState} from "react";
import { useEloise } from "../../";
import {useCollection, useCollectionData, useDocumentData} from "react-firebase-hooks/firestore"
import {Firestore, collection, doc, getDocs} from "firebase/firestore"

export interface DBListProps{
    path: string
    Component: React.ComponentType<{ data: any, update:(data:any) => Promise<any | false> }>
    Empty?: React.ComponentType // added this line
}


interface DBListItemProps {
    path:string
    Component: React.ComponentType<{ data: any, update:(data:any) =>  Promise<any | false>  }>


}
export const DBItem:React.FC<DBListItemProps> = ({path, Component})=>{

    const {logic} = useEloise()

    const [value, setValue] = useState()

    logic.hooks.useAsyncEffect(async()=>{
        let test = await logic.fb.docs.getUserDoc(path)
        setValue(test)
    },[])
    const update = async (data:any) : Promise<any | false>=>{

        let test = await logic.fb.docs.setUserDoc(path, data)
        if(test){
            return data
        }
        else{
            return false
        }
    }


    return (
        <>
        {value && <Component data={value} update={update} />}
        </>
    )
}

export const DBList: React.FC<DBListProps> = ({path, Component, Empty})=>{

    const {theme, logic, siteConfig}  = useEloise()
    
    const [docs, setDocs] = useState<any>()

    logic.hooks.useAsyncEffect(async()=>{


        let test = await logic.fb.docs.getUserCollection(path)
        setDocs(test)


    },[])

 
    if (docs && docs.length === 0 && Empty) {
        return <Empty />;
    }

    return (
        <>
        {docs && docs.map((value:any)=><DBItem key={value.id} Component={Component} path={`${path}/${value.id}`} />)}
        </>
    )
}
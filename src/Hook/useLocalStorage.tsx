import { useEffect, useState } from "react"
 

export const useLocalStorage = <T,>(key : string , initialvalue : T | (() => T)) =>{
    const [value,setValue] = useState<T>(()=>{
        const jsonvalue = localStorage.getItem(key)
        if(jsonvalue == null){
            if(typeof initialvalue === "function"){
                return (initialvalue as () => T)()
            }else{
                return initialvalue
            }
        }else{
            return JSON.parse(jsonvalue)
        }
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[value,key])

    return [value,setValue] as [T , typeof setValue]
}
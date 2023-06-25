import { createContext, useState, useEffect } from "react";
import Api from "../Constant/Api";


const ApiContext = createContext()

function ApiProvider({children}){
    const [numPage, setNumPage] = useState(15)
    const [perPage, setPerpage] = useState(`paginate=true&page=1&perpage=${numPage}`)
    const [api ,setApi] = useState(Api.str + perPage)
    const filter = (api)=>{
        setApi(api)
    }

    useEffect(()=>{
        setPerpage(`paginate=true&page=1&perpage=${numPage}`)
    },[numPage])

    useEffect(()=>{
        setApi(Api.str + perPage)
    },[perPage])
    const value = {
        api:api,
        setApi,
        setNumPage,
        filter,
        numPage:numPage
    }
    return(
        <ApiContext.Provider value={value} >
            {children}
        </ApiContext.Provider>
    )
}

export {ApiContext, ApiProvider}
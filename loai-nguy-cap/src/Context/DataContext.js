import { createContext, useContext, useEffect, useState } from "react";
import fn_getData from "../Utils/getdata";
import { ApiContext } from "./ApiContect";



const DataContext = createContext()


function DataProvider({children}){
    const api = useContext(ApiContext)
    const [dataList, setDataList] = useState([]);
    const [total, setTotal] = useState([]);
    useEffect(() => {
        fn_getData(api.api).then((result) => {
            setDataList(result.list);
            setTotal(result.pagination.total);
        });
    }, [api.api]);
    
    const value = {
        dataList,
        total
    }
    return(
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export {DataContext, DataProvider}
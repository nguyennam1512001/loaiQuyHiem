import {NavLink} from "react-router-dom"
import { FaCat } from 'react-icons/fa';
import TableList from "./TableList";
import { useEffect, useState } from "react"
import fn_getData from "../../Utils/getdata"
import './style.css'
import Api from "../../Constant/Api";
function Loais(){
    const [page, setPage] = useState(1)
    const [perPage, setPerpage] = useState(20)
    const router = Api.species
    const [userPerpage, setUserPerpage] = useState(`paginate=true&page=${page}&perpage=${perPage}`)
    const [api, setApi] = useState(router+userPerpage)
    const [data, setData] = useState([])

    useEffect(()=>{
        setUserPerpage(`paginate=true&page=${page}&perpage=${perPage}`)
    },[page,perPage])
    useEffect(()=>{
        setApi(router+userPerpage);
    },[userPerpage])

    useEffect(() => {
        setIsLoading(true); // Bật trạng thái loading
        
        fn_getData(api)
          .then((result) => {
            setData(result);
            setIsLoading(false); // Tắt trạng thái loading khi nhận được dữ liệu
          })
          .catch((error) => {
            console.log('Lỗi:', error);
            setIsLoading(false); // Tắt trạng thái loading khi có lỗi
          });
    }, [api]);

    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('')


    const handleSearch=(e)=>{
        setSearch(e.target.value)
        const newapi=api+"&search="+search
        setApi(newapi)
    }
    return(
        <>
        {isLoading && <div className="loading"></div>}
        <div>
            <span className="user-icon"><FaCat/></span>
            <b className="page-title">Loài nguy cấp quý hiếm</b>
        </div>
        <div className="wrap-search">
            <div className="content-search">
                <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                <input className="search-input" placeholder="search" value={search} onChange={handleSearch}/>
            </div>
            <NavLink to="/auth/addnew" className="add-new"><span>+</span> Thêm mới</NavLink>
        </div>
        <div className="species-list">
            {isLoading && <div className="loading-width"></div>}
            <TableList router={router} data={data} api={api} setApi={setApi} setPage={setPage} setPerpage={setPerpage} perPage={perPage}/>
        </div>
        </>
    )
}
export {Loais}
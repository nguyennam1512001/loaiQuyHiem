import { useEffect, useState } from "react"
import Filter from "./filter"
import fn_getData from "../../Utils/getdata"
import UserList from "./userList"
import './style.css'
import Modal from "../../Components/Modal/Modal"
import AddForm from "../../Components/Form/AddForm"

function User(){
    const [page, setPage] = useState(1)
    const [perPage, setPerpage] = useState(5)
    const router = 'http://wlp.howizbiz.com/api/users?'
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
        fn_getData(api).then((result) => {
          setData(result);
        });
    }, [api]);

    const [isShow, setIsShow] = useState(false)
    const handleShowModal=()=>{
        setIsShow(true)
    }
    return(
        <>
        <div>
            <span className="user-icon"><i className="fa-sharp fa-solid fa-user"></i></span>
            <b>Danh sách người dùng</b>
        </div>
        <div className="wrap-search">
            <div className="content-search">
                <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                <input className="search-input" placeholder="search"/>
            </div>
            <button onClick={handleShowModal} className="add-new"><span>+</span> Thêm mới</button>
            {isShow && 
                <Modal setIsShow={setIsShow}>
                    <AddForm setIsShow={setIsShow}/>
                </Modal>
            }
        </div>
        <div className="wrap-filter">
            <Filter/>
        </div>
        <div className="user-list">
            <UserList router={router} data={data} api={api} setApi={setApi} setPage={setPage} setPerpage={setPerpage} perPage={perPage}/>
        </div>
        </>
    )
}

export default User



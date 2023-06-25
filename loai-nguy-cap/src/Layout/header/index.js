import { Link } from 'react-router-dom'
import { memo, useContext, useState } from "react"
import "./styles.css"
import ShowSearchSugest from "./searchSugest"
import Api from '../../Constant/Api'
import { ApiContext } from '../../Context/ApiContect'


function Header(){
    const data = useContext(ApiContext)
    const api = Api.str +'paginate=true&page=1&perpage=15'
    const [apiSub, serApiSub] = useState(api)
    const [searchTerm, setSearchTerm] = useState("")
    const handleOnChange=(e)=>{
        setSearchTerm(e.target.value)
        const newapi=api+"&search="+searchTerm
        serApiSub(newapi)
    }
    const handelClick=()=>{
        const newapi=data.api+"&search="+searchTerm
        data.setApi(newapi)
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          handelClick()
          handleBlur()
        }
    }

    const [isFocus, setIsFocus]= useState(false)
    const handleFocus=()=>{
        setIsFocus(true)
    }
    const handleBlur=()=>{
        setIsFocus(false)
    }
    return(
        <header>
            <div className="login-wrap">
                <Link to='/login'className="login-btn">Đăng nhập</Link>
            </div>
            <div className="header">
                <div className="logo">
                    <img className="logo-img" src={process.env.PUBLIC_URL + '/logoColor.png'} alt="Logo" />
                    <h5>HỆ THỐNG BÁO CÁO VỀ HIỆN TRANG <br/>
                    LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC ƯU TIÊN BẢO VỆ</h5>
                </div>
                <div className="header-search">
                    <input className="search-input" type="search" placeholder="tìm kiếm" 
                        onChange={handleOnChange} 
                        onFocus={handleFocus} 
                        onBlur={handleBlur}
                        onKeyPress={handleKeyPress}/>
                    {searchTerm && isFocus&&(
                    <div className="search-sugest">
                        <div className="search-sugest_content">
                            <ShowSearchSugest api={apiSub}/>
                        </div>
                        <p className="search-sugest_more">Xem thêm kết quả</p>
                    </div>)}
                    <button className="search-btn" onClick={handelClick}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>
        </header>
    )
}
export default  memo(Header)
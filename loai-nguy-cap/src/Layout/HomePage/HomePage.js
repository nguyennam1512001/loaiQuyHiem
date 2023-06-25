import Header from "../header"
import Footer from "../footer"
import {Outlet} from 'react-router-dom'
import Api from "../../Constant/Api"
import { useEffect, useState } from "react"
import './style.css'
import SideBar from "../SideBarHomePage/index"
import Nav from "../nav/index.js"
const HomePage = (props)=>{
    const [showGotoTop, setShowGotoTop]= useState(false)

    useEffect(()=>{
        const handleScrollY = ()=>{
        if(window.scrollY >= 1000){
            setShowGotoTop(true)
        }else{
            setShowGotoTop(false)
        }
        }
        window.addEventListener("scroll",handleScrollY)

        return ()=>{       // tránh rò rỉ bộ nhớ khi mount/unmount
        window.removeEventListener("scroll",handleScrollY)
        }
    },[])

    let [apiLHT,setApiLHT] = useState(Api.loaihientrangs)
    let [apiPlace,setApiPlace] = useState(Api.provinces)
    let [apiUICN,setapiUICN] = useState(Api.sachDo)
    return(
        <>
        <Header api={props.api} filter={props.filter}/>
        <div className="body">
            <div className="container">
                <Nav/>
                <SideBar apiLHT={apiLHT} apiPlace={apiPlace} apiUICN={apiUICN}/>
                <div className="content-wrap">
                    <Outlet />
                    {showGotoTop &&(
                        <a href="#" className="goToTop">
                            go to top
                        </a>
                    )}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default HomePage
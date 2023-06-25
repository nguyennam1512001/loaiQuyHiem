import {NavLink} from "react-router-dom"
import './style.css'
import { FaCat, FaUser } from 'react-icons/fa';

const arr =[
    {
        to:"/auth/user",
        id:2,
        name:"Quản lý người dùng",
        icon:<FaUser className="sidebar-item_icon"/>
    },
    {
        to:"/auth/loai",
        id:3,
        name:"Loài nguy cấp quý hiếm",
        icon:<FaCat className="sidebar-item_icon"/>
    },
]
function Sidebar({isToggled}){
    return(
        <>
        <ul className="sidebar-list">
        {arr.map(item => (
            <NavLink to={item.to} activeclassname="active" className="sidebar-item_auth" key={item.id}>
                <div>{item.icon}</div>
                <p className={`item-name ${isToggled?'':'item-name_toggle'}`}>{item.name}</p>
            </NavLink>
        ))}
        </ul>
        </>
    )
}

export default Sidebar
import "./styles.css";
import { Htl,Place,Uicn,UicnVn } from "./li";
import { useContext, useState } from "react";
import Api from "../../Constant/Api";
import { ApiContext } from "../../Context/ApiContect";

const SideBar = (props) => {
  const data = useContext(ApiContext)
  const [count,setCount]=useState(0)

  const handleDelte = ()=>{
    setCount(0)
    data.setApi(Api.str+Api.paginate)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
    return (
      <aside>
      <p>
          BỘ LỌC
          {count>0 &&
          <a className="remove-check" href="#" onClick={handleDelte}>
          xoá toàn bộ <span>{count}</span>
          </a>
          }
      </p>
      <ul className="sidebar-list">
          <Htl  apiLHT={props.apiLHT} count={count}  setCount={setCount} />
          <Place  apiPlace={props.apiPlace} count={count}  setCount={setCount}/>
          <UicnVn  apiUICN={props.apiUICN} count={count}  setCount={setCount}/>
          <Uicn  apiUICN={props.apiUICN} count={count}  setCount={setCount}/>
      </ul>
      </aside>
    )
  }
  
  export default SideBar;

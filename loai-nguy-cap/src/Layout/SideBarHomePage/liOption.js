import { useContext } from "react";
import { ApiContext } from "../../Context/ApiContect";

function Option({ idPrefix, id, value, label, setCount, count}) {
  
  const data = useContext(ApiContext)
  const handleOnChange = (event) => {
    let filterParams =data.api;
    let content = ""
    if(event.target.id == "htl"+id){
      content="&loaihientrang_ids[]=" + event.target.value
    }else if(event.target.id == "place"+id){
      content="&province_ids[]=" + event.target.value
    }else if(event.target.id == "uicn"+id){
      content="&iucn_ids[]=" + event.target.value
    }else if(event.target.id == "uicn_VN"+id){
      content="&sach_do_ids[]=" + event.target.value
    }
    
    if(event.target.checked){
      
      setCount(count+1)
      filterParams += content

    }else{
      setCount(count-1)
      filterParams = filterParams.replace(content,"")
    }
    data.setApi(filterParams)
    
  };
    return (
      <li className={`sidebar-select ${idPrefix}-select`}>
        <input type="checkbox" id={`${idPrefix}${id}`} value={value}  onChange={handleOnChange} />
        <label htmlFor={`${idPrefix}${id}`}>{label}</label>
      </li>
    )
}

export default Option

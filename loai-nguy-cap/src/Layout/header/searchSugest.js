import { memo, useEffect, useState } from "react";
import fn_getData from "../../Utils/getdata";


function ShowSearchSugest({api}) {
    const [data,setData] = useState([])
    useEffect(()=>{
        fn_getData(api).then(res=>{
            setData(res.list)
        })
    },[api])
    let newRederData = data.slice(0, 6);
    return(
        newRederData.map((item, index) => (
            <div className="search-sugest_item" key={index} value={item.ten} ><p>{item.ten}</p><span>{item.ten_khoa_hoc}</span></div>
        ))
    )
}
  
// function fn_searchHis(searchSugestContent) {
//       searchSugestContent.addEventListener("click", (event) => {
//         const selectedItem = event.target;
//         searchInput.value = selectedItem.textContent;
//     });
// }

export default memo(ShowSearchSugest)
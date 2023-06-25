
import React, { useContext, useState } from "react";
import { ApiContext } from "../../Context/ApiContect";
import { DataContext } from "../../Context/DataContext";


function SidebarItemBeforeBang(props){
    return(
        <tr>
            <td>{props.ten}</td>
            <td>{props.tenKhoaHoc}</td>
            <td>{props.state}</td>
        </tr>
    )
}
function SidebarItemMoreBang(props){
    return(
        <tr>
            <td>{props.ten}</td>
            <td>{props.tenKhoaHoc}</td>
            <td>{props.state}</td>
        </tr>
    )
}

const ListBang = ()=>{
    const perPage = useContext(ApiContext)
    const data = useContext(DataContext)
    const [sortOrder, setSortOrder] = useState("");

    const handleSortChange = (event) => {
      setSortOrder(event.target.value);
    };
    const sortedDataList = [...data.dataList];
    if (sortOrder === "asc") {
      sortedDataList.sort((a, b) => a.ten.localeCompare(b.ten));
    } else if (sortOrder === "desc") {
      sortedDataList.sort((a, b) => b.ten.localeCompare(a.ten));
    }
    const renderedItemBang= sortedDataList.slice(0,6)
    .map((item,index)=>(
        <SidebarItemBeforeBang
            key ={index}
            ten={item.ten}
            tenKhoaHoc={item.ten_khoa_hoc}
            state = {item.sinh_canh_bi_chia_cat_suy_giam.noi_cu_tru_hoac_phan_bo}
        />
    ))
    const renderedItemMoreBang= sortedDataList.slice(6)
    .map((item,index)=>(
        <SidebarItemMoreBang
            key ={index}
            ten={item.ten}
            tenKhoaHoc={item.ten_khoa_hoc}
            state = {item.sinh_canh_bi_chia_cat_suy_giam.noi_cu_tru_hoac_phan_bo}

        />
    ))

    return(
      <div className="content">
      <b className="total-table">kết quả: {data.total}</b>

      <div className="animals">
        <table className="table-animal">
          <thead className="thead">
            <tr>
              <th>
                Tên
                <select className="sort-select" value={sortOrder} onChange={handleSortChange}>
                  <option value=""></option>
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </select>
              </th>
              <th>Tên khoa học</th>
              <th>Hiện trang</th>
              <th>Danh mục</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {renderedItemBang}
          </tbody>
        </table>
        <hr />
        <b>Kết quả khác</b>
        <div className="animals">
          <table className="table-animal">
            <thead className="thead">
              <tr>
                <th>Tên</th>
                <th>Tên khoa học</th>
                <th>Hiện trang</th>
                <th>Danh mục</th>
              </tr>
            </thead>
            <tbody className="tbody-more">
              {renderedItemMoreBang}
            </tbody>
          </table>
          <div>
            <a className="see-more_bang" href="#" onClick={()=> perPage.setNumPage(perPage.numPage + 3)}>
              Tải Thêm
            </a>
          </div>
        </div>
      </div>
    </div>

    )
}
export default ListBang
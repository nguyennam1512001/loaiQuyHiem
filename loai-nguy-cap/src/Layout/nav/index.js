import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import fn_exportToExcel from "../../Utils/ExportExcell/ExportExcell";

import { NavLink} from 'react-router-dom'
import fn_getData from "../../Utils/getdata";
import { ApiContext } from "../../Context/ApiContect";
function LiItem(props) {
  return (
    <>
      <NavLink activeclassname='active' to={props.to} className="nav-item">
        <div className='nav-link' >
          <i className={props.icon}></i> {props.liChildren}
        </div>
      </NavLink>
    </>
  );
}


function Excell() {
  const api = useContext(ApiContext)
  const [data, setdata] = useState([]);
  useEffect(() => {
    fn_getData(api.api).then((res) => {
      setdata(res.list);
    });
  }, []);
  const handleClick = () => {
    const dataExcell = data.map((item) => ({
      attachments: item.attachments[0],
      kingdomTen: item.kingdom.ten,
      phylumnTen: item.phylumn.ten,
      ten: item.ten,
      tenKhoaHoc: item.ten_khoa_hoc,
    }));
    fn_exportToExcel(dataExcell, "api.xlsx");
  };
  return <i title="Xuất Excel" className="fa-solid fa-file-excel" onClick={handleClick}></i>;
}

const arr = [
  {
    to: '/',
    icon: "ti-layout-grid3-alt",
    liChildren: "LƯỚI",
  },
  {
    to:'/list-bang',
    icon: "fa-solid fa-bars",
    liChildren: "BẢNG",
  },
  {
    to:'/thong-ke',
    icon: "fa-solid fa-chart-simple",
    liChildren: "THỐNG KÊ",
  },
];

const Nav = () => {
  return (
    <>
      <div className="nav">
        <ul className="nav-list">
          {arr.map((obj, index) => {
            return (
              <LiItem
                to={obj.to}
                key={index}
                icon={obj.icon}
                liChildren={obj.liChildren}
              />
            );
          })}
        </ul>
        <Excell />
      </div>
    </>
  );
};
export default Nav;

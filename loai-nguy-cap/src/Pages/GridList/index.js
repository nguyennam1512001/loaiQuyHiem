import React, { useContext, useState } from "react";
import { ApiContext } from "../../Context/ApiContect";
import { DataContext } from "../../Context/DataContext";
import "./styles.css";

function SidebarItemBeforeLuoi(props) {
  const root = "https://loainguycap.ceid.gov.vn";
  let imgSrc = props.attachments ? root + props.attachments.path : "";
  return (
    <div className="animal-item">
      <img className="animal-img" src={imgSrc} alt="" />
      <div className="animal-content">
        <div className="animal-content_infor">
          <div>
            <p>
              {props.kingdomTen}-{props.phylumnTen}
            </p>
            <b>{props.ten}</b>
            <p>{props.tenKhoaHoc}</p>
          </div>
          <div className="animal-QR">qr</div>
        </div>
        <div className="animal-content_htl">
          <p>chưa xác định</p>
          <div>
            <span>CR</span>
            <span className="span2">CR</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function SidebarItemMoreLuoi(props) {
  return (
    <div className="animal-item">
      <div className="animal-content">
        <div className="animal-content_infor">
          <div>
            <p>
              {props.kingdomTen}-{props.phylumnTen}
            </p>
            <b>{props.ten}</b>
            <p>{props.tenKhoaHoc}</p>
          </div>
          <div className="animal-QR">qr</div>
        </div>
        <div className="animal-content_htl">
          <p>chưa xác định</p>
          <div>
            <span>CR</span>
            <span className="span2">CR</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ListLuoi = () => {
  const perPage = useContext(ApiContext)
  const data = useContext(DataContext)
    const renderedItems = data.dataList.slice(0, 6)
      .map((item, index) => (
        <SidebarItemBeforeLuoi
          key={index}
          attachments={item.attachments[0]}
          kingdomTen={item.kingdom.ten}
          phylumnTen={item.phylumn.ten}
          ten={item.ten}
          tenKhoaHoc={item.ten_khoa_hoc}
        />
      ));
      const renderedItemMores = data.dataList.slice(6)
      .map((item, index) => (
        <SidebarItemMoreLuoi
          key={index}
          kingdomTen={item.kingdom.ten}
          phylumnTen={item.phylumn.ten}
          ten={item.ten}
          tenKhoaHoc={item.ten_khoa_hoc}
        />
      ));

  return (
    <div className="content">
      <b className="total-luoi">Kết quả: {data.total}</b>
      <div className="animals">
        <div className="animal-list">{renderedItems}</div>
        <hr />
        <b>Kết quả khác</b>
        <div className="animal-list_more">{renderedItemMores}</div>
        <div>
          <span className="see-more_luoi" onClick={()=> perPage.setNumPage(perPage.numPage+3)}>
            Tải Thêm
          </span>
        </div>
      </div>
    </div>
  );
};
export default ListLuoi;


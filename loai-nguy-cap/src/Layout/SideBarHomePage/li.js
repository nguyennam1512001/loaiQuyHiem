import React, { useState, useEffect } from "react";
import fn_getData from "../../Utils/getdata/index.js";
import Option from "./liOption.js";

// sau khi tối ưu =========
function SideBarOption({childrenTagB ,name,isOpen,toggleOption,children}){
    return(
        <>
            <li className={`sidebar-select ${name}-select`} onClick={toggleOption}>
                <i className={`fa-solid fa-caret-${isOpen?'down':'right'}`}></i>
                <b>{childrenTagB}</b>
            </li>
            {isOpen && (
            <ul className="sidebar-option uicn-option">
                {children}
            </ul>
            )}
        </>
    )
}

function Htl(props){
    const [isOpen, setIsOpen] = useState(false)
    const toggleOption=()=>{
        setIsOpen(!isOpen)
    }

    const [dataLHT, setData] = useState([]);
    useEffect(() => {
        fn_getData(props.apiLHT).then((result) => {
        setData(result);
    });
  }, []);
    return(
        <SideBarOption
            childrenTagB = 'Hiện Trạng Loài'
            name = 'htl'
            isOpen= {isOpen}
            toggleOption={toggleOption}
            children = {dataLHT.map((item, index) => (
                <Option 
                    key={index} 
                    idPrefix="htl" 
                    id={item.id} 
                    value={item.id} 
                    label={item.ten} 
                    count={props.count}  setCount={props.setCount}/>
                ))
            }
        />

    )
}

function Place(props){
    const [dataPlace, setDataPlace] = useState([])
    useEffect(()=>{
        fn_getData(props.apiPlace).then(res=>{
            setDataPlace(res)
        })
    },[])
    const [isOpen, setIsOpen] = useState(false)
    const toggleOption=()=>{
        setIsOpen(!isOpen)
    }
    return(
        <SideBarOption
            childrenTagB = 'Địa giới hành chính'
            name='place'
            isOpen={isOpen}
            toggleOption={toggleOption}
            
            children = {dataPlace.map((item, index) => (
                <Option
                  key={index}
                  idPrefix="place"
                  id={item.id}
                  value={item.id}
                  label={item.name}
                  count={props.count}  setCount={props.setCount}
                />
            ))}
        />
    )
}

function Uicn(props){
    const [isOpen,setIsOpen] = useState(false)
    const toggleOption =()=>{
        setIsOpen(!isOpen)
    }
    const [dataUICN, setDataUICN] = useState([]);
    useEffect(() => {
      fn_getData(props.apiUICN).then((result) => {
        setDataUICN(result[1].childs);
      });
    }, []);
    return(
        <SideBarOption
        childrenTagB = 'IUCN'
        name= 'uicn'
        isOpen={isOpen}
        toggleOption={toggleOption}
        children = { dataUICN.map((item, index) => (
            <Option
              key={index}
              idPrefix="uicn"
              id={item.id}
              value={item.id}
              label={`${item.ma_danh_muc}-${item.ten}`}
              count={props.count}  setCount={props.setCount}
            />
          ))}
        />
    )
}

function UicnVn(props){
    const [dataUICNVN, setUICNVN] = useState([])
    useEffect(()=>{
        fn_getData(props.apiUICN).then(res=>{
            setUICNVN(res[0].childs)
        })
    },[])
    const [isOpen, setIsOpen] = useState(false)
    const toggleOption =()=>{
        setIsOpen(!isOpen)
    }
    return(
        <SideBarOption
        childrenTagB = 'Sách đỏ'
        name = 'uicnVn'
        isOpen={isOpen}
        toggleOption = {toggleOption}
        children = {dataUICNVN.map((item, index) => (
            <Option
              key={index}
              idPrefix="uicn_VN"
              id={item.id}
              value={item.id}
              label={`${item.ma_danh_muc}-${item.ten}`}
              count={props.count}  setCount={props.setCount}
            />
          ))}
        />
    )
}
export {Htl,Place,Uicn,UicnVn}

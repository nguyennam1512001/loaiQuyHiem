import { useState } from "react";
import Select from "react-select";


function Filter(){
    const optionsState = [
        { value: "all", label: "Toàn bộ" },
        { value: "active", label: "Hoạt động" },
        { value: "disable", label: "vô hiệu" },
    ];
    const optionsPermission =[
        { value: "systemManagement", label: "Quyền" },
        { value: "0", label: "Quản trị hệ thống" },
        { value: "1", label: "Ban quản lý dự án" },
        { value: "2", label: "Cơ quan chính phủ" },
        { value: "3", label: "Chính quyền địa phương" },
        { value: "4", label: "Ban quản lý VQG/KBT và các bên liên quan" },
    ]
    const [selectedOptionState, setSelectedOptionState] = useState(optionsState[0]);
    const [selectedOptionPermission, setSelectedOptionPermission] = useState(optionsPermission[0]);

    const handleChangeState = (selected) => {
        setSelectedOptionState(selected);
    };
    const handleChangePermission = (se) => {
        setSelectedOptionPermission(se);
    };
    return(
        <>
        <div className="filter">
            <Select
                className="select"
                options={optionsState}
                value={selectedOptionState}
                onChange={handleChangeState}
            />
        </div>
        <div className="filter">
            <Select
                className="select"
                options={optionsPermission}
                value={selectedOptionPermission}
                onChange={handleChangePermission}
            />
        </div>
        <div className="filter">
            <input placeholder="Ngày bắt đầu"></input>
        </div>
        <div className="filter">
            <input placeholder="Ngày kết thúc"></input>
        </div>
    </>
    )
}

export default Filter
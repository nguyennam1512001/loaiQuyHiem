import { useState } from "react";
import { useForm } from "react-hook-form";
import Api from "../../Constant/Api";
import AddData from "../../Utils/AddData/AddData";
import PermissionList from "../Ul-list/PermissionList";
import './style.css'

function AddForm({ setIsShow, children}){
  const [formData, setFormData] = useState({
    name:"",
    username: "",
    email: "",
    mobile: "",
    password: "",
    password_confirmation:"",
    role_ids: []
  });
  console.log(formData);
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm();
  const [erorrs, setErorrs] = useState([])
  const [permission, setPermission] = useState([])
  const [permissionId, setPermissionId] = useState([])
  const onSubmit = async (data) => {
    try {
            setIsLoading(true)
            await AddData(Api.routerUser, formData);
          } catch (error) {
              console.log('erorr');
          } finally{
            setIsLoading(false)
          }
        reset(); // Reset form after submission
    };
    const [isFocus, setIsFocus]= useState(false)
    const handleFocus=()=>{
        setIsFocus(true)
    }
    const handleBlur=()=>{
        setIsFocus(false)
    }

  const handleContainerClick = (event) => {
    event.stopPropagation();
  };

  const handlePermissionChange = (itemId,num) => {
    const updatedPermissionData = [...permission];
    const updatedPermissionId = [...permissionId]
    const itemIndex = updatedPermissionData.indexOf(itemId);
  
    if (itemIndex > -1) {
      updatedPermissionData.splice(itemIndex, 1);
      updatedPermissionId.splice(itemIndex, 1);
    } else {
      updatedPermissionData.push(itemId);
      updatedPermissionId.push(num);
    }

    setFormData((prevState) => ({
        ...prevState,
        role_ids: updatedPermissionId
    }));
    
    setPermission(updatedPermissionData);
    setPermissionId(updatedPermissionId);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));    
    };
  
    return(
        <div className="wrap_form" onClick={handleBlur}>
            <div className="head-form">
                <h2>Thêm mới người dùng</h2>
                <i className="close fa-sharp fa-solid fa-xmark" onClick={()=>setIsShow(false)}></i>
            </div>
            <div className="form" onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <legend>Tên hiển thị</legend>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        {...register("name")}
                        onChange={handleInputChange}
                    />
                </fieldset>
                {erorrs && <span>{erorrs}</span>}

                <fieldset className="fieldset">
                    <legend>Tên đăng nhập</legend>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        {...register("username")}
                        onChange={handleInputChange}
                    />
                </fieldset>
                {erorrs && <span>{erorrs}</span>}

                <fieldset className="fieldset">
                    <legend>E-Mail</legend>
                    <input
                        type="email"
                        name="email"
                        {...register("email")}
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </fieldset>
                {erorrs && <span>{erorrs}</span>}

                <fieldset className="fieldset">
                    <legend>Điện thoại</legend>
                    <input
                        type="text"
                        name="mobile"
                        {...register("mobile")}
                        value={formData.mobile}
                        onChange={handleInputChange}
                    />
                </fieldset>
                {erorrs && <span>{erorrs}</span>}

                <fieldset className="fieldset">
                    <legend>Mật khẩu</legend>
                    <input
                        type="password"
                        name="password"
                        {...register("password")}
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </fieldset>
                {erorrs && <span>{erorrs}</span>}

                <fieldset className="fieldset">
                    <legend>Mật khẩu xác nhận</legend>
                    <input
                        type="password"
                        name="password_confirmation"
                        {...register("password_confirmation")}
                        value={formData.password_confirmation}
                        onChange={handleInputChange}
                    />
                </fieldset>
                {erorrs && <span>{erorrs}</span>}

                <fieldset className="fieldset">
                    <legend>Quyền</legend>
                    <ul className="list-permiss">
                        {permission.map((item, index) => (
                            <li className="item-permiss" key={index}>
                            {item}
                            </li>
                        ))}
                        <input
                            className="input-permiss"
                            type="text"
                            name="name"
                            {...register("name")}
                            onFocus={handleFocus}
                            onClick={handleContainerClick}
                        />
                    </ul>
                    {isFocus&&<PermissionList
                        handlePermissionChange={handlePermissionChange}
                    />}
                </fieldset>
                {erorrs && <span>{erorrs}</span>}
                <div className="footer-form">
                    <button className="cancel">Huỷ</button>
                    <button type="submit " onClick={()=> AddData(Api.routerUser, formData)} className="add " ><span>+</span>Thêm mới</button>
                </div>
            </div>
        </div>
    )
}

export default AddForm

import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Sidebar from "../../Layout/SideBarAuth/sideBarAuth";
import { FaBars } from 'react-icons/fa';
import "./style.css";
export const ProtectedRoute = () => {
    const [isToggled, setIsToggled] = useState(true);
  const { isChecking, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isChecking) {
    return <div></div>;
  }

  const handleToggle =()=>{
    setIsToggled(!isToggled)
  }
  return isAuthenticated ? (
    <main>
      <div className="header-authpage">
          <FaBars className="menu-icon phone" onClick={handleToggle}/>
        <div className="logo auth">
          <img
            className="logo-img"
            src={process.env.PUBLIC_URL + "/logoColor.png"}
            alt="Logo"
          />
          <h5>
            HỆ THỐNG BÁO CÁO VỀ HIỆN TRANG LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </h5>
        </div>
        <div className="wrap-infor">
          <div className="infor">
            {/* <img className="infor-img" src="" alt="" /> */}
            <p className="infor-name">Ban quản lý dự án</p>
          </div>
          <div className="infor-sub">
            <img className="imfor-img_sub" src="" alt="Logo" />
            <p className="infor-name">Ban quản lý dự án</p>
            <span className="infor-name_roles">Ban quản lý dự án</span>
            <div>
              <button>Hồ sơ</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
      <div className="body-authpage">
        <div className={`sidebar ${isToggled ? '' : 'sidebar_toggle'}`}>
          <Sidebar isToggled={isToggled}/>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </main>
  ) : (
    <Navigate to="/login" replace />
  );
};

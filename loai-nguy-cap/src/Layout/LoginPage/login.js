import { useForm } from "react-hook-form";
import axios from 'axios';
import './style.css';
import { useContext, useState, memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [erorrs, setErorrs] = useState([])
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
        setIsLoading(true)
        const response = await axios.post('http://wlp.howizbiz.com/api/web-authenticate',data)
          // Kiểm tra kết quả đăng nhập từ response
            if(response.status === 200){
                // Đăng nhập thành công
                const accessToken = response.data.access_token
                login(accessToken)
                navigate("/auth/user")
            }
          } catch (error) {
            const erorr = error.response.data.message
            setErorrs(erorr)
            alert("Sai tên đăng nhập hoặc mật khẩu");
          } finally{
            setIsLoading(false)
          }
        reset(); // Reset form after submission
  };

  return (
    <>
    <div className="wrap-form">
        <div className="header-form"> 
            <div className="logo">
                <Link style={{height:'100%'}} to="/">
                    <img className="logo-img" src={process.env.PUBLIC_URL + '/logoColor.png'} alt="Logo" />
                </Link>
                <h5>HỆ THỐNG BÁO CÁO VỀ HIỆN TRANG
                LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC ƯU TIÊN BẢO VỆ</h5>
            </div>
        </div>
        
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
            <img width='30%' src={process.env.PUBLIC_URL + '/logoColor.png'} alt="Logo" />
            <h1>Đăng nhập</h1>
            <input
                type="text"
                name="username"
                placeholder="Tên đăng nhập"
                autoComplete="on"
                {...register("username")}
            />
            {erorrs && <span>{erorrs}</span>}

            <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                {...register("password")}
            />
            {erorrs && <span>{erorrs}</span>}
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Submit'}
            </button>
            <Link>Quên mật khẩu</Link>
        </form>
    </div>
    </>
  )
};

export default memo(LoginPage)

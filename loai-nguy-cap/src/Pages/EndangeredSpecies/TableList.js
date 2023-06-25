import { useContext, useState } from "react";
import {NavLink} from "react-router-dom"
import Pagination from "../../Components/Pagination/pagination"
import Select from 'react-select'
import DeleteModal from "./DeleteModal";
import { ItemContext } from "../../Context/UpdateSpeciesContext";
import { Error, Success } from "../../Components/Alert/Alert";


function TableList(props){
    const data = props.data.list
    const total = props.data?.pagination
    const [currentPage, setCurrentPage] = useState(1);
    const optionsState = [
        { value: "20", label: "20/trang" },
        { value: "30", label: "30/trang" },
        { value: "40", label: "40/trang" },
        { value: "50", label: "50/trang" },
    ];
    const [usersPerPageLable, setUsersPerPageLable] = useState(optionsState[0]); // Số người dùng hiển thị trên mỗi trang
    // Tính toán số trang dựa trên số người dùng và số người dùng trên mỗi trang
    const totalPages =total ? Math.ceil(total.total / props.perPage):0
  
    // Xử lý sự kiện thay đổi trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        props.setPage(pageNumber);
    };
  
    const handleChangeState = (selectedOption) => {
        props.setPerpage(selectedOption.value);
        setUsersPerPageLable(selectedOption)
    };

    const [isShow, setIsShow] = useState(false)
    const [id, setId] = useState('')
    const handleDelete =(userId)=>{
        setIsShow(true)
        setId(userId)
    }

    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const handleDeleteSpecise = () => {
        setIsShow(false)
        const endpoint = "http://wlp.howizbiz.com/api/species";
      
        fetch(`${endpoint}/${id}`, { method: 'DELETE' })
          .then((response) => {
            if (response.ok) {
                setDeleteSuccess(true)
                setTimeout(() => {
                    setDeleteSuccess(false);
                  }, 2500)
            } else {
                setDeleteError(true)
                setTimeout(() => {
                    setDeleteError(false);
                  }, 2500)
            }
          })
          .catch((error) => {
            console.error('Đã xảy ra lỗi:', error);
          });
    };

    const itemContext = useContext(ItemContext)
    const handleNavLinkClick = (item) => {
        itemContext.setSelectedItem(item);
    };
    return(
        <>
        {deleteSuccess && <Success message="Xoá thành công!" />}
        {deleteError && <Error message="Xoá thất bại!" />}
        <div style={{height:"65vh"}} className="wrap-table">
        <div className="wrap-scroll">
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Tên khoa học</th>
                        <th>Giới</th>
                        <th>Ngành</th>
                        <th>Lớp</th>
                        <th>Bộ</th>
                        <th>Họ</th>
                        <th>Chi</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item)=>(
                        <tr key={item.id}>
                            <td><div style={{display:"flex", alignItems:"center" }}><img style={{height:"40px", width:"40px", borderRadius:"50%"}} src={item.attachments[0] ? "https://loainguycap.ceid.gov.vn" + item.attachments[0].path : ""}/><p style={{marginLeft:"10px" ,width:"80px",overflowWrap:"break-word", wordWrap:"break-word"}}>{item.ten}</p></div></td>
                            <td>{item.ten_khoa_hoc}</td>
                            <td>{item.kingdom.ten}</td>
                            <td>{item.phylumn.ten}</td>
                            <td>{item.class.ten}</td>
                            <td>{item.order.ten}</td>
                            <td>{item.family.ten_khoa_hoc}</td>
                            <td>{item.genus.ten_khoa_hoc}</td>
                            <td>
                                <NavLink 
                                    to="/auth/chi-tiet" 
                                    title="Cập nhập"
                                    onClick={() => handleNavLinkClick(item)}
                                    >
                                    <i className="fa-sharp fa-solid fa-pen"></i>
                                </NavLink>
                                <button 
                                    onClick={()=>handleDelete(item.id)}
                                    title="Xoá"
                                    >
                                    <i className="fa-sharp fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            {isShow&&
            <DeleteModal setIsShow={setIsShow}>
                <div className="content-modal_addnew">
                <h2>Bạn có chắc chắn không?</h2>
                    <p>Bạn có chắc muốn xóa? Điều này hoàn toàn không thế hoàn tác!</p>
                <div>
                    <button className="btn-cancel" onClick={()=> setIsShow(false)}>Cancel</button>
                    <button className="btn-delete" onClick={handleDeleteSpecise}>Delete</button>
                </div>
                </div>
            </DeleteModal>}
        </div>
        <div style={{display:'flex', alignItems:'center'}}>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <div>
                <Select 
                    className="select-userPerpage"
                    options={optionsState}
                    value={usersPerPageLable}
                    onChange={handleChangeState}
                />
            </div>
        </div>
        </>
    )
}

export default TableList

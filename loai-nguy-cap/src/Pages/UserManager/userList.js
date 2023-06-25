import { useState } from "react";
import Pagination from "../../Components/Pagination/pagination"
import Select from 'react-select'


function UserList(props){
    const data = props.data.list
    const total = props.data?.pagination
    const [currentPage, setCurrentPage] = useState(1);
    const optionsState = [
        { value: "5", label: "5/trang" },
        { value: "10", label: "10/trang" },
        { value: "20", label: "20/trang" },
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

    const handleDeleteUser = (userId) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này?');
        if (confirmDelete) {fetch(`${props.router}/${userId}`, {
          method: 'DELETE',
            })
            .then((response) => {
                if (response.ok) {
                alert('Xóa người dùng thành công');
                } else {
                alert('Lỗi xóa người dùng');
                }
            })
            .catch((error) => {
                console.log('Lỗi gửi yêu cầu xóa người dùng:', error);
            });
            };
        }
    return(
        <>
        <div className="wrap-table">
        <div className="wrap-scroll">
            <table>
                <thead>
                    <tr>
                        <th>Tên hiển thị</th>
                        <th>Tên đăng nhập</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th>Quyền</th>
                        <th>Ngày tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item)=>(
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>{item.updated_by?.mobile}</td>
                            <td style={{textAlign:"center"}}><input type="checkbox"/></td>
                            <td><b style={{backgroundColor:`${item.updated_by?.role?.meta.color}`, padding:"4px"}}>{item.updated_by?.role?.name}</b></td>
                            <td><span>{item.created_at.split(" ")[0]}</span></td>
                            <td>
                                <button
                                 title="Đặt lại mật khẩu"><i className="fa-sharp fa-solid fa-lock"></i></button>
                                <button title="Cập nhập"><i className="fa-sharp fa-solid fa-pen"></i></button>
                                <button 
                                onClick={()=>handleDeleteUser(item.id)}
                                title="Xoá"><i className="fa-sharp fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
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

export default UserList
import { useForm } from "react-hook-form";
import { useRef,useContext, useState, useEffect } from "react";
import './style.css';
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { ItemContext } from "../../Context/UpdateSpeciesContext";
import { Error, Success } from "../../Components/Alert/Alert";
import { AiOutlineArrowLeft } from 'react-icons/ai';


function UpdateSpecies(){
    const { register, handleSubmit, reset } = useForm();
    const [erorrs, setErorrs] = useState([])
    const [error, setError] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const context = useContext(ItemContext);
    const storedSelectedItem = localStorage.getItem('selectedItem');
    const initialSelectedItem = storedSelectedItem ? JSON.parse(storedSelectedItem) : "";
    const [selectedItem, setSelectedItem] = useState(initialSelectedItem?initialSelectedItem:context.selectedItem);
    localStorage.setItem('selectedItem', JSON.stringify(selectedItem?selectedItem:''));

    const [isShowKingdom, setIsShowKingdom] = useState(false)
    const [isShowPhylum, setIsShowPhylum] = useState(false)
    const [isShowClass, setIsShowClass] = useState(false)
    const [isShowOrder, setIsShowOrder] = useState(false)
    const [isShowFamily, setIsShowFamily] = useState(false)
    const [isShowGenus, setIsShowGenus] = useState(false)
    
    const [selectedKingdomValue, setSelectedKingdomValue] = useState(selectedItem && selectedItem.kingdom.ten_khoa_hoc?selectedItem.kingdom.ten_khoa_hoc+"-"+selectedItem.kingdom.ten : "");
    const [selectedKingdomId, setSelectedKingdomId] = useState(selectedItem&&selectedItem.kingdom.id);
    const [selectedPhylumValue, setSelectedPhylumValue] = useState(selectedItem && selectedItem.phylumn.ten_khoa_hoc? selectedItem.phylumn.ten_khoa_hoc+"-"+selectedItem.phylumn.ten :"");
    const [selectedPhylumId, setSelectedPhylumId] = useState(selectedItem&&selectedItem.phylumn.id);
    const [selectedClassValue, setSelectedClassValue] = useState(selectedItem && selectedItem.class.ten_khoa_hoc? selectedItem.class.ten_khoa_hoc+"-"+selectedItem.class.ten :"");
    const [selectedClassId, setSelectedClassId] = useState(selectedItem&&selectedItem.class.id);
    const [selectedOrderValue, setSelectedOrderValue] = useState(selectedItem && selectedItem.order.ten_khoa_hoc? selectedItem.order.ten_khoa_hoc+"-"+selectedItem.order.ten : "");
    const [selectedOrderId, setSelectedOrderId] = useState(selectedItem&&selectedItem.order.id);
    const [selectedFamilyValue, setSelectedFamilyValue] = useState(selectedItem && selectedItem.family.ten_khoa_hoc?selectedItem.family.ten_khoa_hoc : "");
    const [selectedFamilyId, setSelectedFamilyId] = useState(selectedItem&&selectedItem.family.id);
    const [selectedGenusValue, setSelectedGenusValue] = useState(selectedItem && selectedItem.genus.ten_khoa_hoc?selectedItem.genus.ten_khoa_hoc : "");
    const [selectedGenusId, setSelectedGenusId] = useState(selectedItem&&selectedItem.genus.id);

    const hideTimeoutRef = useRef(null);

    const hideDropdown = (setter) => {
        hideTimeoutRef.current = setTimeout(() => {
          setter(false);
        }, 200);
    };

    const handleItemClickKingdom = (value,ten, id) => {
        setSelectedKingdomValue(value+"-"+ten);
        setSelectedKingdomId(id)
        hideDropdown(setIsShowKingdom)
    };
    const handleItemClickPhylum = (value,ten, id) => {
        setSelectedPhylumValue(value+"-"+ten);
        setSelectedPhylumId(id)
        hideDropdown(setIsShowPhylum)
    };
    const handleItemClickClass = (value, ten, id) => {
        setSelectedClassValue(value+"-"+ten);
        setSelectedClassId(id)
        hideDropdown(setIsShowClass)
    };
    const handleItemClickOrder = (value, id) => {
        setSelectedOrderValue(value);
        setSelectedOrderId(id)
        hideDropdown(setIsShowOrder)
    };
    const handleItemClickFamily = (value, id) => {
        setSelectedFamilyValue(value);
        setSelectedFamilyId(id)
        hideDropdown(setIsShowFamily)
    };

    const handleItemClickGenus = (value, id) => {
        setSelectedGenusValue(value);
        setSelectedGenusId(id)
        hideDropdown(setIsShowGenus)
    };

    const handleFocus = (setShow) => {
        clearTimeout(hideTimeoutRef.current);
        setShow(true);
    };
    const handleBlur = (setShow) => {
        hideTimeoutRef.current = setTimeout(() => {
                setShow(false);
        },200);
    };
    // const data = {
    //     ten: '',
    //     ten_khoa_hoc: '',
    //     genus_id: 14006,
    //     family_id: 534,
    //     order_id: 117,
    //     class_id: 13,
    //     phylum_id: 9,
    //     kingdom_id: 1,
    //     nguon_du_lieu: '',
    //     ten_dia_phuong: '',
    //     ten_tac_gia: '',
    //     sach_dos: [{ nam: 2023, id: 2 }],
    //     iucns: [{ nam: 2023, id: 18 }],
    //   }
    const [addSuccess, setAddSuccess] = useState(false);
    const [addError, setAddError] = useState(false);
    const onSubmit = (data) => {
        setIsLoading(true);
        data.kingdom_id = selectedKingdomId
        data.phylum_id = selectedPhylumId;
        data.class_id = selectedClassId
        data.order_id = selectedOrderId
        data.family_id = selectedFamilyId
        data.genus_id = selectedGenusId;
        console.log(data);
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        };

        fetch(`http://wlp.howizbiz.com/api/species/${selectedItem.id}`, requestOptions)
        .then((response) => {
            setIsLoading(false);
            if (response.ok) {
              setAddSuccess(true)
                setTimeout(() => {
                    setAddSuccess(false);
                  }, 2500)
                navigate("/auth/loai")
             } else if (response.status === 400) {
                setErorrs('Yêu cầu không hợp lệ');
                setAddError(true)
                setTimeout(() => {
                    setAddError(false);
                  }, 2500)
              } else if (response.status === 401) {
                setErorrs('Không có quyền truy cập');
                setAddError(true)
                setTimeout(() => {
                    setAddError(false);
                  }, 2500)
              } else if (response.status === 500) {
                setErorrs(response.statusText);
                setAddError(true)
                setTimeout(() => {
                    setAddError(false);
                  }, 2500)
              } else {
                alert('Đã xảy ra lỗi khi sửa loài.');
              }
            })
          .catch((error) => {
            setIsLoading(false);
            console.error('Đã xảy ra lỗi:', error);
          });
    };

    const data = useContext(AuthContext)
    const kingdomData = data.kingdom
    const phylumData = data.phylum
    const classData = data.Class
    const orderData = data.order
    const familyData = data.family
    const GenusData = data.genus

  const handleSearch = (e, setSearch ) => {
    setSearch(e.target.value);
  };
  
  // Lọc danh sách Data dựa trên searchTerm
  const filterData = (data, searchTerm) => {
    return data?.filter(item =>
      item.ten_khoa_hoc?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const filteredKingdomData = filterData(kingdomData, selectedKingdomValue);
  const filteredPhylumData = filterData(phylumData, selectedPhylumValue);
  const filteredClassData = filterData(classData, selectedClassValue);
  const filteredOrderData = filterData(orderData, selectedOrderValue);
  const filteredFamilyData = filterData(familyData, selectedFamilyValue);
  const filteredGenusData = filterData(GenusData, selectedGenusValue);
  
  const dateString = selectedItem.updated_at;
  const date = new Date(dateString);
  const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}` 

  const formattedTime=` ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

    return(
        <>
        {isLoading && <div className="loading"></div>}
        {isLoading && <div className="loading-width"></div>}
        {addSuccess && <Success message="Sửa loài thành công!" />}
        {addError && <Error message={erorrs} />}
        <div className="AddNewSpecies-header">
            <h4>
            <NavLink to="/auth/loai">
                <AiOutlineArrowLeft className="arrow-icon"/>
            </NavLink>
                THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU TIÊN BẢO VỆ</h4>
            <div className="update-time">
                <b>Cập nhật lúc: {formattedDate}</b> <br/>
                <b>{formattedTime}</b>
            </div>
        </div>

        <form className="form-addnew" onSubmit={handleSubmit(onSubmit)}>
            
            <b>I. Thông tin chung về loài</b>
            <div className="category" style={{display:"flex"}}>
                <div style={{width:"70%"}}>
                    <div className="wrap-input">
                        <p className="label-name">Tên <span className="required">*</span></p>
                        <input
                            type="text"
                            name="ten"
                            placeholder="Tên"
                            autoComplete="off"
                            value={selectedItem.ten}
                            {...register("ten")}
                            onChange={(e) => setSelectedItem({ ...selectedItem, ten: e.target.value })}
                        ></input>
                        {error && <p>{error}</p>}
                    </div>
                    <div style={{display:"flex"}}>
                        <div className="wrap-input">
                            <p className="label-name">Tên khoa học <span className="required">*</span></p>
                            <input
                                type="text"
                                name="ten_khoa_hoc"
                                placeholder="Tên khoa học"
                                autoComplete="off"
                                value={selectedItem.ten_khoa_hoc}
                                {...register("ten_khoa_hoc")}
                                onChange={(e) => setSelectedItem({ ...selectedItem, ten_khoa_hoc: e.target.value })}

                            />
                            {error && <p className="magin0">{error}</p>}
                        </div>
                        <div className="wrap-input">
                            <p className="label-name">Tên Tác Giả</p>
                            <input
                                type="text"
                                name="ten_tac_gia"
                                placeholder="Tên Tác Giả"
                                autoComplete="off"
                                {...register("ten_tac_gia")}
                                value={selectedItem.ten_tac_gia}
                                onChange={(e) => setSelectedItem({ ...selectedItem, ten_tac_gia: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="wrap-input">
                        <p className="label-name">Tên Địa Phương</p>
                        <input
                            type="text"
                            name="ten_dia_phuong"
                            placeholder="Tên Địa Phương"
                            autoComplete="off"
                            {...register("ten_dia_phuong")}
                            value={selectedItem.ten_dia_phuong}
                            onChange={(e) => setSelectedItem({ ...selectedItem, ten_dia_phuong: e.target.value })}
                        />
                    </div>
                    <div className="wrap-input">
                        <p className="label-name">Nguồn Dữ Liệu</p>
                        <input
                            type="text"
                            name="nguon_du_lieu"
                            placeholder="Nguồn Dữ Liệu"
                            autoComplete="off"
                            {...register("nguon_du_lieu")}
                            value={selectedItem.nguon_du_lieu}
                            onChange={(e) => setSelectedItem({ ...selectedItem, nguon_du_lieu: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <p>Trạng thái</p>
                </div>
            </div>

            <b>II. Phân loại học</b>
            <div className="category">
                <div style={{display:"flex"}}>
                    
                    <div className="wrap-input">
                        <p className="label-name">Giới  <span className="required">*</span></p>
                        <div className="inputClear">
                            <input
                                name="kingdom_id"
                                type="search"
                                placeholder="Giới"
                                autoComplete="off"
                                onFocus={()=> handleFocus(setIsShowKingdom)}
                                // {...register('kingdom_id')}
                                onBlur={() => {
                                    handleBlur(setIsShowKingdom);
                                }} 
                                value={ selectedKingdomValue}
                                onChange={(e)=> handleSearch(e, setSelectedKingdomValue)}
                            />
                            {selectedKingdomValue && (
                            <button className="clear-input" onClick={()=>setSelectedKingdomValue("")}>
                                X
                            </button>)}
                        </div>
                        {isShowKingdom&&<ul>
                        {filteredKingdomData?.slice(0, 6).map(item =>(
                            <li key={item.uuid} 
                                onClick={() => handleItemClickKingdom(item.ten_khoa_hoc&&item.ten_khoa_hoc, item.ten ,item.uuid&&item.uuid)}>
                                {item.ten_khoa_hoc}-{item.ten}
                            </li>
                        ))}
                        </ul>}
                        {error && <p>{error}</p>}
                    </div>
                    
                    <div className="wrap-input">
                        <p className="label-name">Ngành  <span className="required">*</span></p>
                        <div className="inputClear">
                            <input
                                name="phylum_id"
                                type="search"
                                placeholder="Ngành"
                                autoComplete="off"
                                onFocus={()=> handleFocus(setIsShowPhylum)}
                                // {...register('phylum_id', { required: true })}
                                onBlur={() => {
                                    handleBlur(setIsShowPhylum);
                                }}
                                value={selectedPhylumValue}
                                onChange={(e)=> handleSearch(e, setSelectedPhylumValue)}
                            />
                            {selectedPhylumValue && (
                            <button className="clear-input" onClick={()=>setSelectedPhylumValue("")}>
                                X
                            </button>)}
                        </div>
                        {isShowPhylum&&<ul>
                        {filteredPhylumData?.slice(0, 6).map(item =>(
                            <li key={item.uuid} 
                                onClick={() => handleItemClickPhylum(item.ten_khoa_hoc&&item.ten_khoa_hoc, item.ten ,item.uuid)}>
                                {item.ten_khoa_hoc}-{item.ten}
                            </li>
                        ))}
                        </ul>}
                        {error && <p>{error}</p>}
                    </div>

                    <div className="wrap-input">
                        <p className="label-name">Lớp  <span className="required">*</span></p>
                        <div className="inputClear">
                            <input
                                name="class_id"
                                type="search"
                                placeholder="Lớp"
                                autoComplete="off"
                                onFocus={()=> handleFocus(setIsShowClass)}
                                // {...register('class_id')}
                                onBlur={() => {
                                    handleBlur(setIsShowClass);
                                }}
                                value={selectedClassValue}
                                onChange={(e)=> handleSearch(e, setSelectedClassValue)}
                            />
                            {selectedClassValue && (
                            <button className="clear-input" onClick={()=>setSelectedClassValue("")}>
                                X
                            </button>)}
                        </div>
                        {isShowClass&&<ul>
                        {filteredClassData?.slice(0, 6).map(item =>(
                            <li key={item.uuid} 
                                onClick={() => handleItemClickClass(item.ten_khoa_hoc&&item.ten_khoa_hoc, item.ten ,item.uuid)}>
                                {item.ten_khoa_hoc}-{item.ten}
                            </li>
                        ))}
                        </ul>}
                        {error && <p>{error}</p>}
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div className="wrap-input">
                        <p className="label-name">Bộ  <span className="required">*</span></p>
                        <div className="inputClear">
                            <input
                                name="order_id"
                                type="search"
                                placeholder="Bộ"
                                autoComplete="off"
                                // {...register('order_id', { required: true })}
                                onFocus={()=> handleFocus(setIsShowOrder)}
                                onBlur={() => {
                                    handleBlur(setIsShowOrder);
                                }}
                                value={selectedOrderValue}
                                onChange={(e)=> handleSearch(e, setSelectedOrderValue)}
                            />
                            {selectedOrderValue && (
                            <button className="clear-input" onClick={()=>setSelectedOrderValue("")}>
                                X
                            </button>)}
                        </div>
                        {isShowOrder&&<ul>
                        {filteredOrderData?.slice(0, 6).map(item =>(
                            <li key={item.uuid} 
                                onClick={() => handleItemClickOrder(item.ten_khoa_hoc&&item.ten_khoa_hoc ,item.uuid)}>
                                {item.ten_khoa_hoc}
                            </li>
                        ))}
                        </ul>}
                        {error && <p>{error}</p>}
                    </div>

                    <div className="wrap-input">
                        <p className="label-name">Họ  <span className="required">*</span></p>
                        <div className="inputClear">
                            <input
                                name="family_id"
                                type="search"
                                placeholder="Họ"
                                autoComplete="off"
                                // {...register('family_id', { required: true })}
                                onFocus={()=> handleFocus(setIsShowFamily)}
                                onBlur={() => {
                                    handleBlur(setIsShowFamily);
                                }}
                                value={selectedFamilyValue}
                                onChange={(e)=> handleSearch(e, setSelectedFamilyValue)}
                            />
                            {selectedFamilyValue && (
                            <button className="clear-input" onClick={()=>setSelectedFamilyValue("")}>
                                X
                            </button>)}
                        </div>
                        {isShowFamily&&<ul>
                        {filteredFamilyData?.slice(0, 6).map(item =>(
                            <li key={item.uuid} 
                                onClick={() => handleItemClickFamily(item.ten_khoa_hoc&&item.ten_khoa_hoc ,item.uuid)}>
                                {item.ten_khoa_hoc}
                            </li>
                        ))}
                        </ul>}
                        {error && <p>{error}</p>}
                    </div>
                    <div className="wrap-input">
                        <p className="label-name">Chi  <span className="required">*</span></p>
                        <div className="inputClear">
                            <input
                                name="genus_id"
                                type="search"
                                placeholder="Chi"
                                autoComplete="off"
                                // {...register('genus_id', { required: true })}
                                onFocus={()=>handleFocus(setIsShowGenus)}
                                onBlur={() => {
                                    handleBlur(setIsShowGenus);
                                }}
                                value={selectedGenusValue}
                                onChange={(e)=> handleSearch(e, setSelectedGenusValue)}
                            />
                            {selectedGenusValue && (
                            <button className="clear-input" onClick={()=>setSelectedGenusValue("")}>
                                X
                            </button>)}
                        </div>
                        {isShowGenus&&<ul>
                        {filteredGenusData?.slice(0, 6).map(item =>(
                            <li key={item.uuid} 
                                onClick={() => handleItemClickGenus(item.ten_khoa_hoc&&item.ten_khoa_hoc,item.uuid)}>
                                {item.ten_khoa_hoc}
                            </li>
                        ))}
                        </ul>}
                        {error && <p>{error}</p>}
                    </div>
                </div>
            </div>
            <b>III. Tình trạng bảo tồn</b>
            <div className="category" style={{display:"flex"}}>
                <div style={{flex:"1"}}>
                    <b>Sách đỏ</b>
                    <div style={{display:"flex"}}>
                        <div style={{flex:"1"}}>
                            <p className="label-name">Năm</p>
                            <select {...register('class_id')} id="class_id">
                                <option value="">2023</option>
                            </select>
                        </div>
                        <div style={{flex:"1"}}>
                            <p className="label-name">Hiện trạng</p>
                            <select {...register('class_id')} id="class_id">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                </div>
                <div style={{flex:"1"}}>
                    <b>IUCN</b>
                    <div style={{display:"flex"}}>
                        <div style={{flex:"1"}}>
                            <p className="label-name">Năm</p>
                            <select {...register('class_id')} id="class_id">
                                <option value="">2023</option>
                            </select>
                        </div>
                        <div style={{flex:"1"}}>
                            <p className="label-name">Hiện trạng</p>
                            <select {...register('class_id')} id="class_id">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="wrap-btn">
                <button className="btn-primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Thêm'}
                </button>
            </div>
        </form>
        </>
    )
}

export default UpdateSpecies
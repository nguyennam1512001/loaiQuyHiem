import './style.css'

function Modal({setIsShow,children}){
    const handleHideModal=()=>{
        setIsShow(false)
    }
    const handleContainerClick = (event) => {
        event.stopPropagation();
      };
    return(
        <div onClick={handleHideModal} className="modal">
            <div onClick={handleContainerClick} className="modal-container">
                {children}
            </div>
        </div>
    )
}

export default Modal
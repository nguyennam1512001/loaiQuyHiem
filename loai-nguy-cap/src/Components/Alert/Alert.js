import { FaCheckCircle, } from 'react-icons/fa';
import { PiWarningCircleFill, } from 'react-icons/pi';
import "./style.css"

function Error({message}){
    return(
        <div className='modal-alert'>
            <div className='alert'>
                <span className='error'><PiWarningCircleFill/></span>
                <div>
                    <h4>Thất bại</h4>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}

function Success(message){
    return(
        <div className='modal-alert'>
            <div className='alert'>
                <span className='success'><FaCheckCircle/></span>
                <div>
                    <h2>Thành công</h2>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}

export {Error, Success}
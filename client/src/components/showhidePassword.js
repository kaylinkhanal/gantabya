import React, {useState} from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ShowhidePassword = (props)=>{
    const [showPassword, setShowPassword] = useState(false)
    return(
        <div className="input_wrap">
            <i onClick={()=> setShowPassword(!showPassword)}>{showPassword ? <FaEye/> : <FaEyeSlash/>}</i>

            <input type={showPassword ? 'text' : 'password'} placeholder={props.placeholder} {...props.field}></input>
        </div>
    )
}
export default ShowhidePassword
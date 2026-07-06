import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    return(
        <div className="login-form-container">
            <form className="login-form">
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
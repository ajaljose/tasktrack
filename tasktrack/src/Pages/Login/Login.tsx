import { useState } from "react";
import { Outlet } from "react-router-dom";
import CommonAPI from "../../services/CommonAPI";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../../context/ContextApi";
const Login = () => {
    const [email, setEmail] = useState("admin");
    const [password, setPassword] = useState("123");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const {setUserDetails } = useAppContext();
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setError(false);
        let loginResponse:any= await CommonAPI.getData("auth",{},{});
        if(loginResponse.data.username===email && loginResponse.data.password===password){
            setUserDetails({name:loginResponse.data.username,password:loginResponse.data.password});
            navigate("/");
        }
        else{
            alert("Incorrect Credentials!!!  Use usernam: admin, password:123")
            setError(true);
        }
      }
    return (
        <>
            <div className="login__container">
                <h1>Welcome to Task Track</h1>
                <form  onSubmit={handleSubmit}>
                    <div className='login__group'>
                        <label htmlFor="emailid">Email Id</label>
                        <input type="text" required id="emailid"onChange={(e) => setEmail(e.target.value)} placeholder="admin" value={email}></input>
                    </div>
                    <div className='login__group'>
                        <label >Passoword</label>
                        <input type="password" required onChange={(e) => setPassword(e.target.value)} placeholder="123" value={password}></input>
                    </div>
                    {
                        error?<p>Incorrect Username or Password!</p>:""
                    }
                    <button type="submit" className="btn__primary">Login</button>
                </form>
            </div>
            <Outlet></Outlet>
        </>
    )
}

export default Login
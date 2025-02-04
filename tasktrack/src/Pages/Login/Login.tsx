import { Outlet } from "react-router-dom";
const Login = () => {

    const handleSubmit = () => {
        
      }
    return (
        <>
            <div className="login__container">
                <h1>Welcome to Task Track</h1>
                <form  onSubmit={handleSubmit}>
                    <div className='login__group'>
                        <label htmlFor="emailid">Email Id</label>
                        <input type="text" required id="emailid"></input>
                    </div>
                    <div className='login__group'>
                        <label >Passoword</label>
                        <input type="password" required ></input>
                    </div>
                    <button type="submit" className="btn__primary">Login</button>
                </form>
            </div>
            <Outlet></Outlet>
        </>
    )
}

export default Login
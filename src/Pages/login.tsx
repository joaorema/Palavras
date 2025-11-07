import '../css/login.css'

function LoginPage(){
    return(
        <div className="login-container">
            <div className="login-box">
              <div className='register'>
                <h2>Login Page</h2>
                <form>
                    <input type='text' placeholder='Username' />
                    <input type='text' placeholder='Password' />
                    <button type="submit">Login</button>
                </form>
              </div>
              <button type='submit'>Register</button>
            </div>
        </div>
    )
}

export default LoginPage
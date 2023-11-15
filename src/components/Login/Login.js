import { useState } from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userServices';

const Login = (props) => {
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    const defaultObjValidInput = {
        isVaLidValueLogin: true,
        isVaLidPassword: true
    }

    const [objVaLidInput, setObjValidInput] = useState(defaultObjValidInput);

    const handleCreateNewAccount = () => {
        history.push("/register");
    }
    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);

        if (!valueLogin) {
            toast.error("Please enter your email or phone number!");
            setObjValidInput({ ...defaultObjValidInput, isVaLidValueLogin: false })
            return;
        }
        if (!password) {
            toast.error("Please enter your password!")
            setObjValidInput({ ...defaultObjValidInput, isVaLidPassword: false })
            return;
        }
        let response = await loginUser(valueLogin, password);
        if (response && response.data && +response.data.EC === 0) {
            //success
            let data = {
                isAuthenticated: true,
                token: 'fake token'
            }
            sessionStorage.setItem('account', JSON.stringify(data))
            history.push("/users");
        }
        if (response && response.data && +response.data.EC !== 0) {
            //error
            toast.error(response.data.EM)
        }
    }

    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>Hi-school</div>
                        <div className='detail'>Learn world</div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <div className='brand d-sm-none'>Hi-school</div>
                        <input
                            type='text'
                            className={objVaLidInput.isVaLidValueLogin ? 'form-control' : 'is-invalid form-control'}
                            placeholder='Email address or phone number'
                            value={valueLogin}
                            onChange={((event) => { setValueLogin(event.target.value) })}
                        ></input>
                        <input
                            type='password'
                            className={objVaLidInput.isVaLidPassword ? 'form-control' : 'is-invalid form-control'}
                            placeholder='Password'
                            value={password}
                            onChange={((event) => { setPassword(event.target.value) })}
                        ></input>
                        <button className='btn btn-primary'
                            onClick={() => handleLogin()}
                        >Login</button>

                        <span className='text-center'>
                            <a className='forgot-password'
                                href='#'>Forgot your password?</a></span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>
                                Create New Account
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Login;
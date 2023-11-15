import { useEffect, useState } from 'react';
import './Register.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerNewUser } from '../../services/userServices';





const Register = (props) => {

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }

    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);
        if (!email) {
            toast.error("Email is required!");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Please enter a valid email!");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        if (!phone) {
            toast.error("Phone is required!")
            return false;
        }
        if (!password) {
            toast.error("Password is required!")
            return false;
        }
        if (password != confirmPassword) {
            toast.error("Password is not the same!")
            return false;
        }

        return true;
    }

    const handleRegister = async () => {
        let check = isValidInputs();
        if (check === true) {
            let reponse = await registerNewUser(email, phone, username, password);
            let serverData = reponse.data;
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                history.push("/login");
            } else {

                toast.error(serverData.EM);
            }
        }
    }


    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }

    return (
        <div className="register-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>Hi-school</div>
                        <div className='detail'>Learn world</div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <div className='brand d-sm-none'>Hi-school</div>
                        <form>
                            <div className='form-group'>
                                <label>Email:</label>
                                <input type='text' className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder='Email address'
                                    value={email} onChange={(event) => setEmail(event.target.value)
                                    }></input>

                            </div>
                            <div className='form-group'>
                                <label>Phone number:</label>
                                <input type='text' className={(objCheckInput.isValidPhone) ? 'form-control' : 'form-control is-invalid'} placeholder='Phone number'
                                    value={phone} onChange={(event) => setPhone(event.target.value)
                                    }></input>
                            </div>
                            <div className='form-group'>
                                <label>Username:</label>
                                <input type='text' className='form-control' placeholder='Username'
                                    value={username} onChange={(event) => setUsername(event.target.value)
                                    }></input>
                            </div>
                            <div className='form-group'>
                                <label>Password:</label>
                                <input type='password' className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                    placeholder='Password'
                                    value={password} onChange={(event) => setPassword(event.target.value)
                                    }></input>
                            </div>
                            <div className='form-group'>
                                <label>Re-enter Password:</label>
                                <input type='password' className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'}
                                    placeholder='Re-enter Password'
                                    value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)
                                    }></input>
                            </div>
                        </form>
                        <button className='btn btn-primary' type='button' onClick={() => handleRegister()}>Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already've an Account. Login
                            </button>
                        </div>
                    </div>

                </div>
            </div >
        </div >
    )
}
export default Register;
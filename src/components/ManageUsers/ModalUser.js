import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { createNewUser, fetchGroup, updateCurrentUser } from '../../services/userServices';
import { toast } from 'react-toastify';
import _, { forEach } from 'lodash'

const ModalUser = (props) => {
    const { action, dataModalUser } = props;

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }
    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }

    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);

    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        getGroups();

    }, [])

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' });
        }
    }, [dataModalUser])

    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, group: userGroups[0].id })
            }
        }
    }, [action])

    const getGroups = async () => {
        let res = await fetchGroup();
        console.log(res)
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT);
            if (res.data.DT && res.data.DT.length > 0) {
                let groups = res.data.DT;
                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(res.data.EM)
        }
    }

    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }

    const CheckValidInputs = () => {

        if (action === 'UPDATE') return true;

        // create user
        setValidInputs(validInputsDefault);
        let arr = ['email', 'phone', 'password', 'group'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            // check empty input
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);

                toast.error(`Empty input ${arr[i]}`);

                check = false;
                break;
            }
        }
        return check;
    }

    const handleConfirmUser = async () => {

        //create User
        let check = CheckValidInputs();
        if (check) {
            let res = action === 'CREATE' ?
                await createNewUser({ ...userData, groupId: userData['group'] })
                : await updateCurrentUser({ ...userData, groupId: userData['group'] });

            if (res && res.data.EC === 0) {
                props.onHide();
                setUserData({
                    ...defaultUserData, group: userGroups && userGroups.length > 0
                        ? userGroups[0].id : ''
                })
            }
            if (res.data && res.data.EC !== 0) {
                toast.error(res.data.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.data.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    }
    const handleCloseModalUser = () => {
        props.onHide();
        setUserData(defaultUserData);
        setValidInputs(validInputsDefault);
    }

    return (
        <>
            <Modal size="lg" show={props.show} className='modal-user' onHide={() => handleCloseModalUser()} >
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.action === 'CREATE'
                            ? 'Crete new user' : 'Edit a user'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email Address (<span className='text-danger'>*</span>): </label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                type="email" value={userData.email}
                                onChange={(event) => handleOnChangeInput(event.target.value, "email")}

                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone Number(<span className='text-danger'>*</span>):</label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                type="text" value={userData.phone}
                                onChange={(event) => handleOnChangeInput(event.target.value, "phone")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username:</label>
                            <input className='form-control'
                                type="text" value={userData.username}
                                onChange={(event) => handleOnChangeInput(event.target.value, "username")} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            {action === 'CREATE'
                                && <>
                                    <label>Password(<span className='text-danger'>*</span>):</label>
                                    <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                                        type="password" value={userData.password}
                                        onChange={(event) => handleOnChangeInput(event.target.value, "password")} />
                                </>
                            }

                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Address:</label>
                            <input className='form-control' type="text" value={userData.address}
                                onChange={(event) => handleOnChangeInput(event.target.value, "address")} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender:</label>
                            <select className='form-select'
                                onChange={(event) => handleOnChangeInput(event.target.value, "sex")}>
                                value={userData.sex}

                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group(<span className='text-danger'>*</span>):</label>
                            <select className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(event) => handleOnChangeInput(event.target.value, "group")}
                                value={userData.group}
                            >
                                {userGroups.length > 0 &&
                                    userGroups.map((item, i) => {
                                        return (
                                            <option key={`group-${i}`} value={item.id}> {item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onHide={() => handleCloseModalUser()} >Close</Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
export default ModalUser;
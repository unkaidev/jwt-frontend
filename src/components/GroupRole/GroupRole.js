import { useEffect, useState } from 'react';
import './GroupRole.scss'
import { fetchGroup } from '../../services/userServices';
import { toast } from 'react-toastify';
import { fetchAllRole, deleteRole, fetchRoleByGroup } from "../../services/roleService"
import _ from 'lodash';


const GroupRole = () => {
    const [userGroups, setUserGroups] = useState([]);
    const [selectGroup, setSelectGroup] = useState("");
    const [listRoles, setListRoles] = useState([]);
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

    useEffect(() => {
        getGroups();
        getAllRoles();
    }, [])

    const getGroups = async () => {
        let res = await fetchGroup();
        console.log(res)
        if (res && res.EC === 0) {
            setUserGroups(res.DT);

        } else {
            toast.error(res.EM)
        }
    }

    const getAllRoles = async () => {
        let data = await fetchAllRole();
        if (data && +data.EC === 0) {
            setListRoles(data.DT)
        }
    }

    const handleOnChangeGroup = async (value) => {
        setSelectGroup(value);
        if (value) {
            let data = await fetchRoleByGroup(value);
            console.log(data)
            if (data && +data.EC === 0) {
                let result = buildDataRolesByGroup(data.DT.Roles, listRoles)
                setAssignRolesByGroup(result);
            }
        }
    }

    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let object = {};
                object.id = role.id;
                object.url = role.url;
                object.description = role.description;
                object.isAssigned = false;
                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some(item => item.url === object.url)
                }
                result.push(object)
            })
        }
        return result;
    }


    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +value);
        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned;
        }
        setAssignRolesByGroup(_assignRolesByGroup)
    }


    return (
        <div className='group-role-container'>
            <div className='container'>
                <div className='container mt3'>
                    <h4>Group Role:</h4>
                    <div className='assign-group-role'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label> Select Group:(<span className='text-danger'>*</span>):</label>
                            <select className={'form-select'}
                                onChange={(event) => handleOnChangeGroup(event.target.value)}
                            >
                                <option value="">Please select your Group</option>
                                {userGroups.length > 0 &&
                                    userGroups.map((item, i) => {
                                        return (
                                            <option key={`group-${i}`} value={item.id}> {item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <hr />
                        {selectGroup &&
                            <div className='roles'>
                                <h5>Assign Roles:</h5>
                                {
                                    assignRolesByGroup && assignRolesByGroup.length > 0
                                    && assignRolesByGroup.map((item, index) => {
                                        return (
                                            <div className="form-check" key={`list-role-${index}`}>
                                                <input className="form-check-input" type="checkbox"
                                                    value={item.id}
                                                    id={`list-role-${index}`}
                                                    checked={item.isAssigned}
                                                    onChange={(event) => handleSelectRole(event.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor={`list-role-${index}`} >
                                                    {item.url}
                                                </label>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        }
                        <div className='mt-3'>
                            <button className='btn btn-warning'> Save</button>
                        </div>


                    </div>
                </div>

            </div>
        </div >
    )
}
export default GroupRole;
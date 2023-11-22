import { useState } from 'react'
import './Role.scss'
import _ from 'lodash'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';



const Role = (props) => {

    const [listChilds, setListChilds] = useState({
        child1: { url: '', description: '' }
    })

    useEffect(() => {
        Object.entries(listChilds).map(([key, value]) => {
            console.log(key, value)
        })
    }, [])

    const handleOnChangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        setListChilds(_listChilds)
    }

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = {
            url: '',
            description: ''
        };
        setListChilds(_listChilds)
    }

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds)
    }

    return (
        <div className='role-container'>
            <div className='container'>
                <div className='mt-3'>
                    <div className='role-title'><h4>Add a new role</h4></div>
                    <div className='role-parent'>
                        {
                            Object.entries(listChilds).map(([key, child], index) => {
                                return (
                                    <div className='row role-child' key={`child-${key}`}>
                                        <div className={`col-12 col-sm-5 form-group ${key}`}>
                                            <label>URL:</label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                value={child.url}
                                                onChange={(event) => handleOnChangeInput('url', event.target.value, key)}
                                            />
                                        </div>
                                        <div className='col-12 col-sm-5 form-group'>
                                            <label>Description:</label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                value={child.description}
                                                onChange={(event) => handleOnChangeInput('description', event.target.value, key)}
                                            />
                                        </div>
                                        <div className='col-12 col-sm-2 mt-4 actions'>
                                            <i className="fa fa-plus-circle add"
                                                onClick={() => handleAddNewInput()}
                                            ></i>
                                            {index >= 1 && <i className="fa fa-trash-can delete"
                                                onClick={() => handleDeleteInput(key)}
                                            ></i>}
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <div>
                            <button className='btn btn-warning mt-3'>Save</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default Role
import { nanoid } from "nanoid";
import { ChangeEvent, useState } from "react";
import AdminSettingsTemplate from "./AdminSettingsTemplate";

import { adminSettingsList } from "../hardcoded_demo/AdminSettingsList";




const AdminSettings = () => {

    const [editPageTitle, setEditPageTitle] = useState(adminSettingsList[0].name)
    const [editOptions, setEditOptions] = useState(adminSettingsList[0].options)

    // temp
    const [isFormPage, setIsFormPage] = useState(true)
    
    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {

        setEditPageTitle(e.target.value)

        for (const item of adminSettingsList) {

            // console.log(item.name.toLowerCase())

            // if (item.name.toLowerCase() === 'forms') {
            //     setIsFormPage(true)
            // } else {
            //     setIsFormPage(false)
            // }

            if (item.name === e.target.value) {
                setEditOptions(item.options)
                return
            }
            
            
        }
    }

    const handleDrag = () => {
        alert('hi')
    }

    const handleSubmit = () => {

    }

    return (
        <>
            <form id="adminsettings">

                <div className="adminsettings__newform__modal">

                    
                    <h3>New form</h3>

                    <div className="item">
                        <label htmlFor="name" id="name">Name:</label>
                        <input type="text" id="name" />
                    </div>

                    <div className="item">
                        <label htmlFor="name" id="name">Description:</label>
                        <input type="text" id="name" />
                    </div>

                    <div className="item2">


                    <div className="row">
                        <label htmlFor="name" id="name">Elements:</label>
                        <button id="name" className="element__item">
                        Add
                        </button>
                    </div>

                    <div className="element">
                        <h5>Instructor's Name</h5>
                        <h5>Checkbox</h5>
                    </div>

                    <div className="element">
                        <h5>Major Topic(s)</h5>
                        <h5>Textarea</h5>
                    </div>

                    <div className="element">
                        <h5>Teams Drop-in</h5>
                        <h5>Checkbox</h5>
                    </div>

                    <div className="element">
                        <h5>Follow-up Email</h5>
                        <h5>Checkbox</h5>
                    </div>

                    </div>


                </div>

                {adminSettingsList.map(item => {
                
                return (

                <div className="flex justify-between" key={nanoid()}>
                    
                    <select name="adminsettings-list" id="adminsettings-list" onChange={handleOnChange}>
                                <option id={item.name.toLowerCase().split(" ").join("")} value={item.name}>{item.name}</option>
                    </select>
                    <div className="btns__wrapper">
                        {item.options.map(ops => <button key={nanoid()} onClick={ops.action} className="btn btn-blue">{ops.label}</button>)}
                    </div>
                </div>
                )
                })}
            </form>


            <AdminSettingsTemplate editOptions={editOptions} />

        </>
    )};

export default AdminSettings;
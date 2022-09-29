import { nanoid } from "nanoid";
import { ChangeEvent, useState } from "react";
import AdminSettingsTemplate from "./AdminSettingsTemplate";

import { adminSettingsList } from "../hardcoded_demo/AdminSettingsList";




const AdminSettings = () => {

    const [editPageTitle, setEditPageTitle] = useState(adminSettingsList[0].name)
    const [editOptions, setEditOptions] = useState(adminSettingsList[0].options)

    // temp
    const [isFormPage, setIsFormPage] = useState(false)
    
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

    return (
        <>
            <form id="adminsettings">

                

                <select name="adminsettings-list" id="adminsettings-list" onChange={handleOnChange}>
                    {adminSettingsList.map(item => {
                        return (
                            <option id={item.name.toLowerCase().split(" ").join("")} key={nanoid()} value={item.name}>{item.name}</option>
                        )
                    })}
                </select>
            </form>

            {isFormPage && <div className="btns__wrapper">
                <button className="btn btn-blue">Create form</button>
                <button className="btn btn-blue">Multi-Delete forms</button>
            </div>}

            <AdminSettingsTemplate editPageTitle={editPageTitle} editOptions={editOptions} />

        </>
    )};

export default AdminSettings;
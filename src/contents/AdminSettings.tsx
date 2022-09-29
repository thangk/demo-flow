import { nanoid } from "nanoid";
import { ChangeEvent, useState } from "react";
import AdminSettingsTemplate from "./AdminSettingsTemplate";



export const adminSettingsList = [
    { name: "Edit forms",
    options: [
        "Add a new form",
        "Edit an existing form",
        "Delete a form"
    ]},
    { name: "Edit forms",
    options: [
        "Add a new form",
        "Edit an existing form",
        "Delete a form"
    ]},
    { name: "Edit form categories",
    options: [
        "Add a new form category",
        "Edit an existing form category",
        "Delete a form category"
    ]},
    { name: "Edit charts",
    options: [
        "Add a new chart",
        "Edit an existing chart",
        "Delete a chart"
    ]},
    { name: "Edit usergroups",
    options: [
        "Add a new usergroup",
        "Edit an existing usergroup",
        "Delete a usergroup"
    ]},
    { name: "Edit dashboard elements",
    options: [
        "Add a new elements",
        "Edit an existing elements",
        "Delete a elements"
    ]},
    { name: "Edit app interface",
    options: [
        "Add a new tab menu",
        "Edit an existing tab menu",
        "Delete a tab menu",
        "Edit user profile options",
        "Edit app banner image",
        "Edit app navbar elements"
    ]},
    
    
    
    
]

const AdminSettings = () => {

    const [editPageTitle, setEditPageTitle] = useState(adminSettingsList[0].name)
    const [editOptions, setEditOptions] = useState(adminSettingsList[0].options)
    
    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {

        setEditPageTitle(e.target.value)

        for (const item of adminSettingsList) {
            if (item.name === e.target.value) {
                setEditOptions(item.options)
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

            <AdminSettingsTemplate editPageTitle={editPageTitle} editOptions={editOptions} />

        </>
    )};

export default AdminSettings;
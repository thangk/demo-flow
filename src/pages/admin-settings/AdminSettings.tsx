import { nanoid } from "nanoid";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { adminSettingsList } from "../../hardcoded_demo/AdminSettingsList";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

import { Outlet, useNavigate } from 'react-router-dom'


const AdminSettings = () => {

    const [currentPage, setCurrentPage] = useState(adminSettingsList[0].name)


    const navigate = useNavigate()
    

   
    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCurrentPage(e.target.value)
        navigate(`${e.target.value.toLowerCase()}`)
    }

    useEffect(() => {
        navigate(`${adminSettingsList[0].name.toLowerCase()}`, {replace: true})
    }, [])


    return (
        <main className="flex flex-col gap-12 min-h-screen h-full">

            {/* the dropdown menu */}
            <select className="w-fit" name="adminsettings-list" id="adminsettings-list" onChange={handleOnChange} value={currentPage}>

                {adminSettingsList.map(item => {

                    return (
                        <option id={item.name.toLowerCase().split(" ").join("")} value={item.name} key={nanoid()}>{item.name}</option>
                    )
                })}
            </select>

        <Outlet />

        </main>
    )};

export default AdminSettings;
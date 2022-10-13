import { nanoid } from "nanoid";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import AdminSettingsTemplate from "./AdminSettingsTemplate";

import { adminSettingsList } from "../hardcoded_demo/AdminSettingsList";
import { useOnClickOutside } from "../hooks/useOnClickOutside";




const AdminSettings = () => {

    const [editPageTitle, setEditPageTitle] = useState(adminSettingsList[0].name)
    const [editOptions, setEditOptions] = useState(adminSettingsList[0].options)

    // temp
    const [isFormPage, setIsFormPage] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const modalRef = useRef<HTMLDivElement>(null)

    const modalHandler = () => {
        setShowModal(!showModal)
    }
    
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setShowModal(!showModal)
    }

    // useOnClickOutside(modalRef, modalHandler)

    return (
        <>
            <form className="relative" id="adminsettings" onSubmit={handleSubmit}>

                {showModal && <div className="adminsettings__newform__modal" ref={modalRef}>

                    {/* <div className="w-full h-full absolute top-0 backdrop-blur-[5px] rounded-xs"></div> */}

                    <div className="top">
                        <h3>New Form</h3>
                    </div>
                    

                    <div className="bottom">


                        <div className="left">

                            <div className="item">
                                <label htmlFor="name" id="name">Name:</label>
                                <input type="text" id="name" />
                            </div>

                            <div className="item">
                                <label htmlFor="name" id="name">Description:</label>
                                <textarea className="w-full"></textarea>
                            </div>
                        </div>

                        <div className="border border-l "></div>


                        <div className="right">

                            <div className="item">

                            <div className="row">
                                <label htmlFor="name" id="name">Sections:</label>
                                <button id="name" className="element__item rounded-md w-fit h-fit py-1 px-10">
                                Add
                                </button>
                            </div>

                            <div className="element">
                                <h6>Instructor's Name</h6>
                                <h6>Text</h6>
                            </div>

                            <div className="element">
                                <h6>Major Topic(s)</h6>
                                <h6>Checkbox</h6>
                            </div>

                            <div className="element">
                                <h6>Description</h6>
                                <h6>Textarea</h6>
                            </div>

                            <div className="element">
                                <h6>Teams Drop-in</h6>
                                <h6>T/F</h6>
                            </div>

                            <div className="element">
                                <h6>Follow-up Email</h6>
                                <h6>T/F</h6>
                            </div>



                            </div>
                        </div>
                    </div>

                    <div className="btn-wrapper">
                        <div className="flex flex-1 justify-end">
                            <button className="btn btn-blue" type="submit">Create</button>
                        </div>
                        <div className="flex flex-1">
                            <button className="btn btn-blue" onClick={() => setShowModal(!showModal)}>Cancel</button>
                        </div>
                    </div>


                </div>}

                {adminSettingsList.map(item => {
                
                return (

                <div className="flex justify-between" key={nanoid()}>
                    
                    <select name="adminsettings-list" id="adminsettings-list" onChange={handleOnChange}>
                                <option id={item.name.toLowerCase().split(" ").join("")} value={item.name}>{item.name}</option>
                    </select>
                    <div className="btns__wrapper">
                        {item.options.map(ops => <button key={nanoid()} onClick={modalHandler} className="btn btn-blue">{ops.label}</button>)}
                    </div>
                </div>
                )
                })}
            </form>


            <AdminSettingsTemplate editOptions={editOptions} />

        </>
    )};

export default AdminSettings;
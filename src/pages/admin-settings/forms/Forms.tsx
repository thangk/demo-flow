import { MdEdit, MdDelete, MdDragIndicator, MdOutlineCheckBox, MdOutlineStar } from "react-icons/md"
import { nanoid } from 'nanoid'
import { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps, useEffect, useRef, useState } from "react"

import { useSelector, useDispatch } from 'react-redux'
import { newFormSlice } from '../../../features/newFormSlice'
import { formsListSlice } from "../../../features/formsListSlice"

import { Form, FormSection } from '../../../constants/Interfaces'
import { RootState } from "../../../app/store"


import { Link, useNavigate, useLocation } from 'react-router-dom'

import { Reorder } from 'framer-motion'

import useMeasurePosition from "../../../hooks/useMeasurePosition"
import usePositionReorder from "../../../hooks/usePositionReorder"


const FormsList = () => {

    const [forms, setForms] = useState<Form[]>(useSelector((state: RootState) => state.forms))

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const location = useLocation()

    const handleDeleteForm = (id: string) => {
        dispatch(formsListSlice.actions.deleteForm(id))
        setForms(item => item.filter(e => e.id !== id))
    }

    const handleSetDefault = (id: string) => {

        const updatedForm = [...forms].map(item => {
            if (item.id !== id) {
                return {...item, isDefault: false}
            }
            if (item.id === id) {
                return {...item, isDefault: true}
            }
            return item
        })

        
        dispatch(formsListSlice.actions.setDefault(id))
        setForms(updatedForm)
    }




    return (
    
        <div className="flex flex-col gap-4">

            
            <Reorder.Group values={forms} onReorder={setForms}>



            


            {forms.length ? forms.map(form => {
                return (

                    <Reorder.Item value={form} key={nanoid()}>


                    <div className="flex justify-between p-4 bg-[#F4F4F4] hover:bg-[#DADADA] hover:cursor-pointer hover:border-[#DADADA] border rounded-md shadow-md">
                        {/* name and desc */}
                        <section>
                            <h3>{form.name}</h3>
                            <h5>{form.description}</h5>
                        </section>

                        {/* action buttons */}
                        <section className="flex gap-4">
                        
                            <MdOutlineStar 
                            className={`text-3xl ${form.isDefault ? `opacity-100` : `opacity-10`} hover:opacity-100`} onClick={() => handleSetDefault(form.id)} />
                            <MdEdit className="text-3xl opacity-25 hover:opacity-100" onClick={() => navigate(`${location.pathname}/edit-form/${form.name}`)} />
                            <MdDelete className="text-3xl opacity-25 hover:opacity-100" onClick={() => handleDeleteForm(form.id)} />
                        </section>
                    </div>

                    </Reorder.Item>
                )
            }) 
            
            
            : <h5>There are no forms yet. Create one.</h5>}


            </Reorder.Group>


            
            
        </div>
    )
}

const Forms = () => {

    return (
        <main className="flex flex-col gap-6">
            
            <section className="btns__wrapper">
                <Link to={`${location.pathname}/create-form`} className="btn btn-blue">Create Form</Link>
            </section>

            <FormsList />
        </main>
    )};

export default Forms;
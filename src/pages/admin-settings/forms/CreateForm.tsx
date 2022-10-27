import { MdEdit, MdDelete, MdDragIndicator, MdOutlineCheckBox, MdOutlineStar, MdOutlineHelp, MdHelp, MdOutlineHelpOutline, MdOutlineInfo, MdTextFormat, MdAdd } from "react-icons/md"
import { nanoid } from 'nanoid'
import { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps, useEffect, useRef, useState } from "react"

import { useSelector } from 'react-redux'
import { Form } from '../../../constants/Interfaces'
import { RootState } from "../../../app/store"
import CreateEditFormView from "./CreateEditFormView"



const CreateForm = () => {

    const [currentForm, setCurrentForm] = useState<Form>(useSelector((state: RootState) => state.newForm))

    const [forms, setForms] = useState<Form[]>(useSelector((state: RootState) => state.forms))

    return (
        <CreateEditFormView 
        formMode='create' 
        currentForm={currentForm} 
        setCurrentForm={setCurrentForm}
        setForms={setForms}
        />
    )
}

export default CreateForm
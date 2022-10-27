import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Form } from '../../../constants/Interfaces'
import { RootState } from "../../../app/store"
import { useParams } from 'react-router-dom'
import CreateEditFormView from "./CreateEditFormView"



const EditForm = () => {

    const [currentForm, setCurrentForm] = useState<Form>(useSelector((state: RootState) => state.newForm))

    const [forms, setForms] = useState<Form[]>(useSelector((state: RootState) => state.forms))

    const { name } = useParams()

    useEffect(() => {

        for (const form of forms) {
            if (form.name === name) {
                setCurrentForm(form)
            }
        }

    }, [])


    return (
        <CreateEditFormView 
        formMode='edit' 
        currentForm={currentForm} 
        setCurrentForm={setCurrentForm}
        />
    )
}

export default EditForm
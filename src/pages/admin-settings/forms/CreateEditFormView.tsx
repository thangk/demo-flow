import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { Form, FormSection } from "../../../constants/Interfaces";

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { formsListSlice } from "../../../features/formsListSlice"
import { MdOutlineCheckBox, MdTextFormat } from "react-icons/md";



interface Props {
    idToUpdate?: string,
    formMode: string,       // create or edit
    currentForm: Form,
    setCurrentForm: React.Dispatch<React.SetStateAction<Form>>,

}


const getSectionIconType = (type: string) => {

    if (type === 'checkbox') return <MdOutlineCheckBox  />

    if (type === 'text') return <MdTextFormat />
}


const CreateEditFormView = ({ 
    idToUpdate, 
    currentForm, 
    setCurrentForm 
    } : Props) => {

    const [rerender, setRerender] = useState(false)

    const [showAddItemModal, setShowAddItemModal] = useState(false)

    const [showPlaceHolderInputState, setShowPlaceHolderInputState] = useState('hidden')

    const [currentSection, setCurrentSection] = useState<FormSection>({
        id: nanoid(),
        name: '',
        type: '',
        placeholder: '',
        isRequired: false,
        items: []
    })

    const formNameRef = useRef<HTMLInputElement>(null)
    const formDescRef = useRef<HTMLTextAreaElement>(null)
    const formDefaultRef = useRef<HTMLInputElement>(null)
    const sectionNameRef = useRef<HTMLInputElement>(null)
    const sectionPlaceHolderRef = useRef<HTMLInputElement>(null)
    const sectionTypeRef = useRef<HTMLSelectElement>(null)
    const sectionIsReqRef = useRef<HTMLSelectElement>(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { name } = useParams()

    // section related founctions
    const handleAddSection = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        const name = sectionNameRef.current!.value
        const type = sectionTypeRef.current!.value
        const placeholder = sectionPlaceHolderRef.current!.value ?? ''
        const isRequired = sectionIsReqRef.current!.value === 'req' ? true : false

        // do empty string check
        if (!name) return

        const newSection: FormSection = {
            id: nanoid(),
            name,
            type,
            placeholder,
            isRequired,
            items: []
        }


        setCurrentForm(prev => ({...prev, sections: [...prev.sections, newSection]}))

        // reset text inputs
        sectionNameRef.current!.value = ''
        sectionPlaceHolderRef.current!.value = ''
    }

    const handleUpdateSection = () => {
        setCurrentForm(cur => ({...cur, sections: [...cur.sections].map(item => {
            
            if (item.name === currentSection.name) {
                return currentSection
            }

            return item
        })}))
    }

    const handleDeleteSection = (name: string) => {
        setCurrentForm(prev => ({...prev, 
            sections: prev.sections.filter(item => item.name !== name)
        }))
    }


    // item related funcions
    const handleAddItem = (item: FormSection) => {
        setCurrentSection(item)
        setShowAddItemModal(!showAddItemModal)
    }

    // form related functions
    const handleSaveForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const name = formNameRef.current!.value
        const description = formDescRef.current!.value
        const isDefault = formDefaultRef.current!.checked

        setCurrentForm(prev => ({...prev, name, description, isDefault}))

        if (isDefault) {
            dispatch(formsListSlice.actions.setDefault(currentForm.id))
        }

        setRerender(true)
    }

    const handleCancel = () => {
        navigate('/admin-settings/forms')
    }

    return (
        <>
            

        </>
    )};

export default CreateEditFormView;
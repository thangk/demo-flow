import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { topics } from "../hardcoded_demo/FlowTopics";
import { nanoid } from 'nanoid'
import { format } from 'date-fns'
import { Flow, Form } from "../constants/Interfaces"
import HardcodedAddFlow from "../hardcoded_demo/HardcodedAddFlow";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";



// hardcoded staff's info , this will be made dynamic in deployment version
const teamMember = {
    firstName: 'Team',
    lastName: 'Member1'
}


const AddFlow = () => {

    const [forms, setForms] = useState<Form[]>(useSelector((state: RootState) => state.forms))

    const defaultForm = () => {
        for (const form of forms) {
            if (form.isDefault) {
                return form
            }
        }
        return null
    }

    const [currentForm, setCurrentForm] = useState<Form | null>(defaultForm)


    const [formObj, setFormObject] = useState<Flow>(
        {
            uwinid: "",
            majortopics: [],
            desc: "",
            multitopics: false,
            teamsdropin: false,
            
            // autocompleted fields
            staff: "Staff One",
            date: format(new Date(), "cccc, MMMM d, yyyy"),
            time: format(new Date(), "h:mm:ss aa"),
            location: "BB Cafe",
            department: 'School of Dramatic Arts',
            faculty: 'FAHSS',
            instructor_ga: "Instructor One",
            instructor_ga_fname: "Instructor",
            instructor_ga_lname: "One",
            
            uwinemail: "instructor1@uwindsor.ca",
            followupemail: false,
        })
    

    const handleFlowAdd = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(JSON.stringify(formObj, null, 4))

        alert("Flow submitted! It doesn't go anywhere right now but, when live, the submissions will be sent to the database and can be viewed from the table in Manage Data tab on the left.")
    }

    const handleOnChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {

        if (type === 'text') {
            setFormObject({...formObj, [e.currentTarget.name]: e.currentTarget.value})
            return
        }

        if (type === 'radio') {
            setFormObject({...formObj, [e.currentTarget.name]: (e.currentTarget as HTMLInputElement).checked})
            return
        }

        if (type === 'checkbox') {

            const arrayCopy = new Set(formObj.majortopics)
    
            if ((e.currentTarget as HTMLInputElement).checked) { 
                arrayCopy.add(e.currentTarget.name)    
            }
            
            if (!(e.currentTarget as HTMLInputElement).checked) {
                arrayCopy.delete(e.currentTarget.name)
            }
    
            setFormObject({...formObj, majortopics: Array.from(arrayCopy)})
            return
        }

        
    }

    const handleFormChange = (e: ChangeEvent<HTMLSelectElement>) => {

        for (const form of forms) {
            if (form.name === e.currentTarget.value) {
                setCurrentForm(form)
            }
        }
    }

   

    return (
            
            <>
            
            {forms.length ? 
                
                <select className="w-fit" onChange={handleFormChange} value={currentForm?.name}>

                    {forms.map(form => {

                        return (
                            <option id={form.name.toLowerCase().split(" ").join("")} value={form.name} key={nanoid()}>{form.name} {form.isDefault ? '(default)' : ''}</option>
                        )
                    })}
                </select>
            : null }



            <form className='flex flex-col gap-12' onSubmit={handleFlowAdd}>

            <div className="addflow__body">

                {forms.length ? 
                
                    currentForm?.sections.map(section => {
                        return (

                            <div key={nanoid()}>
                            
                            {section.type.toLowerCase() === 'text' ? 

                            <div className="flex flex-col gap-2" key={nanoid()}>
                                <h4 className="font-bold">{section.name} {section.isRequired ? <span className="text-red-500">*</span> : ''}</h4>
                            
                                <textarea rows={5} cols={100} placeholder={section.placeholder}></textarea>
                            </div>
                            
                            
                            : '' }
                            
  
                            {section.type.toLowerCase() === 'checkbox' ? 
                            
                            <div className="flex flex-col gap-2">
                                <h4 className="font-bold">{section.name} {section.isRequired ? <span className="text-red-500">*</span> : ''}</h4>

                                {section.items.length ? 
                                
                                <div className="flex flex-col gap-3">

                                {section.items.map(item => {
                                    return (
                                        
                                    <div className="flex gap-2 px-2 py-1 w-fit rounded-md items-center hover:bg-[#DADADA] cursor-pointer" key={nanoid()}>
                                        <input className="cursor-pointer" type={section.type} id={item.trim()} name={item.trim()} />
                                        <label className="cursor-pointer" htmlFor={item.trim()}>{item}</label>
                                    </div>
                                    )
                                })}                              
                                </div>
                            
                                : 'Empty list. Add some topics in this section from the Admin Settings > Forms.'}



                            </div>
                            : '' }

                            </div>
                        )
                    })
                
                
                : <HardcodedAddFlow handleOnChange={handleOnChange} />}


                <div className="addflow__subbody">

                    <div className="flex gap-4">
                        <button type="submit" className="btn btn-blue">Run flow</button>
                        <button type="reset" className="btn btn-grey">Clear</button>
                    </div>
                </div>

            </div>

            </form>

            </>
    )};

export default AddFlow;
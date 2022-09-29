import { FormEvent, useEffect, useState } from "react";
import { topics } from "../hardcoded_demo/FlowTopics";
import { nanoid } from 'nanoid'
import { format } from 'date-fns'
import ToggleButton from "../components/ToggleButton";

import { Flow } from "../constants/Interfaces"



// hardcoded staff's info , this will be made dynamic in deployment version
const teamMember = {
    firstName: 'Team',
    lastName: 'Member1'
}


const AddFlow = () => {

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

    return (
            
            <form id="flowform" onSubmit={handleFlowAdd}>

            <div className="addflow__body">

                <div className="addflow__subbody">
                    {/* make this asterisk a requirement toggle in admin settings */}
                    <h4 className="font-bold">Instructor/GA Name <span className="text-red-500">*</span></h4>
                    {/* will need to make this placeholder dynamic */}
                    <textarea rows={5} cols={102} name='uwindid'
                    placeholder="Please enter Instructor/GA's Full name or the UWIN ID. You can find the UWIN from the dashboard." 
                    onChange={(e: FormEvent<HTMLTextAreaElement>) => handleOnChange(e, 'text')}>
                        
                    </textarea>
                </div>

                <div className="addflow__subbody">
                    <h4 className="font-bold">Major Topic(s)</h4>
                    <div className="addflow__topics__list">
                        {topics.map(e => {
                            return (
                                <div className="addflow__topic__item" key={e.trim()}>
                                    <input type='checkbox' 
                                    id={e.trim()} 
                                    name={e.trim()}

                                    onChange={(e: FormEvent<HTMLInputElement>) => handleOnChange(e, 'checkbox')}
                                    />
                                    <label htmlFor={e.trim()}>{e}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="addflow__subbody">
                    {/* make this asterisk a requirement toggle in admin settings */}
                    <h4 className="font-bold">Description <span className="text-red-500">*</span></h4>
                    <textarea rows={5} cols={102} name='desc' placeholder="Please provide details (Example: error message, tool in course, area in course with issue, etc.)"
                    
                    onChange={(e: FormEvent<HTMLTextAreaElement>) => handleOnChange(e, 'text')}></textarea>
                </div>


                <div className="addflow__subbody">
                    <h4 className="font-bold">Were mulitple topics discussed? (Y/N)</h4>
                    
                    <div className="flex gap-6">
                        <div className="addflow__topic__item">

                            <input type='checkbox' id='yesmultitopic' name='multitopic' onChange={(e: FormEvent<HTMLInputElement>) => handleOnChange(e, 'radio')} />
                            <label htmlFor='yesmultitopic'>Yes</label>
                        </div>
                    </div>
                </div>

                <div className="addflow__subbody">
                    <h4 className="font-bold">Was this a Teams virtual Drop-in support?</h4>
                    
                    <div className="flex gap-6">
                        <div className="addflow__topic__item">

                            <input type='checkbox' id='yesvdrop' name='teamsdropin' onChange={(e: FormEvent<HTMLInputElement>) => handleOnChange(e, 'radio')} />
                            <label htmlFor='yesvdrop'>Yes</label>
                        </div>

                    </div>

                </div>


                <div className="addflow__subbody">

                    <div className="flex gap-4">
                        <button type="submit" className="btn btn-blue">Run flow</button>
                        <button type="reset" className="btn btn-grey">Cancel</button>
                    </div>
                </div>

            </div>

            </form>
    )};

export default AddFlow;
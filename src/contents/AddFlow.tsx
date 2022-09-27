import { FormEvent, useEffect, useState } from "react";
import { topics } from "../Constants/Topics";
import { nanoid } from 'nanoid'
import { format } from 'date-fns'
import ToggleButton from "../components/ToggleButton";


interface FlowForm {
    uid?: string,                   // auto set by mongodb

    // to be inputted by CTL staff
    uwindid: string                 
    majortopics: string[]           
    desc?: string,
    followupemail: boolean,
    multitopic: boolean,
    vdropsupp: boolean

    date: string,                   // auto set to date of flow submission
    time: string,                   // auto set to time of flow submission
    location: string,               // hardcoded with "BB Cafe" for the time being

    instructor_ga: string,          // to be dynamically generated or grabbed from MS Graph
    instructor_ga_fname: string,    // to be dynamically generated or grabbed from MS Graph
    instructor_ga_lname: string,    // to be dynamically generated or grabbed from MS Graph
    uwindemail: string,             // to be dynamically generated or grabbed from MS Graph
    department: string,             // to be dynamically generated or grabbed from MS Graph
    faculty: string,                // to be dynamically generated or grabbed from MS Graph
}


// hardcoded staff's info , this will be made dynamic in deployment version
const teamMember = {
    firstName: 'Member',
    lastName: 'One'
}


const AddFlow = () => {

    const [formObj, setFormObject] = useState<FlowForm>(
        {
            uwindid: "",
            majortopics: [],
            desc: "",
            multitopic: false,
            vdropsupp: false,
            
            // autocompleted fields
            date: format(new Date(), "cccc, MMMM d, yyyy"),
            time: format(new Date(), "h:mm:ss aa"),
            location: "BB Cafe",
            department: 'School of Dramatic Arts',
            faculty: 'FAHSS',
            instructor_ga: "Instructor One",
            instructor_ga_fname: "Instructor",
            instructor_ga_lname: "One",
            
            uwindemail: "instructor1@uwindsor.ca",
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
                    <h2 className="addflow__subheading">Instructor/GA Name <span className="text-red-500">*</span></h2>
                    {/* will need to make this placeholder dynamic */}
                    <textarea rows={5} cols={102} name='uwindid'
                    placeholder="Please enter Instructor/GA's Full name or the UWIN ID. You can find the UWIN from the dashboard." 
                    onChange={(e: FormEvent<HTMLTextAreaElement>) => handleOnChange(e, 'text')}>
                        
                    </textarea>
                </div>

                <div className="addflow__subbody">
                    <h2 className="addflow__subheading">Major Topic(s)</h2>
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
                    <h2 className="addflow__subheading">Description <span className="text-red-500">*</span></h2>
                    <textarea rows={5} cols={102} name='desc' placeholder="Please provide details (Example: error message, tool in course, area in course with issue, etc.)"
                    
                    onChange={(e: FormEvent<HTMLTextAreaElement>) => handleOnChange(e, 'text')}></textarea>
                </div>


                <div className="addflow__subbody">
                    <h2 className="addflow__subheading">Were mulitple topics discussed? (Y/N)</h2>
                    
                    <div className="flex gap-6">
                        <div className="addflow__topic__item">

                            <input type='checkbox' id='yesmultitopic' name='multitopic' onChange={(e: FormEvent<HTMLInputElement>) => handleOnChange(e, 'radio')} />
                            <label htmlFor='yesmultitopic'>Yes</label>
                        </div>
                    </div>
                </div>

                <div className="addflow__subbody">
                    <h2 className="addflow__subheading">Was this a Teams Virtual Drop In support?</h2>
                    
                    <div className="flex gap-6">
                        <div className="addflow__topic__item">

                            <input type='checkbox' id='yesvdrop' name='vdropsupp' onChange={(e: FormEvent<HTMLInputElement>) => handleOnChange(e, 'radio')} />
                            <label htmlFor='yesvdrop'>Yes</label>
                        </div>

                    </div>

                    <ToggleButton />
                </div>


                <div className="addflow__subbody">

                    <div className="addflow__buttons__wrapper">
                        <button type="submit" id="runflow">Run flow</button>
                        <button type="reset" id="cancelbtn">Cancel</button>
                    </div>
                </div>

            </div>

            </form>
    )};

export default AddFlow;
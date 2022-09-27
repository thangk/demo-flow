import { FormEvent, useEffect, useState } from "react";
import { topics } from "../Constants/Topics";
import { nanoid } from 'nanoid'
import { format } from 'date-fns'
import ToggleButton from "./ToggleButton";

const teamMember = "Dummy Member"
const URL = "https://djangoflowapp.herokuapp.com/query/";

const ContentArea = () => {
    
    const [err, setErr] = useState<string>("");
    
    const handleFlowAdd = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let target = e.target;
        try {   
            let resp = await fetch(URL, {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({
                        "createdBy": teamMember,
                        "topics": topics.flatMap((val, pos) => target[`box-${pos}`].checked? [val] : []),
                        "location": "bbacafe",
                        "description": target.desc.value,
                        "isTeams": target.yesvdrop.checked,
                        "isMultiple": target.yesmultitopic.checked,
                })
            })
            let data = await resp.json();
                console.log(data) // on success: Response {statusText: Created }
        }  catch(e) {
            console.log(e)  
            setErr(e.messsage);
        }    
    }



    return (
        <main className="contentarea__wrapper">

            <h1 className="contentarea__title">Run flow</h1>

            <form id="flowform" onSubmit={handleFlowAdd}>

                <div className="contentarea__body">

                    <div className="contentarea__subbody">
                        {/* make this asterisk a requirement toggle in admin settings */}
                        <h2 className="contentarea__subheading">Instructor/GA Name <span className="text-red-500">*</span></h2>
                        {/* will need to make this placeholder dynamic */}
                        <textarea rows={5} cols={102} name='uwindid' required={true}
                            placeholder="Please enter Instructor/GA's Full name or the UWIN ID. You can find the UWIN from the dashboard."
                        />
                    </div>

                    <div className="contentarea__subbody">
                        <h2 className="contentarea__subheading">Major Topic(s)</h2>
                        <div className="topics__list">
                            {topics.map((e, pos) => {
                                return (
                                    <div className="topic__item" key={e.trim()}>
                                        <input type='checkbox'
                                            id={`box-${pos}`}
                                            name={e.trim()}
                                        />
                                        <label htmlFor={e.trim()}>{e}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="contentarea__subbody">
                        {/* make this asterisk a requirement toggle in admin settings */}
                        <h2 className="contentarea__subheading">Description <span className="text-red-500">*</span></h2>
                        <textarea id="desc" rows={5} cols={102} name='desc' placeholder="Please provide details (Example: error message, tool in course, area in course with issue, etc.)"
                        ></textarea>
                    </div>


                    <div className="contentarea__subbody">
                        <h2 className="contentarea__subheading">Were mulitple topics discussed? (Y/N)</h2>

                        <div className="flex gap-6">
                            <div className="flex gap-2 items-center">

                                <input type='checkbox' id='yesmultitopic' name='multitopic' />
                                <label htmlFor='yesmultitopic'>Yes</label>
                            </div>
                        </div>
                    </div>

                    <div className="contentarea__subbody">
                        <h2 className="contentarea__subheading">Was this a Teams Virtual Drop In support?</h2>

                        <div className="flex gap-6">
                            <div className="flex gap-2 items-center">

                                <input type='checkbox' id='yesvdrop' name='vdropsupp' />
                                <label htmlFor='yesvdrop'>Yes</label>
                            </div>

                        </div>

                        <ToggleButton />
                    </div>


                    <div className="contentarea__subbody">

                        <div className="buttons_wrapper">
                            <button type="submit" id="runflow">Run flow</button>
                            <button type="reset" id="cancelbtn">Cancel</button>
                        </div>
                    </div>

                </div>

            </form>

        </main>
    )
};

export default ContentArea;
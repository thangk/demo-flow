import { FormEvent } from "react";
import { topics } from "./FlowTopics";


interface Props {
    handleOnChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => void
}

const HardcodedAddFlow = ({ handleOnChange }: Props) => {

    

    return (
        <>
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

        </>
    )};

export default HardcodedAddFlow;
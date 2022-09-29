
import { nanoid } from 'nanoid'

interface Props {
    editPageTitle: string,
    editOptions: string[]
}


const AdminSettingsTemplate = ({editPageTitle, editOptions}: Props) => {

    

    return (
    
            <div className="flex flex-col gap-6 min-h-screen">

                {editOptions.map(item => {
                    return (
                        <div className="card__settings" key={nanoid()}>
                            <h3>{item}</h3>
                            <h5>edit buttons will go here...</h5>
                        </div>
                    )
                })}

                
            </div>
    )};

export default AdminSettingsTemplate;
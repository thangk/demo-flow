
import { nanoid } from 'nanoid'

interface Props {
    editOptions: 
        {
            label: string,
            action: () => void
        }[]
    
}


const AdminSettingsTemplate = ( {editOptions}: Props) => {

    

    return (
    
            <div className="flex flex-col gap-6 min-h-screen">

                {editOptions.map(item => {
                    return (
                        <div className="card__settings" key={nanoid()}>
                            <h3>{item.label}</h3>
                            <h5>edit buttons will go here...</h5>
                        </div>
                    )
                })}

                
            </div>
    )};

export default AdminSettingsTemplate;

import { nanoid } from 'nanoid'

interface Props {
    editPageTitle: string,
    editOptions: string[]
}


const AdminSettingsTemplate = ({editPageTitle, editOptions}: Props) => {

    

    return (
    
            <div className="editoptions__list">

                {editOptions.map(item => {
                    return (
                        <div className="editoption__item" key={nanoid()}>
                            <h1>{item}</h1>
                            <h2>edit buttons will go here...</h2>
                        </div>
                    )
                })}

                
            </div>
    )};

export default AdminSettingsTemplate;
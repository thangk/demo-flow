import { DataGrid } from "@mui/x-data-grid";
import { Flow } from "../constants/Interfaces";
import { sampleData } from "../hardcoded_demo/SampleData";
import { columns, handleDownload } from "./ManageData";
import CsvDownload from 'react-json-to-csv'
import { demoUser } from "../hardcoded_demo/DemoUserInfo";

const rows: Flow[] = sampleData.filter(item => item.staff === "Team Member1")

const MyFlows = () => {

    

    return (
        <>
            <h5><strong>{demoUser.firstName} {demoUser.lastName}</strong>'s Flows</h5>

            <div className='btns__wrapper'>
                <button className="btn btn-blue" onClick={() => handleDownload("JSON")}>Download JSON</button>
                <CsvDownload className="btn btn-blue" data={rows}>Download CSV</CsvDownload>
            </div>

            <div className='flex flex-col w-full h-[700px]'>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={25}
                    rowsPerPageOptions={[25]}
                    checkboxSelection
                />
            </div>

        </>
    )};

export default MyFlows;
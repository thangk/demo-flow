import { DataGrid } from "@mui/x-data-grid";
import { Flow } from "../Constants/Interfaces";
import { sampleData } from "../Constants/SampleData";
import { columns, handleDownload } from "./ManageData";
import CsvDownload from 'react-json-to-csv'


const rows: Flow[] = sampleData.filter(item => item.staff === "Team Member1")

const MyFlows = () => {

    

    return (
        <>
            <h1><strong>Team Member1</strong>'s Flows</h1>

            <div className='download-buttons'>
                <button onClick={() => handleDownload("JSON")}>Download JSON</button>
                <button><CsvDownload data={rows}>Download CSV</CsvDownload></button>
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
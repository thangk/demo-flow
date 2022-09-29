
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { sampleData } from '../hardcoded_demo/SampleData'
import { nanoid } from 'nanoid';
import { Flow } from '../constants/Interfaces';
import CsvDownload from 'react-json-to-csv'

export const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50},
    { field: "date", headerName: "Date", width: 150, align: 'right' },
    { field: "time", headerName: "Time", width: 110, align: 'right' },
    { field: "staff", headerName: "CTL/OOL Team Member" },
    { field: "location", headerName: "Location/Form" },
    { field: "instructor_ga", headerName: "Instructor/GA Full Name" },
    { field: "instructor_ga_fname", headerName: "Instructor/GA First Name" },
    { field: "instructor_ga_lname", headerName: "Instructor/GA Last Name" },
    { field: "uwinid", headerName: "UWinID" },
    { field: "uwinemail", headerName: "UWin Email" },
    { field: "department", headerName: "Department/Faculty" },
    { field: "faculty", headerName: "Faculty" },
    { field: "majortopics", headerName: "Major Topics" },
    { field: "desc", headerName: "Description" },
    { field: "followupemail", headerName: "Follow-up Email", align: 'center' },
    { field: "multitopics", headerName: "Multi Topics", align: 'center' },
    { field: "teamsdropin", headerName: "Teams Drop-in", align: 'center' }
]

const rows: Flow[] = sampleData.map(item => {
        return { 
            id: item.id, 
            date: item.date, 
            time: item.time,
            staff: item.staff,
            location: item.location,
            instructor_ga: item.instructor_ga,
            instructor_ga_fname: item.instructor_ga_fname,
            instructor_ga_lname: item.instructor_ga_lname,
            uwinid: item.uwinid,
            uwinemail: item.uwinemail,
            department: item.department,
            faculty: item.department,
            majortopics: item.majortopics,
            desc: item.desc,
            followupemail: item.followupemail,
            multitopics: item.multitopics,
            teamsdropin: item.teamsdropin
        }
    })

const downloadCSV = (data: {}): void => {
    
}

export const handleDownload = (downloadType: string) => {
    if (downloadType === 'JSON') {

        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(rows, null, 4)
          )}`;

        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `export.json`;
        link.click();
}

}


const ManageData = () => {

    return (
        <>
            <div className='btns__wrapper'>
                <button className='btn btn-blue' onClick={() => handleDownload("JSON")}>Download JSON</button>
                <CsvDownload className='btn btn-blue' data={rows}>Download CSV</CsvDownload>
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

export default ManageData;
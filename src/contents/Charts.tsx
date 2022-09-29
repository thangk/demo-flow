import { BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, CartesianGrid, Bar } from "recharts";
import { sampleData } from "../Constants/SampleData";

interface dataType {
    month: string,
    visitors: number
}
interface dataType2 {
    week: string,
    visitors: number
}
interface dataType3 {
    faculty: string,
    visitors: number
}


const getMonths = () => {

    const months = new Map<string, number>([])

    const monthsInArray: dataType[] = [
        {month: "January", visitors: 31},
        {month: "February", visitors: 37},
        {month: "March", visitors: 43},
        {month: "April", visitors: 53},
        {month: "May", visitors: 32},
        {month: "May", visitors: 22},
        {month: "June", visitors: 28},
    ]

    const copySample = [...sampleData]

    copySample.forEach(item => {
        const [day, month] = item.date.split(" ")
        
        if (months.has(month)) {
            months.set(month, months.get(month)! + 1)
        } else {
            months.set(month, 1)
        }
    })

    for (let [key, value] of months) {
        monthsInArray.push({month: key, visitors: value})
    }

    return monthsInArray
}

const getWeeks = () => {
    const weeks = new Map<string, number>([])

    const weeksInArray: dataType2[] = []

    const copySample = [...sampleData]

    copySample.forEach(item => {
        const [day] = item.date.split(",")
        
        if (weeks.has(day)) {
            weeks.set(day, weeks.get(day)! + 1)
        }  else {
            weeks.set(day, 1)
        }
    })

    for (let [key, value] of weeks) {
        switch (key) {
            case "Monday": weeksInArray[0] = {week: key, visitors: value}; break;
            case "Tuesday": weeksInArray[1] = {week: key, visitors: value}; break;
            case "Wednesday": weeksInArray[2] = {week: key, visitors: value}; break;
            case "Thursday": weeksInArray[3] = {week: key, visitors: value}; break;
            case "Friday": weeksInArray[4] = {week: key, visitors: value}; break;
        }
        // weeksInArray.push({week: key, visitors: value})
    }

    return weeksInArray
}

const getFacultyFreq = () => {
    const faculty = new Map<string, number>([])

    const facultyInArray: dataType3[] = []

    const copySample = [...sampleData]

    copySample.forEach(item => {
        const fac = item.faculty
        
        if (faculty.has(fac)) {
            faculty.set(fac, faculty.get(fac)! + 1)
        }  else {
            faculty.set(fac, 1)
        }
    })

    for (let [key, value] of faculty) {
        facultyInArray.push({faculty: key, visitors: value})
    }

    return facultyInArray
}

const monthsData = getMonths()

const weeksData = getWeeks()

const facultyfreqData = getFacultyFreq()


const Charts = () => {

    return (
        <>
            <div className="charts__wrapper">

                <div className="achart__wrapper">
                    <h1 className="chartTitle">Visitors by Month</h1>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart 
                            height={400}
                            width={500}
                            data={monthsData}
                            
                            >
                        <XAxis dataKey="month" />
                        <YAxis dataKey="visitors" />
                        <Tooltip />
                        <Legend />
                        <Bar barSize={50} dataKey="visitors" fill="#40C4FF" />
                        <CartesianGrid />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="achart__wrapper">
                    <h1 className="chartTitle">Visitors by Days</h1>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart 
                            height={400}
                            width={500}
                            data={weeksData}
                            
                            >
                        <XAxis dataKey="week" />
                        <YAxis dataKey="visitors" />
                        <Tooltip />
                        <Legend />
                        <Bar barSize={50} dataKey="visitors" fill="#C0CA33" />
                        <CartesianGrid />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="achart__wrapper">
                    <h1 className="chartTitle">Frequency by Department</h1>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart 
                            height={400}
                            data={facultyfreqData}
                            margin={{
                                bottom: 35
                            }}
                            >
                        <XAxis dataKey="faculty" angle={-45} textAnchor="end" />
                        <YAxis dataKey="visitors" />
                        <Tooltip />
                        <Legend />
                        <Bar barSize={50} dataKey="visitors" fill="#FF9248" />
                        <CartesianGrid />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>

        </>
    )};

export default Charts;
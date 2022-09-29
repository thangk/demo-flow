
interface DashboardCard1 {
    title: string,
    data: number,
    recordTitle: string,
    recordData: number
}

export const dashboardCards: DashboardCard1[] = [
    { 
        title: "Today's Flows",
        data: 4,
        recordTitle: "Highest daily flow: ",
        recordData: 12
    },
    {
        title: "This Week's Flows",
        data: 22,
        recordTitle: "Highest weekly flow: ",
        recordData: 36
    },
    { 
        title: "Stats 3",
        data: 23,
        recordTitle: "Record stat: ",
        recordData: 213
    },
    {
        title: "Year to date Flows",
        data: 342,
        recordTitle: "Total flows: ",
        recordData: 3433
    }
]



export interface FormSection {
    id: string,
    name: string,
    type: string,
    placeholder: string,
    isRequired: boolean,
    items: string[]
}

export interface Form {
    id: string,
    name: string,
    description: string,
    sections: FormSection[],
    isDefault: boolean,
}



export interface DashboardCard1 {
    title: string,
    data: number,
    recordTitle: string,
    recordData: number
}

export interface Flow {
    id?: number,                   // auto set by mongodb

    // to be inputted by CTL staff
    uwinid: string                 
    majortopics: string[]           
    desc?: string,
    followupemail: boolean,
    multitopics: boolean,
    teamsdropin: boolean,

    date: string,                   // auto set to date of flow submission
    time: string,                   // auto set to time of flow submission
    location: string,               // hardcoded with "BB Cafe" for the time being

    staff: string,

    instructor_ga: string,          // to be dynamically generated or grabbed from MS Graph
    instructor_ga_fname: string,    // to be dynamically generated or grabbed from MS Graph
    instructor_ga_lname: string,    // to be dynamically generated or grabbed from MS Graph
    uwinemail: string,             // to be dynamically generated or grabbed from MS Graph
    department: string,             // to be dynamically generated or grabbed from MS Graph
    faculty: string,                // to be dynamically generated or grabbed from MS Graph
}
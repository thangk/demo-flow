
import { dashboardCards } from "../Constants/DashboardCards";


const Dashboard = () => {

    

    return (
        <>
            <h1>Welcome, Team Member1!</h1>

            <div className="dashboardcards__wrapper">
                {dashboardCards.map(item => {
                    return (
                        <div className="dashboardcard__item" key={item.title}>
                            <h1>{item.title}</h1>
                            <h2>{item.data}</h2>
                            <h3>{item.recordTitle}{item.recordData}</h3>
                        </div>
                    )
                })}
            </div>
        </>
    )};

export default Dashboard;
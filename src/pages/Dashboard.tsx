
import { dashboardCards } from "../hardcoded_demo/DashboardCards";
import { demoUser } from "../hardcoded_demo/DemoUserInfo";

const Dashboard = () => {

    return (
        <>
            <h5>Welcome, {demoUser.firstName} {demoUser.lastName}!</h5>

            <div className="flex flex-row gap-6 justify-between min-h-screen">
                {dashboardCards.map(item => {
                    return (
                        <div className="card__dashboard" key={item.title}>
                            <h2>{item.title}</h2>
                            <h1>{item.data}</h1>
                            <h5>{item.recordTitle}{item.recordData}</h5>
                        </div>
                    )
                })}
            </div>
        </>
    )};

export default Dashboard;
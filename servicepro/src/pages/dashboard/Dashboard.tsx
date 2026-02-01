import "../../assets/css/dashboard.css"; // CSS

const Dashboard = () => {
    return (
        <div className="cs-dashboard">

            {/* SUMMARY STRIP */}
            <div className="cs-summary-strip">

                {/* Missed */}
                <div className="cs-missed">
                    <h3>Missed</h3>
                    <span className="small">Today</span>

                    <div className="row">
                        <span>↪</span> <b>5</b> Clock-In
                    </div>
                    <div className="row">
                        <span>↩</span> <b>4</b> Clock-Out
                    </div>
                </div>

                {/* My Open Tasks */}
                <div className="cs-block">
                    <h4>My Open Tasks</h4>
                    <p className="muted">My Current Open Tasks</p>
                    <h2>618</h2>
                    <p className="link">Add New</p>
                    <p className="yellow">0 Due Today</p>
                </div>

                {/* Authorization */}
                <div className="cs-block">
                    <h4>Authorization Expiration</h4>
                    <p className="muted">Expiring in next 30 days</p>
                    <h2>12</h2>
                    <p className="yellow">0 Expiring Today</p>
                </div>

                {/* Open Shifts */}
                <div className="cs-block">
                    <h4>Open Shifts</h4>
                    <p className="muted">Open Shifts in the Office</p>
                    <h2>1144</h2>
                    <p className="link">View Open Shift Calendar</p>
                </div>

                {/* Compliance */}
                <div className="cs-block compliance">
                    <h4>Compliance Expiration</h4>
                    <p className="muted">Expired / Expiring in 30 days</p>

                    <div className="compliance-box">
                        <div className="expired">
                            <b>99</b>
                            <span>Already Expired</span>
                        </div>
                        <div className="expiring">
                            <b>0</b>
                            <span>Expiring in 30 Days</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* TABLE */}
            <div className="cs-table">
                <h3>Shift(s) Pending Confirmation</h3>
                <p className="muted">Confirmation Request to Caregivers</p>

                <table>
                    <thead>
                        <tr>
                            <th>Caregiver</th>
                            <th>Schedule Date / Time</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3} className="empty">
                                ⚠ No Record(s) Found.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Dashboard;

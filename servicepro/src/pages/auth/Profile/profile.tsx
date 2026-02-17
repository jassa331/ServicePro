import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../assets/css/Profile.css";
import { NavMenu } from '../../../components/layout/NavMenu';



const Profile: React.FC = () => {

    useEffect(() => {
        axios.get("https://systemapi.runasp.net/api/auth/profile")
            .catch(() => {
                console.log("Profile fetch failed");
            });
    }, []);
    return (
        <>
            <NavMenu />
        <div className="profile-wrapper">
            <div className="profile-card company-card">

                <h2 className="profile-name">
                    S.R Enterprise Cement, Iron & Steel Trader
                </h2>

                <span className="profile-role">
                    Authorized Wholesale Dealer | Since 1993
                </span>

                <div className="profile-info">

                    <div className="info-row">
                        <span>About Company</span>
                        <p>
                            Founded in 1993, we are an authorized wholesale dealer of
                            Binding Wire, Roofing Sheet, MS Square Pipe, Mild Steel Angle etc.
                            Our products are known for sturdy design, pressure bearing capacity
                            and dimensional accuracy.
                        </p>
                    </div>

                    <div className="info-row">
                        <span>CEO</span>
                        <p>Pawan Agarwal</p>
                    </div>

                    <div className="info-row">
                        <span>Nature of Business</span>
                        <p>Trader - Wholesaler / Distributor</p>
                    </div>

                    <div className="info-row">
                        <span>Employees</span>
                        <p>11 to 25 People</p>
                    </div>

                    <div className="info-row">
                        <span>Registered Address</span>
                        <p>
                            44/322/16E/4, Shahganj Bodla Road,
                            Bodla, Agra - 282007, Uttar Pradesh, India
                        </p>
                    </div>

                    <div className="info-row">
                        <span>GST Number</span>
                            <p>09JFUPS2230L1ZL</p>
                    </div>

                    <div className="info-row">
                        <span>Annual Turnover</span>
                        <p>5 - 25 Crore</p>
                    </div>

                    <div className="info-row">
                        <span>Banker</span>
                        <p>HDFC Bank</p>
                    </div>

                    <div className="info-row">
                        <span>Payment Mode</span>
                        <p>Cash, Credit Card, Cheque, DD</p>
                    </div>

                    <div className="info-row">
                        <span>Shipment Mode</span>
                        <p>By Road</p>
                    </div>

                </div>
            </div>
            </div>
        </>
    );

};

export default Profile;

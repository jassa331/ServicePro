import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../assets/css/Profile.css";

interface ProfileData {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    createdAt: string;
}

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("https://systemapi.runasp.net/api/auth/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setProfile(res.data))
            .catch(() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
            });
    }, []);

    if (!profile) return <div className="loader">Loading Profile...</div>;

    return (
        <div className="profile-wrapper">
            <div className="profile-card">
                <div className="profile-avatar">
                    {profile.name.charAt(0).toUpperCase()}
                </div>

                <h2 className="profile-name">{profile.name}</h2>
                <span className="profile-role">{profile.role}</span>

                <div className="profile-info">
                    <div className="info-row">
                        <span>Email</span>
                        <p>{profile.email}</p>
                    </div>

                    <div className="info-row">
                        <span>Phone</span>
                        <p>{profile.phoneNumber}</p>
                    </div>

                    <div className="info-row">
                        <span>Joined</span>
                        <p>{new Date(profile.createdAt).toDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

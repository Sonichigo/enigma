import React from "react";
import { useState } from "react";
import '../styles/Sidebar.css';
import profileData from "../data/profile";
import Camera from './Camera';
import Popup from './Popup';

const SideBar = () => {
  const [profile, setProfile] = useState(profileData);
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div>
      <figure className="card">
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg"
          alt="sample87"
        />
        <figcaption>
          <img src={profile.img} alt="profile" className="profile" />
          <h2>{profile.name}</h2>
          <p>{profile.bio}</p>
        </figcaption>
        <div className="btn">
          <h2>EmpID: {profile.points}</h2>
        </div>
        <button onClick={togglePopup}>My Account</button>
      </figure>
      {isOpen && <Popup
      content={<>
        <h2>Attendance</h2>
        <Camera/>
      </>}
      handleClose={togglePopup}
    />}
    </div>
  );
};

export default SideBar;
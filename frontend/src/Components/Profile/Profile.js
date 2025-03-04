import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getRefreshToken from "../../utilities";

import style from './Profile.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const defaultUser = {
  profilePhoto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7EAjufrsaffFdvLMDspiG0w_MG0N7eHUPUjz0bkF-v3qO7aFyyKxpKLA5lt7m0P2O_ZI&usqp=CAU',
  name : 'Sudheer Kumar Prajapat',
  age : '20',
  gender : 'Male',
  email : 'example@gmail.com',
  aadhaarNo : '123456789012',
  aadhaarPhoto : 'https://gujjupost.in/wp-content/uploads/2021/08/searchpng.com-sample-aadhaar-card-icon-png-image-free-download-1024x658.png',
  panNo : '123AB567890',
  panPhoto : 'https://images.livemint.com/img/2019/07/11/original/e-pan_card_download_1562831552156.PNG',
  ctc : '20000',
  salarySlips : ['https://www.hrcabin.com/wp-content/uploads/2021/05/Salary-slip-format-in-excel-download.png', 'https://i.pinimg.com/736x/ed/f6/28/edf6283d6955d5b8488e977e8613b557.jpg'],
  acHolderName : 'Sudheer Kumar Prajapat',
  acNo : '123456780123456',
  ifacCode : 'abc',
  bankName : 'PNB'
}

const Profile = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState(defaultUser);
  // const [userData, setUserData] = useState({});

  const fetchUser = () => {    
    const id = localStorage.getItem('id');
    const url = `${API_URL}users/${id}`;
    const getData = () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem('refreshToken');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${accessToken}`,
        },
      };
      axios
        .get(url, config)
        .then((response) => {
          if(response.data.status === 'success')
          {
          const newUserData = {
            profilePhoto : response.profileImageLink,
            name : response.userName,
            age : response.age,
            gender : response.gender,
            email : response.email,
            aadhaarNo : response.aadhaarNumber,
            aadhaarPhoto : response.aadhaarImageLink,
            panNo : response.panNumber,
            panPhoto : response.panImageLink,
            ctc : response.ctc,
            salarySlips : [response.salarySlipImageLink],
            acHolderName : response.accountHolderName,
            acNo : response.accountNumber,
            ifacCode : response.IFACcode,
            bankName : response.BankName
          }
          console.log(newUserData);
          setUserData(newUserData);
        }
          return;
        })
        .catch((err) => {
          console.log(err);
          const ok = getRefreshToken(refreshToken)
          if(ok){
            getData()
          }
        });
    };
    getData()
  };

  useEffect(()=>{
    if(localStorage.getItem('accessToken'))
      fetchUser();
    else
      navigate('/login'); // eslint-disable-next-line
  }, []);

  fetchUser();
  return (
    <div className={style.coverContainer}>
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.profilePhoto}>
          <img src={userData.profilePhoto} alt="Profile"/>
        </div>
        <div className={style.documentsPhoto}>
          <div className={style.aadhaarPhoto}>
            <img src={userData.aadhaarPhoto} alt="Aadhaar Card"/>
          </div>
          <div className={style.panPhoto}>
            <img src={userData.panPhoto} alt="PAN Card"/>
          </div>  
        </div>
        <div className={style.slipsPhoto}>
          <img src={userData.salarySlips[currentIndex]} alt="Slips"/>
          <div className={style.buttons}>
            <button className={style.btn} onClick={() => ((currentIndex === 0)?(setCurrentIndex(userData.salarySlips.length-1)):(setCurrentIndex(currentIndex-1)))}>&lt;</button>
            <button className={style.btn} onClick={() => ((currentIndex === userData.salarySlips.length-1)?(setCurrentIndex(0)):(setCurrentIndex(currentIndex+1)))}>&gt;</button>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <h2 className={style.heading}>Basic Details</h2>
        <div className={style.basicDetails}>
          <p className={style.detail}>Name : {userData.name}</p>
          <p className={style.detail}>Age : {userData.age}</p>
          <p className={style.detail}>Gender : {userData.gender}</p>
          <p className={style.detail}>Email : {userData.email}</p>
          <p className={style.detail}>Aadhaar Number : {userData.aadhaarNo}</p>
          <p className={style.detail}>PAN Number : {userData.panNo}</p>
          <p className={style.detail}>CTC : {userData.ctc}</p>
        </div>
        <h2 className={style.heading}>Account Details</h2>
        <div className={style.acDetails}>
          <p className={style.detail}>Account Holder Name : {userData.acHolderName}</p>
          <p className={style.detail}>Account Number : {userData.acNo}</p>
          <p className={style.detail}>IFAC Code of Bank : {userData.ifacCode}</p>
          <p className={style.detail}>Name of Bank : {userData.bankName}</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Profile;
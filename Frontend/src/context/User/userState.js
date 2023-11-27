import React, { useState } from "react";
import userContext from "./userContext";

const UserState = (props) =>{
    const host = 'http://localhost:8000';
    const [userData, setUserData] = useState([]);
    const getuserinfo = async () => {
      try{
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: 'GET',
          headers: {
            'auth-token' : localStorage.getItem("token")
          },
          })
          const json = await response.json();
          setUserData(json);
      }catch(error){
        console.error('Error fetching user data:', error);
      }
    }

    const login = async ({email , password}) => {
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email , password}) 
            });
        const json = await response.json();
        return json;
    }

    const signin = async ({ name, email, password }) => {
        const req = await fetch(`${host}/api/auth/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name , email ,password })
            });
        const response = await req.json();
        return response;
    }

    return (
        <userContext.Provider value={{userData,setUserData, getuserinfo, login, signin}}>
            {props.children}
        </userContext.Provider>
        );

};

export default UserState;


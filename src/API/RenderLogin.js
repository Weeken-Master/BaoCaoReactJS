import {React, useEffect} from "react";
import ProfileUser from "./user";
import {loginToken} from "./api";
import Token from "API/token";

export default function SetUP(){
useEffect(async() => {
  //kiểm tra token để check đăng nhập
  if(ProfileUser.login || Token.die)
    return;

   //kiểm tra token để check đăng nhập
  const token = localStorage.getItem('token');
  if(token){
    try {
      const result = await loginToken("/protected?token="+token);
      //đã đăng nhập
      //Lưu data dể sử dụng
        ProfileUser.login = true;
        ProfileUser.data = result.data;

    } catch (error) {
      ProfileUser.login = false;
      Token.die = true;
      ProfileUser.data = "";
    }
  }
  console.log(ProfileUser.login);
  return;
},[]);
}

"use client"
import React from "react";
import {useRouter} from "next/navigation";

const ButtonRouterRefresh = ({ text, url, btnClass }) => {

    const router = useRouter();

    const routerPushRefreshed =async()=>{
        await router.push(url);
        router.refresh();
        console.log("refreshed")
    }
  return (
    
      <a  style={{ cursor: "pointer" }} onClick={routerPushRefreshed} className={btnClass}>{text}</a>

  );
};

export default ButtonRouterRefresh;
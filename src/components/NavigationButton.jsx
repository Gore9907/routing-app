import React from "react";

export default function NavigationButton({onNavigate}){
    return(
        <button className="Navigation" onClick={onNavigate}>Navigate</button>
    )
}
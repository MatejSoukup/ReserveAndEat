import React, { useState } from 'react'
import { useContext } from "react";
import { UserContext } from "./UserContext";
import "./CSS/Menu.css"



export function Menu(){
    const { userList, loggedInUser, handlerMap } = useContext(UserContext);
    const [open , setOpen] = useState(false);
        return(
            <li className='nav-item'>
                <a className='icon-button' onClick={() => setOpen(!open)}>
                    X
                </a>
                
                {open && <DropdownMenu>
                    {
                        userList.map((user) => (
                            <DropdownItem key={user.id}>
                             <div onClick={() => handlerMap.login(user.id)}>{user.name}</div> 
                            </DropdownItem>
                          ))
                    }
                </DropdownMenu>}
                
            </li>
        );

}


function DropdownMenu(props){

    return(
        <div className='dropdown'>
            {props.children}
        </div>
    );

}

function DropdownItem(props){

    return(
        <a className='menu-item'>
            {props.children}
        </a>
    )

}



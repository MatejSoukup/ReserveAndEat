import React, { useState } from 'react'
import { useContext } from "react";
import { UserContext } from "./UserContext";
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import "./CSS/Menu.css"



export function Menu(){
    const { userList, loggedInUser, handlerMap } = useContext(UserContext);
    const [open , setOpen] = useState(false);
        return(
            <li className='nav-item'>
                <a className='icon-button' onClick={() => setOpen(!open)}>
                    <div className='circle'>
                        <Icon path={mdiAccount} size={1.5} />
                    </div>
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



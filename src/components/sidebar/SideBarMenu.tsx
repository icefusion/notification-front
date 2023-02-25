import React, { useState } from 'react'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import './sidebar.css';
import { BiTachometer } from "react-icons/bi";
import { HiOutlineChatAlt2, HiOutlineClipboardList } from "react-icons/hi";
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg'

function SideBarMenu() {
    const [expanded, setExpanded] = useState(false);
    const [openConfigMenu, setOpenConfigMenu] = useState(false);

    const iconUpDown = (openConfigMenu?<MdKeyboardArrowUp />:<MdKeyboardArrowDown />)
    
    const toggleConfigMenu = () => {
        setOpenConfigMenu((previous) => !previous)
    }

    return (
        <div
            className={expanded?"tamanhoExpanded":"tamanho"}
            onMouseOver={() => {
                setExpanded((previous) => !previous);
            }}
            onMouseOut={() => {
                setExpanded(false);
            }}
        >
            <div className="contec1">
                <img style={{width: '3rem'}} src={logo} />
                {expanded ? (
                    <span className="empresaName pr-2">
                        Notification Admin
                    </span>
                ) : null}
            </div>
            <div style={{ backgroundColor: '#ff0025' }} >
                <div className="containerMenu">
                    <div className="contentMenu">
                        <NavLink to="/admin/dashboard" className="linkStyle theme_Text text-xl mt-2 mb-3">
                            <BiTachometer size={28} />
                            {expanded ? "Dashboard" : null}
                        </NavLink>

                        <NavLink to="/admin/message/send" className="linkStyle theme_Text text-xl mb-3">
                            <HiOutlineChatAlt2 size={28} />
                            {expanded ? "Send Message" : null}
                        </NavLink>

                        <NavLink to="/admin/message/history" className="linkStyle theme_Text text-xl mb-3">
                            <HiOutlineClipboardList size={28} />
                            {expanded ? "Message History" : null}
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBarMenu

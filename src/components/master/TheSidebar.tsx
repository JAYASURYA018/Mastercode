import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarNavDropdown,
    CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config

import { Translation, withTranslation } from "react-i18next";
import navigation from "./_nav";

const TheSidebar = () => {
    const dispatch = useDispatch()
    const show = useSelector((state: any) => state.menuState.sidebarShow)
    /* Do not remove, it is use for dynamic menus based on rights. */
    // const navItems = useSelector((state: any) => state.menuItems.sideMenu)  

    return (
        <Translation ns={['common','aetools']}>
            {
                (t) =>
                    <>

                        <CSidebar
                            show={show}
                            className={show == false ? "c-sidebar-minimized c-sidebar-lg-show" : ""}
                            onShowChange={(val: any) => dispatch({ type: "set", sidebarShow: val })}
                        >
                            <CSidebarBrand className="d-md-down-none" to={`${process.env.PUBLIC_URL}`}>
                                {/* <img alt="acqueon logo" src={'images/acqueon-logo.png'}/> */}

                                <CIcon
                                    className="c-sidebar-brand-full"
                                    name="logo-negative"
                                    height={27}
                                    src={`${process.env.PUBLIC_URL}/images/acqueon-logo.png`}
                                />
                            </CSidebarBrand>
                            <CSidebarNav className={show == false ? "" : "ps"}>
                                <CCreateElement
                                    items={navigation(t)}
                                    components={{
                                        CSidebarNavDivider,
                                        CSidebarNavDropdown,
                                        CSidebarNavItem,
                                        CSidebarNavTitle,
                                    }}
                                />
                            </CSidebarNav>
                            <div className="copywrite">
                                <p>AE Version • 4.2.1.19 </p>
                                <p>Copyright © 2021 Acqueon.</p>
                                <p className="mt-2">All rights reserved.</p>
                            </div>
                            {/*<CSidebarMinimizer className="" /> */}
                        </CSidebar>
                    </>
            }
        </Translation>
    );

};
export default withTranslation(['common','aetools'])(TheSidebar)
//export default React.memo(TheSidebar);
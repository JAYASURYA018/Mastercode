import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
    CHeaderNav
} from "@coreui/react";
import '../master/_master.scss';

import { TheHeaderDropdown, TheHeaderDropdownNotif, TheGeneralSettings } from "./index";


const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state: any) => state.menuState.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

    return (
      <CHeader withSubheader>

               
      <CToggler
              inHeader title="Collapse Menu"
        className="ml-md-3 d-lg-none"
                    onClick={toggleSidebarMobile} id="toggleSidebarMobile"
      />
      <CToggler
                  inHeader title="Collapse Menu"
        className="ml-2 d-md-down-none"
                    onClick={toggleSidebar} id="toggleSidebar"
              />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto"></CHeaderNav>

                <CHeaderNav className="px-3">
                   
        <TheHeaderDropdownNotif />
                <TheHeaderDropdown />
                <TheGeneralSettings />
                    {/*<CLink className="c-subheader-nav-link" href="#" id="GeneralSettings" >*/}
                    {/*    <span className="icon-top-gear" title="General Settings"></span>*/}
                    {/*    </CLink>*/}

      </CHeaderNav>

      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />         
      </CSubheader> */}
  
            </CHeader>

  );
};

export default TheHeader;

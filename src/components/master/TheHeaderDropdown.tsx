import * as React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector } from "react-redux";

const TheHeaderDropdown = () => {
  const user = useSelector((state: any) =>
    state.oidc ? state.oidc.user : null
  );

  const logout = (event: any) => {
    event.preventDefault();
      //userManager.signoutRedirect({ 'id_token_hint': user.id_token });
      //userManager.removeUser();
  };

  return (
      <CDropdown inNav className="c-header-nav-items mx-2">
              <CDropdownToggle className="c-header-nav-link px-0 Account" title="Account" id="Account" caret={false} >
                  <h6 className="mb-0"> Welcome {user?.profile?.name} &nbsp;</h6>
                  <span className="icon-top-user"></span>
              </CDropdownToggle>
      <CDropdownMenu className="px-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <div className="color-themes">
            <div className="themes-grey"></div>
            <div className="themes-orange"></div>
            <div className="themes-red"></div>
            <div className="themes-blue"></div>
          </div>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Updates
          <CBadge color="info" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Tasks
          <CBadge color="danger" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={(event: any) => logout(event)}>
          <CIcon name="cil-account-logout" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;

import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Tooltip } from "@progress/kendo-react-tooltip";

const TheHeaderDropdownNotif = () => {
  const itemsCount = 5;
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
          <CDropdownToggle className="c-header-nav-link" caret={false} id="ShowAlerts">
              <Tooltip openDelay={100} position="left" anchorElement="target" >
                  <CIcon name="cil-bell" size={"lg"} title="Show Alerts"  />
                  </Tooltip>
        <CBadge shape="pill" color="danger">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0 alerts">
        <CDropdownItem header tag="div" className="text-center" color="light">
                  <strong>Alerts {itemsCount}</strong>
        </CDropdownItem>
        <CDropdownItem>
          <span className="sysAlrtDatetime">05/04/2021 10:11 AM - </span>
          <span className="sysAlrtMsg">
            Auto Upload - Invalid File Extension.
          </span>
        </CDropdownItem>
              <CDropdownItem>
                  <span className="sysAlrtDatetime">13/04/2021 10:11 AM - </span>
                  <span className="sysAlrtMsg">
                      Contact Upload - Invalid File Extension.
          </span>
              </CDropdownItem>
              <CDropdownItem>
                  <span className="sysAlrtDatetime">21/05/2021 10:11 AM - </span>
                  <span className="sysAlrtMsg">
                      Dialed  - Invalid File Extension.
          </span>
              </CDropdownItem>
              <CDropdownItem>
                  <span className="sysAlrtDatetime">05/04/2021 10:11 AM - </span>
                  <span className="sysAlrtMsg">
                      Auto Upload - Invalid File Extension.
          </span>
              </CDropdownItem>
              <CDropdownItem>
                  <span className="sysAlrtDatetime">05/04/2021 10:11 AM - </span>
                  <span className="sysAlrtMsg">
                      Auto Upload - Invalid File Extension.
          </span>
              </CDropdownItem>
              <CDropdownItem>
                  <span className="sysAlrtDatetime">05/04/2021 10:11 AM - </span>
                  <span className="sysAlrtMsg">
                      Auto Upload - Invalid File Extension.
          </span>
              </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;

import * as React from "react";
import {
    CDropdown,
    CDropdownMenu,
    CDropdownToggle,
} from "@coreui/react";
import ChangeLanguage from "./ChangeLanguage";
import { RadioGroup } from "@progress/kendo-react-inputs"

const TheGeneralSettings = () => {
    const dataColor = ["grey", "orange", "red", "blue", "green", "black"];
    //const importFileMethod = (event: any) => {
    //    this.state.enableFileType = true;
    //    this.state.fileImported = true;
    //    let file = event.target.files[0];
    //    this.state.selectedFileName = file.name;
    //    this.setState({ selectedFileName: file.name })
    //    const reader = new FileReader()
    //    reader.onload = (onloadEvent: any) => {
    //        this.state.import.file = (onloadEvent.target.result);
    //        this.onComplianceImport(onloadEvent);
    //    };
    //    reader.readAsText(event.target.files[0]);
    //    this.state.import.srcFile = file;
    //};
    return (
        <CDropdown inNav className="c-header-nav-items mx-2">
            <CDropdownToggle className="c-header-nav-link p-0 Account" id="settings" caret={false} >
                <span className="icon-top-gear" title="General Settings"></span>
            </CDropdownToggle>
            <CDropdownMenu className="settings pt-0" placement="bottom-end">
                <p className="title">Color Theme</p>

                <div className="color-themes">
                    <RadioGroup defaultValue="2"
                        aria-labelledby="User-UserType"
                        name="User-UserType" aria-describedby="User-UserType"
                        value="" layout="horizontal" className={"themes " + dataColor}
                        data={[
                            { label: "grey", value: "1", className: 'grey' },
                            { label: "orange", value: "2", className: 'orange' },
                            { label: "red", value: "3", className: 'red' },
                            { label: "blue", value: "4", className: 'blue' },
                            { label: "green", value: "5", className: 'green' },
                            { label: "black", value: "6", className: 'black' },
                        ]}
                    />
                    <span className="themes-grey"></span>
                    <span className="themes-orange"></span>
                    <span className="themes-red"></span>
                    <span className="themes-blue"></span>

                </div>
                <div className="logo" >
                    <button type="button" className="title" data-coreui-toggle="collapse" data-coreui-target=".collapse" role="button" aria-expanded="false" aria-controls="collapseExample" ><span className="icon-dropdown-chevron"> </span> Brand Logo</button>

                    <div id="collapseExample">
                        <label>Full Logo<span className="right">180×30 px</span></label>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control" id="fullLogo" />
                            <label htmlFor="fullLogo" className="input-file-upload"></label>
                            <label className="input-group-text" htmlFor="fullLogo"  >Upload</label>

                        </div>
                        <label>Tab View Logo<span className="right">36×36 px</span></label>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control" id="tablogo" />
                            <label htmlFor="tablogo" className="input-file-upload" ></label>
                            <label className="input-group-text" htmlFor="tablogo">Upload</label>

                        </div>
                        <label>Favicon<span className="right">16×16 px</span></label>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control" id="Favicon" />
                            <label htmlFor="Favicon" className="input-file-upload" ></label>
                            <label className="input-group-text" htmlFor="Favicon">Upload</label>
                        </div>
                    </div>
                </div>

                <div className="langualge">
                    <p className="title">Localization</p>
                    <label className="w-100">Language</label>
                    <ChangeLanguage />
                    <div className="mt-3">
                        <button className="k-button k-secondary mr-2" type="button" >Cancel</button>
                        <button className="k-button k-disabled" type="button" >Apply</button>
                    </div>
                </div>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default TheGeneralSettings;

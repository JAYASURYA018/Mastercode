import * as React from "react";
import {
    ComboBox,
    ComboBoxChangeEvent
} from "@progress/kendo-react-dropdowns";

import { useState } from 'react';
import i18next from "i18next";


interface DDLOptions {
    label: string,
    val: string
}


const ChangeLanguage = () => {
    const defaultVal: DDLOptions = { label: "English", val: "en" }
    const source: DDLOptions[] = [{ label: "English", val: "en" }, { label: "German", val: "de" }, { label: "Spanish", val: "es" }, { label: "French", val: "fr" }, { label: "Italian", val: "it" }, { label: "Japanese", val: "ja" }, { label: "Thai", val: "th" }];
    const [value, setValue] = useState(defaultVal);
    
    const handleChange = (event: ComboBoxChangeEvent) => {
        let val = event.target.value;       
        setValue(val ? val : defaultVal);
        handleClickLanguage(val ? val : defaultVal)
    };

    const handleClickLanguage = (selected: DDLOptions) => {
        i18next.changeLanguage(selected.val);
    }

    return (      
            <ComboBox
            data={source}
            textField="label"
            dataItemKey="val"
            value={value}
            onChange={handleChange}
            clearButton={false}
            allowCustom={false}
        />     
    );
}

export default ChangeLanguage;
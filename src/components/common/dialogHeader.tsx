import React from "react";
import { Translation, withTranslation } from "react-i18next";
import { Input } from "@progress/kendo-react-inputs";

interface DialogHeader {
  savedisable: any;
  operationMode: any;
  object: any;
  cancel: any;
  apply: any;
  handleChange: any;
  textBoxfieldModel: any;
  textBoxUniqueName: any;
  cancelNameUnique: any;
  applyUniqueName: any;
  iconName: any;
  placeholder: any;
  saveLabel: any;
  cancelLabel: any;
  inputfocus?: any;
}
const DialogHeader = (props: DialogHeader) => {
  return (
    <Translation ns={["common"]}>
      {(t) => (
        <p className="heading ">
          <i className={props.iconName}></i>
          {props.operationMode == "Create" || props.operationMode == "add" ? (
            <Input
              type="text"
              className="input-position"
              ref={props.inputfocus}
              value={props.object[props.textBoxfieldModel]}
              maxLength={32}
              required
              name={props.textBoxUniqueName}
              placeholder={props.placeholder}
              onChange={(event: any) =>
                props.handleChange(event, props.textBoxfieldModel)
              }
              aria-labelledby={props.textBoxUniqueName}
              id={props.textBoxUniqueName}
            />
          ) : (
            <>{props.object[props.textBoxfieldModel]}</>
          )}

          <span className="right">
            <button
              className="k-button k-primary mr-16"
              onClick={props.cancel}
              aria-labelledby={props.cancelNameUnique}
              id={props.cancelNameUnique}
              name={props.cancelNameUnique}
              title={props.cancelLabel}
            >
              {props.cancelLabel}
            </button>
            <button
              type="submit"
              className={
                !props.savedisable == true
                  ? "k-button k-create"
                  : "k-button k-secondary"
              }
              title={props.saveLabel}
              aria-labelledby={props.applyUniqueName}
              id={props.applyUniqueName}
              name={props.applyUniqueName}
              disabled={!props.savedisable}
              onClick={() => props.apply()}
            >
              {props.saveLabel}
            </button>
          </span>
        </p>
      )}
    </Translation>
  );
};
export default withTranslation(["common"])(DialogHeader);

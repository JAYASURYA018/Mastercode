import React from "react";
import { t } from "i18next";

const defaultNs = { ns: ['camp', 'common'] };

const FieldListSelection = (props: any) => {
	return (
		props.showFieldSelection && <div className="row select-fields" >
			<div className="pull-right posi-right">
				<button className="k-button k-primary" onClick={() => document.body.click()}>{t('common.cancel', defaultNs)}</button>
			</div>
			<div className="listlabelicon" style={{ width: "150px" }}>{t('camp.SystemFields', defaultNs)}</div>
			<div style={{ borderRight: "1px solid #aaa", }}>
				<ul className="selection-itembox">
					{(props.getFilterSystemField(props.pageName))?.map(function (value: any, systemFieldIndex: any) {
						return <li className={(props.fieldSelectionItem === value.fieldName && props.fieldSelectionItemId == value.businessTypeId) ? 'active' : ''} onClick={() => props.fieldConditionSelection(value, props.index)} style={{ width: "230px" }}>{value.fieldName}</li>
					})}
				</ul>
			</div>

			<div style={{ borderRight: "1px solid #aaa", height: "inherit" }}>
				{props.businessFieldCount > 0 && <>
					<div className="listlabelicon" style={{ width: "150px" }}>{t('camp.BusinessFields', defaultNs)}</div>
					<ul className="selection-itembox" style={{ marginTop: "24px" }}>

						{(props.getFilterBusinessField())?.map(function (value: any, businessFieldIndex: any) {
							return <li className={(props.fieldSelectionItem === value.fieldName && props.fieldSelectionItemId == value.businessTypeId) ? 'active' : ''} onClick={() => props.fieldConditionSelection(value, props.index)} style={{ width: "230px" }}>{value.fieldName}</li>
						})}
					</ul> </>}
			</div>
			<div style={{ borderRight: "1px solid #aaa", height: "inherit" }}>
				{props.expressionFieldCount > 0 && <ul className="selection-itembox">
					<li className="listlabelicon" style={{ width: "150px" }}>{t('uc.expresionfields', defaultNs)}</li>
					{(props.getFilterExpressionField())?.map(function (value: any, expressionFieldIndex: any) {
						return <li className={(props.fieldSelectionItem === value.fieldName && props.fieldSelectionItemId == value.businessTypeId) ? 'active' : ''} onClick={() => props.fieldConditionSelection(value, props.index)} style={{ width: "230px" }} >{value.fieldName}</li>
					})}
				</ul>}
			</div>

		</div>
	);
}

export default FieldListSelection;
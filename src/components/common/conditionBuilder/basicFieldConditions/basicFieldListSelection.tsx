import React from "react";
import { t } from "i18next";

const defaultNs = { ns: ['camp', 'common'] };

const BasicFieldListSelection = (props: any) => {
	return (
		props.showFieldSelection && <div className="row select-fields">
			<div className="pull-right posi-right">
				<span onClick={() => document.body.click()} className="pr-2 cursor"><i className="icon-pop-up-close"> </i></span>
			</div>
			<div className="listlabelicon">{t('camp.SystemFields', defaultNs)} </div>

			<div>
				<ul className="selection-itembox">
					{(props.getFilterSystemField(props.pageName))?.map(function (value: any, systemFieldIndex: any) {
						return <li className={(props.fieldSelectionItem === value.fieldName && props.fieldSelectionItemId == value.businessTypeId) ? 'active' : ''} onClick={() => props.fieldSelection(value, props.index, props.index1)} style={{ width: "230px" }}>{value.fieldName}</li>
					})}
				</ul>
			</div>

			<div style={{ borderRight: "1px solid #eaeae5", height: "inherit" }}>
				{props.businessFieldCount > 0 && <ul className="selection-itembox" >
					<li className="listlabelicon" style={{ width: "150px" }}>{t('camp.BusinessFields', defaultNs)}</li>
					{(props.getFilterBusinessField())?.map(function (value: any, businessFieldIndex: any) {
						return <li className={(props.fieldSelectionItem === value.fieldName && props.fieldSelectionItemId == value.businessTypeId) ? 'active' : ''} onClick={() => props.fieldSelection(value, props.index, props.index1)} style={{ width: "230px" }}>{value.fieldName}</li>
					})}
				</ul>}
			</div>

			<div style={{ borderRight: "1px solid #eaeae5", height: "inherit" }}>
				{props.expressionFieldCount > 0 && <ul className="selection-itembox" >
					<li className="listlabelicon" style={{ width: "150px" }}>{t('uc.expresionfields', defaultNs)}</li>
					{(props.getFilterExpressionField())?.map(function (value: any, expressionFieldIndex: any) {
						return <li className={(props.fieldSelectionItem === value.fieldName && props.fieldSelectionItemId == value.businessTypeId) ? 'active' : ''} onClick={() => props.fieldSelection(value, props.index, props.index1)} style={{ width: "230px" }} >{value.fieldName}</li>
					})}
				</ul>}
			</div>

		</div>
	);
}

export default BasicFieldListSelection;
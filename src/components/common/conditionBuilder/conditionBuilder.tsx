import React from "react";
import { Switch } from "@progress/kendo-react-inputs";
import { t } from "i18next";
import BasicFieldConditions from "../conditionBuilder/basicFieldConditions/basicFieldConditions";
import FieldConditions from "../conditionBuilder/fieldListCondition/fieldConditions";
import { IconditionBuilder } from '../../../interface/common/IconditionBuilder';

const defaultNs = { ns: ['camp', 'common'] };

interface Iprops extends IconditionBuilder {}

const ConditionBuilder = (props: Iprops) => {
	return (<div className="csc-wrapper">
		<div className={`col-md-3 adBuilder ${props?.cssGroupConditionModel?.conditionType ? 'mc-condition-enable-operator css-addbuilder border-0' : 'mc-condition-disabletext-type border-0'}`}>
			<label className="pr-1">{t('mc.advanceconditionbuilder.buildcondition.label', defaultNs)}</label>
			<Switch checked={props.cssGroupConditionModel.conditionType} onChange={(event: any) => props.onChangeSearchAdvanceBuilder(event)} />
		</div>
		<div className="csc-builder">
			<BasicFieldConditions {...props} />
			<FieldConditions {...props} />
		</div>
	</div>);
}

export default ConditionBuilder;
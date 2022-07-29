import React, { memo } from "react";
import { t } from "i18next";
import { Checkbox, RadioGroup, TextArea } from "@progress/kendo-react-inputs";

interface Iprops {
	strategyType?: number;
	description?: string;
	restictedMultiEmailSMS?: any;
	contactStrategyModelChange?: (event: any, field: string) => void;
	isEditContactStrategy?: boolean;
}

const defaultNs = { ns: ['camp', 'common', 'callstrategy','aetools'] };

const General = (props: Iprops) => {
	const strategyTypeData: Array<any> = [{ label: t('callstrategy.callstrategyType.simple', defaultNs), value: 1 }, { label: t('callstrategy.callstrategyType.advanced', defaultNs), value: 2 }, { label: t('callstrategy.callstrategyType.callback', defaultNs), value: 3 }];

	return (
		<div className="container px-5 pt-3" >
			<label className="title">{t('camp.General_Settings', defaultNs)}</label>
			<div className="row">
				<div className="col-md-12">
					<label className={props.strategyType > 0 ? 'w-100' : 'errorlabel w-100'}>{t('callstrategy.callstrategyType', defaultNs)}</label>
					<RadioGroup disabled={props.isEditContactStrategy} data={strategyTypeData} layout="horizontal" onChange={(event: any) => { props.contactStrategyModelChange(event, 'strategyType') }}
						value={props.strategyType} />
				</div>
			</div>
			<div className="row">
				<div className="col-md-12 mt-24">
					<label id={"description-labelContactStrategy"} aria-labelledby={t('callstrategy.callstrategydescription', defaultNs)} className="px-1 mr-1 w-100">{t('archive.S3Url', defaultNs)}</label>
					<TextArea id="description-contactStrategy" onChange={(event: any) => { props.contactStrategyModelChange(event, 'description') }} placeholder={t('callStrategy.description.placeholder', defaultNs)} className="emailMessage w-50" name="description-contactStrategy"
						value={props.description} aria-label={t('callstrategy.callstrategydescription', defaultNs)} />
				</div>
			</div>
			<div className="row">
				<div className="col-md-12 mt-24">
					<Checkbox label={t('aetools.calldirection', defaultNs)} onChange={(event: any) => { props.contactStrategyModelChange(event, 'restictedMultiEmailSMS') }} value={props.restictedMultiEmailSMS} className="pr-3" />
				</div>
			</div>
		</div>
	);
}

export default memo(General);
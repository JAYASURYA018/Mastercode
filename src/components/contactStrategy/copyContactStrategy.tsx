import React, { Component } from "react";
import ApiService from "../../services/api-manager";
import ApiConstants from "../../api-constants";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { t } from "i18next";
import { IcopyContactStrategy } from "../../interface/contactStrategy/IcontactStrategy";
import toastrmsg from "../../services/toaster-manager";


interface Istate {
	copyContactStrategyDialog?: boolean;
	copyContactStrategy?: IcopyContactStrategy;
}

interface Iprops {
	sourceContactStrategy?: string;
	callstrategyList?: () => void;
	isCopyContactStrategy?: boolean;
	closeCopyContactStrategyDialog?: () => void;
}

const defaultNs = { ns: ['camp', 'common', 'callstrategy'] };

export class CopyContactStrategy extends Component<Iprops, Istate> {
	public state: Istate = {
		copyContactStrategyDialog: true,
		copyContactStrategy: {}
	};

	constructor(props: any) {
		super(props);
		this.onChangeCopyContactStrategy = this.onChangeCopyContactStrategy.bind(this);
	}

	shouldComponentUpdate(nextProps: any, nextState: any) {
		if (nextProps !== this.props || nextState !== this.state) {
			return true;
		} else {
			return false;
		}
	}

	onChangeCopyContactStrategy = (event: InputChangeEvent, field: string) => {
		this.state.copyContactStrategy[field] = event.value;
		this.setState({ copyContactStrategy: this.state.copyContactStrategy });
	}

	saveCopyContactStrategy = () => {
		this.state.copyContactStrategy.pageName = "Call Strategy";
		this.state.copyContactStrategy.enterpriseId = 1;
		this.state.copyContactStrategy.operation = "Create";
		this.state.copyContactStrategy.data = "";
		this.state.copyContactStrategy.createUser = "1";
		this.state.copyContactStrategy.sourceContactStrategy = this.props.sourceContactStrategy;
		ApiService.post(ApiConstants.copyContactStrategy, this.state.copyContactStrategy).then(data => {
			if (data != undefined) {
				let statusCode = data;
				if (statusCode.returnValue == 50035) {
					this.props.callstrategyList();
					this.props.closeCopyContactStrategyDialog();
					toastrmsg.toastMessage(t("callstrategy.message.success.copycallstrategy", defaultNs), "success");
				}
				else if (statusCode.returnValue == -50034) {
					toastrmsg.toastMessage(t("callstrategy.message.callstrategyexists", defaultNs), "error");
				}
				else if (statusCode.returnValue == -50089) {
					toastrmsg.toastMessage(t("callstrategy.message.callstrategynameexists_50089", defaultNs), "error");
				}
				else if ((statusCode.returnValue == -50028) || (statusCode.returnValue == -1)) {
					toastrmsg.toastMessage(t("callstrategy.message.errortransaction", defaultNs), "error");
				}
				else if (statusCode.returnValue == -50086) {
					toastrmsg.toastMessage(t("callstrategy.message.callstrategynameexists_50086", defaultNs), "error");
				}
				else if (statusCode.returnValue == -50087) {
					toastrmsg.toastMessage(t("callstrategy.message.callstrategynameexists_50087", defaultNs), "error");
				}
				else if (statusCode.returnValue == -50088) {
					toastrmsg.toastMessage(t("callstrategy.message.callstrategynameexists_50088", defaultNs), "error");
				}
				else {
					toastrmsg.toastMessage(t("callstrategy.message.errortransaction", defaultNs), "error");
				}
			}
		}).catch(error => { });
	}

	keyPress = (event: any) => {
		let pattern = "`~!#$%^&*()+={}[]\\\';,./{}|\":<>?";
		event = event || window.event;
		let charCode = event.keyCode || event.which;
		let charStr = String.fromCharCode(charCode);
		if (pattern.indexOf(charStr) != -1) {
			event.preventDefault();
		}
		else {
			return true;
		}
	}

	render() {
		return (
			<>
				{this.state.copyContactStrategyDialog && (<Dialog height={250} width={500} className="dialogpop" onClose={this.props.closeCopyContactStrategyDialog}>
					<p className="heading">
						<i className="icon-tool-clone"></i>
						<span className="">{t('callstrategy.label.copycallstrategy_name', defaultNs)}</span>
						<button id="Save-CopyContactStrategy" name="Save-CopyContactStrategy" title="Copy Contact Strategy" onClick={this.saveCopyContactStrategy} disabled={(!this.state.copyContactStrategy?.dialPlanName || this.state.copyContactStrategy?.dialPlanName?.trim().length == 0) ? true : false}
							aria-label="Save Copy Contact Strategy" className={(!this.state.copyContactStrategy?.dialPlanName || this.state.copyContactStrategy?.dialPlanName?.trim().length == 0) ? "k-button k-Create float-right" : "k-button k-primary mr-4 float-right"} type="button">{t('css.copycssgroup.btn.save', defaultNs)}</button>
						<button className="k-button k-primary mr-4 float-right" onClick={this.props.closeCopyContactStrategyDialog} id="Cancel-CopyCssGroup" name="Cancel-CopyCssGroup" title={t('camp.Cancel', defaultNs)}
							aria-label="Cancel Copy Contact Strategy">{t('camp.Cancel', defaultNs)}</button>
					</p>
					<div className="p-3 ml-4">
						<div className="row">
							<div className="col-10 mt-4">
								<label className={(!this.state.copyContactStrategy?.dialPlanName || this.state.copyContactStrategy.dialPlanName?.trim().length == 0) ? ' errorlabel w-100' : 'w-100'}>{t('callstrategy.label.copycallstrategy_name', defaultNs)}</label>
							</div>
							<div className="col-10">
								<Input id="Copy-ContactStrategyName" name="Copy-ContactStrategyName" aria-label="CopyContactStrategyName" type="text" required={true} onKeyPress={this.keyPress}
									title={t('callstrategy.Fill_Copy_Contact_Strategy_name', defaultNs)} value={this.state.copyContactStrategy?.dialPlanName} onChange={(event) => { this.onChangeCopyContactStrategy(event, 'dialPlanName') }} maxLength={32} />
							</div>
						</div>
						<div className="row">
							<div className="col-10 mt-4">
								<label className={"" ? ' errorlabel w-100' : 'w-100'}>{t('callstrategy.label.copycallstrategy_description', defaultNs)}</label>
							</div>
							<div className="col-10">
								<Input id="Copy-ContactStrategyDescription" name="Copy-ContactStrategyDescription" aria-label="Copy Contact Strategy Description" type="text"
									title={t('callstrategy.Fill_Copy_Contact_Strategy_description', defaultNs)} value={this.state.copyContactStrategy?.description} onChange={(event) => { this.onChangeCopyContactStrategy(event, 'description') }} />
							</div>
						</div>
					</div>
				</Dialog>)}
			</>
		);
	}
}
import React from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import '../../scss/_custom.scss'
import { Translation, withTranslation } from "react-i18next";

interface DeleteConfirmationPopupProps {
	contentName?: string;
	titleContent: string;
	description: string;
	iconClass: string;
	handleDeleteClick?: () => void;
	popUpCloseClick?: () => void;
	cancelAriaLabel?: string;
	cancelId?: string;
	cancelName?: string;
	deleteAriaLabel?: string;
	deleteId?: string;
	deleteName?: string;
}

const DeleteConfirmationPopup = (props: DeleteConfirmationPopupProps) => {
	const commonNs = { ns: ['common'] };
	return (
		<Translation ns={['common']}>
			{
				(t) =>
					<Dialog height={300} width={400} className="deleteActionDialog" onClose={props.popUpCloseClick}>
						<span className="float-right" onClick={props.popUpCloseClick}>
							<i className="icon-pop-up-close"></i>
						</span>
						<div className="pl-3 pr-4 pt-3">
							<div className="text-center">
								<i style={{ fontSize: "50px" }} className="icon-pop-up-attention"></i>
								<h3 className="defaultColor">{t('common.warning', commonNs)}</h3>
							</div>
							<div className="d-inline-flex">
								<div>
									<i className={props.iconClass}></i>
								</div>
								<div className="pl-2">
									<span className="text-ellipsis"><b className="pr-10">{props.contentName}</b>{props.titleContent}</span>
									<p>{props.description}</p>
								</div>
							</div>
							<div className="text-center mt-15">
								<div>
									<button type="button" id={props.cancelId } name={props.cancelName } title={t('common.cancel', commonNs)}
										aria-label={props.cancelAriaLabel } className="k-button k-secondary mr-4" onClick={props.popUpCloseClick}>
										{t('common.cancel', commonNs)}</button>
									<button type="button" id={props.deleteId} name={props.deleteName} aria-label={props.deleteAriaLabel}
										title={t('common.delete', commonNs)} className="k-button k-primary" onClick={props.handleDeleteClick}>{t('common.delete', commonNs)}
									</button>
								</div>
							</div>
						</div>
					</Dialog>
			}
		</Translation>
	)
}
export default withTranslation(['common'])(DeleteConfirmationPopup)
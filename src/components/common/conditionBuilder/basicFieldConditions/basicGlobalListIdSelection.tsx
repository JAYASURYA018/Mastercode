import React from "react";
import { t } from "i18next";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Grid, GridColumn as Column, } from "@progress/kendo-react-grid";

const defaultNs = { ns: ['camp', 'common'] };

const BasicGlobalListIdSelection = (props: any) => {
	return (
		props.showGlobalListIDSelection &&
		<div style={{ width: "655px" }}>
			<div className="panel-default">
				<div className="panel-heading" onClick={props.backToFieldSelectionDialog}>
					<h4 className="panel-title cursor">

						<i className="icon-tool-left mr-3 pl-2 primary border-right"></i>
						<a role="button" className="accordion-toggle"><span>{t('mc.conditionbuilder.fieldselection.globallist.title', defaultNs)}</span></a>
					</h4>
				</div>
			</div>
			<div className="pull-right d-inline-flex">
				<span className="d-inline-block pr-6 border-right pr-3 cursor self-center" onClick={() => props.applyGlobalListIdSelection(props.index, props.index1)}>{t('css.conditionbuilder.fieldselection.contactlist.buttonapply', defaultNs)}</span>
				<span onClick={() => document.body.click()} className="pr-3 pl-3"><i className="icon-pop-up-close cursor"> </i></span>
			</div>
			<div style={{ clear: "both" }}></div>
			<div>
				<Grid style={{ height: "250px", width: "665px" }} data={props.globalListIdData}>
					<Column
						width="50px"
						field="status"
						title=""
						headerCell={(cellProps) => <Checkbox id="GlobalListFieldValue-SelectAll" name="GlobalListFieldValue-SelectAll" aria-label="GlobalListFieldValue-SelectAll" defaultChecked={props.isAllGlobalListSelected}
							onChange={props.globalListHeaderSelectionChange} />}
						cell={(cellProps) => (
							<td className={cellProps.className} style={cellProps.style}>
								<Checkbox defaultChecked={cellProps.dataItem.status} id={"GlobalListFieldValue-Select" + cellProps.dataIndex} aria-label={"GlobalListFieldValue-Select" + cellProps.dataIndex}
									name={"GlobalListFieldValue-Select" + cellProps.dataIndex} onChange={(event) => props.globalListSelectionChange(event, cellProps.dataItem)} />
							</td>
						)}
					/>
					<Column
						width="600px"
						field="listIdDisplay"
						title={t('css.conditionbuilder.fieldselection.contactlist.grid.listid.heading', defaultNs)}
					/>
				</Grid>
			</div>
		</div>
	);
}

export default BasicGlobalListIdSelection;
import React from "react";
import { Translation, withTranslation } from "react-i18next";
import {
    Grid,
    GridColumn as Column,
    GridToolbar
} from "@progress/kendo-react-grid";
export interface CallStatusSummaryProps {

}
export interface CallStatusSummaryInfo {
    Sender: string;
    Receiver: string;
    MessageType: string;
    Data?: (DataEntity)[] | null;
    Time: string;
}
export interface DataEntity {
    CallState: string;
    CallCount: number;
}

const CallStatusSummary = (props: CallStatusSummaryProps) => {
    let data: CallStatusSummaryInfo = {
        "Sender": "ATIDataService",
        "Receiver": "AEConsole_dinesh_1647418944195",
        "MessageType": "CallStatusSummaryReport",
        "Data": [{ "CallState": "DialingInProgress", "CallCount": 0 }, { "CallState": "CPA", "CallCount": 0 }, { "CallState": "LiveCallsConnected", "CallCount": 0 }, { "CallState": "ACW", "CallCount": 0 }, { "CallState": "Queue", "CallCount": 0 }, { "CallState": "Abandoned", "CallCount": 0 }, { "CallState": "ConnectedToAgent", "CallCount": 0 }, { "CallState": "ConnectedToMachine", "CallCount": 0 }],
        "Time": "03/16/2022 08:25:30.103"
    }


    return (
        <Translation ns={['statelaw', 'common', 'camp']}>
            {
                (t) => <>

                    <Grid
                        data={data.Data}
                        // sort={sort}
                        // sortable={true}
                        // onSortChange={sortChange}
                        className="slg-holiday"
                    >
                        <GridToolbar>
                            <div className="col-md-12 text-left"><label>Call Status Summary</label>
                            </div>
                        </GridToolbar>
                        <Column className='text-center'
                            field="CallState"
                            title="Call State"
                        />
                        <Column className='text-center'
                            field="CallCount"
                            title="Call Count"
                        />
                    </Grid>
                </>
            }
        </Translation>
    )
}

export default withTranslation(['statelaw', 'common', 'camp'])(CallStatusSummary)

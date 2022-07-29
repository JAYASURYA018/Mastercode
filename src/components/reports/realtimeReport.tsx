import React from 'react';
import RealTimeStatistics from './realTimeStatistic/realTimeStatistics';
import AgentStatusSummary from './realTimeStatistic/performanceMatrix/agentStatusSummary';
import CallStatusSummary from './realTimeStatistic/performanceMatrix/callStatusSummary';
import CampaignSummary from './realTimeStatistic/performanceMatrix/campaignSummary';
import CallDetails from './realTimeStatistic/performanceMatrix/callDetails';
import AgentStatusDetails from './realTimeStatistic/performanceMatrix/agentStatusDetails';
import { Row } from 'react-bootstrap';
import { DropDownList } from '@progress/kendo-react-dropdowns';

const RealtimeReport = () => {
    return (
        <div className="fluid-container gridReports">
            <Row className="row page-heading CS-page-heading">
                <div className="col-md-5 col-sm-5 pr-0">
                    <span className="align-middle"><i className="icon-sys-mode-multi"></i></span>
                    <DropDownList data={["Campaing Parameters"]} defaultItem="FRI-Collections-multichannel" />
                    <span className="border-left ml-12 pl-22 d-inline-block">
                        Voice � Digital
                            </span>
                </div>
                <div className="col-md-7 col-sm-7 text-right">
                    <button className="btn-circle mr-3">
                        <i className="fa fa-play" title="Start"></i>
                    </button>
                    <button className="btn-circle mr-3">
                        <i className="fa fa-stop" title="Stop"></i>
                    </button>
                    <button className="btn-circle">
                        <i className="fa fa-minus" title="Flush"></i>
                    </button>
                    <span className="v-div"> </span>
                    <button className="pr-0 border-0 border-left align-middle">
                        <i className="icon-tool-clone" title="Copy"></i>
                    </button>
                    <button className="pl-3  border-0 align-middle">
                        <i className="icon-tool-delete" title="Delete"></i>
                    </button>
                    <span className="v-div"> </span>

                    <button className="k-button k-primary">
                        Save
                            </button>
                    <span className="v-div"> </span>
                    <button className="align-middle no-border" type="button" onClick={(event) => { }}>
                        <i className="icon-pop-up-close" title="Close"></i>
                    </button>
                </div>
            </Row>
            <Row className="tab-cs-segment">
                <div className="col-8">
                    <ul className="cust-tab">
                        <li className={true ? 'cust-tab-item active' : 'cust-tab-item'} onClick={() => { }}><i className="icon-tab-campaign"></i> Campaign Details</li>
                        <li className={false ? 'cust-tab-item active' : 'cust-tab-item'} onClick={() => { }}><i className="icon-tab-segment"></i> Segments</li>
                        <li className={false ? 'cust-tab-item active' : 'cust-tab-item'} onClick={() => { }}><i className="icon-tab-edit"></i> Campaign Studio</li>
                    </ul>
                </div>
                <div className="col-2 text-right pt-1"><a href="#" className="help-btn">Help</a></div>
            </Row>
            <RealTimeStatistics />

            <div className="row">
                <div className="col-md-6">
                    <AgentStatusSummary />
                </div>
                <div className="col-md-6">
                    <CallStatusSummary />
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <AgentStatusDetails />
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <CampaignSummary />
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <CallDetails />
                </div>
            </div>
            {/*<div className="row">*/}
            {/*    <div className="col-md-6">*/}
            {/*        <TelephonyOutcome />*/}
            {/*    </div>*/}
            {/*    <div className="col-md-6">*/}
            {/*        <BusinessOutcome />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="row">*/}
            {/*    <div className="col-md-6">*/}
            {/*        <ContactStatus />*/}
            {/*    </div>*/}
            {/*</div>*/}



        </div>
    )
}
export default RealtimeReport
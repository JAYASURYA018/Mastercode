import React, { Component } from "react";
interface Iprops {
    //helpText: any;
    //helpTextClose:any
}

export class HelpText extends Component<Iprops>  {
    helpTextClose = ()=> {}
    render() {
        return (
            <>
                <div className="header"><i className="icon-tab-edit"></i> <span> Campaign Studio</span> <span className="icon-pop-up-close float-right" onClick={this.helpTextClose}></span></div>
                <div className="help-content">
                    <label>Call Progress Analysis</label>
                    <div className="title">Timeout Settings</div>
                    
                    <span className="helpt-highlight">Task</span>
                    <p>
                        The number of seconds to which, Customer calls can stay in the Queue. Post which, the calls will be abandoned.
                    </p>
                    <div className="title">Values:</div>
                    <p><b>Default</b> • <b>900</b> seconds <br />
                        <b>Allowed</b> • between <b>1</b> and <b>1,800</b> seconds</p>
                    <p className="border-bottom"> </p>
                    <div className="helpt-highlight">Reservation</div>
                    <p>The number of seconds you want the Reservation to be made for the Worker.</p>

                    <p>This value is always read-only mode in AE Console; However This value can be changed in the Twilio-Flex under Work Flow module.</p>

                    <p>Make sure, Sync operation to be done in the AEConsole post changing this value in the Twilio-Flex to reflect the changes.</p>
                    <p className="border-bottom"> </p>
                    <div className="helpt-highlight">Auto Accept</div>
                    <p>Auto Accept will be done immediately when reservation is created to an agent. The timer value is applicable only for PCB calls to an agent</p>
                    <div className="title">Values:</div>
                    <p><b>Default</b> • <b>900</b> seconds <br />
                        <b>Allowed</b> • between <b>1</b> and <b>1,800</b> seconds</p>
                    <p className="border-bottom"> </p>
                    <div className="helpt-highlight">Auto Accept</div>
                    <p> The number of wait time in seconds to which Agent to complete the wrap-up.</p>

                    <p>When agent is failed to complete within this duration, the task will be wrap-up automatically with “Success” Outcome</p>

                </div>
            </>
        )
    }
}
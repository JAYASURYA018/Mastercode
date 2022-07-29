import * as React from 'react'
import { CallbackComponent } from "redux-oidc";
import userManager from "../../utils/userManager";
import { Dispatch } from 'redux';
import { User } from 'oidc-client';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

interface CallbackPageProps {
    user: User;
    dispatch: Dispatch;
}

class Callback extends React.Component<CallbackPageProps> {  

    successCallback = (user: User) => {
        this.props.dispatch(push(`${process.env.PUBLIC_URL}/`));
    }

    render() {
        // just redirect to '/' in both cases
        return (
            <CallbackComponent
                userManager={userManager}
                successCallback={this.successCallback}
                errorCallback={error => {
                    console.log(error);
                    this.props.dispatch(push(`${process.env.PUBLIC_URL}/`));
                }}
            >
                <div>Redirecting...</div>
            </CallbackComponent>
        );
    }
}

export default connect()(Callback);

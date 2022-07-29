import * as React from "react";
import userManager from "../../utils/userManager";

class LoginPage extends React.Component {

    componentDidMount() {
        userManager.signinRedirect();
    }   

    render() {
        return (
            <div>
                Processing...               
            </div>
        );
    }
}

export default LoginPage;

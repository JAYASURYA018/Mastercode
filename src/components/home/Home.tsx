import * as React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import TheLayout from "../master/TheLayout";
import ApiService from "../../services/api-manager";
import ApiConstants from "../../api-constants";

function HomePage(props: any) {
    /* DO NOT REMOVE the commented code in this file, it use for dynamic menus load based on rights. */

    //if (!props?.user) {
    //    return <LoginPage />;
    //}
    //else {
    //    const user = useSelector((state: any) => state.oidc ? state.oidc.user : null)
    //    const userId = user?.profile?.sub;

    //    if (userId) {
    //        const menu = useSelector((state: any) => state.menuItems ? state.menuItems.sideMenu : null)
              const dispatch = useDispatch()

            //if (menu.length == 0) {
            //    let token = store.getState()?.oidc?.user?.access_token;
            //    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            //    axios.get(`${process.env.PUBLIC_URL}` + "/GetAuthInfo?userid=" + userId + "&&url=" + `${process.env.PUBLIC_URL}` + "&&token=" + token)
            //        .then((response: any) => {
            //            dispatch({ type: "set", sideMenu: response.data });
            //            return <TheLayout />
            //        })
            //        .catch((error: any) => {
            //        });
            //}

            /* Get Mater model and store it in redux. */
            const master = useSelector((state: any) => state.masterState ? state.masterState.masterData : null)
            if (master == undefined || master?.length == 0) {                
                ApiService.getAll(ApiConstants.masterModel + "?userId=" + 1)
                    .then((response: any) => {
                        dispatch({ type: "set", masterData: response });
                    }).catch((error) => {
                        console.log(error);
                    });
            }
       //}
    //}
   
    return <TheLayout />
}

function mapStateToProps(state: any) {
    return {
        user: state.oidc.user,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

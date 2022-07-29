import { createUserManager } from 'redux-oidc';
import config from '../config.json';

const userManagerConfig = {
    client_id: 'AEConsolecore',
    client_name: 'AEConsolecore',
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${window.location.pathname}/callback`,
    response_type: 'code',   
    scope: "openid profile",
    authority: config.AppSettings.IdentityServerAuthorityUrl,
    post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${window.location.pathname}`,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;

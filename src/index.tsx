import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { icons } from './assets/icons'
import store, { history } from './store/store';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { OidcProvider } from 'redux-oidc';
import userManager from './utils/userManager';
import './i18n';
import { Tooltip } from "@progress/kendo-react-tooltip";


React.icons = icons

ReactDOM.render(
    <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
            <Suspense fallback={<span>Loading...</span>}>
                <Tooltip openDelay={100} position="bottom" anchorElement="target" >
                    <App history={history} />
                    </Tooltip>
                </Suspense>
        </OidcProvider>
    </Provider>,
    document.getElementById('root'));

//registerServiceWorker();

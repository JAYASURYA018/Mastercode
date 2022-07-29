import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import App from './App';
import userManager from './utils/userManager';
import store, { history }  from './store/store';


it('renders without crashing', () => {  

    ReactDOM.render(
        <Provider store={store}>
            <OidcProvider store={store} userManager={userManager}>
                <App history={history} />
            </OidcProvider>
        </Provider>, document.createElement('div'));
});

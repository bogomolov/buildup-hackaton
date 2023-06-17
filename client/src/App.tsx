import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from "./AppRouter";

import {store} from 'src/store';

function App() {
    return (
    <Provider store={store}>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </Provider>
    );
}

export default App;

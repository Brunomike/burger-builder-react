import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose,combineReducers} from "redux";
import {Provider} from "react-redux"
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';


import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import {watchAuth,watchBurgerBuilder,watchOrders} from './store/sagas';

const composeEnhancers = process.env.NODE_ENV ==='development'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;

const rootReducer=combineReducers({
    burgerBuilder:burgerBuilderReducer,
    order:orderReducer,
    auth:authReducer
})

const sagaMiddleware=createSagaMiddleware();

const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(thunk,sagaMiddleware)
    ));

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOrders)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(
    <React.StrictMode>
        {app}
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//test: /\.css$/
//modules:true,
//localIdentName: '[name]__[local]__[hash:base64:5]'
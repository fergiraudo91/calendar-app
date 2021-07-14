import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { AppRouter } from '../../router/AppRouter';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);




describe('Pruebas en <AppRouter />', () => {


   
    test('Debe de mostrar el spiner', () => {
        const initState = {
            authReducer: {
                checking: true
            }
        };
        
        let store = mockStore(initState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.spinner-border').exists()).toBe(true);
    });

    test('Debe de mostrar la ruta publica', () => {
        const initState = {
            authReducer: {
                checking: false,
                uid: null
            }
        };
        
        let store = mockStore(initState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find('.login-container').exists()).toBe(true);
    });

    test('Debe de mostrar la ruta privada', () => {
        const initState = {
            ui: {
                modalOpen: false
            },
            calendar: {
                events: []
            },
            authReducer: {
                checking: false,
                uid: 123,
                name: 'Ferchus'
            }
        };
        
        let store = mockStore(initState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find('.navbar').exists()).toBe(true);
    })
    
    
});

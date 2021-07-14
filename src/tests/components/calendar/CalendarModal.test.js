import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import moment from 'moment';


jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const now = moment().minute(0).second(0).add(1, 'hours');
const after = now.clone().add(1, 'hours');
const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola mundo',
            notes: 'notitas',
            start: now.toDate(),
            end: after.toDate()
        },
    },
    authReducer: {
        uid: 123,
        name: 'Fernando'
    },
    ui: {
        modalOpen: false
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
)


describe('Pruebas en <CalendarModal />', () => {
   
    test('debe de mostrar el modal', () => {
        expect(wrapper.find('.modal').exists()).toBe(true);
    });
    
});

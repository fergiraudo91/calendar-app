import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={store}>
        <LoginScreen />
    </Provider>
)

describe('Pruebas en <LoginScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
   
    test('Debe Mostrarse correctamente', () => {
       expect(wrapper).toMatchSnapshot();
        
    });
    
    test('Debe de llamar el dispatch del login', () => {
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'fergiraudo91@gmail.com'
            }
        });

        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '14142135'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });
        expect(startLogin).toHaveBeenCalledWith('fergiraudo91@gmail.com', '14142135');
    });

    test('No hay registro si las contraseñas son diferentes', () => {
       
        wrapper.find('input[name="rPassword"]').simulate('change', {
            target: {
                name: 'rPassword',
                value: '14142135'
            }
        });

        wrapper.find('input[name="rPassword"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '07151405'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect(startRegister).not.toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Las contraseñas deben ser iguales", "error");
        
    });

    test('Debe dispararse el registro con contaseñas iguales', () => {

        wrapper.find('input[name="rName"]').simulate('change', {
            target: {
                name: 'rName',
                value: 'Fernando'
            }
        });

        wrapper.find('input[name="rPassword"]').simulate('change', {
            target: {
                name: 'rPassword',
                value: '14142135'
            }
        });

        wrapper.find('input[name="rPassword"]').simulate('change', {
            target: {
                name: 'rEmail',
                value: 'fergiraudo91@gmail.com'
            }
        });

        wrapper.find('input[name="rPassword"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '14142135'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect(startRegister).toHaveBeenCalledWith("fergiraudo91@gmail.com", "14142135", "Fernando");
        expect(Swal.fire).not.toHaveBeenCalled();

    })
    
    
    
    
});

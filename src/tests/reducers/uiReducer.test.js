import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

describe('Pruebas en uiReducer', () => {

    const initState = {
        modalOpen: false
    }
   
    test('Debe de retornar el estado por defecto', () => {
        const state = uiReducer( initState, 'arrorror');
        expect(state).toEqual(initState);
    });

    test('Debe de abrir y cerrar el modal', () => {
        
        const modalOpen = uiOpenModal();
        const modalClose = uiCloseModal();
        const stateOpen = uiReducer(initState, modalOpen);
        const stateClose = uiReducer(initState, modalClose);
        expect(stateOpen).toEqual({
            modalOpen: true
        });

        expect(stateClose).toEqual({
            modalOpen: false
        });
    })
    
    
    
});

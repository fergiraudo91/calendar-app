import { types } from "../../types/types";

describe('Pruebas en types', () => {
    test('los types deben de ser iguales', () => {
       expect(types).toEqual({
        uiOpenModal: '[UI] Open Modal',
        uiCloseModal: '[UI] Close Modal',
    
        eventSetActive: '[EVENT] Set Active',
        eventStartAddNew: '[EVENT] Start Add New',
        eventAddNew: '[EVENT] Add New',
        eventClearActive: '[EVENT] Clear active',
        eventUpdated: '[EVENT] Event Updated',
        eventDeleted: '[EVENT] Event Deleted',
        eventLoaded: '[EVENT] Events Loaded',
        eventLogout: '[EVENT] Logout',
    
        authChecking: '[AUTH] Checking loading State',
        authCheckingFinnish: '[AUTH] Finnish Checking loading State',
        authStartLogin: '[AUTH] Start Login',
        authLogin: '[AUTH] Login',
        authStartRegister: '[AUTH] Start Register',
        authStartTokenRenew: '[AUTH] Start token Renew',
        authLogout: '[AUTH] Logout'
    
        
    }) 
    });
    
})

import { authReducer, types } from "../../../auth";

describe('Pruebas en el authReducer', () => {
    
    test('Debe de retornar el estado por defecto', () => {
        const state = authReducer({ logged: false }, {});
        expect( state ).toEqual({ logged: false });

    });

    
    test('Debe de (login) llamar el login autenticar y establecer el user', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Juan',
                id: '123'
            }
        }

        const state = authReducer( { logged: false }, action );
        expect( state ).toEqual({
            logged: true,
            user: action.payload
        });
        
    });

    
    test('Debe de (logout) borrar el name del usuario y logged en false', () => {
        
        const state = {
            logged: true,
            user: {
                name: 'Juan',
                id: '123'
            }
        }

        const action = {
            type: types.logout
        }

        const newState = authReducer( state, action );

        expect( newState ).toEqual({ logged: false });

    });


});
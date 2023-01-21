import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth";
import { PrivateRoute } from "../../router/PrivateRoute";

describe('Pruebas en <PrivateRoute/>', () => {
    
    test('Debe de mostrar el children si no está autenticado', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = { 
            logged: true,
            user: {
                id: 123,
                name: 'Kraken'
            }
        }
        
        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider> 
        )

        expect( screen.getByText('Ruta privada') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/search?q=batman');

    });

});
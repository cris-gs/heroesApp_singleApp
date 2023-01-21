import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../heroes/pages/SearchPage";


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <SearchPages/>', () => {

    beforeEach(() => jest.clearAllMocks());
    
    test('Debe de mostrarse correctamente con valores por defecto', () => {
        
        const { container } = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();

    });

    test('Debe de mostrar a batman y el input con el valor del queryString', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');

        const img = screen.getByRole('img');
        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');
        
        const alertDanger = screen.getByLabelText('alert-danger');
        expect( alertDanger.style.display ).toBe('none');

    });

    test('Debe de mostrar un error si no se encuentra el heroe', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const alertDanger = screen.getByLabelText('alert-danger');
        expect( alertDanger.style.display ).toBe('');

    });

    test('Debe de llamar el navigate a la pantalla nueva', () => {
        //1. Ingresa en la caja de texto el nombre que desea buscar
        //2. Aplica la acción de submit
        //3. Enviamos a llamar el navigate con el argumento

        const inputValue = 'Daredevil'

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        );
        
        const input = screen.getByRole('textbox');
        fireEvent.change( input, { target: { name: 'searchText', value: inputValue } } )
        
        const form = screen.getByRole('form');
        fireEvent.submit( form );

        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`);
    });

});
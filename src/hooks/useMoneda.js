import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled'

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #fff;
    text-transform: uppercase;
    font-size: 2.4rem;
    font-weight: bold;
    margin-top: 2rem;
    display:block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useMoneda = (label, stateInicial, divisas) => {

    const [ state, setState ] = useState(stateInicial);

    const Seleccionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={ e => setState(e.target.value) }
                value={state}
            >
                <option value="">-- Selecciona Moneda --</option>
                {divisas.map( divisa => (
                    <option 
                        key={divisa.codigo} 
                        value={divisa.codigo}
                    >
                        {divisa.nombre}
                    </option>
                ))}
            </Select>
        </Fragment>
    )

    // Retornar state, interfaz y funcion que modifica el state
    return [state, Seleccionar, setState];

}

export default useMoneda;
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

const useCriptooneda = (label, stateInicial, criptomonedas) => {

    const [ state, setState ] = useState(stateInicial);

    const SelectCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={ e => setState(e.target.value) }
                value={state}
            >
                <option value="">-- Selecciona Criptomoneda --</option>
                {criptomonedas.map( criptomoneda => (
                    <option 
                        key={criptomoneda.CoinInfo.Id} 
                        value={criptomoneda.CoinInfo.Name}
                    >
                        {criptomoneda.CoinInfo.FullName}
                    </option>
                ))}
            </Select>
        </Fragment>
    )

    // Retornar state, interfaz y funcion que modifica el state
    return [state, SelectCripto, setState];

}

export default useCriptooneda;
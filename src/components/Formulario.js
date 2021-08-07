import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import axios from 'axios';
import useMoneda from '../hooks/useMoneda';
import useCriptooneda from '../hooks/useCriptomoneda';
import Error from './Error';
import PropTypes from 'prop-types';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`;


const Formulario = ({setMoneda, setCriptomoneda}) => {

    // state del listado de criptomonedas
    const [ criptos, setCriptos ] = useState([]);
    const [ error, setError ] = useState(false);

    // Array de divisas que estaran disponibles para convertir, simula una Base de datos
    const divisas = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libra Esterlina'},
    ];
    // ustilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '', divisas);

    // utilizar useCriptooneda
    const [ criptomoneda, SelectCripto ] = useCriptooneda('Elige tu criptomoneda', '', criptos);


    // Ejecutar llamdo a la api
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            setCriptos(resultado.data.Data);
        }

        consultarAPI();
    }, []);


    // cunado el usuario hace submit del formulario
    const cotizarMoneda = (event) => {
        event.preventDefault();

        // validar si ambos campos estan llenos
        if( moneda === '' || criptomoneda === '' ){
            setError(true);
            return;
        }
        setError(false);

        // pasar los datos al componente principal
        setMoneda(moneda);
        setCriptomoneda(criptomoneda);


    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            { error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <SelectMonedas />
            <SelectCripto />

            <Boton
                type="submit"
                value="calcular"
            />
        </form>
     );
}

Formulario.propTypes = {
    setMoneda: PropTypes.func.isRequired,
    setCriptomoneda: PropTypes.func.isRequired
}
 
export default Formulario;
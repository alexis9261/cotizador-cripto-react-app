import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ContenedorResultado = styled.div`
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;

    span{
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 30px;
`;

const Cotizacion = ({resultado}) => {
    // si el objeto llega vacio, no se ejecuta nada
    if(Object.keys(resultado).length === 0) return null;

    return ( 
        <ContenedorResultado>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>El precio mas alto del dia: <span>{resultado.HIGHDAY}</span></Info>
            <Info>El precio mas bajo de dia: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variacion últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Última actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </ContenedorResultado>
     );
}

Cotizacion.propTypes = {
    resultado: PropTypes.object.isRequired
}
 
export default Cotizacion;
import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled'
import axios from 'axios';
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'
import Spinner from './components/Spinner'

// Styled Componets
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width:100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;


function App() {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [resultado, setResultado] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect( () => {

    const cotizarCriptomoneda = async () => {

      // evitar que se ejecute la primera vez
      if( moneda === '') return;
  
      // consultar la api para obtener cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
  
      const resultado = await axios.get(url);

      // mostrar el spinner
      setLoading(true);
      // ocultar el spinner y mostrar el resultado luego de 3s
      setTimeout(() => {

        setLoading(false);
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda])

      }, 3000)
  
    }

    cotizarCriptomoneda();


  }, [moneda, criptomoneda])


  return (
    <Contenedor>
        <div>
          <Imagen 
            src={imagen}
            alt="Imagen cripto"
          />
        </div>
        <div>
          <Heading>Cotiza monedas al instante</Heading>

          <Formulario 
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
          />

          { loading 
            ? <Spinner />
            :  <Cotizacion 
                resultado={resultado}
              />
          }
        </div>
    </Contenedor>
  );
}

export default App;


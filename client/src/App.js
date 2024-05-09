import Web3 from 'web3';
import Indicador from "./contracts/Indicador.json";
import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
    account: null // Para guardar la cuenta activa
  });
  const [data, setData] = useState({ tipo: "", valor: "" });
  const [iocs, setIOCs] = useState([]);
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function initWeb3() {
      const web3 = new Web3(provider);
      //const account = "0xF3808691F9de7A854960d014F86d1C6A6522fb28";
      const accounts = await web3.eth.getAccounts()
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Indicador.networks[networkId];
      const contract = new web3.eth.Contract(
        Indicador.abi,
        deployedNetwork && deployedNetwork.address
      );
      setState({ web3, contract, account: accounts[0]});
    }
    provider && initWeb3();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const agregarIOC = async () => {
    const { tipo, valor } = data;
    const { contract, account } = state;
    try {
      const gasAmount = await contract.methods.agregarIOC(tipo, valor).estimateGas({ from: account });
      await contract.methods.agregarIOC(tipo, valor).send({ from: account, gas: gasAmount });
      alert('IOC agregado exitosamente');
    } catch (error) {
      let errorMessage = "Error desconocido. Por favor, intenta de nuevo.";
      if (error.message.includes("user denied transaction")) {
        errorMessage = "Transacción no confirmada por el usuario.";
      } else if (error.message.includes("revert")) {
        errorMessage = error.message.split("revert")[1].trim();
      }
      alert(`Error al agregar IOC: ${errorMessage}`);
    }
  };

  useEffect(() => {
    if (state.contract) {
      obtenerTodosIOCs();
    }
  }, [state.contract]); // Dependencia del contrato para asegurarse de que está cargado
  
  const obtenerTodosIOCs = async () => {
    try {
      const result = await state.contract.methods.obtenerTodosIOCs().call();
      console.log('IOCs obtenidos:', result); // Agregar esto para ver qué devuelve
      const iocsFormatted = result.map(ioc => ({
        tipo: ioc.tipo,
        valor: ioc.valor,
        reportadoPor: ioc.reportadoPor,
        // Convertir BigInt a string para fecha, para manejar grandes enteros de forma segura
        fechaReporte: new Date(parseInt(ioc.fechaReporte) * 1000).toLocaleString()
      }));
      setIOCs(iocsFormatted);
      console.log('Estado actualizado con:', iocsFormatted);
    } catch (error) {
      console.error('Error al obtener IOCs:', error);
    }
  };
  

  return (
    <>
      <h1>STIX Dapp</h1>
      <div className="App">
        <div>
          <h2>Listado de IOCs</h2>
          <table className="ioc-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Reportado Por</th>
                <th>Fecha de Reporte</th>
              </tr>
            </thead>
            <tbody>
            {iocs.length > 0 ? (
              iocs.map((ioc, index) => (
                <tr key={index}>
                  <td>{ioc.tipo}</td>
                  <td>{ioc.valor}</td>
                  <td>{ioc.reportadoPor}</td>
                  <td>{ioc.fechaReporte}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay IOCs disponibles</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
        <div className="form-container">
          <input type="text" id="tipo" name="tipo" value={data.tipo} onChange={handleInputChange} required placeholder="Tipo" />
          <input type="text" id="valor" name="valor" value={data.valor} onChange={handleInputChange} required placeholder="Valor" />
          <button onClick={agregarIOC} className="button button2">Agregar IOC</button>
        </div>
      </div>
    </>
  );
  
} 

export default App;

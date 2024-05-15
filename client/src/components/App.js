// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddIOC from './IOC/AddIOC';
import IOCList from './IOC/IOCList';
import IOCDetails from './IOC/IOCDetails';
import EditIOC from './IOC/EditIOC';
import 'foundation-sites/dist/css/foundation.min.css'; // Asegúrate de importar CSS de Foundation
import '../App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to Dapp</h1>
        <nav className="button-group">
          <Link to="/IOC" className="button">IOC</Link>
          <Link to="/TTP" className="button">TTP</Link>
          <Link to="/Herramientas" className="button">Herramientas</Link>
        </nav>
        <Routes>
          <Route path="/IOC" element={<IOCList />} />
          <Route path="/IOC/add" element={<AddIOC />} />
          <Route path="/IOC/details/:valor" element={<IOCDetails />} />
          <Route path="/IOC/edit/:valorInicial" element={<EditIOC />} />
          {/* <Route path="/TTP" element={<IOCList />} />
          <Route path="/TTP/add" element={<AddIOC />} />
          <Route path="/TTP/details/:id" element={<IOCDetails />} />
          <Route path="/TTP/edit/:id" element={<EditIOC />} />
          <Route path="/Herramientas" element={<IOCList />} />
          <Route path="/Herramientas/add" element={<AddIOC />} />
          <Route path="/Herramientas/details/:id" element={<IOCDetails />} />
          <Route path="/Herramientas/edit/:id" element={<EditIOC />} /> */}
        </Routes>
      </div>
    </Router>
  );
  // const [state, setState] = useState({
  //   web3: null,
  //   contract: null,
  //   account: null // Para guardar la cuenta activa
  // });
  // const [data, setData] = useState({ tipo: "", valor: "" });
  // const [iocs, setIOCs] = useState([]);
  // useEffect(() => {
  //   const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
  //   async function initWeb3() {
  //     const web3 = new Web3(provider);
  //     //const account = "0xF3808691F9de7A854960d014F86d1C6A6522fb28";
  //     const accounts = await web3.eth.getAccounts()
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = ManagerSTIX.networks[networkId];
  //     const contract = new web3.eth.Contract(
  //       ManagerSTIX.abi,
  //       deployedNetwork && deployedNetwork.address
  //     );
  //     setState({ web3, contract, account: accounts[0]});
  //   }
  //   provider && initWeb3();
  // }, []);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setData(prevData => ({ ...prevData, [name]: value }));
  // };

  // const agregarIOC = async () => {
  //   const { tipo, valor } = data;
  //   const { contract, account } = state;
  //   try {
  //     const gasAmount = await contract.methods.agregarIOC(tipo, valor).estimateGas({ from: account });
  //     await contract.methods.agregarIOC(tipo, valor).send({ from: account, gas: gasAmount });
  //     alert('IOC agregado exitosamente');
  //   } catch (error) {
  //     let errorMessage = "Error desconocido. Por favor, intenta de nuevo.";
  //     if (error.message.includes("user denied transaction")) {
  //       errorMessage = "Transacción no confirmada por el usuario.";
  //     } else if (error.message.includes("revert")) {
  //       errorMessage = error.message.split("revert")[1].trim();
  //     }
  //     alert(`Error al agregar IOC: ${errorMessage}`);
  //   }
  // };

  // useEffect(() => {
  //   if (state.contract) {
  //     obtenerTodosIOCs();
  //   }
  // }, [state.contract]); // Dependencia del contrato para asegurarse de que está cargado
  
  // const obtenerTodosIOCs = async () => {
  //   try {
  //     const result = await state.contract.methods.obtenerTodosIOCs().call();
  //     console.log('IOCs obtenidos:', result); // Agregar esto para ver qué devuelve
  //     const iocsFormatted = result.map(ioc => ({
  //       tipo: ioc.tipo,
  //       valor: ioc.valor,
  //       reportadoPor: ioc.reportadoPor,
  //       // Convertir BigInt a string para fecha, para manejar grandes enteros de forma segura
  //       fechaReporte: new Date(parseInt(ioc.fechaReporte) * 1000).toLocaleString()
  //     }));
  //     setIOCs(iocsFormatted);
  //     console.log('Estado actualizado con:', iocsFormatted);
  //   } catch (error) {
  //     console.error('Error al obtener IOCs:', error);
  //   }
  // };

  // const actualizarIOC = async (id, tipo, valor) => {
  //   try {
  //     await state.contract.methods.actualizarIOC(id, tipo, valor).send({ from: state.account });
  //     alert('IOC actualizado exitosamente');
  //     obtenerTodosIOCs(); // Recargar la lista para reflejar los cambios
  //   } catch (error) {
  //     alert('Error al actualizar IOC: ' + error.message);
  //   }
  // };
  

  // const eliminarIOC = async (id) => {
  //   try {
  //     await state.contract.methods.eliminarIOC(id).send({ from: state.account });
  //     alert('IOC eliminado exitosamente');
  //     // Actualizar la lista de IOCs después de la eliminación
  //     obtenerTodosIOCs();
  //   } catch (error) {
  //     alert('Error al eliminar IOC: ' + error.message);
  //   }
  // };
  
} 

export default App;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { eliminarIOC, obtenerTodosIOCs } from '../../utils/web3';

// function IOCList() {
//   const [iocs, setIOCs] = useState([]);

//   useEffect(() => {
//     fetchIOCs();
//   }, []);

//   const fetchIOCs = async () => {
//     try {
//       const iocsData = await obtenerTodosIOCs();
//       // Filtrar para eliminar IOCs con tipo o valor vacío
//       const filteredIOCs = iocsData.filter(ioc => ioc.tipo.trim() !== '' && ioc.valor.trim() !== '');
//       setIOCs(filteredIOCs);
//     } catch (error) {
//       alert('Error al cargar los IOCs: ' + error.message);
//     }
//   };

//   const handleDeleteIOC = async (index) => {
//     try {
//       await eliminarIOC(index);
//       alert('IOC eliminado exitosamente.');
//       fetchIOCs();
//     } catch (error) {
//       alert('Error al eliminar IOC: ' + error.message);
//     }
//   };

//   return (
//     <>
//     <div className="grid-container">
//         <div className="grid-x grid-padding-x">
//           <div className="cell">
//             <Link to="/add" className="button">Añadir Nuevo IOC</Link>
//             <table className="hover stack">
//                 <thead>
//                     <tr>
//                     <th width="200">Tipo</th>
//                     <th>Valor</th>
//                     <th className="hide-on-small">Reportado Por</th>
//                     <th className="hide-on-small">Fecha de Reporte</th>
//                     <th>Acciones</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {iocs.length > 0 ? (
//                     iocs.map((ioc, index) => (
//                         <tr key={index}>
//                         <td>{ioc.tipo}</td>
//                         <td>{ioc.valor}</td>
//                         <td className="hide-on-small">{ioc.reportadoPor}</td>
//                         <td className="hide-on-small">{ioc.fechaReporte}</td>
//                         <td>
//                             <Link to={`/details/${index}`} className="button tiny secondary">Ver</Link>
//                             <Link to={`/edit/${index}`} className="button tiny">Editar</Link>
//                             <button onClick={() => handleDeleteIOC(index)} className="button tiny alert">Eliminar</button>
//                         </td>
//                         </tr>
//                     ))
//                     ) : (
//                     <tr>
//                         <td colSpan="5">No hay IOCs disponibles</td>
//                     </tr>
//                     )}
//                 </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       {/* <div>
//         <Link to="/add" className="button-link">Añadir Nuevo IOC</Link>
//         <table>
//           <thead>
//             <tr>
//               <th>Tipo</th>
//               <th>Valor</th>
//               <th>Reportado Por</th>
//               <th>Fecha de Reporte</th>
//               <th>Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {iocs.length > 0 ? (
//               iocs.map((ioc, index) => (
//                 <tr key={index}>
//                   <td>{ioc.tipo}</td>
//                   <td>{ioc.valor}</td>
//                   <td>{ioc.reportadoPor}</td>
//                   <td>{ioc.fechaReporte}</td>
//                   <td>
//                     <Link to={`/details/${index}`} className="button-link">Ver</Link>
//                     <Link to={`/edit/${index}`} className="button-link">Editar</Link>
//                     <button onClick={() => handleDeleteIOC(index)} className="button">Eliminar</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No hay IOCs disponibles</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div> */}
// {/*       
//     <div class="card mb-4">
//         <div class="card-header">
//             <i class="fas fa-table me-1"></i>
//             DataTable Example
//         </div>
//         <div class="card-body">
//             <table id="datatablesSimple">
//                 <thead>
//                     <tr>
//                         <th>Tipo</th>
//                         <th>Valor</th>
//                         <th>Reportado Por</th>
//                         <th>Fecha de Reporte</th>
//                     </tr>
//                 </thead>
//                 <tfoot>
//                     <tr>
//                         <th>Tipo</th>
//                         <th>Valor</th>
//                         <th>Reportado Por</th>
//                         <th>Fecha de Reporte</th>
//                     </tr>
//                 </tfoot>
//                 <tbody>
//                 {iocs.length > 0 ? (
//               iocs.map((ioc, index) => (
//                     <tr key={index}>
//                         <td>{ioc.tipo}</td>
//                         <td>{ioc.valor}</td>
//                         <td>{ioc.reportadoPor}</td>
//                         <td>{ioc.fechaReporte}</td>
//                     </tr>
//                     ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5">No hay IOCs disponibles</td>
//                   </tr>
//                 )}
//                 </tbody>
//             </table>
//         </div>
//     </div> */}
//     </>
//   );
// }

// export default IOCList;

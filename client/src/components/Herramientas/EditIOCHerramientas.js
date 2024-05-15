// // EditIOC.js
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { obtenerIOC, actualizarIOC } from '../../utils/web3';

// function EditIOC() {
//     const { id } = useParams();
//     const [tipo, setTipo] = useState('');
//     const [valor, setValor] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchIOC = async () => {
//             const iocData = await obtenerIOC(id);
//             setTipo(iocData.tipo);
//             setValor(iocData.valor);
//         };
//         fetchIOC();
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await actualizarIOC(id, tipo, valor);
//             alert('IOC actualizado exitosamente');
//             navigate('/');
//         } catch (error) {
//             alert('Error al actualizar IOC: ' + error.message);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Editar IOC</h2>
//             <label>
//                 Tipo:
//                 <input type="text" value={tipo} onChange={e => setTipo(e.target.value)} required />
//             </label>
//             <label>
//                 Valor:
//                 <input type="text" value={valor} onChange={e => setValor(e.target.value)} required />
//             </label>
//             <button type="submit">Actualizar</button>
//         </form>
//     );
// }

// export default EditIOC;

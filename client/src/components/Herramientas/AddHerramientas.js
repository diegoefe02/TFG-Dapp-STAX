// // AddIOC.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { agregarIOC } from '../../utils/web3';

// function AddIOC() {
//     const [tipo, setTipo] = useState('');
//     const [valor, setValor] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await agregarIOC(tipo, valor);
//             alert('IOC añadido exitosamente');
//             navigate('/');
//         } catch (error) {
//             alert('Error al agregar IOC: ' + error.message);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Añadir IOC</h2>
//             <label>
//                 Tipo:
//                 <input type="text" value={tipo} onChange={e => setTipo(e.target.value)} required />
//             </label>
//             <label>
//                 Valor:
//                 <input type="text" value={valor} onChange={e => setValor(e.target.value)} required />
//             </label>
//             <button type="submit">Añadir</button>
//         </form>
//     );
// }

// export default AddIOC;

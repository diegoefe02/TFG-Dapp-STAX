import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerIOCPorValor, obtenerIDPorValor, actualizarIOC, obtenerTiposPermitidos } from '../../utils/web3';

function EditIOC() {
    const { valorInicial } = useParams();
    const valorDecodificado = decodeURIComponent(valorInicial);
    const [id, setId] = useState(0);
    const [tipo, setTipo] = useState('');
    const [valor, setValor] = useState('');
    const [tiposPermitidos, setTiposPermitidos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIOCData = async () => {
            try {
                const iocId = await obtenerIDPorValor(valorDecodificado); // Obtiene el ID usando el valor inicial
                setId(iocId); // Guarda el ID en el estado
                const iocData = await obtenerIOCPorValor(valorDecodificado); // Obtiene datos del IOC usando el valor inicial
                const tipos = await obtenerTiposPermitidos(); // Obtiene los tipos permitidos
                setTiposPermitidos(tipos);
                setTipo(iocData.tipo);
                setValor(iocData.valor);
            } catch (error) {
                alert('Error al obtener datos del IOC: ' + error.message);
            }
        };
        fetchIOCData();
    }, [valorDecodificado]);

    function validarValor(tipo, valor) {
        let regex;
        switch(tipo) {
            case 'IP':
                regex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
                break;
            case 'Email':
                regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                break;
            case 'URL':
                regex = /^((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})(:[0-9]{1,5})?)?(\/[\/\w \.-]*)*\/?(\?\w+=\w+(&\w+=\w+)*)?$/;
                break;
            case '(Hash) SHA-256':
                regex = /^[A-Fa-f0-9]{64}$/;
                break;
            case '(Hash) MD5':
                regex = /^[A-Fa-f0-9]{32}$/;
                break;
            case '(Hash) SHA-1':
                regex = /^[A-Fa-f0-9]{40}$/;
                break;
            case 'Email Signature':
                regex = /^.{10,}$/;
                break;
            default:
                return true;
        }
        return regex.test(valor);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id) {
            alert('No se pudo obtener el ID del IOC.');
            return;
        }
        if (!validarValor(tipo, valor)) {
            alert(`El valor proporcionado no es un ${tipo} válido.`);
            return;
        }
        try {
            await actualizarIOC(id, tipo, valor);
            alert('IOC actualizado exitosamente');
            navigate('/IOC'); // Asegúrate de que esta ruta es correcta
        } catch (error) {
            alert('Error al actualizar IOC: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar IOC</h2>
            <label>
                Tipo:
                <select value={tipo} onChange={e => setTipo(e.target.value)} required>
                    {tiposPermitidos.map((tipoPermitido, index) => (
                        <option key={index} value={tipoPermitido}>
                            {tipoPermitido}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Valor:
                <input type="text" value={valor} onChange={e => setValor(e.target.value)} required />
            </label>
            <button type="submit">Actualizar</button>
        </form>
    );
}

export default EditIOC;

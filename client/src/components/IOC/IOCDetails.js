// IOCDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerIOCPorValor } from '../../utils/web3';

function IOCDetails() {
    const { valor } = useParams();
    const valorDecodificado = decodeURIComponent(valor);
    const [ioc, setIOC] = useState(null);

    useEffect(() => {
        console.log("Valor:", valor);
        const fetchIOC = async () => {
            const iocData = await obtenerIOCPorValor(valorDecodificado);
            setIOC(iocData);
        };
        fetchIOC();
    }, [valor]);

    if (!ioc) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Detalles del IOC</h2>
            <p>Tipo: {ioc.tipo}</p>
            <p>Valor: {ioc.valor}</p>
            <p>Reportado Por: {ioc.reportadoPor}</p>
            <p>Fecha de Reporte: {ioc.fechaReporte}</p>
        </div>
    );
}

export default IOCDetails;

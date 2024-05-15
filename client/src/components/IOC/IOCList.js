import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eliminarIOC, obtenerTodosIOCs, obtenerIDPorValor } from '../../utils/web3';

function IOCList() {
  const [iocs, setIOCs] = useState([]);
  const [filteredIOCs, setFilteredIOCs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  // Definir fetchIOCs fuera del useEffect para reutilizarlo
  const fetchIOCs = async () => {
    try {
      const iocsData = await obtenerTodosIOCs();
      setIOCs(iocsData);
      setFilteredIOCs(iocsData);
    } catch (error) {
      alert('Error al cargar los IOCs: ' + error.message);
    }
  };

  useEffect(() => {
    fetchIOCs();
  }, []);

  useEffect(() => {
    const results = iocs.filter(ioc =>
      (ioc.tipo && ioc.valor) &&
      (ioc.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ioc.valor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ioc.reportadoPor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ioc.fechaReporte.toString().includes(searchTerm))
    );
    setFilteredIOCs(results);
    setCurrentPage(0);
  }, [searchTerm, iocs]);

  const handleDeleteIOC = async (valor) => {
    try {
      const id = await obtenerIDPorValor(valor);  // Obtener el ID real del IOC
      await eliminarIOC(id);
      alert('IOC eliminado exitosamente.');
      await fetchIOCs();  // Re-fetch la lista de IOCs
    } catch (error) {
      alert('Error al eliminar IOC: ' + error.message);
    }    
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedIOCs = filteredIOCs.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      <div className="grid-container">
        <div className="grid-x grid-padding-x">
          <div className="cell">
            <Link to="/IOC/add" className="button">Añadir Nuevo IOC</Link>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <table className="hover stack">
                <thead>
                    <tr>
                    <th width="200">Tipo</th>
                    <th>Valor</th>
                    <th>Reportado Por</th>
                    <th>Fecha de Reporte</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedIOCs.map((ioc, index) => (
                        <tr key={index}>
                        <td>{ioc.tipo}</td>
                        <td>{ioc.valor}</td>
                        <td>{ioc.reportadoPor}</td>
                        <td>{ioc.fechaReporte}</td>
                        <td>
                            <Link to={`/IOC/details/${encodeURIComponent(ioc.valor)}`} className="button tiny secondary">Ver</Link>
                            <Link to={`/IOC/edit/${encodeURIComponent(ioc.valor)}`} className="button tiny">Editar</Link>
                            <button onClick={() => handleDeleteIOC(ioc.valor)} className="button tiny alert">Eliminar</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {[...Array(Math.ceil(filteredIOCs.length / itemsPerPage)).keys()].map(page => (
                    <button key={page} onClick={() => handlePageChange(page)} disabled={currentPage === page}>
                        {page + 1}
                    </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IOCList;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Indicador {

    struct IOC {
        string tipo;
        string valor;
        address reportadoPor;
        uint256 fechaReporte;
    }

    mapping(uint256 => IOC) private iocs;  
    uint256 private totalIOCs = 0;

    // Eventos para registrar acciones
    event IOCAdded(uint256 indexed id, string tipo, string valor);
    event IOCUpdated(uint256 indexed id, string tipo, string valor);
    event IOCDeleted(uint256 indexed id);

    // Una lista de tipos de IOC permitidos
    string[] private tiposPermitidos;
    ////////////////////////////////////////////////////////////
    ////////////////////TIPOS////////////////////////////////
    ////////////////////////////////////////////////////////////
    constructor() {
        // Inicializar la lista con algunos tipos comunes
        tiposPermitidos.push("IP");
        tiposPermitidos.push("URL");
        tiposPermitidos.push("(Hash) SHA-256");
        tiposPermitidos.push("Email");
        tiposPermitidos.push("(Hash) MD5");
        tiposPermitidos.push("(Hash) SHA-1");
        tiposPermitidos.push("Email Signature");
    }

    function getTiposPermitidos() public view returns (string[] memory) {
        return tiposPermitidos;
    }

    function agregarTipoPermitido(string memory _nuevoTipo) public {
        // Aquí puedes agregar controles de acceso si es necesario
        tiposPermitidos.push(_nuevoTipo);
    }

    function esTipoPermitido(string memory _tipo) private view returns (bool) {
        for (uint i = 0; i < tiposPermitidos.length; i++) {
            if (keccak256(abi.encodePacked(_tipo)) == keccak256(abi.encodePacked(tiposPermitidos[i]))) {
                return true;
            }
        }
        return false;
    }

    ////////////////////////////////////////////////////////////
    ////////////////////VALIDADORES////////////////////////////////
    ////////////////////////////////////////////////////////////
    function validarFormato(string memory _tipo, string memory _valor) public pure returns (bool) {
        bytes memory valor = bytes(_valor);

        if (keccak256(abi.encodePacked(_tipo)) == keccak256(abi.encodePacked("IP"))) {
            return validarIP(_valor);
        } else if (keccak256(abi.encodePacked(_tipo)) == keccak256(abi.encodePacked("URL"))) {
            return validarURL(_valor);
        } else if (keccak256(abi.encodePacked(_tipo)) == keccak256(abi.encodePacked("Email"))) {
            return validarEmail(valor);
        } else if (keccak256(abi.encodePacked(_tipo)) == keccak256(abi.encodePacked("(Hash) SHA-256"))) {
            return validarHash(valor, 64);
        } else if (keccak256(abi.encodePacked(_tipo)) == keccak256(abi.encodePacked("(Hash) MD5"))) {
            return validarHash(valor, 32);
        } else if (keccak256(abi.encodePacked(_tipo)) == keccak256(abi.encodePacked("(Hash) SHA-1"))) {
            return validarHash(valor, 40);
        } else if (keccak256(abi.encodePacked(_tipo)) == keccak256(abi.encodePacked("Email Signature"))) {
            return validarEmailSignature(_valor);
        }

        return false;
    }

    // Validadores específicos
    function validarIP(string memory direccionIP) public pure returns (bool) {
        bytes memory bytesDireccion = bytes(direccionIP);
        uint256 puntos = 0;
        // Recorrer cada carácter de la dirección IP
        for (uint256 i = 0; i < bytesDireccion.length; i++) {
            // Contar solo los puntos que separan los segmentos
            if (bytesDireccion[i] == '.') {
                puntos++;
            }
        }
        // Una dirección IP válida debe tener exactamente tres puntos (cuatro segmentos)
        return puntos == 3;
    }

    function validarURL(string memory _valor) private pure returns (bool) {
        bytes memory strBytes = bytes(_valor);
        if (strBytes.length < 8) {
            return false;
        }
        return (contieneSubcadena(_valor, "http://") || contieneSubcadena(_valor, "https://"));
    }

    function validarHash(bytes memory valor, uint256 expectedLength) private pure returns (bool) {
        if (valor.length != expectedLength) return false;
        for (uint256 i = 0; i < valor.length; i++) {
            if (!(valor[i] >= '0' && valor[i] <= '9' || valor[i] >= 'a' && valor[i] <= 'f' || valor[i] >= 'A' && valor[i] <= 'F')) {
                return false;
            }
        }
        return true;
    }

    function validarEmail(bytes memory valor) private pure returns (bool) {
        int256 atPosition = -1;
        bool puntoDespuesDeAt = false;
        for (uint256 i = 0; i < valor.length; i++) {
            if (valor[i] == '@') {
                if (atPosition != -1 || i == 0 || i == valor.length - 1) return false;
                atPosition = int256(i);
            } else if (valor[i] == '.' && atPosition != -1 && uint256(atPosition) < i - 1) {
                puntoDespuesDeAt = true;
            }
        }
        return atPosition != -1 && puntoDespuesDeAt;
    }

    
    function validarEmailSignature(string memory valor) private pure returns (bool) {
        // Un validador simplificado podría verificar la presencia de patrones comunes en las firmas
        return bytes(valor).length > 10;  // Ejemplo muy básico, se puede mejorar
    }

    // Utilidades
    function contieneSubcadena(string memory _valor, string memory subcadena) private pure returns (bool) {
        return bytes(_valor).length >= bytes(subcadena).length && bytes(_valor).length != 0;
    }

    function contarCaracteres(bytes memory fuente, bytes1 caracter) private pure returns (uint256) {
        uint256 contador = 0;
        for (uint256 i = 0; i < fuente.length; i++) {
            if (fuente[i] == caracter) {
                contador++;
            }
        }
        return contador;
    }

    // Agregar un nuevo IOC
    function agregarIOC(string memory _tipo, string memory _valor) public{
        require(esTipoPermitido(_tipo), "Tipo de IOC no permitido");
        require(validarFormato(_tipo, _valor), "Formato de IOC invalido");
        require(!esIOCReportado(_valor), "IOC ya reportado");
        IOC memory nuevoIOC = IOC({
            tipo: _tipo,
            valor: _valor,
            reportadoPor: msg.sender,
            fechaReporte: block.timestamp
        });

        iocs[totalIOCs] = nuevoIOC;
        totalIOCs++;
        emit IOCAdded(totalIOCs - 1, _tipo, _valor);// Notificar a los usuarios que han agregado un nuevo IOC con 
                                                    //su ID y el tipo y valor de forma asíncrona para que se puedan seguir con el 
                                                    //resto de acciones sin tener que esperar a que se complete la transacción
    }

    // Actualizar un IOC existente
    function actualizarIOC(uint256 _id, string memory _tipo, string memory _valor) public {
        require(_id < totalIOCs, "IOC no existe");
        require(esTipoPermitido(_tipo), "Tipo de IOC no permitido");
        require(validarFormato(_tipo, _valor), "Formato de IOC invalido");
        require(!esIOCReportado(_valor), "IOC ya reportado");
        IOC storage ioc = iocs[_id];
        ioc.tipo = _tipo;
        ioc.valor = _valor;
        emit IOCUpdated(_id, _tipo, _valor);
    }

    // Eliminar un IOC
    function eliminarIOC(uint256 _id) public {
        require(_id < totalIOCs, "IOC no existe");
        delete iocs[_id];
        emit IOCDeleted(_id);
    }

    function obtenerIOC(uint256 _id) public view returns (string memory tipo, string memory valor, address reportadoPor, uint256 fechaReporte) {
        require(_id < totalIOCs, "IOC no existe");
        IOC storage ioc = iocs[_id];
        return (ioc.tipo, ioc.valor, ioc.reportadoPor, ioc.fechaReporte);
    }

    function obtenerIOCPorValor(string memory valorBuscado) public view returns (string memory tipo, string memory valor, address reportadoPor, uint256 fechaReporte) {
        for (uint256 i = 0; i < totalIOCs; i++) {
            if (keccak256(abi.encodePacked(iocs[i].valor)) == keccak256(abi.encodePacked(valorBuscado))) {
                IOC storage ioc = iocs[i];
                return (ioc.tipo, ioc.valor, ioc.reportadoPor, ioc.fechaReporte);
            }
        }
        revert("IOC no encontrado con el valor proporcionado");
    }

    function obtenerTodosIOCs() public view returns (IOC[] memory) {
    IOC[] memory todos = new IOC[](totalIOCs);
    for (uint256 i = 0; i < totalIOCs; i++) {
        IOC storage ioc = iocs[i];
        if (ioc.reportadoPor != address(0)) { // Verificar si el IOC existe
            todos[i] = ioc;
        }
    }
        return todos;
    }

    // Función para obtener el ID de un IOC mediante su valor
    function obtenerIDPorValor(string memory valorBuscado) public view returns (uint256) {
        for (uint256 i = 0; i < totalIOCs; i++) {
            if (keccak256(abi.encodePacked(iocs[i].valor)) == keccak256(abi.encodePacked(valorBuscado))) {
                return i;  // Retorna el ID si el valor coincide
            }
        }
        revert("IOC no encontrado con el valor proporcionado");  // Si no se encuentra, revierte la transacción
    }

    // Función para verificar si un IOC ha sido reportado anteriormente
    function esIOCReportado(string memory _valor) public view returns (bool) {
        for (uint256 i = 0; i < totalIOCs; i++) {
            if (keccak256(abi.encodePacked(iocs[i].valor)) == keccak256(abi.encodePacked(_valor))) {
                return true;
            }
        }
        return false;
    }
}

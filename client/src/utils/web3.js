// utils/web3.js
import Web3 from 'web3';
import ManagerSTIX from "../contracts/ManagerSTIX.json";

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");

const web3 = new Web3(provider);

let contractInstance;

const initContract = async () => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = ManagerSTIX.networks[networkId];
    contractInstance = new web3.eth.Contract(
        ManagerSTIX.abi,
        deployedNetwork && deployedNetwork.address
    );
};

export const agregarIOC = async (tipo, valor) => {
    await initContract();
    const accounts = await web3.eth.getAccounts();
    const gasAmount = await contractInstance.methods.agregarIOC(tipo, valor).estimateGas({ from: accounts[0] });
    return contractInstance.methods.agregarIOC(tipo, valor).send({ from: accounts[0], gas: gasAmount });
};

export const obtenerTodosIOCs = async () => {
    await initContract();
    const result = await contractInstance.methods.obtenerTodosIOCs().call();
    return result.map(ioc => ({
        tipo: ioc.tipo,
        valor: ioc.valor,
        reportadoPor: ioc.reportadoPor,
        fechaReporte: new Date(parseInt(ioc.fechaReporte) * 1000).toLocaleString()
    }));
};

export const obtenerIOC = async (id) => {
    await initContract();
    const ioc = await contractInstance.methods.obtenerIOC(id).call();
    return {
        tipo: ioc.tipo,
        valor: ioc.valor,
        reportadoPor: ioc.reportadoPor,
        fechaReporte: new Date(parseInt(ioc.fechaReporte) * 1000).toLocaleString()
    };
};

export const obtenerIOCPorValor = async (valor) => {
    if (!valor) {
        throw new Error("The value for 'valor' is required but was not provided.");
    }
    await initContract();
    return contractInstance.methods.obtenerIOCPorValor(valor).call().then(ioc => ({
        tipo: ioc.tipo,
        valor: ioc.valor,
        reportadoPor: ioc.reportadoPor,
        fechaReporte: new Date(parseInt(ioc.fechaReporte) * 1000).toLocaleString()
    })).catch(error => {
        console.error("Error fetching IOC by value:", error);
        throw error; // Forward the error
    });
};

export const actualizarIOC = async (id, tipo, valor) => {
    await initContract();
    const accounts = await web3.eth.getAccounts();
    const gasAmount = await contractInstance.methods.actualizarIOC(id, tipo, valor).estimateGas({ from: accounts[0] });
    return contractInstance.methods.actualizarIOC(id, tipo, valor).send({ from: accounts[0], gas: gasAmount });
};

export const eliminarIOC = async (id) => {
    await initContract();
    const accounts = await web3.eth.getAccounts();
    return contractInstance.methods.eliminarIOC(id).send({ from: accounts[0] });
};

export const obtenerIDPorValor = async (valor) => {
    await initContract();
    try {
        const id = await contractInstance.methods.obtenerIDPorValor(valor).call();
        return id;
    } catch (error) {
        console.error("Error fetching IOC ID by value:", error);
        throw error; // Re-throw the error to handle it in the calling context.
    }
};

export const obtenerTiposPermitidos = async () => {
    await initContract();
    return contractInstance.methods.getTiposPermitidos().call();
};
  

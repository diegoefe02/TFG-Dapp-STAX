const ManagerSTIX = artifacts.require("ManagerSTIX");
const Herramientas = artifacts.require("Herramientas");
const Indicador = artifacts.require("Indicador");
const TTP = artifacts.require("TTP");

module.exports = function(deployer, network, accounts) {
    deployer.deploy(ManagerSTIX, Indicador.address, TTP.address, Herramientas.address);
};

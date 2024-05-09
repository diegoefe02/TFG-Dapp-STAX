const Indicador = artifacts.require("Indicador");

module.exports = function(deployer) {
    deployer.deploy(Indicador);
};

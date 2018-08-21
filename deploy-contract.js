'use strict';

var fs = require('fs');
var Web3 = require('web3');

var config = {
  defFile: process.argv[2],
  contractName: process.argv[3],
  args: process.argv[4] ? JSON.parse(process.argv[4]) : []
}
console.log('Parameters: \n' + JSON.stringify(config));

var contractDefFile = JSON.parse(fs.readFileSync(config.defFile, 'utf8'));
var contractKey = Object.keys(contractDefFile.contracts).find(name => {
  let parts = name.split(':');
  return parts[1] === config.contractName;
});
var contractDef = contractDefFile.contracts[contractKey];
var abi = JSON.parse(contractDef.abi);
var web3 = new Web3();
var contract = new web3.eth.Contract(abi);
var tx = contract.deploy({data:  contractDef.bin, arguments: config.args});
var data = tx.encodeABI();
console.log('Contract deployment data:\n' + data);
//var estimatedGas = web3.eth.estimateGas(tx);
//console.log('Estimates gas:\n' + estimatedGas);

'use strict';

var config = {
  defFile: process.argv[2],
  contractName: process.argv[3],
  args: process.argv[4] ? JSON.parse(process.argv[4]) : []
}
console.log(JSON.stringify(config));

var fs = require('fs');
var contractDefFile = JSON.parse(fs.readFileSync(config.defFile, 'utf8'));
var contractDef = contractDefFile.contracts[config.contractName + '.sol:' + config.contractName];
var Web3 = require('web3');
var web3 = new Web3();


var abi = JSON.parse(contractDef.abi);
var contract = new web3.eth.Contract(abi);
var data = contract.deploy({data:  contractDef.bin, arguments: config.args}).encodeABI();
console.log(data);
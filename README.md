send eth: 

eth.sendTransaction({from:eth.coinbase, to:"0x8AbA21737cEE85BBfd041e6f638349FFccb3488a", value: web3.toWei(100, "ether")})


si vous obtenez des erreurs de compilation :
https://github.com/ChainSafe/web3.js/issues/2260

Juste à remplacer node:false à node: {crypto: true, stream: true} dans node_modules\@angular-devkit\build-angular\src\webpack\configs\browser.js
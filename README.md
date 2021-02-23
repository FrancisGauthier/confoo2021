send eth: 

eth.sendTransaction({from:eth.coinbase, to:"0x08A66D42737f9c9DE44D051393bDA99cAE4DaC3C", value: web3.toWei(0.05, "ether")})


si vous obtenez des erreurs de compilation :
https://github.com/ChainSafe/web3.js/issues/2260

Juste à remplacer node:false à node: {crypto: true, stream: true} dans node_modules\@angular-devkit\build-angular\src\webpack\configs\browser.js
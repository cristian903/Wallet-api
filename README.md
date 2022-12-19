# BasicPayments

Smart contract and basic service to solve payments in the Taller de Programacion 2' projects.

## Installation

To install the project we recommend that you use NVM and install the node version defined in `.nvmrc`

Once you have that in place, you can install the dependencies with npm through

`npm i`

## BasicPayments - Service

This is a minimum project that will serve as a guide to help students to do the rest of the integration

### Start process

To start the process, after you installed the dependencies and deployed the smart contracts to kovan, you can run

`npm start`

keep in mind that you should have everything in config set before that.

### Available endpoints

The following endpoints are available:

- Create wallet: POST /wallet - No body 
- Get balance: GET /balance/:address
- Deposit ethers into the Smart contract: POST /deposit - Body params: privateKey(string), amountInEthers(string)
- Recieve ethers from the Smart contract: POST /pay - Body params: privateKey(string), amountInEthers(string)

### Usage example

```sh
$ http POST http://localhost:3000/wallet
HTTP/1.1 200 OK
Connection: keep-alive
Date: Sun, 08 Aug 2021 19:26:53 GMT
Keep-Alive: timeout=5
content-length: 145
content-type: application/json; charset=utf-8

{
    "address": "0x7E039A00fFFD8d8C898e77e52351c799C99D3a2D",
    "privateKey": "0x67bb00f89f7b50f9e2924e423d00889c627b9acdc20b738ce00ccdcf6e4b8da0"
}

$ http POST http://localhost:3000/balance/0x7E039A00fFFD8d8C898e77e52351c799C99D3a2D
HTTP/1.1 200 OK
Connection: keep-alive
Date: Sun, 08 Aug 2021 19:26:54 GMT
Keep-Alive: timeout=5
content-length: 145
content-type: application/json; charset=utf-8

{
  0.0
}

$ http POST http://localhost:3000/deposit privateKey="0x67bb00f89f7b50f9e2924e423d00889c627b9acdc20b738ce00ccdcf6e4b8da0" amountInEthers='0.01'          
HTTP/1.1 200 OK
Connection: keep-alive
Date: Sun, 08 Aug 2021 19:27:38 GMT
Keep-Alive: timeout=5
content-length: 538
content-type: application/json; charset=utf-8

{
    "chainId": 4,
    "data": "0xd0e30db0",
    "from": "0x7E039A00fFFD8d8C898e77e52351c799C99D3a2D",
    "gasLimit": {
        "hex": "0xb044",
        "type": "BigNumber"
    },
    "gasPrice": {
        "hex": "0x3b9aca08",
        "type": "BigNumber"
    },
    "hash": "0x9f98447de34d3245ce1976956334336a6302befc4f204ac44a7cac0526caa82d",
    "nonce": 0,
    "r": "0xc78a2f0914988bb37e62c16ffb91ae0335d39fd3dc246fd0c269dbaf0b331589",
    "s": "0x423f245bcc46c872404b43c34fcb789cb0d3befdd44ec928b96bb25a5a887762",
    "to": "0x76b8DA0BB9b9981403586A574d10fA783f08Aa05",
    "type": null,
    "v": 44,
    "value": {
        "hex": "0x2386f26fc10000",
        "type": "BigNumber"
    }
}

$ http GET http://localhost:3000/pay privateKey="0x67bb00f89f7b50f9e2924e423d00889c627b9acdc20b738ce00ccdcf6e4b8da0" amountInEthers='0.01'  
HTTP/1.1 200 OK
Connection: keep-alive
Date: Sun, 08 Aug 2021 19:28:00 GMT
Keep-Alive: timeout=5
content-length: 121
content-type: application/json; charset=utf-8

{
    "type": 2,
    "chainId": 5,
    "nonce": 54,
    "maxPriorityFeePerGas": {
        "type": "BigNumber",
        "hex": "0x59682f00"
    },
    "maxFeePerGas": {
        "type": "BigNumber",
        "hex": "0x59682fb8"
    },
    "gasPrice": null,
    "gasLimit": {
        "type": "BigNumber",
        "hex": "0xf347"
    },
    "to": "0x7E039A00fFFD8d8C898e77e52351c799C99D3a2D",
    "value": {
        "type": "BigNumber",
        "hex": "0x00"
    },
    "data": "0x935f4c18000000000000000000000000778a30259c20a7c106e85989ec9c04e1cedc3cb6000000000000000000000000000000000000000000000000002386f26fc10000",
    "accessList": [],
    "hash": "0x6e9c0d66edc5064879d7f212a4e546c9cfe9706219322ee68903c11bb817e3d7",
    "v": 0,
    "r": "0x4785a37feb3f53004f1f550cdcb37ac9338cf38a1ef74c10d919a77933a89a8c",
    "s": "0x06c6494a0336a1dbca4f4ca4d3a22450ea042b2237008644d808f1e4d4d528a2",
    "from": "0x6297034942AC8F86F19f7c3a64532F69b6b25c1a",
    "confirmations": 0
}

```


### Usage



#### Testing

To run the tests, after you installed the dependencies, just run

`npm t`

#### Linting

To run the linter, after you installed the dependencies, just run 

`npm run lint`

#### Coverage

To create a coverage report, after you installed the dependencies, just run 

`npm run coverage`

#### Doc generation

To create the smart contract documentation, after you installed the dependencies, just run 

`npm run docgen`

This will generate a browsable html file within the `./docs` folder, to view it you can open it with any browser.

#### Deployment

To deploy the smart contracts just run

`npm run deploy-kovan`

`npm run deploy-local`

depending on the network you want to use.

Keep in mind that you have to set the ALCHEMY_API_KEY and MNEMONIC envvars(the .env file can be used for this).

To get the deployed contract address just look in the `deployments/<network>/BasicPayments.json` file.

#### More scripts

Other useful scripts can be found using

`npm run`

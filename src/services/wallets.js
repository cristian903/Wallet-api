const ethers = require("ethers");
//const accounts = [];
const config = require("../config");
const fetch = require("node-fetch");

const getDeployerWallet =
  ({ config }) =>
  () => {
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
    console.log("Deployer wallet" + wallet.address);
    return wallet;
  };

const createWallet =
  ({ config }) =>
  async () => {
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    // This may break in some environments, keep an eye on it
    const wallet = ethers.Wallet.createRandom().connect(provider);
    // accounts.push({
    //   address: wallet.address,
    //   privateKey: wallet.privateKey,
    // });
    const result = {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
    console.log(result);
    return result;
  };

const getWalletsData = () => () => {
  return accounts;
};

const getWalletData = () => index => {
  return accounts[index - 1];
};

const getWallet =  ({ config }) =>  privateKey => {
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);

    return new ethers.Wallet(privateKey, provider);
  };

const getBalance = ({config}) => async address => {
  return await fetchBalanceFromAddress(address);
};

const fetchBalanceFromAddress = async address => {
  const response = await fetch(
    `https://api-goerli.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${config.etherscanApiKey}`,
    //https://api.etherscan.io/api?module=account&action=balance&address=0x2FF64a642AD9abC824ad4fb86B0E013B5b9B1FEc&tag=latest&apikey=ISH26R642MQ3A4PCQTAWCFDJRZZDMF3HDX
  );
  if (response.status !== 200) {
    return null;
  }
  
  const balance_info = await response.json();
  console.log(balance_info)
  return ethers.utils.formatEther(balance_info.result );
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
  getBalance: getBalance({ config }),
});

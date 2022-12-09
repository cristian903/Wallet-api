const ethers = require("ethers");
const getDepositHandler = require("../handlers/getDepositHandler");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposits = {};

const deposit =
  ({ config }) =>
  async (senderWallet, amountToSend) => {
    const basicPayments = await getContract(config, senderWallet);
    const tx = await basicPayments.deposit({
      value: await ethers.utils.parseEther(amountToSend).toHexString(),
    });
    tx.wait(1).then(
      receipt => {
        console.log("Transaction mined");
        const firstEvent = receipt && receipt.events && receipt.events[0];
        console.log(firstEvent);
        if (firstEvent && firstEvent.event == "DepositMade") {
          const depo = {
            senderAddress: firstEvent.args.sender,
            amountSent: firstEvent.args.amount,
          };
          console.log((depo));
        } else {
          console.error(`Payment not created in tx ${tx.hash}`);
        }
      },
      error => {
        const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
        const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
        console.error("reasons List");
        console.error(reasonsList);

        console.error("message");
        console.error(message);
      },
    );
    return tx;
  };

  const pay = ({ config }) => async (systemWallet, receiverAddress, amountToSend) => {
    //const date = new Date();
    const basicPayments = await getContract(config, systemWallet);
    const tx = await basicPayments.sendPayment(receiverAddress, ethers.utils.parseEther(amountToSend).toHexString());
    tx.wait(1).then(
      async receipt => {
        console.log("Transaction mined");
        const firstEvent = receipt && receipt.events && receipt.events[0];
        console.log(firstEvent);
        if (firstEvent && firstEvent.event == "PaymentMade") {
          const somePayment = {
            id: tx.hash.toString(),
            amount: parseFloat(amountToSend),
            receiver_address: receiverAddress,
            sender_address: config.contractAddress,
            //day: date.getDate(),
            //month: date.getMonth() + 1,
            //year: date.getFullYear(),
          }
          console.log("Persisted deposit", (somePayment));
        } else {
          console.error(`Payment not created in tx ${tx.hash}`);
        }
      },
      error => {
        const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
        const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
        console.error("reasons List");
        console.error(reasonsList);
  
        console.error("message");
        console.error(message);
      },
    );
    tx.to = receiverAddress;
    tx.from = config.contractAddress;
    return tx;
  };

const getDepositReceipt =
  ({}) =>
  async depositTxHash => {
    return deposits[depositTxHash];
  };

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  pay: pay(dependencies),
});

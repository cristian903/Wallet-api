
function schema() {
  return {
    params: {
      type: "object",
      properties: {
        privateKey: {
          type: "string",
        },
    //   },
    // },
    // body: {
    //   type: "object",
    //   properties: {
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["privateKey", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    // const walletId = await walletService.getWalletIdWithUserId(userId);
    // if (!walletId) {
    //   reply.code(404).send({ message: `Unable to find wallet with provided user id ${userId}` });
    // }
    const deployerWallet = await walletService.getDeployerWallet();
    const receiverWallet = await walletService.getWallet(req.body.privateKey);
    try {
      return await contractInteraction.pay(deployerWallet, receiverWallet.address, req.body.amountInEthers);
    } catch (e) {
      reply.code(400).send({
        message: `System wallet does not have sufficient funds to make a payment`,
      });
    }
  };
}

module.exports = { schema, handler };

function schema() {
  return {
    body: {
      type: "object",
      properties: {
        privateKey: {
          type: "string",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["privateKey", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    console.log(req.body)
    return contractInteraction.deposit(walletService.getWallet(req.body.privateKey), req.body.amountInEthers);
  };
}

module.exports = { schema, handler };


//  address: '0x322622503d0Cd636bed3A4688Bd9c8d927E5276D',
//privateKey: '0x03c8847e2740468048cf1aba56fd61db21c483a64cb510ceb19861fd3c89a299'
//
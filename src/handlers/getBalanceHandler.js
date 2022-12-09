function schema() {
  return {
    params: {
      type: "object",
      properties: {
        address: {
          type: "string",
        },
      },
    },
    required: ["address"],
  };
}

function handler({ walletService }) {

  return async function (req, reply) {
    const body = await walletService.getBalance(req.params.address);
    reply.code(200).send(body);
  };
  // return async function (req, reply) {
  //   const userId = req.headers["id"];
  //   const balanceInEthers = await walletService.getBalance(req.params.id);
  //   const code = !balanceInEthers ? 501 : 200;
  //   const body = !balanceInEthers
  //     ? { message: `Unable to find wallet with provided uid ${req.params.id} or etherscan is down` }
  //     : { balance: balanceInEthers };
  //   reply.code(code).send(body);
  // };
}

module.exports = { handler, schema };

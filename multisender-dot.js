const { ApiPromise, WsProvider } = require("@polkadot/api");
const { Keyring } = require("@polkadot/keyring");

const mnemonic = "seed phrace paste here";

async function main() {
  const wsProvider = new WsProvider("wss://rpc.polkadot.io");
  const api = await ApiPromise.create({ provider: wsProvider });

  const recipients = [
    "14rxsTpxfKRkp8S4hwfWWe3Cbq2EQhDgNQG9DUdBUkDUp1TF",
    "14rxsTpxfKRkp8S4hwfWWe3Cbq2EQhDgNQG9DUdBUkDUp1TF",
    "14rxsTpxfKRkp8S4hwfWWe3Cbq2EQhDgNQG9DUdBUkDUp1TF",
  ];

  const amountToEach = 12500000000; // = 1.25 DOT
  //const amountToEach = 50 // = 0.000000005 DOT

  // construct a list of transactions we want to batch
  const txs = recipients.map((recipient) =>
    api.tx.balances.transfer(recipient, amountToEach)
  );

  // Constuct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: "sr25519" });
  const sender = keyring.addFromUri(mnemonic);

  // construct the batch and send the transactions
  await api.tx.utility.batch(txs).signAndSend(sender, ({ status }) => {
    if (status.isInBlock) {
      console.log(`included in ${status.asInBlock}`);
    }
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());

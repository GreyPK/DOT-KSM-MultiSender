const { ApiPromise, WsProvider } = require("@polkadot/api");
const { Keyring } = require("@polkadot/keyring");

const mnemonic = "seed phrace paste here";

async function main() {
  const wsProvider = new WsProvider("wss://kusama-rpc.polkadot.io/");
  const api = await ApiPromise.create({ provider: wsProvider });

  const recipients = [
    "HvVoz9xA8aZrrzUS3E4s4ZR7zKxM2NiF17h1BW6URpS6xcs",
    "HvVoz9xA8aZrrzUS3E4s4ZR7zKxM2NiF17h1BW6URpS6xcs",
    "HvVoz9xA8aZrrzUS3E4s4ZR7zKxM2NiF17h1BW6URpS6xcs",
  ];

  const amountToEach = 1250000000000; // = 1.25 KSM
  //const amountToEach = 50; // = 0.000000000050 KSM

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

const { ethers } = require("ethers");
const { lipsumAbi } = require("./contract-abi.js");

const main = async () => {
  const provider = new ethers.JsonRpcProvider("http://localhost:7545");
  const wallet = new ethers.Wallet(
    "0x79157e91bd24e02991b6784c55e3d68b27f996b313bd6a84082158eb801a852e",
    provider
  );
  const contractLipsum = new ethers.Contract(
    "0xd2519B7358E26B968612538a4acB38eaF096c0d1",
    lipsumAbi,
    provider
  );

  // toggle public mint to true
  // await contractLipsum.connect(wallet).togglePublicSaleStatus()
  
  // set token base URI 
  // await contractLipsum.connect(wallet).setBaseURI("ipfs://abcabcss/")

  const mint = await contractLipsum.connect(wallet).mint("1", {
    gasLimit: 100000,
    value: ethers.parseEther("0.08"),
  });

  const tokenURI = await contractLipsum.tokenURI("1");
  console.log({ mint, tokenUri: tokenURI });
};

main();

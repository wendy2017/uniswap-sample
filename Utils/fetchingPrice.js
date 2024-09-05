const { ethers } = require("ethers");
import { token0DataABI, token1DataABI } from "../Context/constants";

const {
  abi: IUniswapV3PoolABI,
} = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const {
  abi: QuoterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");

const { getAbi, getPoolImmutables } = require("./priceHelpers");

const MAINNET_URL =
  "https://eth-mainnet.g.alchemy.com/v2/HipkY4uUcIiBDv1bjvrgdKZgzj2A_3R3";

const provider = new ethers.providers.JsonRpcProvider(MAINNET_URL);

// TODO: check it and delete if not working
const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

export const getPrice = async (inputAmount, poolAddress) => {
  console.log("poolContract=1=", poolAddress, inputAmount);

  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    provider
  );
  console.log("poolContract=2=", poolContract);

  const tokenAddress0 = await poolContract.token0();
  const tokenAddress1 = await poolContract.token1();

  const tokenAbi0 = await getAbi(tokenAddress0);
  const tokenAbi1 = await getAbi(tokenAddress1);
  // const tokenAbi0 = token0DataABI;
  // const tokenAbi1 = token1DataABI;
  console.log("poolContract=3=", tokenAddress0, tokenAddress1, tokenAbi0);

  const tokenContract0 = new ethers.Contract(
    tokenAddress0,
    tokenAbi0,
    provider
  );
  const tokenContract1 = new ethers.Contract(
    tokenAddress1,
    tokenAbi1,
    provider
  );

  const tokenSymbol0 = await tokenContract0.symbol();
  const tokenSymbol1 = await tokenContract1.symbol();
  const tokenDecimals0 = await tokenContract0.decimals();
  const tokenDecimals1 = await tokenContract1.decimals();

  const quoterContract = new ethers.Contract(
    quoterAddress,
    QuoterABI,
    provider
  );

  const immutables = await getPoolImmutables(poolContract);

  const amountIn = ethers.utils.parseUnits(
    inputAmount.toString(),
    tokenDecimals0
  );

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    immutables.token0,
    immutables.token1,
    immutables.fee,
    amountIn,
    0
  );

  const amountOut = ethers.utils.formatUnits(quotedAmountOut, tokenDecimals1);

  return [amountOut, tokenSymbol0, tokenSymbol1];
};

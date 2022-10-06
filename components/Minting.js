import { ConnectWallet, useAddress, useContract} from "@thirdweb-dev/react";
import { useEffect } from "react";
import { useState } from 'react';
import toast, {Toaster} from 'react-hot-toast'

const Minting = () => {

const address = useAddress()

const [claimedSupply, setClaimedSupply] = useState(null)
const [totalSupply, setTotalSupply] = useState(null)
const [priceInEth, setPriceInEth] = useState(null)
const [loading, setLoading] = useState(true)
const [completed, setCompleted] = useState(false)
const {contract} = useContract("0xBc3fe4a9604275ED306811b94413F4b9Caf3487d")



//NFT Mint Price in Smart Contract
useEffect(() => {
    if (!contract) return;
    const fetchPrice = async () => {
        const claimConditions = await contract.claimConditions.getAll()
        setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
    }
    fetchPrice();
}, [contract]) 

//Total Supply Update
useEffect(() => {
    if (!contract) return;
    
    const fetchContractData = async () => {
        setLoading(true)
        const claimed = await contract.getAllClaimed();
        const total = await contract.totalSupply();

        setClaimedSupply(claimed.length);
        setTotalSupply(total);

        setLoading(false)
    }
    fetchContractData();
}, [contract])

//Minting Process1
    const mintNft1 = () => {
        if (!contract || !address) return;
        const quantity = 1; //how many NFTs you want to claim
        
        setLoading(true);
        const notification = toast.loading('Minting...',{
            style:{
                background: 'white',
                color: '#d80b31',
                fontWeight: 'bolder',
                fontSize: '17px',
                padding: '20px',
            }
        })

        {loading ? (
            <>Loading</>
        ): claimedSupply === totalSupply?.toNumber()? (
            <>SOLD OUT</>
        ): !address? (
            <>Connect your wallet to Mint</>
        ): (
            <span className="font-bold"> Mint 1 ({priceInEth} ETH)</span>
        )}


        contract.claimTo(address, quantity).then(async (tx) => {
            const receipt = tx[0].receipt //transaction receipt
            const claimedTokenID = tx[0].id //id of the NFT claimed
            const claimedNFT = await tx[0].data() //get the claimed NFT metadata

            
              setCompleted(true);
            
            console.log(receipt)
            console.log(claimedTokenID)
            console.log(claimedNFT)
        }).catch((err) => {
            console.log(err)
            toast('Oops.. Something went wrong.',{
                style:{
                    background: 'red',
                    color: 'white',
                    fontWeight: 'bolder',
                    fontSize: '17px',
                    padding: '20px',
                    
                }

            })
           
        }).finally(() => {
            setLoading(false)
            toast.dismiss(notification);
        })
    }
    //Mint 2
    const mintNft2 = () => {
        if (!contract || !address) return;
        const quantity = 2; //how many NFTs you want to claim
        
        setLoading(true);
        const notification = toast.loading('Minting...',{
            style:{
                background: 'white',
                color: '#d80b31',
                fontWeight: 'bolder',
                fontSize: '17px',
                padding: '20px',
                
            }
        })

        {loading ? (
            <>Loading</>
        ): claimedSupply === totalSupply?.toNumber()? (
            <>SOLD OUT</>
        ): !address? (
            <>Connect your wallet to Mint</>
        ): (
            <span className="font-bold"> Mint 2 ({priceInEth} ETH)</span>
        )}


        contract.claimTo(address, quantity).then(async (tx) => {
            const receipt = tx[0].receipt //transaction receipt
            const claimedTokenID = tx[0].id //id of the NFT claimed
            const claimedNFT = await tx[0].data() //get the claimed NFT metadata

            
              setCompleted(true);
            
            console.log(receipt)
            console.log(claimedTokenID)
            console.log(claimedNFT)
        }).catch((err) => {
            console.log(err)
            toast('Oops.. Something went wrong.',{
                style:{
                    background: 'red',
                    color: 'white',
                    fontWeight: 'bolder',
                    fontSize: '17px',
                    padding: '20px',
                    
                }

            })
           
        }).finally(() => {
            setLoading(false)
            toast.dismiss(notification);
        })
    }

  return (
    <div className="flex h-screen w-100 ">
        <Toaster position="bottom-center"/>

        <style jsx>{`
            .vWrite {
                writing-mode: vertical-lr;
            }
      `}</style>    

        <div className=" h-fit w-[700px] bg-[#000000cb] flex flex-col justify-between m-auto rounded-2xl p-5 gap-5 z-50">

            <div className="h-2 w-full bg-[#d80b31] mt-0 mb-auto mx- auto rounded-lg"></div>
            <div className="w-full mt-0 mb-0 flex justify-between">
                <p className="text-white font-bold text-xl">
                    PHASE 1: Noboru (Allowlist)
                </p>
                <div className="flex flex-col mb-1">
                    {loading ? (
                         <p className="ml-auto mr-0 animate-pulse text-right">
                         Loading Supply...
                     </p>
                    ): (
                        <p className="ml-auto mr-0">
                        {claimedSupply}/{totalSupply?.toString()} Minted
                    </p>
                    )}
                   
                </div>
            </div>

            <div className="flex mt-0 mb-20">
                <p jsx className="vWrite text-xl">
                    japanjapan
                </p>
                
                <div>
                    <p className="text-4xl">
                        HOW MANY ESPERS TO SUMMON?
                    </p>
                    <p className=" font-sans">
                        Note: There is maximum of 2 mints per wallet.
                    </p>
                </div>
            </div>
                        
        {completed?
            (
                <div className="flex fixed top-0 bottom-0 left-0 right-0 bg-black  z-50">
                <video className='mintVidPlay m-auto h-4/4 w-4/4 md:h-3/4' bg-red-500 src='../vids/mintVid.mp4' autoPlay>
                </video>
                </div>
            )
                :
            ( 
                <span className=" hidden"></span>
            )
            
        } 
      
        
        <div className="flex flex-col justify-center  w-full gap-2 sm:flex-row-reverse">
        
            <div className="flex mr-auto ml-auto flex-col gap-2
            sm:ml-0">
                <button
                onClick={mintNft1} 
                disabled={loading || claimedSupply === totalSupply?.toNumber() || !address} className="h-[50px] w-64 bg-[#d80b31]
                text-white rounded-lg uppercase disabled:bg-gray-400 mr-auto ml-auto my-auto">

                    {loading ? (
                        <>Loading</>
                    ): claimedSupply === totalSupply?.toNumber()? (
                        <>SOLD OUT</>
                    ): !address? (
                        <span className=" text-sm"> Connect your wallet to Mint</span>
                    ): (
                        <span className="font-bold"> Mint 1({0.024} ETH)</span>
                    )}
                    
                </button>

                <button
                onClick={mintNft2} 
                disabled={loading || claimedSupply === totalSupply?.toNumber() || !address} className="h-[50px] w-64 bg-[#d80b31]
                text-white rounded-lg uppercase disabled:bg-gray-400 mr-auto ml-auto my-auto">

                    {loading ? (
                        <>Loading</>
                    ): claimedSupply === totalSupply?.toNumber()? (
                        <>SOLD OUT</>
                    ): !address? (
                        <span className=" text-sm"> Connect your wallet to Mint</span>
                    ): (
                        <span className="font-bold"> Mint 2({0.048} ETH)</span>
                    )}
                    
                </button>
            </div>

        
            <div className=" text-xl flex justify-center items-center w-[256px] h-[108px] bg-[#e7e8e8] overflow-hidden ml-auto mr-auto my-auto rounded-lg
            sm:mr-0"> 
                    <ConnectWallet  colorMode="light" accentColor="white"/>
            </div>
        </div>

        </div>
    </div>

  )
  
}

export default Minting
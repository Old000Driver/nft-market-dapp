"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { NFTMarketABI } from "@/constants/abi";
import { toast } from "sonner";
import { ListingNFT } from "@/utils/fetchListings";

interface DelistNFTProps {
  nft: ListingNFT;
  onDelist: (tokenId: string) => void;
}

export function DelistNFT({ nft, onDelist }: DelistNFTProps) {
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const { writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  const handleDelist = async () => {
    if (isConfirming) return;

    try {
      console.log("提交取消上架交易...");
      const hash = await writeContractAsync({
        address: process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS as `0x${string}`,
        abi: NFTMarketABI,
        functionName: "delistNFT",
        args: [nft.nftContract, BigInt(nft.tokenId)],
      });

      console.log("交易哈希:", hash);
      setTxHash(hash as `0x${string}`);
      toast.success("交易已提交");
    } catch (error) {
      console.error("取消上架失败:", error);
      toast.error(error instanceof Error ? error.message : "未知错误");
    }
  };

  // 监听交易确认
  useEffect(() => {
    if (isSuccess && txHash) {
      toast.success("取消上架成功");
      onDelist(nft.tokenId);
      setTxHash(undefined);
    }
  }, [isSuccess, txHash, onDelist, nft.tokenId]);

  return (
    <Button 
      onClick={handleDelist} 
      disabled={isConfirming}
      variant="destructive"
    >
      {isConfirming ? "delist..." : "delist"}
    </Button>
  );
}
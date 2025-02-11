"use client";

import { useState, useEffect } from "react";
import { NFTCard } from "./nft-card";
import { ListNFT } from "./list-nft";
import { fetchAllListings, type ListingNFT } from "@/utils/fetchListings";

export default function NFTMarketplace() {
  const [nftList, setNftList] = useState<ListingNFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function queryListedNFT() {
      try {
        setIsLoading(true);
        const listings = await fetchAllListings();
        setNftList(listings);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取NFT列表失败');
      } finally {
        setIsLoading(false);
      }
    }
    queryListedNFT();
  }, []);

  const handleBuyNFT = (tokenId: string) => {
    console.log(`Buying NFT with tokenId: ${tokenId}`);
    setNftList((prev) =>
      prev.map((nft) => (nft.tokenId === tokenId ? { ...nft } : nft))
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">NFT Marketplace</h1>
        <ListNFT />
      </div>
      {isLoading && <p className="text-center">加载中...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {nftList.map((nft: ListingNFT) => (
          <NFTCard key={nft.tokenId} nft={nft} onBuyNFT={handleBuyNFT} />
        ))}
      </div>
      {nftList.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No NFTs found. Try a different search or list a new NFT.
        </p>
      )}
    </main>
  );
}

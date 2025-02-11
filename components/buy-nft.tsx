"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ListingNFT } from "@/utils/fetchListings";

interface BuyNFTProps {
  nft: ListingNFT;
  onBuyNFT: (nftId: string) => void;
}

export function BuyNFT({ nft, onBuyNFT }: BuyNFTProps) {
  const [open, setOpen] = useState(false);

  const handleBuy = () => {
    onBuyNFT(nft.tokenId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Buy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy NFT</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Are you sure you want to buy this NFT?</p>
          <p>Name: {nft.name}</p>
          <p>Price: {nft.price} ETH</p>
          <p>Seller: {nft.seller}</p>
          <Button onClick={handleBuy}>Confirm Purchase</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

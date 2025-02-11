"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function ListNFT() {
  const [open, setOpen] = useState(false)
  const [nftAddress, setNftAddress] = useState("")
  const [tokenId, setTokenId] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the logic to list the NFT
    console.log("Listing NFT:", { nftAddress, tokenId, price })
    setOpen(false)
    // Reset form fields
    setNftAddress("")
    setTokenId("")
    setPrice("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>List NFT</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>List NFT for Sale</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nftAddress">NFT Contract Address</Label>
            <Input
              id="nftAddress"
              value={nftAddress}
              onChange={(e) => setNftAddress(e.target.value)}
              placeholder="0x..."
              required
            />
          </div>
          <div>
            <Label htmlFor="tokenId">Token ID</Label>
            <Input id="tokenId" value={tokenId} onChange={(e) => setTokenId(e.target.value)} placeholder="1" required />
          </div>
          <div>
            <Label htmlFor="price">Price (ERC20 tokens)</Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="1.0"
              type="number"
              step="0.01"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            List NFT
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}


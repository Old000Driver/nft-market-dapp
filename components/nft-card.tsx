import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { BuyNFT } from "./buy-nft"
import { ListingNFT } from "@/utils/fetchListings"

interface NFTCardProps {
  nft: ListingNFT
  onBuyNFT: (id: string) => void
}

export function NFTCard({ nft, onBuyNFT }: NFTCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{nft.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={nft.image || "/placeholder.svg"}
          alt={nft.name}
          width={300}
          height={300}
          className="w-full h-auto rounded-lg"
          unoptimized
        />
        <p className="mt-2 text-sm text-gray-600">{nft.name}</p>
        <p className="mt-2 font-bold">Price: {nft.price} ETH</p>
        <p className="text-sm text-gray-600">
          Contract: {nft.nftContract.slice(0, 6)}...{nft.nftContract.slice(-4)}
        </p>
        <p className="text-sm text-gray-600">Token ID: {nft.tokenId}</p>
        <p className="text-sm text-gray-600">
          Seller: {nft.seller.slice(0, 6)}...{nft.seller.slice(-4)}
        </p>
      </CardContent>
      <CardFooter>{<BuyNFT nft={nft} onBuyNFT={onBuyNFT} />}</CardFooter>
    </Card>
  )
}


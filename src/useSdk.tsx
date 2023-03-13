import { useEffect, useState } from "react";
import { PaperEmbeddedWalletSdk } from "@paperxyz/embedded-wallet-service-sdk";

export function useSdk() {

    const [sdk, setSdk] = useState<PaperEmbeddedWalletSdk>()

    useEffect(() => {
        const sdk = new PaperEmbeddedWalletSdk({
            clientId: process.env.NEXT_PUBLIC_KEY!,
            chain: "Goerli"
        })
        setSdk(() => sdk)

    }, [])

    return sdk
}
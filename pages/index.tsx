import { Inter } from 'next/font/google'
import { VStack, Center, Button, Card, CardBody, Text, HStack, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { UserStatus, InitializedUser, PaperEmbeddedWalletSdk } from '@paperxyz/embedded-wallet-service-sdk'
import { useSdk } from '@/src/useSdk'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [msg, setMsg] = useState("echo here")
  const [user, setUser] = useState<InitializedUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const sdk = useSdk()


  async function wrongWay() {
    setIsLoading(true)
    try {
      //new the sdk instance and recreate it each time inside the function will cause error.
      const sdk2 = new PaperEmbeddedWalletSdk({
        clientId: process.env.NEXT_PUBLIC_KEY!,
        chain: "Goerli"
      })

      const user = await sdk2.getUser()
      if (user.status == UserStatus.LOGGED_OUT) {
        const r = await sdk2.auth.loginWithPaperModal()
        setUser(r.user)
      } else {
        setUser(user)
      }
    } catch (e) {
      setMsg(() => { return (e as Error).message.concat(`\n${msg}`) })
    }
    setIsLoading(false)
  }

  async function rightWay() {
    setIsLoading(true)
    if (sdk) {
      const user = await sdk.getUser()
      if (user.status == UserStatus.LOGGED_OUT) {
        try {
          const r = await sdk.auth.loginWithPaperModal()
          setUser(r.user)
        } catch (e) {
          setMsg(() => { return (e as Error).message.concat(`\n${msg}`) })
        }
      } else {
        setUser(user)
      }
    }
    setIsLoading(false)

  }

  async function logout() {
    setIsLoading(true)
    try {
      const r = await sdk?.auth.logout()
      if (r?.success) {
        setUser(null)
      }
    } catch (e) {
      setMsg(() => { return (e as Error).message.concat(`\n${msg}`) })
    }
    setIsLoading(false)

  }

  return (
    <>
      <Center w="100vw">

        <VStack spacing={8} w="100%" pt="5vw">
          <Box display={"flex"} justifyContent="center">
            {!user ?
              <HStack>
                <Button isLoading={isLoading} colorScheme={"blue"} onClick={wrongWay}>wrong way Login</Button>
                <Button isLoading={isLoading} colorScheme={"blue"} onClick={rightWay}>right way Login</Button>
              </HStack>
              :
              <HStack>
                <Text textAlign={"center"}>{user.walletAddress}</Text>
                <Button isLoading={isLoading} onClick={logout}>Logout</Button>
              </HStack>
            }
          </Box>
          <Card w="60%" h="max(160px, 30vw)">
            <CardBody>
              <Box overflow={"auto"} w="100%" h="100%" boxShadow={"inner"} p={4} borderWidth="1px">
                <pre>{msg}</pre>
              </Box>
            </CardBody>
          </Card>

        </VStack>

      </Center>
    </>
  )
}

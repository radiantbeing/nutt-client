import { Center, VStack, HStack, Heading, Text, Image } from "@chakra-ui/react";
import { Layout, Header, BottomNavigation } from "./Layout";
import { FilledButton } from "./Button";

import logo from "../assets/logo.svg";

export function Welcome() {
  const mainContent: React.ReactElement = (
    <Center h="full">
      <VStack align="flex-start" spacing={4}>
        <Text
          bgGradient="linear(to-r, #25855A, #48BB78)"
          bgClip="text"
          fontSize="lg"
          fontWeight="bold"
        >
          처음 만나는 식단 관리 AI
        </Text>
        <HStack spacing={6}>
          <Image src={logo} w={20} />
          <Heading as="h2" fontSize="5xl">
            Nutt
          </Heading>
        </HStack>
        <Text fontSize="xs">Copyright © Nutt. All Rights Reserved.</Text>
      </VStack>
    </Center>
  );

  return (
    <Layout>
      <Header text="환영합니다" />
      {mainContent}
      <BottomNavigation>
        <FilledButton>시작하기</FilledButton>
      </BottomNavigation>
    </Layout>
  );
}

import { Center, VStack, HStack, Heading, Text, Image } from "@chakra-ui/react";
import { FilledButton } from "./Button";

import logo from "../assets/logo.svg";
import { BaseLayout } from "../layouts/BaseLayout";
import { BottomNavigation } from "../layouts/BottomNavigation";
import { Header } from "../layouts/Header";
import { MainContent } from "../layouts/MainContent";

export function Welcome() {
  return (
    <BaseLayout>
      <Header text="환영합니다" />
      <MainContent>
        <Center w="full" h="full">
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
      </MainContent>
      <BottomNavigation>
        <FilledButton>시작하기</FilledButton>
      </BottomNavigation>
    </BaseLayout>
  );
}

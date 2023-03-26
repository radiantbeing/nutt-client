import {
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  Center,
  VStack,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export function Layout(props: { children: React.ReactNode }) {
  return (
    <Container paddingLeft={0} paddingRight={0} h="full" overflow="hidden">
      <Flex w="full" h="full" direction="column">
        {props.children}
      </Flex>
    </Container>
  );
}

export function Header(props: { text: string; hasPrev?: boolean }) {
  return (
    <Flex
      w="100%"
      paddingLeft={3}
      paddingRight={3}
      paddingTop={4}
      paddingBottom={4}
      boxShadow="base"
    >
      <HStack>
        {props.hasPrev && (
          <IconButton
            aria-label="Move to previous page"
            icon={<ChevronLeftIcon boxSize={7} />}
            backgroundColor="transparent"
            boxSize={6}
            _hover={{
              backgroundColor: "transparent",
            }}
          />
        )}
        <Heading as="h1" fontWeight="semibold" size="md">
          {props.text}
        </Heading>
      </HStack>
    </Flex>
  );
}

export function BottomNavigation(props: { children: React.ReactNode }) {
  return (
    <Center
      w="full"
      paddingLeft={4}
      paddingRight={4}
      paddingTop={8}
      paddingBottom={8}
      gap={3}
    >
      {props.children}
    </Center>
  );
}

export function Main(props: { children: React.ReactNode }) {
  return (
    <VStack
      h="full"
      align="flex-start"
      overflowY="auto"
      spacing={4}
      paddingTop={6}
      paddingBottom={6}
      paddingLeft={4}
      paddingRight={4}
    >
      {props.children}
    </VStack>
  );
}

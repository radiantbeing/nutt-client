import { Container, Flex } from "@chakra-ui/react";

export function BaseLayout(props: { children: React.ReactNode }) {
  return (
    <Container paddingLeft={0} paddingRight={0} h="full" overflow="hidden">
      <Flex w="full" h="full" direction="column">
        {props.children}
      </Flex>
    </Container>
  );
}

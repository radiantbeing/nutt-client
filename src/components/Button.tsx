import { Button, Heading, Text, Flex, VStack } from "@chakra-ui/react";

export function FilledButton(props: { children?: React.ReactNode }) {
  return (
    <Button
      w="full"
      size="lg"
      fontWeight="medium"
      bgColor="green.500"
      color="white"
      _hover={{
        bgColor: "green.500",
      }}
      _active={{
        bgColor: "green.600",
      }}
    >
      {props.children}
    </Button>
  );
}

export function OutlineButton(props: { children?: React.ReactNode }) {
  return (
    <Button
      w="full"
      size="lg"
      fontWeight="medium"
      bgColor="transparent"
      color="green.500"
      border="1px"
      borderColor="green.500"
    >
      {props.children}
    </Button>
  );
}

export function CardButton(props: {
  heading: string;
  description: string;
  src?: string;
  isActive?: boolean;
}) {
  return (
    <Flex
      as="button"
      direction="row"
      w="full"
      border="1px"
      borderColor={props.isActive ? "green.500" : "gray.200"}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      bgColor={props.isActive ? "gray.50" : "transparent"}
      p={3}
      alignItems="center"
      borderRadius={8}
      gap={3}
      _hover={{
        bgColor: "gray.50",
      }}
      _active={{
        bgColor: "gray.100",
      }}
    >
      <VStack alignItems="flex-start" textAlign="start">
        <Heading fontSize="sm">{props.heading}</Heading>
        <Text fontSize="xs">{props.description}</Text>
      </VStack>
    </Flex>
  );
}

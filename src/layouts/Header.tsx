import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton, Heading } from "@chakra-ui/react";

export function Header(props: { text: string; hasPrev?: boolean }) {
  return (
    <Flex w="100%" p={4} boxShadow="base">
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

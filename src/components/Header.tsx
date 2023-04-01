import { Flex, HStack, Heading } from "@chakra-ui/react";
import PreviousButton from "./PreviousButton";
import SettingsButton from "./SettingsButton";

type HeaderProps = {
  children: React.ReactNode;
};

export default function Header(props: HeaderProps) {
  return (
    <Flex boxSize="full" align="center" justify="space-between">
      <HStack>
        <PreviousButton />
        <Heading size="md">{props.children}</Heading>
      </HStack>
      <SettingsButton />
    </Flex>
  );
}

import { Flex, HStack, Heading } from "@chakra-ui/react";
import PreviousButton from "./PreviousButton";
import MoreMenuButton from "./MoreMenuButton";
import { FC } from "react";

type HeaderProps = {
  onPrevClick?: () => void;
  isMoreMenuVisible?: boolean;
  isWelcome?: boolean;
  children: React.ReactNode;
};

const Header: FC<HeaderProps> = ({
  isMoreMenuVisible,
  isWelcome,
  children,
  onPrevClick,
}) => {
  return (
    <Flex
      boxSize="full"
      align="center"
      justify="space-between"
      color={isWelcome ? "white" : undefined}
    >
      <HStack>
        <PreviousButton onClick={onPrevClick} />
        <Heading size="md">{children}</Heading>
      </HStack>
      <MoreMenuButton isMoreMenuVisible={isMoreMenuVisible} />
    </Flex>
  );
};

export default Header;

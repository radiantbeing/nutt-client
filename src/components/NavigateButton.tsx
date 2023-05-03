import { Flex, Button } from "@chakra-ui/react";
import { FC } from "react";

type NavigateButtonProps = {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost" | "link";
  onClick: () => void;
};

const NavigateButton: FC<NavigateButtonProps> = ({
  children,
  variant,
  onClick,
}) => {
  return (
    <Flex paddingBottom={8} boxSize="full" align="center">
      <Button
        size="lg"
        width="full"
        colorScheme="green"
        fontWeight="medium"
        variant={variant || "solid"}
        onClick={onClick}
      >
        {children}
      </Button>
    </Flex>
  );
};

export default NavigateButton;

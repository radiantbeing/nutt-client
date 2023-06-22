import { Flex, Button } from "@chakra-ui/react";
import { FC } from "react";

type NavigateButtonProps = {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost" | "link";
  colorScheme?: string;
  isLoading?: boolean;
  onClick: () => void;
};

const NavigateButton: FC<NavigateButtonProps> = ({
  children,
  variant,
  colorScheme = "green",
  isLoading,
  onClick,
}) => {
  return (
    <Flex paddingBottom={8} boxSize="full" align="center">
      <Button
        size="lg"
        width="full"
        colorScheme={colorScheme}
        fontWeight="medium"
        variant={variant || "solid"}
        onClick={onClick}
        isLoading={isLoading}
      >
        {children}
      </Button>
    </Flex>
  );
};

export default NavigateButton;

import { Flex, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type NavigateButtonProps = {
  children: React.ReactNode;
  to: string;
  variant?: "solid" | "outline" | "ghost" | "link";
};

export default function NavigateButton(props: NavigateButtonProps) {
  return (
    <Flex paddingBottom={8} boxSize="full" align="center">
      <Button
        as={RouterLink}
        size="lg"
        width="full"
        colorScheme="green"
        to={props.to}
        variant={props.variant || "solid"}
      >
        {props.children}
      </Button>
    </Flex>
  );
}

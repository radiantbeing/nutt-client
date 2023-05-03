import { Button, Heading, Text, Flex, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function LinkButton({
  children,
  variant,
  to,
}: {
  children: React.ReactNode;
  variant?: "outline" | "solid";
  to?: string | number;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof to === "number") {
      navigate(to);
    } else if (typeof to === "string") {
      navigate(to.toString());
    }
  };

  if (variant === "outline") {
    return (
      <Button
        w="full"
        size="lg"
        fontWeight="medium"
        bgColor="transparent"
        color="green.500"
        border="1px"
        borderColor="green.500"
        onClick={handleClick}
      >
        {children}
      </Button>
    );
  } else {
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
        onClick={handleClick}
      >
        {children}
      </Button>
    );
  }
}

export function CardButton(props: {
  heading: string;
  description: string;
  src?: string;
  isActive?: boolean;
  onClick: () => void;
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
      onClick={() => props.onClick()}
    >
      <VStack alignItems="flex-start" textAlign="start">
        <Heading fontSize="sm">{props.heading}</Heading>
        <Text fontSize="xs">{props.description}</Text>
      </VStack>
    </Flex>
  );
}

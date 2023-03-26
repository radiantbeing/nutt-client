import { Box, VStack } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

export function MainContent(props: { children: React.ReactNode }) {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function handleScroll() {
    if (ref.current) {
      const element = ref.current;
      const atBottom =
        element.scrollHeight - element.scrollTop === element.clientHeight;
      setIsScrolledToBottom(atBottom);
    }
  }

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <Box
      h="full"
      onScroll={handleScroll}
      overflowY="auto"
      borderBottomWidth={isScrolledToBottom ? "none" : "1px"}
      borderColor="rgba(0, 0, 0, 0.08)"
      ref={ref}
    >
      <VStack
        h="full"
        align="flex-start"
        spacing={4}
        paddingTop={6}
        paddingBottom={6}
        paddingLeft={4}
        paddingRight={4}
      >
        {props.children}
      </VStack>
    </Box>
  );
}

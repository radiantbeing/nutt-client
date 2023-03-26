import { Center } from "@chakra-ui/react";

export function BottomNavigation(props: { children: React.ReactNode }) {
  return (
    <Center w="full" h={20} p={4} gap={3}>
      {props.children}
    </Center>
  );
}

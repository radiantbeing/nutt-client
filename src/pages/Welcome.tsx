import { Center, VStack, HStack, Heading, Image } from "@chakra-ui/react";
import Header from "../components/Header";
import TemplateGrid from "../layouts/TemplateGrid";
import NavigateButton from "../components/NavigateButton";
import logo from "../assets/logo.svg";

export default function Welcome() {
  const header = <Header>환영합니다</Header>;

  const main = (
    <Center boxSize="full">
      <VStack align="flex-start" spacing={4}>
        <Heading
          size="sm"
          bgGradient="linear(to-r, #25855A, #48BB78)"
          bgClip="text"
          fontWeight="bold"
        >
          처음 만나는 AI 식단 관리
        </Heading>
        <HStack spacing={6}>
          <Image src={logo} boxSize={24} />
          <Heading size="2xl">Nutt</Heading>
        </HStack>
      </VStack>
    </Center>
  );

  const footer = <NavigateButton to="/join">시작하기</NavigateButton>;

  return <TemplateGrid header={header} main={main} footer={footer} />;
}

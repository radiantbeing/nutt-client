import { Center, VStack, HStack, Heading, Image, Box } from "@chakra-ui/react";
import Header from "../../components/Header";
import TemplateGrid from "../../layouts/TemplateGrid";
import NavigateButton from "../../components/NavigateButton";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  const header = <Header isWelcome>환영합니다</Header>;

  const main = (
    <Box boxSize="full">
      <Center boxSize="full">
        <VStack align="flex-start" spacing={4}>
          <Heading size="sm" fontWeight="bold" color="white">
            처음 만나는 AI 식단 관리
          </Heading>
          <HStack spacing={6}>
            <Image src={logo} boxSize={24} />
            <Heading size="2xl" color="white">
              Nutt
            </Heading>
          </HStack>
        </VStack>
      </Center>
    </Box>
  );

  const footer = (
    <NavigateButton onClick={() => navigate("/signup")}>
      시작하기
    </NavigateButton>
  );

  return <TemplateGrid header={header} main={main} footer={footer} isWelcome />;
}

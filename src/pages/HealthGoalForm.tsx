import {
  Stack,
  FormControl,
  FormLabel,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { CardButton } from "../components/Button";
import ChatBot from "../components/ChatBot";
import Header from "../components/Header";
import NavigateButton from "../components/NavigateButton";
import TemplateGrid from "../layouts/TemplateGrid";

export default function HealthGoalForm() {
  const header = <Header>건강 목표 설정</Header>;

  const main = (
    <Stack spacing={6} w="full">
      <ChatBot message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus, ante id euismod auctor, massa velit congue ex, vel tempus orci metus id ipsum. Proin vel tristique ante, vel sollicitudin justo." />
      <FormControl>
        <FormLabel>건강 목표 선택</FormLabel>
        <VStack>
          <CardButton
            heading="체중 감량"
            description="지방 감량으로 건강한 몸무게 유지"
          />
          <CardButton
            heading="체중 유지"
            description="균형 잡힌 식습관과 운동 유지로 몸무게 유지"
          />
          <CardButton
            isActive
            heading="근육량 증가"
            description="근육량을 늘려 몸의 형태와 기능을 개선하며 대사 속도를 높임"
          />
        </VStack>
      </FormControl>
      <FormControl>
        <FormLabel>주간 체중 증감율 (kg)</FormLabel>
        <NumberInput
          defaultValue={50}
          precision={1}
          max={20}
          min={0.1}
          step={0.1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </Stack>
  );

  const footer = <NavigateButton to="/join/activity">다음</NavigateButton>;

  return <TemplateGrid header={header} main={main} footer={footer} />;

  // return (
  //   <AppContainer>
  //     <Header title="건강 목표 설정" prevURL={"#"} isSignIn={false} />
  //     <MainContentContainer>
  //       <ChatBot message="식단 관리 계획을 생성하기 위해 저에게 건강 목표를 알려주세요." />
  // <Stack spacing={6} w="full">
  //   <FormControl>
  //     <FormLabel>건강 목표 선택</FormLabel>
  //     <VStack>
  //       <CardButton
  //         heading="체중 감량"
  //         description="지방 감량으로 건강한 몸무게 유지"
  //       />
  //       <CardButton
  //         heading="체중 유지"
  //         description="균형 잡힌 식습관과 운동 유지로 몸무게 유지"
  //       />
  //       <CardButton
  //         isActive
  //         heading="근육량 증가"
  //         description="근육량을 늘려 몸의 형태와 기능을 개선하며 대사 속도를 높임"
  //       />
  //     </VStack>
  //   </FormControl>
  //   <FormControl>
  //     <FormLabel>주간 체중 증감율 (kg)</FormLabel>
  //     <NumberInput
  //       defaultValue={50}
  //       precision={1}
  //       max={20}
  //       min={0.1}
  //       step={0.1}
  //     >
  //       <NumberInputField />
  //       <NumberInputStepper>
  //         <NumberIncrementStepper />
  //         <NumberDecrementStepper />
  //       </NumberInputStepper>
  //     </NumberInput>
  //   </FormControl>
  // </Stack>
  //     </MainContentContainer>
  //     <BottomNavbar>
  //       <LinkButton variant="solid" to="/join/activity">
  //         다음
  //       </LinkButton>
  //     </BottomNavbar>
  //   </AppContainer>
  // );
}

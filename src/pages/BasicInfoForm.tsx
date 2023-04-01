import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import ChatBot from "../components/ChatBot";
import Header from "../components/Header";
import NavigateButton from "../components/NavigateButton";
import TemplateGrid from "../layouts/TemplateGrid";

export default function UserInfoForm() {
  const header = <Header>기초 정보 입력</Header>;

  const main = (
    <Stack spacing={6}>
      <ChatBot message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus, ante id euismod auctor, massa velit congue ex, vel tempus orci metus id ipsum. Proin vel tristique ante, vel sollicitudin justo." />
      <Stack spacing={6} w="full">
        <FormControl>
          <FormLabel>이름</FormLabel>
          <Input placeholder="홍길동" />
        </FormControl>
        <FormControl>
          <FormLabel>성별</FormLabel>
          <RadioGroup defaultValue="male">
            <Stack spacing={5} direction="row">
              <Radio colorScheme="green" value="male">
                남성
              </Radio>
              <Radio colorScheme="green" value="female">
                여성
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <HStack>
          <FormControl>
            <FormLabel>키(cm)</FormLabel>
            <NumberInput
              defaultValue={160}
              precision={1}
              max={220}
              min={80}
              step={0.1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>몸무게(kg)</FormLabel>
            <NumberInput
              defaultValue={50}
              precision={1}
              max={200}
              min={20}
              step={0.1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </HStack>
      </Stack>
    </Stack>
  );

  const footer = <NavigateButton to="/join/healthGoal">다음</NavigateButton>;

  return <TemplateGrid header={header} main={main} footer={footer} />;

  // return (
  //   <AppContainer>
  //     <Header title="기초 정보 수집" prevURL={"#"} isSignIn={false} />
  //     <MainContentContainer>
  //       <ChatBot message="이름과 함께 식단 관리를 위한 기초 정보를 알려주세요." />
  // <Stack spacing={6} w="full">
  //   <FormControl>
  //     <FormLabel>이름</FormLabel>
  //     <Input placeholder="홍길동" />
  //   </FormControl>
  //   <FormControl>
  //     <FormLabel>성별</FormLabel>
  //     <RadioGroup defaultValue="male">
  //       <Stack spacing={5} direction="row">
  //         <Radio colorScheme="green" value="male">
  //           남성
  //         </Radio>
  //         <Radio colorScheme="green" value="female">
  //           여성
  //         </Radio>
  //       </Stack>
  //     </RadioGroup>
  //   </FormControl>
  //   <HStack>
  //     <FormControl>
  //       <FormLabel>키(cm)</FormLabel>
  //       <NumberInput
  //         defaultValue={160}
  //         precision={1}
  //         max={220}
  //         min={80}
  //         step={0.1}
  //       >
  //         <NumberInputField />
  //         <NumberInputStepper>
  //           <NumberIncrementStepper />
  //           <NumberDecrementStepper />
  //         </NumberInputStepper>
  //       </NumberInput>
  //     </FormControl>
  //     <FormControl>
  //       <FormLabel>몸무게(kg)</FormLabel>
  //       <NumberInput
  //         defaultValue={50}
  //         precision={1}
  //         max={200}
  //         min={20}
  //         step={0.1}
  //       >
  //         <NumberInputField />
  //         <NumberInputStepper>
  //           <NumberIncrementStepper />
  //           <NumberDecrementStepper />
  //         </NumberInputStepper>
  //       </NumberInput>
  //     </FormControl>
  //   </HStack>
  // </Stack>
  //     </MainContentContainer>
  //     <BottomNavbar>
  //       <LinkButton variant="solid" to="/join/healthGoal">
  //         다음
  //       </LinkButton>
  //     </BottomNavbar>
  //   </AppContainer>
  // );
}

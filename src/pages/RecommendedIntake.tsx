import {
  FormLabel,
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import ChatBot from "../components/ChatBot";
import Header from "../components/Header";
import NavigateButton from "../components/NavigateButton";
import TemplateGrid from "../layouts/TemplateGrid";

export default function RecommendedIntakeResult() {
  const header = <Header>권장 섭취량 설정</Header>;

  const main = (
    <Stack spacing={6} w="full">
      <ChatBot message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus, ante id euismod auctor, massa velit congue ex, vel tempus orci metus id ipsum. Proin vel tristique ante, vel sollicitudin justo." />
      <SimpleGrid columns={2} spacing={6}>
        <FormControl>
          <FormLabel>섭취 칼로리 (kcal)</FormLabel>
          <NumberInput defaultValue={2000} max={5000} min={100} step={100}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>탄수화물 (g)</FormLabel>
          <NumberInput defaultValue={50} max={5000} min={100} step={10}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>단백질 (g)</FormLabel>
          <NumberInput defaultValue={50} max={5000} min={100} step={10}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>지방 (g)</FormLabel>
          <NumberInput defaultValue={50} max={5000} min={100} step={10}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </SimpleGrid>
    </Stack>
  );

  const footer = <NavigateButton to="/home">시작하기</NavigateButton>;

  return <TemplateGrid header={header} main={main} footer={footer} />;
}

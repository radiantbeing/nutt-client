import {
  Center,
  HStack,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import ChatBot from "../../components/ChatBot";
import NavigateButton from "../../components/NavigateButton";
import TemplateGrid from "../../layouts/TemplateGrid";
import ArticleHeading from "../../components/ArticleHeading";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ScannedPicture,
  TargetAchievement,
  NutrientAnalysisTable,
} from "../../components/NutrientAnalysis";
import { useNavigate } from "react-router-dom";
import FoodNutrient from "../../interfaces/FoodNutrients";

function Loading() {
  return (
    <Center boxSize="full">
      <VStack spacing={8}>
        <Spinner size="xl" />
        <Text>인식한 음식의 정보를 가져오는 중</Text>
      </VStack>
    </Center>
  );
}

export default function DietAnalysisPage() {
  // States
  const [scannedFood, setScannedFood] = useState<FoodNutrient[]>([]);

  // Hooks
  const navigation = useNavigate();

  // Side-effects
  useEffect(() => {
    axios.get("http://219.255.1.253:8080/api/foodInfo/계란찜").then((res) => {
      const { data } = res.data;
      setScannedFood([data]);
    });
  }, []);

  // Pre-rendering
  if (scannedFood.length === 0) return <Loading />;

  // Components
  const header = (
    <Header onPrevClick={() => navigation("/")}>식단 분석 결과</Header>
  );

  const main = (
    <Stack spacing={6} w="full">
      <ChatBot
        question={`오늘은 ${scannedFood[0].name}을 먹었어. 영양학적 측면에서 평가해줘.`}
      />
      <ScannedPicture src="https://www.cj.co.kr/images/theKitchen/PHON/0000001946/0000007627/0000001946.jpg" />
      <Stack spacing={3}>
        <ArticleHeading text="식사 시간" />
        <RadioGroup defaultValue="아침">
          <Stack spacing={5} direction="row">
            {["아침", "점심", "저녁", "간식"].map((time) => (
              <Radio key={time} colorScheme="green" value={time}>
                {time}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Stack>
      <TargetAchievement />
      <NutrientAnalysisTable
        foods={[
          {
            name: "계란찜",
            kcal: 67.0,
            carbohydrate: 3.0,
            protein: 7.0,
            fat: 3.0,
          },
        ]}
      />
    </Stack>
  );

  const footer = (
    <HStack boxSize="full">
      <NavigateButton
        onClick={() => navigation("/")}
        variant="outline"
        colorScheme="red"
      >
        기록 취소
      </NavigateButton>
      <NavigateButton onClick={() => {}}>기록하기</NavigateButton>
    </HStack>
  );

  return <TemplateGrid header={header} main={main} footer={footer} />;
}

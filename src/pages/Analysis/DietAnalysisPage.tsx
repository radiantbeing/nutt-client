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
import Food from "../../interfaces/Food";
import { useSelector } from "react-redux";
import { AppState } from "../../store/Appstate";

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
  const [foods, setFoods] = useState<Food[]>([]);
  const [kcal, setKcal] = useState<number>(0);
  const [carbohydrate, setCarbohydrate] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [targetKcal, setTargetKcal] = useState<number>(0);
  const [targetCarbohydrate, setTargetCarbohydrate] = useState<number>(0);
  const [targetProtein, setTargetProtein] = useState<number>(0);
  const [targetFat, setTargetFat] = useState<number>(0);
  const [mealTime, setMealTime] = useState<
    "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK"
  >("BREAKFAST");

  // Hooks
  const detectedFoods = useSelector((state: AppState) => state.detectedFoods);
  const navigate = useNavigate();
  const detectingImage = useSelector((state: AppState) => state.detectingImage);
  console.log("detectingImage!", detectingImage?.image);

  // Side-effects
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_NUTT_API_URL}/api/search/today-intake`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      const { data } = res.data;
      const { dailyKcal, dailyCarbohydrate, dailyProtein, dailyFat } = data;
      setTargetKcal(dailyKcal);
      setTargetCarbohydrate(dailyCarbohydrate);
      setTargetProtein(dailyProtein);
      setTargetFat(dailyFat);
    });
  }, []);

  useEffect(() => {
    let foods: any = [];
    detectedFoods?.forEach(async (food) => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_NUTT_API_URL}/api/foodInfo/${food.class}`
      );
      foods.push(data.data);
      setFoods(foods);
      foods.forEach((food: any) => {
        setKcal(kcal + food.kcal);
        setCarbohydrate(carbohydrate + food.carbohydrate);
        setProtein(protein + food.protein);
        setFat(fat + food.fat);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pre-rendering
  if (foods.length === 0) return <Loading />;

  const question = `오늘은 ${foods
    .map((food) => food.name)
    .join(", ")}을 먹었어. 영양학적 측면에서 평가해줘.`;

  // Components
  const header = (
    <Header onPrevClick={() => navigate("/")}>식단 분석 결과</Header>
  );

  const main = (
    <Stack spacing={6} w="full">
      <ChatBot question={question} />
      <ScannedPicture src={detectingImage?.image} />
      <Stack spacing={3}>
        <ArticleHeading text="식사 시간" />
        <RadioGroup
          value={mealTime}
          onChange={(nextValue: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK") => {
            setMealTime(nextValue);
          }}
        >
          <Stack spacing={5} direction="row">
            {["BREAKFAST", "LUNCH", "DINNER", "SNACK"].map((time) => {
              let timeName = "";
              switch (time) {
                case "BREAKFAST":
                  timeName = "아침";
                  break;
                case "LUNCH":
                  timeName = "점심";
                  break;
                case "DINNER":
                  timeName = "저녁";
                  break;
                case "SNACK":
                  timeName = "간식";
                  break;
              }
              return (
                <Radio key={time} colorScheme="green" value={time}>
                  {timeName}
                </Radio>
              );
            })}
          </Stack>
        </RadioGroup>
      </Stack>
      <TargetAchievement
        currentKcal={kcal}
        targetKcal={targetKcal}
        currentCarbohydrate={carbohydrate}
        targetCarbohydrate={targetCarbohydrate}
        currentProtein={protein}
        targetProtein={targetProtein}
        currentFat={fat}
        targetFat={targetFat}
      />
      <NutrientAnalysisTable foods={foods} />
    </Stack>
  );

  const footer = (
    <HStack boxSize="full">
      <NavigateButton
        onClick={() => navigate("/")}
        variant="outline"
        colorScheme="gray"
      >
        취소
      </NavigateButton>
      <NavigateButton
        onClick={() => {
          console.log("postData:", foods);
          // eslint-disable-next-line array-callback-return
          foods.map((food: any) => {
            axios({
              method: "POST",
              url: `${process.env.REACT_APP_NUTT_API_URL}/api/record-intake`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "multipart/form-data",
              },
              data: {
                request: {
                  intakeTitle: mealTime,
                  foodName: food.name,
                  intakeKcal: food.kcal,
                  intakeCarbohydrate: food.carbohydrate,
                  intakeProtein: food.protein,
                  intakeFat: food.fat,
                },
                imageFile: detectingImage?.image,
              },
            });
            navigate("/");
          });
        }}
      >
        기록하기
      </NavigateButton>
    </HStack>
  );

  return <TemplateGrid header={header} main={main} footer={footer} />;
}

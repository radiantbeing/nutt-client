import { Stack } from "@chakra-ui/react";
import ChatBot from "../../components/ChatBot";
import Header from "../../components/Header";
import TemplateGrid from "../../layouts/TemplateGrid";
import ArticleHeading from "../../components/ArticleHeading";
import NavigationBar from "../../components/NavigationBar";
import { useEffect, useState } from "react";
import Meal from "../../interfaces/Meal";
import NutrientGrid from "./NutrientGrid";
import Loading from "../../components/Loading";
import MealTabs from "./MealTabs";

interface User {
  name: string;
  currentKcal: number;
  targetKcal: number;
  currentCarbohydrate: number;
  targetCarbohydrate: number;
  currentProtein: number;
  targetProtein: number;
  currentFat: number;
  targetFat: number;
}

export default function Home() {
  // States
  const [user, setUser] = useState<User>();
  const [breakfast, setBreakfast] = useState<Meal[]>();
  const [lunch, setLunch] = useState<Meal[]>();
  const [dinner, setDinner] = useState<Meal[]>();
  const [snack, setSnack] = useState<Meal[]>();

  // Side-effects
  useEffect(() => {
    setUser({
      name: "홍길동",
      currentKcal: 200,
      targetKcal: 1500,
      currentCarbohydrate: 20,
      targetCarbohydrate: 50,
      currentProtein: 20,
      targetProtein: 50,
      currentFat: 20,
      targetFat: 50,
    });
  }, []);

  useEffect(() => {
    const data: {
      breakfast: Meal[];
      lunch: Meal[];
      dinner: Meal[];
      snack: Meal[];
    } = {
      breakfast: [
        {
          date: "2023-05-17",
          time: "23:21",
          mealTime: "아침",
          foods: [
            {
              name: "샐러드",
              kcal: 200,
              carbohydrate: 20,
              protein: 10,
              fat: 5,
            },
            {
              name: "계란",
              kcal: 40,
              carbohydrate: 0,
              protein: 5,
              fat: 2,
            },
          ],
          img: "https://via.placeholder.com/150",
        },
      ],
      lunch: [
        {
          date: "2023-05-17",
          time: "23:21",
          mealTime: "점심",
          foods: [
            {
              name: "라면",
              kcal: 232,
              carbohydrate: 20,
              protein: 10,
              fat: 5,
            },
          ],
          img: "https://via.placeholder.com/150",
        },
        {
          date: "2023-05-17",
          time: "23:21",
          mealTime: "점심",
          foods: [
            {
              name: "도시락",
              kcal: 329,
              carbohydrate: 20,
              protein: 10,
              fat: 5,
            },
          ],
          img: "https://via.placeholder.com/150",
        },
      ],
      dinner: [
        {
          date: "2023-05-17",
          time: "23:21",
          mealTime: "저녁",
          foods: [
            {
              name: "햄버거",
              kcal: 600,
              carbohydrate: 20,
              protein: 10,
              fat: 5,
            },
          ],
          img: "https://via.placeholder.com/150",
        },
      ],
      snack: [],
    };
    setBreakfast(data.breakfast);
    setLunch(data.lunch);
    setDinner(data.dinner);
    setSnack(data.snack);
  }, []);

  // Pre-rendering
  if (!user) {
    return <Loading text="사용자 정보를 가져오는 중" />;
  }

  // Components
  const header = <Header isMoreMenuVisible>안녕하세요, {user.name}님.</Header>;

  const main = (
    <Stack spacing={4}>
      <ChatBot question="건강한 식단을 위한 팁을 알려줘." />
      <ArticleHeading text="2023년 03월 23일" />
      <NutrientGrid user={user} />
      <MealTabs
        breakfast={breakfast}
        lunch={lunch}
        dinner={dinner}
        snack={snack}
      />
    </Stack>
  );

  const footer = <NavigationBar />;

  return <TemplateGrid header={header} main={main} footer={footer} />;
}

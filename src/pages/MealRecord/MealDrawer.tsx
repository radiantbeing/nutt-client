import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
} from "@chakra-ui/react";
import ChatBot from "../../components/ChatBot";
import {
  ScannedPicture,
  TargetAchievement,
  NutrientAnalysisTable,
} from "../../components/NutrientAnalysis";

interface Food {
  name: string;
  kcal: number;
  carbohydrate: number;
  protein: number;
  fat: number;
}

interface Meal {
  date: string;
  time: string;
  img: string;
  info: {
    mealTime: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";
    foods: Food[];
  };
}

type MealDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  meal: Meal | null;
};

function MealDrawer({ isOpen, onClose, meal }: MealDrawerProps) {
  if (!meal) return null;
  const { date, img, info } = meal;
  const [year, month, day] = date.split("-");
  const question = `오늘은 ${info.foods
    .map((food) => food.name)
    .join(", ")}을 먹었어. 영양학적 측면에서 평가해줘.`;

  let mealTime = null;
  switch (info.mealTime) {
    case "BREAKFAST":
      mealTime = "아침";
      break;
    case "LUNCH":
      mealTime = "점심";
      break;
    case "DINNER":
      mealTime = "저녁";
      break;
    case "SNACK":
      mealTime = "간식";
      break;
  }

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          {year}년 {month}월 {day}일 {mealTime}
        </DrawerHeader>
        <DrawerBody>
          <Stack spacing={6} w="full" paddingTop={4} paddingBottom={4}>
            <ChatBot question={question} />
            <ScannedPicture src={img} />
            <TargetAchievement
              currentKcal={243}
              targetKcal={1500}
              currentCarbohydrate={23}
              targetCarbohydrate={200}
              currentProtein={50}
              targetProtein={200}
              currentFat={79}
              targetFat={200}
            />
            <NutrientAnalysisTable foods={info.foods} />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default MealDrawer;

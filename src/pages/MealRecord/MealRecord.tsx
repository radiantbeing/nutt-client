import {
  Button,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Stack,
  Text,
  Image,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  Center,
  Spinner,
  VStack,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import ChatBot from "../../components/ChatBot";
import Header from "../../components/Header";
import TemplateGrid from "../../layouts/TemplateGrid";
import {
  ScannedPicture,
  TargetAchievement,
  NutrientAnalysisTable,
} from "../../components/NutrientAnalysis";
import axios from "axios";

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

interface Meals {
  date: string;
  mealData: Meal[];
}

function Loading() {
  return (
    <Center boxSize="full">
      <VStack spacing={8}>
        <Spinner size="xl" />
        <Text>식단 기록을 가져오는 중</Text>
      </VStack>
    </Center>
  );
}

function LookupButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Button
      w="full"
      size="lg"
      fontWeight="medium"
      bgColor="green.500"
      color="white"
      leftIcon={<Search2Icon boxSize={4} />}
      _hover={{
        bgColor: "green.500",
      }}
      _active={{
        bgColor: "green.600",
      }}
      onClick={onClick}
    >
      조회
    </Button>
  );
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
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
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

function DateForm({
  month,
  year,
  onMonthChange,
  onYearChange,
}: {
  month: number;
  year: number;
  onMonthChange: (str: string, num: number) => void;
  onYearChange: (str: string, num: number) => void;
}) {
  return (
    <SimpleGrid as="form" columns={2} spacing={6}>
      <FormControl>
        <FormLabel>년</FormLabel>
        <NumberInput
          min={2023}
          value={year}
          max={new Date().getFullYear()}
          allowMouseWheel
          onChange={onYearChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>월</FormLabel>
        <NumberInput
          min={1}
          max={12}
          value={month}
          allowMouseWheel
          onChange={onMonthChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </SimpleGrid>
  );
}

export default function MealRecord() {
  // Hooks
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // States
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [meals, setMeals] = useState<Meals | null>(null);
  const [meal, setMeal] = useState<Meal | null>(null);

  // Side-effects
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_NUTT_API_URL}/api/search/date//${year}/${month}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => console.log(res.data.data));
    setMeals({
      date: "2023-05",
      mealData: [
        {
          date: "2023-05-19",
          time: "11:18",
          img: "https://via.placeholder.com/150",
          info: {
            mealTime: "BREAKFAST",
            foods: [
              {
                name: "깻잎",
                kcal: 200.0,
                carbohydrate: 60.0,
                protein: 30.0,
                fat: 50.0,
              },
            ],
          },
        },
        {
          date: "2023-05-19",
          time: "11:28",
          img: "https://via.placeholder.com/150",
          info: {
            mealTime: "LUNCH",
            foods: [
              {
                name: "제육볶음",
                kcal: 200.0,
                carbohydrate: 60.0,
                protein: 30.0,
                fat: 50.0,
              },
              {
                name: "계란찜",
                kcal: 200.0,
                carbohydrate: 60.0,
                protein: 30.0,
                fat: 50.0,
              },
            ],
          },
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pre-rendering
  if (meals === null) {
    return <Loading />;
  }

  // Components
  const header = <Header onPrevClick={() => navigation("/")}>식단 기록</Header>;

  const main = (
    <>
      <Stack spacing={4}>
        <ChatBot message="지금까지 기록한 식단들을 확인해보세요!" />
        <DateForm
          year={year}
          month={month}
          onYearChange={(_str: string, num: number) => setYear(num)}
          onMonthChange={(_str: string, num: number) => setMonth(num)}
        />
        <MealGallery
          meals={meals}
          onImageClick={(meal: Meal) => {
            setMeal(meal);
            onOpen();
          }}
        />
      </Stack>
      <MealDrawer isOpen={isOpen} onClose={onClose} meal={meal} />
    </>
  );

  const footer = (
    <LookupButton
      onClick={() => {
        axios({
          method: "get",
          url: `${process.env.REACT_APP_NUTT_API_URL}/api/search/date/${year}/${month}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }).then((res) => setMeals(res.data.data));
      }}
    />
  );

  return <TemplateGrid header={header} main={main} footer={footer} />;
}

function MealGallery({
  meals,
  onImageClick,
}: {
  meals: Meals;
  onImageClick: (meal: Meal) => void;
}) {
  return (
    <SimpleGrid columns={3}>
      {meals.mealData.map((meal) => {
        let mealTime = null;
        switch (meal.info.mealTime) {
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

        const date = new Date(meal.date);

        return (
          <Flex key={`${meal.date} ${meal.time}`} boxSize={"fit-content"}>
            <Image src={meal.img} onClick={() => onImageClick(meal)} />
            <Badge position="absolute">
              {date.getDate()}일 {mealTime}
            </Badge>
          </Flex>
        );
      })}
    </SimpleGrid>
  );
}

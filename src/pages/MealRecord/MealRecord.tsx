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
  AspectRatio,
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
import Meal from "../../interfaces/Meal";

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

function LookupButton() {
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
  const { mealTime, time, foods, date, img, nutritionRating } = meal;
  const [year, month, day] = date.split("-");
  const question = `오늘은 ${foods
    .map((food) => food.name)
    .join(", ")}을 먹었어. 영양학적 측면에서 평가해줘.`;

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
            <NutrientAnalysisTable foods={foods} />
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

function MealGalleryRow({
  date,
  meals,
  onImageClick,
}: {
  date: Date;
  meals: Meal[];
  onImageClick: (meal: Meal) => void;
}) {
  return (
    <>
      <Text fontSize="md">
        {date.getMonth() + 1}월 {date.getDate()}일
      </Text>
      <SimpleGrid columns={3} spacing={1}>
        {meals.map((meal, index) => (
          <AspectRatio ratio={1}>
            <Image
              key={meal.time}
              src={meal.img}
              onClick={() => onImageClick(meal)}
            />
          </AspectRatio>
        ))}
      </SimpleGrid>
    </>
  );
}

function MealGallery({
  meals,
  onImageClick,
}: {
  meals: Meal[];
  onImageClick: (meal: Meal) => void;
}) {
  return (
    <Stack>
      <MealGalleryRow
        date={new Date("2023-05-17")}
        meals={meals}
        onImageClick={onImageClick}
      />
    </Stack>
  );
}

export default function MealRecord() {
  // Hooks
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // States
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [meal, setMeal] = useState<Meal | null>(null);

  // Side-effects
  useEffect(() => {
    const fetchedMeals: Meal[] = [
      {
        date: "2023-05-17",
        time: "12:34",
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
        nutritionRating: "나쁨",
      },
      {
        date: "2023-05-10",
        time: "05:43",
        mealTime: "아침",
        foods: [
          {
            name: "피자",
            kcal: 600,
            carbohydrate: 20,
            protein: 10,
            fat: 5,
          },
        ],
        img: "https://via.placeholder.com/150",
        nutritionRating: "좋음",
      },
      {
        date: "2023-05-10",
        time: "02:43",
        mealTime: "점심",
        foods: [
          {
            name: "샐러드",
            kcal: 600,
            carbohydrate: 20,
            protein: 10,
            fat: 5,
          },
        ],
        img: "https://via.placeholder.com/150",
        nutritionRating: "좋음",
      },
    ];
    const sortedMeals: Meal[] = fetchedMeals.sort((a, b) => {
      const dateA: any = new Date(`${a.date}T${a.time}`);
      const dateB: any = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });
    setMeals(sortedMeals);
  }, []);

  // Pre-rendering
  if (meals.length === 0) {
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

  const footer = <LookupButton />;

  return <TemplateGrid header={header} main={main} footer={footer} />;
}

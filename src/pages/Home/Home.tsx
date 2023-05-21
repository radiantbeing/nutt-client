import { CheckIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Center,
  Heading,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
  Icon,
  Box,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import ChatBot from "../../components/ChatBot";
import Header from "../../components/Header";
import TemplateGrid from "../../layouts/TemplateGrid";
import sampleFood from "../../assets/sample_food.jpg";
import ArticleHeading from "../../components/ArticleHeading";
import { BsFire } from "react-icons/bs";
import { BiBowlRice } from "react-icons/bi";
import { GiJellyBeans } from "react-icons/gi";
import { IconType } from "react-icons/lib/esm/iconBase";
import NavigationBar from "../../components/NavigationBar";
import { TbMeat } from "react-icons/tb";
import { useEffect, useState } from "react";
import { m } from "framer-motion";
import Meal from "../../interfaces/Meal";

type NutrientCardProps = {
  name: string;
  value: number;
  maxValue: number;
  unit: string;
  bgGradient?: string;
  color?: string;
  icon: IconType;
};

function NutrientCard(props: NutrientCardProps) {
  return (
    <Box
      w="full"
      bgGradient={props.bgGradient}
      color={props.color}
      paddingTop={4}
      paddingBottom={4}
      paddingStart={4}
      paddingEnd={4}
      borderRadius="md"
      boxShadow="base"
    >
      <Stack spacing={3}>
        <HStack>
          <Icon
            as={props.icon}
            boxSize={5}
            color={props.bgGradient ? "white" : "green.500"}
          />
          <Heading size="sm">{props.name}</Heading>
        </HStack>
        <Text as="span" fontWeight="semibold">
          {props.value}
          <Text as="span" fontWeight="normal">
            {`/${props.maxValue}${props.unit}`}
          </Text>
        </Text>
      </Stack>
    </Box>
  );
}

function Loading() {
  return (
    <Center boxSize="full">
      <VStack spacing={8}>
        <Spinner size="xl" />
        <Text>사용자 정보를 가져오는 중</Text>
      </VStack>
    </Center>
  );
}

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

function MealTab({ meals }: { meals?: Meal[] }) {
  if (meals?.length === 0 || meals === undefined) {
    return (
      <TabPanel paddingLeft={0} paddingRight={0}>
        <Card variant="outline">
          <CardBody>
            <Center gap={4} color="gray.400">
              <CheckIcon />
              <Text>기록된 식사가 없습니다</Text>
            </Center>
          </CardBody>
        </Card>
      </TabPanel>
    );
  }
  return (
    <TabPanel paddingLeft={0} paddingRight={0}>
      {meals.map((meal, index) => (
        <Card key={index} variant="outline" marginBottom={2}>
          <CardBody p={0}>
            <HStack padding={[0, 4]}>
              <AspectRatio ratio={1} width={["35%", "25%"]}>
                <Image src={meal.img} alt="Food" borderRadius={[0, 8]} />
              </AspectRatio>
              <Center width="65%">
                <Stack spacing={[4, 5]}>
                  <HStack>
                    {meal.foods.map((food, index) => (
                      <Badge key={index} fontSize={["xs", "sm"]}>
                        #{food.name}
                      </Badge>
                    ))}
                  </HStack>
                  <HStack spacing={[6, 14]}>
                    <Stack spacing={[2, 3]}>
                      <Heading size={["sm", "md"]}>섭취 칼로리</Heading>
                      <Text fontSize={["sm", "lg"]}>
                        {meal.foods.reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue.kcal,
                          0
                        )}
                        kcal
                      </Text>
                    </Stack>
                    <Stack spacing={[2, 3]}>
                      <Heading size={["sm", "md"]}>영양 균형</Heading>
                      <Text
                        fontSize={["sm", "lg"]}
                        color={
                          meal.nutritionRating === "좋음"
                            ? "green.400"
                            : meal.nutritionRating === "보통"
                            ? "yellow.400"
                            : "red.400"
                        }
                        fontWeight="semibold"
                      >
                        {meal.nutritionRating}
                      </Text>
                    </Stack>
                  </HStack>
                </Stack>
              </Center>
            </HStack>
          </CardBody>
        </Card>
      ))}
    </TabPanel>
  );
}

function MealTabs({
  breakfast,
  lunch,
  dinner,
  snack,
}: {
  breakfast?: Meal[];
  lunch?: Meal[];
  dinner?: Meal[];
  snack?: Meal[];
}) {
  return (
    <Tabs variant="soft-rounded" colorScheme="green" size="sm">
      <TabList>
        <Tab>아침</Tab>
        <Tab>점심</Tab>
        <Tab>저녁</Tab>
        <Tab>간식</Tab>
      </TabList>
      <TabPanels>
        <MealTab meals={breakfast} />
        <MealTab meals={lunch} />
        <MealTab meals={dinner} />
        <MealTab meals={snack} />
      </TabPanels>
    </Tabs>
  );
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
          nutritionRating: "좋음",
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
          nutritionRating: "보통",
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
          nutritionRating: "보통",
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
          nutritionRating: "나쁨",
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
    return <Loading />;
  }

  // Components
  const header = <Header isMoreMenuVisible>안녕하세요, {user.name}님.</Header>;

  const main = (
    <Stack spacing={4}>
      <ChatBot question="건강한 식단을 위한 팁을 알려줘." />
      <ArticleHeading text="2023년 03월 23일" />
      <SimpleGrid w="full" padding={1} columns={2} spacing={4}>
        <NutrientCard
          icon={BsFire}
          name="열량"
          value={user.currentKcal}
          maxValue={user.targetKcal}
          unit="kcal"
          bgGradient={"linear(to-r, green.400, green.500)"}
          color="white"
        />
        <NutrientCard
          icon={BiBowlRice}
          name="탄수화물"
          value={user.currentCarbohydrate}
          maxValue={user.targetCarbohydrate}
          unit="g"
        />
        <NutrientCard
          icon={GiJellyBeans}
          name="단백질"
          value={user.currentProtein}
          maxValue={user.targetProtein}
          unit="g"
        />
        <NutrientCard
          icon={TbMeat}
          name="지방"
          value={user.currentFat}
          maxValue={user.targetFat}
          unit="g"
        />
      </SimpleGrid>
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

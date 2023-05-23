import { TimeIcon } from "@chakra-ui/icons";
import {
  TabPanel,
  Card,
  CardBody,
  Center,
  HStack,
  Stack,
  Badge,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  Text,
  Image,
} from "@chakra-ui/react";
import Meal from "../../interfaces/Meal";

function MealTab({ meals }: { meals?: Meal[] }) {
  if (meals?.length === 0 || meals === undefined) {
    return (
      <TabPanel paddingLeft={0} paddingRight={0}>
        <Card variant="outline">
          <CardBody>
            <Center gap={4} color="gray.400">
              <TimeIcon />
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
            <HStack spacing={7}>
              <Image
                src={meal.img}
                alt="Food"
                width="50%"
                height="120px"
                objectFit="cover"
                borderRadius={[0, 8]}
              />
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
                  <Stack spacing={[2, 3]}></Stack>
                </HStack>
              </Stack>
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

export default MealTabs;

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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import ChatBot from "../../components/ChatBot";
import Header from "../../components/Header";
import TemplateGrid from "../../layouts/TemplateGrid";
import FoodNutrient from "../../interfaces/Food";
import {
  ScannedPicture,
  TargetAchievement,
  NutrientAnalysisTable,
} from "../../components/NutrientAnalysis";
import Food from "../../interfaces/Food";
import axios from "axios";

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

type FoodDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  foods: FoodNutrient[];
};

function FoodDrawer({ isOpen, onClose, foods }: FoodDrawerProps) {
  const question = `오늘은 ${foods
    .map((food) => food.name)
    .join(", ")}을 먹었어. 영양학적 측면에서 평가해줘.`;

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">1월 7일 아침</DrawerHeader>
        <DrawerBody>
          <Stack spacing={6} w="full" paddingTop={4} paddingBottom={4}>
            <ChatBot question={question} />
            <ScannedPicture src="https://www.cj.co.kr/images/theKitchen/PHON/0000001946/0000007627/0000001946.jpg" />
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default function MealRecord() {
  // Hooks
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // States
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  // Components
  const header = <Header onPrevClick={() => navigation("/")}>식단 기록</Header>;

  const main = (
    <>
      <Stack spacing={4}>
        <ChatBot message="지금까지 기록한 식단들을 확인해보세요!" />
        <SimpleGrid as="form" columns={2} spacing={6}>
          <FormControl>
            <FormLabel>년</FormLabel>
            <NumberInput
              min={2023}
              value={year}
              max={new Date().getFullYear()}
              allowMouseWheel
              onChange={(str, num) => setYear(num)}
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
              onChange={(str, num) => setMonth(num)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </SimpleGrid>
        <Stack>
          <Text fontSize="md">1월 7일</Text>
          <SimpleGrid columns={3} spacing={1}>
            <AspectRatio ratio={1}>
              <Image
                src="http://placekitten.com/500/200"
                alt="1월 7일 아침"
                onClick={onOpen}
              />
            </AspectRatio>
          </SimpleGrid>
        </Stack>
      </Stack>
      <FoodDrawer isOpen={isOpen} onClose={onClose} foods={[]} />
    </>
  );

  const footer = <LookupButton />;

  return <TemplateGrid header={header} main={main} footer={footer} />;
}

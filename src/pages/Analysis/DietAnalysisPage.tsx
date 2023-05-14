import {
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Box,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import ChatBot from "../../components/ChatBot";
import NavigateButton from "../../components/NavigateButton";
import TemplateGrid from "../../layouts/TemplateGrid";
import ArticleHeading from "../../components/ArticleHeading";
import { useEffect, useState } from "react";
import axios from "axios";
import scanSample from "../../assets/scan_sample.jpg";

interface FoodNutrient {
  name: string;
  kcal: number;
  carbohydrate: number;
  protein: number;
  fat: number;
}

export default function DietAnalysisPage() {
  const [scannedFoodNutrients, setScannedFoodNutrients] = useState<
    FoodNutrient[]
  >([
    { name: "계란찜", kcal: 67.0, carbohydrate: 3.0, protein: 7.0, fat: 3.0 },
  ]);

  useEffect(() => {
    // setScannedFoodNutrients([
    //   { name: "계란찜", kcal: 67.0, carbohydrate: 3.0, protein: 7.0, fat: 3.0 },
    // ]);
    axios
      .get("http://219.255.1.253:8080/api/foodInfo/계란찜")
      .then((res) => setScannedFoodNutrients([res.data.data]));
  }, []);

  const header = <Header>식단 분석 결과</Header>;

  const main = (
    <Stack spacing={6} w="full">
      <ChatBot
        question={`오늘은 ${scannedFoodNutrients[0].name}을 먹었어. 영양학적 측면에서 평가해줘.`}
      />
      <Stack spacing={3}>
        <ArticleHeading text="인식 결과" />
        <Box border="1px" borderColor="gray.100" borderRadius="lg" padding={2}>
          <Image
            src={scanSample}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
        </Box>
      </Stack>
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
      {/* <Stack spacing={3}>
        <ArticleHeading text="목표 영양소 달성량" />
        <Stack
          spacing={3}
          border="1px"
          borderColor="gray.200"
          borderRadius={8}
          padding={4}
        >
          <Stack>
            <Flex justify="space-between">
              <Text fontSize="sm">칼로리</Text>
              <Text fontSize="sm" color="gray.400">
                100/500kcal
              </Text>
            </Flex>
            <Progress colorScheme="green" size="xs" value={20} />
          </Stack>
          <Stack>
            <Flex justify="space-between">
              <Text fontSize="sm">탄수화물</Text>
              <Text fontSize="sm" color="gray.400">
                100/500g
              </Text>
            </Flex>
            <Progress colorScheme="green" size="xs" value={20} />
          </Stack>
          <Stack>
            <Flex justify="space-between">
              <Text fontSize="sm">단백질</Text>
              <Text fontSize="sm" color="gray.400">
                100/500g
              </Text>
            </Flex>
            <Progress colorScheme="green" size="xs" value={20} />
          </Stack>
          <Stack>
            <Flex justify="space-between">
              <Text fontSize="sm">지방</Text>
              <Text fontSize="sm" color="gray.400">
                100/500g
              </Text>
            </Flex>
            <Progress colorScheme="green" size="xs" value={20} />
          </Stack>
        </Stack>
      </Stack> */}
      <Stack spacing={3}>
        <ArticleHeading text="영양 성분 분석" />
        <TableContainer
          border="1px"
          borderColor="gray.200"
          borderRadius={8}
          padding={2}
        >
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>이름</Th>
                <Th isNumeric>칼로리</Th>
                <Th isNumeric>탄수화물</Th>
                <Th isNumeric>단백질</Th>
                <Th isNumeric>지방</Th>
              </Tr>
            </Thead>
            <Tbody>
              {scannedFoodNutrients.map((foodNutrient) => {
                return (
                  <Tr key={foodNutrient.name}>
                    <Td>{foodNutrient.name}</Td>
                    <Td isNumeric>{foodNutrient.kcal}</Td>
                    <Td isNumeric>{foodNutrient.carbohydrate}</Td>
                    <Td isNumeric>{foodNutrient.protein}</Td>
                    <Td isNumeric>{foodNutrient.fat}</Td>
                  </Tr>
                );
              })}
            </Tbody>
            {/* <Tfoot>
              <Tr>
                <Th>합계</Th>
                <Th isNumeric>67</Th>
                <Th isNumeric>3</Th>
                <Th isNumeric>7</Th>
                <Th isNumeric>3</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );

  const footer = (
    <HStack boxSize="full">
      <NavigateButton onClick={() => {}} variant="outline">
        재촬영
      </NavigateButton>
      <NavigateButton onClick={() => {}}>기록하기</NavigateButton>
    </HStack>
  );

  return <TemplateGrid header={header} main={main} footer={footer} />;
}

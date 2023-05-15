import {
  Stack,
  Flex,
  Progress,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  TableContainer,
  Table,
  Image,
  Box,
  Text,
  AspectRatio,
  TableCaption,
} from "@chakra-ui/react";
import FoodNutrient from "../interfaces/FoodNutrients";
import ArticleHeading from "./ArticleHeading";

type ScannedPictureProps = {
  src: string;
};

type NutrientProgressBarProps = {
  name: string;
  current: number;
  target: number;
};

type NutrientAnalysisTableProps = {
  foods: FoodNutrient[];
};

export function ScannedPicture({ src }: ScannedPictureProps) {
  return (
    <Stack spacing={3}>
      <ArticleHeading text="인식 결과" />
      <Box border="1px" borderColor="gray.100" borderRadius="lg" padding={2}>
        <AspectRatio ratio={4 / 3}>
          <Image src={src} borderRadius="lg" />
        </AspectRatio>
      </Box>
    </Stack>
  );
}

export function NutrientProgressBar({
  name,
  current,
  target,
}: NutrientProgressBarProps) {
  return (
    <Stack>
      <Flex justify="space-between">
        <Text fontSize="sm">{name}</Text>
        <Text fontSize="sm" color="gray.400">
          {current}/{target}kcal
        </Text>
      </Flex>
      <Progress
        colorScheme="green"
        size="xs"
        value={Math.floor((current / target) * 100)}
      />
    </Stack>
  );
}

export function TargetAchievement() {
  return (
    <Stack spacing={3}>
      <ArticleHeading text="목표 영양소 달성량" />
      <Stack
        spacing={3}
        border="1px"
        borderColor="gray.200"
        borderRadius={8}
        padding={4}
      >
        <NutrientProgressBar name="칼로리" current={499} target={500} />
        <NutrientProgressBar name="탄수화물" current={12} target={500} />
        <NutrientProgressBar name="단백질" current={12} target={500} />
        <NutrientProgressBar name="지방" current={12} target={500} />
      </Stack>
    </Stack>
  );
}

export function NutrientAnalysisTable({ foods }: NutrientAnalysisTableProps) {
  let sum = {
    kcal: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
  };

  const thead = (
    <Thead>
      <Tr>
        <Th>이름</Th>
        <Th isNumeric>열량</Th>
        <Th isNumeric>탄수화물</Th>
        <Th isNumeric>단백질</Th>
        <Th isNumeric>지방</Th>
      </Tr>
    </Thead>
  );

  const tbody = (
    <Tbody>
      {foods.map((food) => {
        sum.kcal += food.kcal;
        sum.carbohydrate += food.carbohydrate;
        sum.protein += food.protein;
        sum.fat += food.fat;
        return (
          <Tr key={food.name}>
            <Td>{food.name}</Td>
            <Td isNumeric>{food.kcal}</Td>
            <Td isNumeric>{food.carbohydrate}</Td>
            <Td isNumeric>{food.protein}</Td>
            <Td isNumeric>{food.fat}</Td>
          </Tr>
        );
      })}
    </Tbody>
  );

  const tfoot = (
    <Tfoot>
      <Tr>
        <Th>합계</Th>
        <Th isNumeric>{sum.kcal}</Th>
        <Th isNumeric>{sum.carbohydrate}</Th>
        <Th isNumeric>{sum.protein}</Th>
        <Th isNumeric>{sum.fat}</Th>
      </Tr>
    </Tfoot>
  );

  return (
    <Stack spacing={3}>
      <ArticleHeading text="영양 성분 분석" />
      <TableContainer
        border="1px"
        borderColor="gray.200"
        borderRadius={8}
        padding={2}
      >
        <Table variant="simple" size="sm">
          {thead}
          {tbody}
          {tfoot}
        </Table>
      </TableContainer>
      <Text fontSize="xs" color="gray.500" paddingStart={1}>
        단위: 열량(kcal), 탄수화물(g), 단백질(g), 지방(g)
      </Text>
    </Stack>
  );
}

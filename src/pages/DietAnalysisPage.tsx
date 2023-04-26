import {
  HStack,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Flex,
} from "@chakra-ui/react";
import Header from "../components/Header";
import ChatBot from "../components/ChatBot";
import NavigateButton from "../components/NavigateButton";
import TemplateGrid from "../layouts/TemplateGrid";
import ArticleHeading from "../components/ArticleHeading";

export default function DietAnalysisPage() {
  const header = <Header>식단 분석 결과</Header>;

  const main = (
    <Stack spacing={8} w="full">
      <ChatBot question="오늘은 우동을 먹었어. 영양학적 측면에서 평가해줘." />
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
      <Stack spacing={3}>
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
      </Stack>
      <Stack spacing={3}>
        <ArticleHeading text="영양 성분 분석" />
        <TableContainer
          border="1px"
          borderColor="gray.200"
          borderRadius={8}
          padding={2}
        >
          <Table variant="simple" size="md">
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
              <Tr>
                <Td>우동</Td>
                <Td isNumeric>235</Td>
                <Td isNumeric>40</Td>
                <Td isNumeric>40</Td>
                <Td isNumeric>40</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>합계</Th>
                <Th isNumeric>235</Th>
                <Th isNumeric>40</Th>
                <Th isNumeric>40</Th>
                <Th isNumeric>40</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );

  const footer = (
    <HStack boxSize="full">
      <NavigateButton to="/home" variant="outline">
        재촬영
      </NavigateButton>
      <NavigateButton to="/home">기록하기</NavigateButton>
    </HStack>
  );

  return <TemplateGrid header={header} main={main} footer={footer} />;
}

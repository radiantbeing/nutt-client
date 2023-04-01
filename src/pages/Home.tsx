import { CheckIcon, TriangleUpIcon } from "@chakra-ui/icons";
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
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  StatArrow,
  StatGroup,
  Flex,
  VStack,
  Box,
  AspectRatio,
} from "@chakra-ui/react";
import ChatBot from "../components/ChatBot";
import Header from "../components/Header";
import NavigateButton from "../components/NavigateButton";
import TemplateGrid from "../layouts/TemplateGrid";
import sampleFood from "../assets/sample_food.jpg";

export default function Home() {
  const header = <Header>홍길동님</Header>;

  const main = (
    <Stack spacing={4}>
      <ChatBot message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus, ante id euismod auctor, massa velit congue ex, vel tempus orci metus id ipsum. Proin vel tristique ante, vel sollicitudin justo." />
      <Text fontSize="lg">2023년 03월 23일</Text>
      <SimpleGrid w="full" padding={1} columns={2} spacing={4}>
        <Card
          w="full"
          bgGradient="linear(to-r, green.400, green.500)"
          color="white"
        >
          <CardBody>
            <Stack spacing={3}>
              <Heading size="sm">칼로리</Heading>
              <Text as="span" fontWeight="semibold">
                235
                <Text as="span" fontWeight="normal">
                  /1,500{` `}kcal
                </Text>
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card w="full">
          <CardBody>
            <Stack spacing={3}>
              <Heading size="sm">탄수화물</Heading>
              <Text as="span" fontWeight="semibold">
                235
                <Text as="span" fontWeight="normal" color="gray.500">
                  /300{` `}g
                </Text>
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card w="full">
          <CardBody>
            <Stack spacing={3}>
              <Heading size="sm">단백질</Heading>
              <Text as="span" fontWeight="semibold">
                235
                <Text as="span" fontWeight="normal" color="gray.500">
                  /300{` `}g
                </Text>
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card w="full">
          <CardBody>
            <Stack spacing={3}>
              <Heading size="sm">지방</Heading>
              <Text as="span" fontWeight="semibold">
                235
                <Text as="span" fontWeight="normal" color="gray.500">
                  /300{` `}g
                </Text>
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </SimpleGrid>
      <Tabs variant="soft-rounded" colorScheme="green" size="sm">
        <TabList>
          <Tab>아침</Tab>
          <Tab>점심</Tab>
          <Tab>저녁</Tab>
        </TabList>
        <TabPanels>
          <TabPanel paddingLeft={0} paddingRight={0}>
            <Card variant="outline">
              <CardBody p={0}>
                <HStack padding={[0, 4]}>
                  <AspectRatio ratio={1} width="35%">
                    <Image src={sampleFood} alt="Food" borderRadius={[0, 8]} />
                  </AspectRatio>
                  <Center width="65%">
                    <Stack spacing={[4, 5]}>
                      <HStack>
                        <Badge fontSize={["xs", "sm"]}>#우동</Badge>
                        <Badge fontSize={["xs", "sm"]} colorScheme="green">
                          #김밥
                        </Badge>
                        <Badge fontSize={["xs", "sm"]} colorScheme="purple">
                          #만두
                        </Badge>
                      </HStack>
                      <HStack spacing={6}>
                        <Stack spacing={[2, 3]}>
                          <Heading size={["sm", "md"]}>섭취 칼로리</Heading>
                          <Text fontSize={["sm", "lg"]}>245kcal</Text>
                        </Stack>
                        <Stack spacing={[2, 3]}>
                          <Heading size={["sm", "md"]}>영양 균형</Heading>
                          <Text
                            fontSize={["sm", "lg"]}
                            color="green.400"
                            fontWeight="semibold"
                          >
                            좋음
                          </Text>
                        </Stack>
                      </HStack>
                    </Stack>
                  </Center>
                </HStack>
              </CardBody>
            </Card>
          </TabPanel>
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
        </TabPanels>
      </Tabs>
    </Stack>
  );

  const footer = <NavigateButton to="/home">버튼</NavigateButton>;

  return <TemplateGrid header={header} main={main} footer={footer} />;
}

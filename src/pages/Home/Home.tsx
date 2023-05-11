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
  VStack,
  LinkBox,
  Icon,
  Box,
  keyframes,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import ChatBot from "../../components/ChatBot";
import Header from "../../components/Header";
import TemplateGrid from "../../layouts/TemplateGrid";
import sampleFood from "../../assets/sample_food.jpg";
import ArticleHeading from "../../components/ArticleHeading";
import { Link as RouterLink } from "react-router-dom";
import { BsFire } from "react-icons/bs";
import { BiBowlRice } from "react-icons/bi";
import { TbMeat, TbPhotoSensor2 } from "react-icons/tb";
import { GiJellyBeans } from "react-icons/gi";
import { ImHome } from "react-icons/im";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { IconType } from "react-icons/lib/esm/iconBase";
import { FC } from "react";

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

const RecordButton: FC = () => {
  const breathe = keyframes`
      0% {
        box-shadow: 0 0 0 7px rgb(255, 212, 206);
      }
      50% {
        box-shadow: 0 0 0 5px rgb(255, 212, 206)
      }
      100% {
        box-shadow: 0 0 0 7px rgb(255, 212, 206);
      }
     `;
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          boxSize="32px"
          minWidth={0}
          borderRadius="full"
          bg="#ff9386"
          animation={`${breathe} 2s ease-in-out infinite`}
          _hover={{ background: "#ff9386" }}
          _active={{ background: "#f77a6a" }}
        />
      </PopoverTrigger>
      <PopoverContent width={200}>
        <PopoverArrow />
        <PopoverHeader>
          <Text as="b">촬영 모드</Text>
        </PopoverHeader>
        <PopoverBody padding={0}>
          <VStack>
            <LinkBox
              width="full"
              padding={4}
              display="flex"
              gap={3}
              alignItems="center"
              as={RouterLink}
              to="/realtime-recognition"
              _hover={{ backgroundColor: "gray.100" }}
              _active={{ backgroundColor: "gray.200" }}
              justifyContent="center"
              fontWeight="medium"
            >
              <Icon as={TbPhotoSensor2} boxSize={6} color="green.500" />
              <Text display="inline">실시간 인식 모드</Text>
            </LinkBox>
            <LinkBox
              width="full"
              padding={4}
              display="flex"
              gap={3}
              alignItems="center"
              as={RouterLink}
              to="/photo-recognition"
              _hover={{ backgroundColor: "gray.200" }}
              justifyContent="center"
              fontWeight="medium"
            >
              <Icon as={MdOutlinePhotoCamera} boxSize={6} color="green.500" />
              <Text display="inline">사진 인식 모드</Text>
            </LinkBox>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default function Home() {
  const header = <Header>홍길동님</Header>;

  const main = (
    <Stack spacing={4}>
      <ChatBot question="오늘 아침엔 샐러드를 먹었어. 영양학적 측면에서 평가해줘." />
      <ArticleHeading text="2023년 03월 23일" />
      <SimpleGrid w="full" padding={1} columns={2} spacing={4}>
        <NutrientCard
          icon={BsFire}
          name="칼로리"
          value={200}
          maxValue={1500}
          unit="kcal"
          bgGradient={"linear(to-r, green.400, green.500)"}
          color="white"
        />
        <NutrientCard
          icon={BiBowlRice}
          name="탄수화물"
          value={200}
          maxValue={500}
          unit="g"
        />
        <NutrientCard
          icon={GiJellyBeans}
          name="단백질"
          value={200}
          maxValue={500}
          unit="g"
        />
        <NutrientCard
          icon={TbMeat}
          name="지방"
          value={200}
          maxValue={500}
          unit="g"
        />
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
                  <AspectRatio ratio={1} width={["35%", "25%"]}>
                    <Image src={sampleFood} alt="Food" borderRadius={[0, 8]} />
                  </AspectRatio>
                  <Center width="65%">
                    <Stack spacing={[4, 5]}>
                      <HStack>
                        <Badge fontSize={["xs", "sm"]}>#샐러드</Badge>
                      </HStack>
                      <HStack spacing={[6, 14]}>
                        <Stack spacing={[2, 3]}>
                          <Heading size={["sm", "md"]}>섭취 칼로리</Heading>
                          <Text fontSize={["sm", "lg"]}>200kcal</Text>
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

  const footer = (
    <HStack
      justify="space-around"
      borderTop="1px"
      borderColor="gray.100"
      paddingTop={5}
      paddingStart={5}
      paddingEnd={5}
    >
      <LinkBox as={RouterLink} to="/info">
        <VStack>
          <Icon as={ImHome} />
          <Text fontSize="sm" fontWeight="semibold">
            정보
          </Text>
        </VStack>
      </LinkBox>
      <RecordButton />
      <LinkBox as={RouterLink} to="/chat">
        <VStack color="gray.300">
          <Icon as={BsFillChatLeftTextFill} />
          <Text fontSize="sm" fontWeight="semibold">
            채팅
          </Text>
        </VStack>
      </LinkBox>
    </HStack>
  );

  return <TemplateGrid header={header} main={main} footer={footer} />;
}

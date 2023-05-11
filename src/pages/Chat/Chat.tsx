import {
  Stack,
  HStack,
  Flex,
  FormControl,
  Input,
  IconButton,
  Icon,
  LinkBox,
  VStack,
  Text,
  Button,
  keyframes,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FC } from "react";
import Header from "../../components/Header";
import TemplateGrid from "../../layouts/TemplateGrid";
import { AiOutlineSend } from "react-icons/ai";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { TbPhotoSensor2 } from "react-icons/tb";
import NavigationBar from "../../components/NavigationBar";

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
              to="/home/record"
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
              to="/home/record"
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

type MessageProps = {
  role: "sender" | "receiver";
  text: string;
};

const Message: FC<MessageProps> = ({ role, text }) => {
  const bgColor = role === "sender" ? "green.500" : "gray.100";
  const color = role === "sender" ? "white" : "black";
  return (
    <Flex
      maxWidth="90%"
      paddingTop={2}
      paddingBottom={2}
      paddingStart={3}
      paddingEnd={3}
      color={color}
      backgroundColor={bgColor}
      borderRadius="lg"
      wordBreak="break-all"
      alignSelf={role === "sender" ? "end" : "start"}
    >
      {text}
    </Flex>
  );
};

const Chat: FC = () => {
  const navigate = useNavigate();

  const header = <Header onPrevClick={() => navigate("/")}>채팅</Header>;

  const main = (
    <Flex boxSize="full" direction="column" justifyContent="space-between">
      <Stack spacing={5} overflowY="auto">
        <Message role="receiver" text="안녕하세요. 무엇을 도와드릴까요?" />
        <Message role="sender" text="안녕하세요." />
      </Stack>
      <FormControl paddingTop={3}>
        <HStack spacing={2}>
          <Input placeholder="메세지를 입력하세요" autoComplete="off" />
          <IconButton
            colorScheme="green"
            aria-label="Send Message"
            icon={<AiOutlineSend />}
          />
        </HStack>
      </FormControl>
    </Flex>
  );

  const footer = <NavigationBar />;

  return <TemplateGrid header={header} main={main} footer={footer} />;
};

export default Chat;

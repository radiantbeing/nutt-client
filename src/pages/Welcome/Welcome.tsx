import {
  Center,
  VStack,
  HStack,
  Heading,
  Image,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Icon,
  Text,
  OrderedList,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import TemplateGrid from "../../layouts/TemplateGrid";
import NavigateButton from "../../components/NavigateButton";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { IoShareOutline } from "react-icons/io5";
import { AiOutlineMore } from "react-icons/ai";

function PWAGuideModal() {
  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <NavigateButton onClick={onOpen}>시작하기</NavigateButton>

      <Modal isOpen={isOpen} onClose={onClose} size={"xs"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>PWA 활성화 안내</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Nutt는 PWA에 최적화되어 있습니다. PWA는 앱처럼 설치가 가능하며,
              빠른 속도와 사용자 경험이 최적화되어 있습니다. 다음 단계를 따라
              PWA를 활성화해보세요.
            </Text>
            <br />
            <Text as="b">Safari</Text>
            <OrderedList>
              <ListItem>
                Safari 도구 모음의 <Icon as={IoShareOutline} />을 누릅니다.
              </ListItem>
              <ListItem>
                <Text as="b">홈 화면에 추가</Text>를 눌러 바로가기를 추가합니다.
              </ListItem>
              <ListItem>홈 화면에 Nutt를 실행합니다.</ListItem>
            </OrderedList>
            <br />
            <Text as="b">Chrome</Text>
            <OrderedList>
              <ListItem>
                Chrome 도구 모음의 <Icon as={AiOutlineMore} />을 누릅니다.
              </ListItem>
              <ListItem>
                <Text as="b">홈 화면에 추가</Text>를 눌러 바로가기를 추가합니다.
              </ListItem>
              <ListItem>
                홈 화면에 생성된 아이콘을 눌러 Nutt를 이용합니다.
              </ListItem>
            </OrderedList>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => {
                onClose();
                if (window.matchMedia("(display-mode: standalone)").matches) {
                  navigate("/signup");
                } else {
                  const id = "test-toast";
                  !toast.isActive(id) &&
                    toast({
                      id,
                      title: "PWA 활성화 필요",
                      description: "PWA로 Nutt를 실행해주세요.",
                      position: "top",
                      status: "warning",
                      duration: 9000,
                      isClosable: true,
                    });
                }
              }}
            >
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function Welcome() {
  const header = <Header color="white">반갑습니다.</Header>;

  const main = (
    <Box boxSize="full">
      <Center boxSize="full">
        <VStack align="flex-start" spacing={4}>
          <Heading size="sm" fontWeight="bold" color="white">
            스마트한 AI 식단 관리
          </Heading>
          <HStack spacing={6}>
            <Image src={logo} boxSize={24} />
            <Heading size="2xl" color="white">
              Nutt
            </Heading>
          </HStack>
        </VStack>
      </Center>
    </Box>
  );

  const footer = <PWAGuideModal />;

  return <TemplateGrid header={header} main={main} footer={footer} isWelcome />;
}

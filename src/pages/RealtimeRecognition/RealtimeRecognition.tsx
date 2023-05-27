import { Button, Icon, Spacer, Stack, useToast } from "@chakra-ui/react";
import { RiQrScan2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ChatBot from "../../components/ChatBot";
import Header from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";
import TemplateGrid from "../../layouts/TemplateGrid";
import RealtimeDetector from "./RealtimeDetector";

const RealtimeRecognition = () => {
  const navigate = useNavigate();
  const toast = useToast();
  // Components
  const header = (
    <Header onPrevClick={() => navigate("/")}>실시간 인식 모드</Header>
  );

  const main = (
    <Stack spacing={4} height="full">
      <ChatBot message="식단을 촬영하면 구성 음식을 자동으로 인식합니다." />
      <RealtimeDetector />
      <Spacer />
      <Button
        type="submit"
        colorScheme="green"
        size="lg"
        leftIcon={<Icon as={RiQrScan2Line} />}
        onClick={() => {
          // TODO: 모델 성능 개선 시, 인식 후 처리 로직 추가
          if (!toast.isActive("realtime-error")) {
            toast({
              id: "realtime-error",
              title: "음식을 인식하지 못했습니다",
              description: "위치 이동 후 다시 시도해주세요.",
              status: "warning",
              duration: 3000,
              position: "top",
            });
          }
        }}
      >
        인식 종료
      </Button>
    </Stack>
  );

  const footer = <NavigationBar />;

  return <TemplateGrid header={header} main={main} footer={footer} />;
};

export default RealtimeRecognition;

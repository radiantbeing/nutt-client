import { Stack, FormControl, FormLabel, VStack } from "@chakra-ui/react";
import { CardButton } from "../components/Button";
import ChatBot from "../components/ChatBot";
import Header from "../components/Header";
import NavigateButton from "../components/NavigateButton";
import TemplateGrid from "../layouts/TemplateGrid";

export function ActivityEstimationForm() {
  const header = <Header>활동 대사량 추정</Header>;

  const main = (
    <Stack spacing={6} w="full">
      <ChatBot message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus, ante id euismod auctor, massa velit congue ex, vel tempus orci metus id ipsum. Proin vel tristique ante, vel sollicitudin justo." />
      <FormControl>
        <FormLabel>활동량 선택</FormLabel>
        <VStack>
          <CardButton
            heading="생활 활동량"
            description="일상적인 활동만을 수행하는 경우 (예: 사무실 일, 가사일, 걷기 등)"
          />
          <CardButton
            heading="조금 활동적인 활동량"
            description="약간의 운동이 포함된 경우 (예: 산책, 조깅, 가벼운 유산소 운동 등)"
          />
          <CardButton
            isActive
            heading="활발한 활동량"
            description="강도가 높은 운동을 수행하는 경우 (예: 중량 트레이닝, 러닝, 수영 등)"
          />
          <CardButton
            heading="매우 활발한 활동량"
            description="매우 높은 강도의 운동을 수행하는 경우 (예: 경쟁적인 스포츠, 하이인텐시티 트레이닝 등)"
          />
        </VStack>
      </FormControl>
    </Stack>
  );

  const footer = <NavigateButton to="/join/intake">회원가입</NavigateButton>;

  return <TemplateGrid header={header} main={main} footer={footer} />;
  // return (
  //   <AppContainer>
  //     <Header title="활동대사량 추정" prevURL={"#"} isSignIn={false} />
  //     <MainContentContainer>
  // <ChatBot message="식단 관리 계획을 생성하기 위해 일상생활 활동량 지수(Physical Activity Level, PAL)을 계산합니다. 홍길동님의 활동량 수준을 알려주세요." />
  // <Stack spacing={6} w="full">
  //   <FormControl>
  //     <FormLabel>활동량 선택</FormLabel>
  //     <VStack>
  //       <CardButton
  //         heading="생활 활동량"
  //         description="일상적인 활동만을 수행하는 경우 (예: 사무실 일, 가사일, 걷기 등)"
  //       />
  //       <CardButton
  //         heading="조금 활동적인 활동량"
  //         description="약간의 운동이 포함된 경우 (예: 산책, 조깅, 가벼운 유산소 운동 등)"
  //       />
  //       <CardButton
  //         isActive
  //         heading="활발한 활동량"
  //         description="강도가 높은 운동을 수행하는 경우 (예: 중량 트레이닝, 러닝, 수영 등)"
  //       />
  //       <CardButton
  //         heading="매우 활발한 활동량"
  //         description="매우 높은 강도의 운동을 수행하는 경우 (예: 경쟁적인 스포츠, 하이인텐시티 트레이닝 등)"
  //       />
  //     </VStack>
  //   </FormControl>
  // </Stack>
  //     </MainContentContainer>
  //     <BottomNavbar>
  //       <LinkButton variant="solid" to="/join/intake">
  //         다음
  //       </LinkButton>
  //     </BottomNavbar>
  //   </AppContainer>
  // );
}

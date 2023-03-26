import {
  HStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Stack,
  FormErrorMessage,
  Radio,
  RadioGroup,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react";
import { BaseLayout } from "../layouts/BaseLayout";
import { BottomNavigation } from "../layouts/BottomNavigation";
import { Header } from "../layouts/Header";
import { MainContent } from "../layouts/MainContent";
import { OutlineButton, FilledButton, CardButton } from "./Button";
import { ChatBot } from "./ChatBot";

export function SignUp() {
  return (
    <BaseLayout>
      <Header text="회원가입" hasPrev />
      <MainContent>
        <ChatBot message="반갑습니다! 저는 AI 식단 관리 도우미 ‘뉴트(Nutt)입니다. 앱의 모든 기능을 사용하기 위해 회원가입을 진행해주세요." />
        <Stack spacing={6} w="full">
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input type="email" placeholder="nutt@example.com" />
          </FormControl>
          <FormControl>
            <FormLabel>비밀번호</FormLabel>
            <Input type="password" placeholder="비밀번호" />
            <FormHelperText>
              안전도 |{" "}
              <Text as="b" color="green.500">
                안전
              </Text>
            </FormHelperText>
          </FormControl>
          <FormControl isInvalid={true}>
            <Input type="password" placeholder="비밀번호 확인" />
            {false ? null : (
              <FormErrorMessage>비밀번호가 일치하지 않습니다.</FormErrorMessage>
            )}
          </FormControl>
        </Stack>
      </MainContent>
      <BottomNavigation>
        <OutlineButton>로그인</OutlineButton>
        <FilledButton>회원가입</FilledButton>
      </BottomNavigation>
    </BaseLayout>
  );
}

export function UserInfoForm() {
  return (
    <BaseLayout>
      <Header text="기초 정보 수집" hasPrev />
      <MainContent>
        <ChatBot message="이름과 함께 식단 관리를 위한 기초 정보를 알려주세요." />
        <Stack spacing={6} w="full">
          <FormControl>
            <FormLabel>이름</FormLabel>
            <Input placeholder="홍길동" />
          </FormControl>
          <FormControl>
            <FormLabel>성별</FormLabel>
            <RadioGroup defaultValue="male">
              <Stack spacing={5} direction="row">
                <Radio colorScheme="green" value="male">
                  남성
                </Radio>
                <Radio colorScheme="green" value="female">
                  여성
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <HStack>
            <FormControl>
              <FormLabel>키(cm)</FormLabel>
              <NumberInput
                defaultValue={160}
                precision={1}
                max={300}
                min={1}
                step={0.1}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>몸무게(kg)</FormLabel>
              <NumberInput
                defaultValue={50}
                precision={1}
                max={300}
                min={1}
                step={0.1}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </HStack>
        </Stack>
      </MainContent>
      <BottomNavigation>
        <FilledButton>다음</FilledButton>
      </BottomNavigation>
    </BaseLayout>
  );
}

export function HealthGoalSetting() {
  return (
    <BaseLayout>
      <Header text="건강 목표 설정" hasPrev />
      <MainContent>
        <ChatBot message="식단 관리 계획을 생성하기 위해 저에게 건강 목표를 알려주세요." />
        <Stack spacing={6} w="full">
          <FormControl>
            <FormLabel>건강 목표 선택</FormLabel>
            <VStack>
              <CardButton
                heading="체중 감량"
                description="지방 감량으로 건강한 몸무게 유지"
              />
              <CardButton
                heading="체중 유지"
                description="균형 잡힌 식습관과 운동 유지로 몸무게 유지"
              />
              <CardButton
                isActive
                heading="근육량 증가"
                description="근육량을 늘려 몸의 형태와 기능을 개선하며 대사 속도를 높임"
              />
            </VStack>
          </FormControl>
          <FormControl>
            <FormLabel>목표 체중(kg)</FormLabel>
            <NumberInput
              defaultValue={50}
              precision={1}
              max={200}
              min={1}
              step={0.1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Stack>
      </MainContent>
      <BottomNavigation>
        <FilledButton>다음</FilledButton>
      </BottomNavigation>
    </BaseLayout>
  );
}

export function ActivityEstimation() {
  return (
    <BaseLayout>
      <Header text="활동대사량 추정" hasPrev />
      <MainContent>
        <ChatBot message="식단 관리 계획을 생성하기 위해 일상생활 활동량 지수(Physical Activity Level, PAL)을 계산합니다. 홍길동님의 활동량 수준을 알려주세요." />
        <Stack spacing={6} w="full">
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
      </MainContent>
      <BottomNavigation>
        <FilledButton>다음</FilledButton>
      </BottomNavigation>
    </BaseLayout>
  );
}

export function RecommendedIntakeResult() {
  return (
    <BaseLayout>
      <Header text="권장 섭취량 계산" hasPrev />
      <MainContent>
        <ChatBot
          message={[
            "홍길동님의 신체 정보, 건강 목표 및 활동량을 통해 에너지 섭취량과 영양소 섭취량을 계산합니다.",
            `회원님의 권장 영양소 섭취량은 다음과 같습니다.
    1. 하루 권장 칼로리 섭취량: 1,500kcal
    2. 탄수화물 섭취량: 50g
    3. 단백질 섭취량: 50g`,
            "뉴트는 위 정보를 기반으로 회원님의 식단 관리를 책임지고 관리합니다.",
            "첫 번째 식단을 기록하기 위해 홈 화면의 카메라 버튼을 터치해주세요.",
          ]}
        />
      </MainContent>
      <BottomNavigation>
        <FilledButton>다음</FilledButton>
      </BottomNavigation>
    </BaseLayout>
  );
}

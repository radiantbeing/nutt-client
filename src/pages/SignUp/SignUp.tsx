import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountForm from "./AccountForm";
import ActivityLevelForm from "./ActivityLevelForm";
import BasicInfoForm from "./BasicInfoForm";
import HealthGoalForm from "./HealthGoalForm";
import RecommendedIntakeForm from "./RecommendedIntakeForm";

export default function SignUp() {
  const navigate = useNavigate();
  const toast = useToast();

  // 회원가입 단계
  const [stage, setStage] = useState<
    | "회원가입"
    | "기초정보수집"
    | "건강목표설정"
    | "활동량추정"
    | "권장섭취량계산"
  >("회원가입");

  // 회원 정보
  const [id, setId] = useState<string>("");
  const [isIdValid, setIsIdValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(20);
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [height, setHeight] = useState<number>(160);
  const [weight, setWeight] = useState<number>(60);
  const [target, setTarget] = useState<"loss" | "maintenance" | "increase">(
    "maintenance"
  );
  const [weightGainRate, setWeightGainRate] = useState<number>(1.2);
  const [pal, setPal] = useState<1.2 | 1.375 | 1.55 | 1.725>(1.2);
  const [dailyKcal, setDailyKcal] = useState<number>(0);
  const [dailyCarbohydrate, setDailyCarbohydrate] = useState<number>(0);
  const [dailyProtein, setDailyProtein] = useState<number>(0);
  const [dailyFat, setDailyFat] = useState<number>(0);

  // 이벤트 리스너
  const onIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputId = e.target.value;
    const pattern = /^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    setId(inputId);
    setIsIdValid(pattern.test(inputId));
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#]).{8,20}$/;
    setPassword(pwd);
    setIsPasswordValid(pattern.test(pwd));
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onAgeChange = (stringValue: string, numberValue: number) =>
    setAge(numberValue);
  const onGenderChange = (value: "MALE" | "FEMALE") => setGender(value);
  const onHeightChange = (stringValue: string, numberValue: number) =>
    setHeight(numberValue);
  const onWeightChange = (stringValue: string, numberValue: number) =>
    setWeight(numberValue);
  const onTargetChange = (target: "loss" | "maintenance" | "increase") =>
    setTarget(target);
  const onWeightGainRateChange = (stringValue: string, numberValue: number) =>
    setWeightGainRate(numberValue);
  const onPalChange = (pal: 1.2 | 1.375 | 1.55 | 1.725) => setPal(pal);
  console.log(target, weightGainRate, pal);

  switch (stage) {
    case "회원가입":
      return (
        <AccountForm
          id={id}
          password={password}
          isIdValid={isIdValid}
          isPasswordValid={isPasswordValid}
          onIdChange={onIdChange}
          onPasswordChange={onPasswordChange}
          onPrevClick={() => navigate("/")}
          onNextClick={() => {
            // TODO: 테스트 후 주석 해제
            // if (isIdValid && isPasswordValid) {
            setStage("기초정보수집");
            // } else {
            //   toast({
            //     position: "top",
            //     title: "회원가입 실패",
            //     description: "이메일 또는 비밀번호를 확인해주세요.",
            //     status: "error",
            //     duration: 3000,
            //     isClosable: true,
            //   });
            // }
          }}
        />
      );
    case "기초정보수집":
      return (
        <BasicInfoForm
          name={name}
          age={age}
          gender={gender}
          height={height}
          weight={weight}
          onNameChange={onNameChange}
          onAgeChange={onAgeChange}
          onGenderChange={onGenderChange}
          onHeightChange={onHeightChange}
          onWeightChange={onWeightChange}
          onPrevClick={() => setStage("회원가입")}
          onNextClick={() => {
            // TODO: 테스트 후 주석 해제
            // if (!(name === "")) {
            setStage("건강목표설정");
            // } else {
            //   toast({
            //     position: "top",
            //     title: "이름 공란",
            //     description: "이름을 확인해주세요.",
            //     status: "error",
            //     duration: 3000,
            //     isClosable: true,
            //   });
            // }
          }}
        />
      );
    case "건강목표설정":
      return (
        <HealthGoalForm
          target={target}
          weightGainRate={weightGainRate}
          onTargetChange={onTargetChange}
          onWeightGainRateChange={onWeightGainRateChange}
          onPrevClick={() => setStage("기초정보수집")}
          onNextClick={() => setStage("활동량추정")}
        />
      );
    case "활동량추정":
      return (
        <ActivityLevelForm
          pal={pal}
          onPalChange={onPalChange}
          onPrevClick={() => setStage("건강목표설정")}
          onNextClick={() => setStage("권장섭취량계산")}
        />
      );
    case "권장섭취량계산":
      return (
        <RecommendedIntakeForm
          onPrevClick={() => setStage("활동량추정")}
          onNextClick={() => navigate("/")}
        />
      );
  }
}

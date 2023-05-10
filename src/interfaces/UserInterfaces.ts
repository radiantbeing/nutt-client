export interface BodyInformation {
  gender: "MALE" | "FEMALE";
  age: number;
  height: number;
  weight: number;
}

export interface HealthGoal {
  target: "loss" | "maintenance" | "increase";
  weightGainRate: number;
  pal: 1.2 | 1.375 | 1.55 | 1.725;
  dailyKcal: number;
  dailyCarbohydrate: number;
  dailyProtein: number;
  dailyFat: number;
}

export interface UserProfile extends BodyInformation, HealthGoal {
  id: string;
  name: string;
}
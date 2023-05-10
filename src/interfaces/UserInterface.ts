export interface BodyInformation {
  gender: string;
  age: number;
  height: number;
  weight: number;
}

export interface HealthGoal {
  target: string;
  weightGainRate: number;
  pal: number;
  dailyKcal: number;
  dailyCarbohydrate: number;
  dailyProtein: number;
  dailyFat: number;
}

export interface UserProfile extends BodyInformation, HealthGoal {
  id: number;
  name: string;
}

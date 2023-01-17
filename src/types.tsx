import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Upload: undefined;
  Home: undefined;
  Edit: undefined;
  Detail: { pilotId: string; };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type LogList = {
  _id: string | number[];
  pilot_id: string;
  pilot: string;
  hour: string;
  lap_number: number;
  back_time: string;
  average_lap_speed: string;
};

export type FormattedResponse = {
  message: string;
  status: Boolean;
  data: any;
};

export type RankingList = {
  placing: number;
  pilot_name: string;
  pilot_id: string;
  total_time: number | string;
  laps_completed: number;
};

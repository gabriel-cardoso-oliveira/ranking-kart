import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BSON } from 'realm';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Upload: undefined;
  Home: undefined;
  Edit: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type LogList = {
  _id: BSON.UUID;
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

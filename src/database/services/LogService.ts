import {
  LogList,
  FormattedResponse,
  UpdateLog,
} from '../../types';
import { getRealm } from '../realm';

export const saveLog = async (logs: LogList[]): Promise<FormattedResponse> => {
  const realm = await getRealm();

  try {
    realm.write(() => {
      logs.forEach((log) => {
        realm.create('Log', log);
      });
    });

    realm.close();

    return {
      message: 'Registros gravados com sucesso!',
      data: null,
      status: true,
    };
  } catch (error) {
    realm.close();
    return {
      message: 'Falha ao gravar registros. Tente novamente!',
      data: null,
      status: false,
    };
  }
};

export const getLogs = async (): Promise<FormattedResponse> => {
  const realm = await getRealm();

  try {
    const logs = realm.objects<LogList[]>('Log').toJSON();

    realm.close();

    return {
      message: 'Registros obtidos com sucesso!',
      data: logs,
      status: true,
    };
  } catch (error) {
    realm.close();
    return {
      message: 'Falha ao buscar registros. Tente novamente!',
      data: null,
      status: false,
    };
  }
};

export const clearLogs = async (): Promise<FormattedResponse> => {
  const realm = await getRealm();

  try {
    realm.write(() => {
      realm.delete(realm.objects('Log'));
    });

    realm.close();

    return {
      message: 'Registros deletados com sucesso!',
      data: null,
      status: true,
    };
  } catch (error) {
    realm.close();
    return {
      message: 'Falha ao deletar registros. Tente novamente!',
      data: null,
      status: false,
    };
  }
};

export const getPilotLogs = async (
  pilotId: string,
): Promise<FormattedResponse> => {
  const realm = await getRealm();

  try {
    const logs = realm
      .objects<LogList[]>('Log')
      .filtered(`pilot_id = '${pilotId}'`)
      .toJSON();

    realm.close();

    return {
      message: 'Registros obtidos com sucesso!',
      data: logs,
      status: true,
    };
  } catch (error) {
    realm.close();
    return {
      message: 'Falha ao buscar registros. Tente novamente!',
      data: null,
      status: false,
    };
  }
};

export const updateLog = async (
  logId: string,
  data: UpdateLog,
): Promise<FormattedResponse> => {
  const realm = await getRealm();

  try {
    realm.write(() => {
      const [log] = realm
        .objects<LogList>('Log')
        .filtered(`_id = '${logId}'`);

      if (data.back_time) log.back_time = data.back_time;
      if (data.average_lap_speed) log.average_lap_speed = data.average_lap_speed;
      if (data.hour) log.hour = data.hour;
    });

    realm.close();

    return {
      message: 'Piloto atualizado com sucesso!',
      data: null,
      status: true,
    };
  } catch (error) {
    realm.close();
    return {
      message: 'Falha ao atualizar piloto. Tente novamente!',
      data: null,
      status: false,
    };
  }
};

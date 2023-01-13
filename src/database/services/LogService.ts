import { LogList, FormattedResponse } from '../../types';
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

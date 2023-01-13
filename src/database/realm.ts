import Realm from 'realm';
import { LogSchema } from './schemas/LogSchema';

export const getRealm = async () => {
  const key = new Int8Array(64);

  return await Realm.open({
    path: 'ranking-kart',
    schema: [LogSchema],
    schemaVersion: 1,
    encryptionKey: key,
  });
};

export const LogSchema = {
  name: "Log",
  properties: {
    _id: "string",
    pilot_id: { type: "string", indexed: true },
    pilot: "string",
    hour: "string",
    lap_number: "int",
    back_time: "string",
    average_lap_speed: "string",
  },
  primaryKey: "_id",
};

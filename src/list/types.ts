import * as uuid from "uuid";

export interface Task {
  key: string;
  text: string;
  done: boolean;
};

export const createTask = (text: string, val = false) : Task => (
  { key: uuid(), text, done: val}
);

import { Dispatch, SetStateAction } from "react";

type DBRecord = {
  id: string;
  data: { [key: string]: any };
};

type DBFilterFunction = (
  record: DBRecord,
  index: number,
  array: DBRecord[]
) => boolean;

type SingleOrMultipleDBRecords = DBRecord | DBRecord[];

type SetSingleOrMultipleDBRecords = Dispatch<
  SetStateAction<SingleOrMultipleDBRecords>
>;

type DBWidgetBase = {
  path: string;
  filter?: DBFilterFunction;
  select?: SetSingleOrMultipleDBRecords;
  nonUser?: Boolean;
  log?: Boolean;
};

export {
  DBFilterFunction,
  DBRecord,
  DBWidgetBase,
  SetSingleOrMultipleDBRecords,
  SingleOrMultipleDBRecords,
};

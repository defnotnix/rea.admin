import { PropGetRecords } from "@vframework/core";
import { ReactNode } from "react";

export type PropListHandler = {
  getRecords: (apiProps: PropGetRecords) => Promise<any>;
  getParams?: any;
  dataKey?: string;
  //module
  endpoint?: string;
  moduleKey?: string[];
  //search
  transformOnGet?: (data: any) => any;
  enableServerSearch?: boolean;
  enableServerPagination?: boolean;
  //(children
  children: ReactNode;
};

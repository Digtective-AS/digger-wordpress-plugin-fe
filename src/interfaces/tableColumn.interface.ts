import {ReactElement} from "react";

export interface TableColumnInterface {
    field: string,
    headerName: string,
    cellRenderer?: (_params: any, _optional?: any) => ReactElement;
}

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import TableSkeleton from "../../skeletons/tableSkeleton.tsx";

interface TableHelpersInterface {
    columnLength: number;
    rows?: number;
}

export const parseField = (field: string, row: any) => {
    const fieldsAsArray = field.split('.');

    if (fieldsAsArray.length === 1) {
        return row[field];
    }

    let nextRow: any = null;
    fieldsAsArray.forEach((givenField) => {
        if (nextRow) {
            nextRow = nextRow[givenField];
        } else {
            nextRow = row[givenField];
        }
    });

    return nextRow;
};


export const RenderLoader: FC<TableHelpersInterface> = (props) => (
    <TableSkeleton
        colSpan={props.columnLength}
        rows={props.rows}
    />
);

export const RenderError: FC<TableHelpersInterface> = (props) => (
    <TableRow>
        <TableCell colSpan={props.columnLength}>
            There was an error fetching data.
        </TableCell>
    </TableRow>
);

export const RenderEmptyTable: FC<TableHelpersInterface> = (props) => {
    const {t} = useTranslation();
    return (
        <TableRow>
            <TableCell colSpan={props.columnLength}>
                No data found...
            </TableCell>
        </TableRow>
    );
};

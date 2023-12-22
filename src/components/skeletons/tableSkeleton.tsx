import { Skeleton } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { FC } from 'react';

interface TableSkeletonProps {
    colSpan: number;
    rows?: number | undefined;
}

const TableSkeleton: FC<TableSkeletonProps> = (props) => {
    const SKELETON_TABLE_CELL_HEIGHT = 52;

    if (props.rows) {
        const skeletonRows = Array.from({ length: props.rows }, (_, index) => (
            <Skeleton key={index} height={SKELETON_TABLE_CELL_HEIGHT} />
        ));

        return (
        <>
            <TableRow>
                <TableCell colSpan={props.colSpan}>
                    {skeletonRows}
                </TableCell>
            </TableRow>
        </>
    );
    }

    return (
        <TableRow>
            <TableCell colSpan={props.colSpan}>
                <Skeleton height={SKELETON_TABLE_CELL_HEIGHT} />
                <Skeleton height={SKELETON_TABLE_CELL_HEIGHT} />
                <Skeleton height={SKELETON_TABLE_CELL_HEIGHT} />
                <Skeleton height={SKELETON_TABLE_CELL_HEIGHT} />
                <Skeleton height={SKELETON_TABLE_CELL_HEIGHT} />
                <Skeleton height={SKELETON_TABLE_CELL_HEIGHT} />
            </TableCell>
        </TableRow>
    );
};

export default TableSkeleton;



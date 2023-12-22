import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import {Button, tableCellClasses, Tooltip,} from '@mui/material';
import Box from '@mui/material/Box';
import EmbedIcon from '../../assets/icons/embed-icon.svg';
import {Colors} from '../../constants/constants';
import {TableColumnInterface} from "../../interfaces/tableColumn.interface.ts";
import CustomTablePagination from "../customTablePagination/customTablePagination.tsx";
import {parseField, RenderEmptyTable, RenderError, RenderLoader} from "./tableHelpers/tableHelpers.tsx";

interface BasicTableInterface {
    data: any,
    columns: TableColumnInterface[],
    isError: boolean,
    isFetching: boolean,
    refetch: () => void,
    page: number,
    onEmbed?: (_id: string) => void,
    setPage: (_newPage: number) => void,
    setRowsPerPage: (_rowsPerPage: number) => void,
    rowsPerPage: number,
    setIsEmbedDialogOpen?: (_bool: boolean) => void,
    formInputs?: any,
    handleNavigation?: (_campaignName: any) => void,
    borderless?: boolean,
    hasNextPage?: boolean,
}

const BasicTable: React.FC<BasicTableInterface> = (props) => {
    const hasActions = !!props.onEmbed;
    const COLUMN_LENGTH = hasActions ? props.columns.length + 1 : props.columns.length;

    const renderOnEmbedClick = (item: any) => (
        <Tooltip title="Embed" arrow placement="top">
            <Button
                style={{
                    minWidth: '30px',
                }}
                onClick={() => {
                    props.onEmbed?.(item);
                    props.setIsEmbedDialogOpen?.(true);
                }}
            >
                <img src={EmbedIcon} alt="" className="max-w-[20px]"/>
            </Button>
        </Tooltip>
    );

    const renderHeaders = (column: TableColumnInterface) => (
        <TableCell
            key={column.field}
            style={{
                borderBottom: '1px solid #bdbdbd',
                fontSize: 12,
            }}
            className="duration-100 hover:bg-[#0C485E1a]"
        >
            <p className="uppercase text-primary">
                {column.headerName}
            </p>
        </TableCell>
    );

    const renderTableContent = (item: any, index: number) => (
        <TableRow
            key={item.id}
            className={`${index % 2 === 0 ? 'bg-[#FAFAFA]' : ''} duration-100 hover:bg-[#0C485E1a]`}
            sx={{
                [`& .${tableCellClasses.root}`]: {
                    borderBottom: 'none',
                },
            }}
        >
            {props.columns?.map((column: TableColumnInterface) => {
                const itemToRender = parseField(column.field, item);

                return (
                    <TableCell
                        key={crypto.randomUUID()}
                        style={{
                            color: Colors.primary,
                            maxWidth: '350px',
                            minWidth: '125px',
                            cursor: props.handleNavigation ? 'pointer' : '',
                        }}
                        onClick={() => props.handleNavigation?.(item)}
                    >
                        <span>
                          {column.cellRenderer
                              ? (
                                  column.cellRenderer(itemToRender)
                              )
                              : (
                                  <Tooltip title={itemToRender}>
                                      {itemToRender}
                                  </Tooltip>
                              )}
                        </span>
                    </TableCell>
                );
            })}
            {hasActions && (
                <TableCell style={{maxWidth: '90px'}}>
                    <div className="flex items-center justify-end">
                        {props.onEmbed && renderOnEmbedClick(item)}
                    </div>
                </TableCell>
            )}
        </TableRow>
    );

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: '8px',
                boxShadow: 'none',
                border: props.borderless ? 'none' : '1px solid #EAEAEA',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    overflowX: 'auto',
                    borderBottom: '1px solid #bdbdbd',
                }}
            >
                <Table sx={{minWidth: 650}}>
                    <TableHead>
                        <TableRow>
                            {props.columns.map((column: TableColumnInterface) => renderHeaders(column))}
                            {hasActions && props.columns === props.columns && (
                                <TableCell
                                    className="duration-100 hover:bg-[#0C485E1a]"
                                    style={{
                                        paddingRight: '1.5rem',
                                        maxWidth: '90px',
                                        borderBottom: '1px solid #bdbdbd',
                                    }}
                                >
                                    <p className="text-right text-xs uppercase text-primary">
                                        Actions
                                    </p>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!props.isFetching
                            && !props.isError
                            && props.data?.data?.map((item: any, index: number) => renderTableContent(item, index))}

                        {props.isError && <RenderError columnLength={COLUMN_LENGTH}/>}

                        {!props.isFetching
                            && !props.isError
                            && !props.data?.data?.length && (
                                <RenderEmptyTable columnLength={COLUMN_LENGTH}/>
                            )}

                        {props.isFetching && <RenderLoader columnLength={COLUMN_LENGTH}/>}
                    </TableBody>
                </Table>
            </Box>
            {!props.isFetching && !props.isError && (
                <CustomTablePagination
                    count={props.data?.meta?.total}
                    page={props.page}
                    rowsPerPage={props.rowsPerPage}
                    setPage={props.setPage}
                    refetch={props.refetch}
                    setRowsPerPage={props.setRowsPerPage}
                    hasNextPage={props.hasNextPage}
                />
            )}
        </TableContainer>
    );
};

export default BasicTable;

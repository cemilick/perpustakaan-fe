import { useEffect, useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap"
import { PaginationControl } from "react-bootstrap-pagination-control";
import { FaEye } from "react-icons/fa";

interface IColumn {
    key: string;
    label: string;
}

interface IPageConfig {
    limit: number;
    total: number;
    page: number;
    total_data: number;
    offset: number;
}

interface ITableData {
    column: IColumn[];
    data?: any[];
    pageConfig: IPageConfig;
    onChangePage?: (page: number) => void;
    customCell?: (name: any, value: any, defaultCell: JSX.Element) => JSX.Element;
    onDetail?: (data: any) => void;
}

export const TableData: React.FC<ITableData> = ({
    column,
    data = [],
    pageConfig,
    onChangePage = () => { },
    customCell = (name, value, defaultCell) => defaultCell,
    onDetail = (data) => { }
}) => {
    return (<>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>No.</th>
                    {column.map((col) => (
                        <th key={col.key}>{col.label}</th>
                    ))}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={"row#" + index}>
                        <td>{index + 1 + pageConfig.offset}</td>
                        {column.map((col, index) => (
                            <td key={`${col.key}#${index}`}>{customCell(col.key, row[col.key], <>{row[col.key]}</>)}</td>
                        ))}
                        <td>
                            <Button className="btn btn-secondary" onClick={() => onDetail(row)}>
                                <FaEye size={10} style={{ marginTop: -4 }} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <div className="d-flex justify-content-between" key={pageConfig.page}>
            <PaginationControl page={pageConfig.page} changePage={onChangePage} total={pageConfig.total} limit={pageConfig.limit} />
            <span>Menampilkan {pageConfig.total_data} dari {pageConfig.total} total data</span>
        </div>
    </>)
}
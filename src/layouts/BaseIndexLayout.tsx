
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { DateHelper, TableDataHelper } from "../utils/functions";
import { TableData } from "../components/TableData";
import { FaTimes } from "react-icons/fa";

interface IBaseIndexLayout {
    path: string;
    column: any[];
    name: string;
    customCell?: (name: any, value: any, defaultCell: JSX.Element) => JSX.Element;
    detailComponent: (data: any) => JSX.Element;
}

export const BaseIndexLayout: React.FC<IBaseIndexLayout> = ({ path, column, name, customCell, detailComponent }) => {
    const [data, setData] = useState([]);
    const [detailData, setDetailData] = useState({});

    const [pageConfig, setPageConfig] = useState({
        limit: 0,
        total: 0,
        page: 1,
        total_data: 0,
        offset: 0
    });

    const [width, setWidth] = useState(12);

    useEffect(() => {
        TableDataHelper.getData({ path, setPageConfig, setData, page: pageConfig.page });
    }, [pageConfig.page]);

    return (
        <Row>
            <Col xs={width}>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-5">Daftar {name}</Card.Title>
                        <TableData
                            column={column}
                            data={data ?? []}
                            pageConfig={pageConfig}
                            onChangePage={(page) => {
                                setPageConfig({ ...pageConfig, page });
                            }}
                            customCell={customCell}
                            onDetail={(data) => {
                                setDetailData(data);
                                setWidth(8);
                            }}
                        />
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={(12 - width)} style={{ display: width == 12 ? 'none' : 'block' }}>
                <Card>
                    <Card.Body>
                        <div style={{ position: 'absolute', right: 20, top: 20 }}>
                            <button className="border-0 bg-white" onClick={() => {
                                setDetailData({});
                                setWidth(12);
                            }}><FaTimes size={20} /></button>
                        </div>
                        <Card.Title className="mb-5">Detail {name}</Card.Title>
                        {detailComponent(detailData)}
                    </Card.Body>
                </Card>
            </Col>
        </Row>);
}
import { App, Button, Empty, Popconfirm, Space, Table, type PopconfirmProps } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
    fetchPartsByStructure,
    selectParts,
    selectPartsLoading
} from "../../../../../redux/features/examStructurePartSlice";
import type { ICauTrucDeThanhPhan } from "../../../../../types/CauTrucDeThanhPhan";

import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { deletePart } from "../../../../../config/Api";

interface Props {
    onSelect: (record: ICauTrucDeThanhPhan | null) => void;
    structureId: number;
    onEdit: (record: ICauTrucDeThanhPhan) => void;
}

const ExamStructureTablePart = ({ onSelect, structureId, onEdit }: Props) => {

    const dispatch = useAppDispatch();
    const data = useAppSelector(selectParts);
    const loading = useAppSelector(selectPartsLoading);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const { message } = App.useApp();

    useEffect(() => {
        dispatch(fetchPartsByStructure(structureId));
        setSelectedId(null);
    }, [structureId]);

    useEffect(() => {
        if (!data.length) {
            onSelect(null);
        }
    }, [data]);

    const onDelete = async (id: number) => {
        try {
            const res = await deletePart(id);
            if (res.data.statusCode === 200) {
                message.success("Xóa thành công");
                dispatch(fetchPartsByStructure(structureId))
            }
        } catch (error: any) {
            message.error(error || "Xóa thất bại")
        }
    }

    const cancel: PopconfirmProps['onCancel'] = () => {
        message.error('Đã bỏ chọn');
    };

    const columns = [
        { title: "ID", dataIndex: "id", width: 70 },
        { title: "Ghi chú", dataIndex: "note" },
        { title: "Loại trả lời", dataIndex: "type_answer" },
        { title: "Thứ tự", dataIndex: "order" },
        { title: "Hệ số", dataIndex: "coefficient" },
        {
            title: "Cố định",
            dataIndex: "is_fixed",
            render: (v: boolean) => (v ? "Có" : "Không")
        },
        { title: "Số câu hỏi", dataIndex: "so_cau_hoi" },
        { title: "Tổng câu", dataIndex: "total_question" },
        { title: "Tổng điểm", dataIndex: "total_score" },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: ICauTrucDeThanhPhan) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(record);
                        }}
                    >
                        Sửa
                    </Button>

                    <Popconfirm
                        title="Xóa cấu trúc câu thành phần"
                        description="Bạn có chắc chắn muốn xóa không?"
                        onConfirm={() => onDelete(record.id)}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                        placement="topLeft"
                    >
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteFilled />}
                            size="small"
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            size="small"
            bordered
            scroll={{ x: "max-content" }}
            rowClassName={(record) =>
                record.id === selectedId ? "row-selected" : ""
            }
            onRow={(record) => ({
                onClick: () => {
                    setSelectedId(record.id);
                    onSelect(record);
                }
            })}
            locale={{
                emptyText: <Empty description="Chưa có cấu trúc câu thành phần" />
            }}
        />
    );
};

export default ExamStructureTablePart;
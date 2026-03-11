import { App, Button, Empty, Popconfirm, Space, Table, Tag, type PopconfirmProps } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
    fetchExamStructures,
    selectExamStructures,
    selectExamStructureLoading
} from "../../../../../redux/features/examStructureSlice";
import type { ICauTrucDe } from "../../../../../types/CauTrucDe";
import { deleteExamStructure } from "../../../../../config/Api";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";

interface Props {
    onSelect: (record: ICauTrucDe | null) => void;
    onEdit: (record: ICauTrucDe) => void;
}

const ExamStructureTable = ({ onSelect, onEdit }: Props) => {

    const dispatch = useAppDispatch();
    const data = useAppSelector(selectExamStructures);
    const loading = useAppSelector(selectExamStructureLoading);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const { message } = App.useApp();

    const onDelete = async (id: number) => {

        try {

            const res = await deleteExamStructure(id);

            if (res.data.statusCode === 200) {

                message.success("Xóa thành công");

                // Nếu đang chọn record bị xóa thì reset
                if (selectedId === id) {
                    setSelectedId(null);
                    onSelect(null);
                }

                dispatch(fetchExamStructures(""));

            }

        } catch (error: any) {

            message.error(error?.response?.data?.message || "Xóa thất bại");

        }

    };

    const cancel: PopconfirmProps["onCancel"] = () => {
        message.error("Đã bỏ chọn");
    };

    const columns = [
        { title: "ID", dataIndex: "id", width: 70 },
        { title: "Tên cấu trúc đề", dataIndex: "name" },
        { title: "Mã mẫu đề", dataIndex: "id_maudethi", width: 110 },
        { title: "Thời gian (phút)", dataIndex: "duration", width: 140 },
        { title: "Số câu hỏi", dataIndex: "so_cau_hoi", width: 110 },
        {
            title: "Sử dụng tài liệu",
            dataIndex: "is_dungtailieu",
            width: 140,
            render: (v: boolean) => (v ? "Có" : "Không")
        },
        {
            title: "Trộn đề",
            dataIndex: "is_trondethi",
            width: 90,
            render: (v: boolean) => (v ? "Có" : "Không")
        },
        { title: "Thứ tự", dataIndex: "order", width: 80 },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: 110,
            render: (v: number) =>
                v === 1 ? (
                    <Tag color="green">Hoạt động</Tag>
                ) : (
                    <Tag color="red">Ngưng</Tag>
                )
        },
        {
            title: "Hành động",
            key: "action",
            width: 150,
            render: (_: unknown, record: ICauTrucDe) => (
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
                        title="Xóa cấu trúc đề"
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
                            onClick={(e) => e.stopPropagation()}
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
                emptyText: <Empty description="Chưa có cấu trúc đề" />
            }}
        />

    );

};

export default ExamStructureTable;
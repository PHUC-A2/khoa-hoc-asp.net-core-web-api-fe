import { Empty, Table } from "antd";
import { useAppSelector } from "../../../../../redux/hooks";
import {
    selectExamStructures,
    selectExamStructureLoading
} from "../../../../../redux/features/examStructureSlice";

interface Props {
    onSelect: (record: any) => void;
}

const ExamStructureTable = ({ onSelect }: Props) => {

    const data = useAppSelector(selectExamStructures);
    const loading = useAppSelector(selectExamStructureLoading);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            width: 70
        },
        {
            title: "Tên cấu trúc đề",
            dataIndex: "name"
        },
        {
            title: "Mã mẫu đề",
            dataIndex: "id_maudethi"
        },
        {
            title: "Thời gian (phút)",
            dataIndex: "duration"
        },
        {
            title: "Số câu hỏi",
            dataIndex: "so_cau_hoi"
        },
        {
            title: "Sử dụng tài liệu",
            dataIndex: "is_dungtailieu",
            render: (v: boolean) => (v ? "Có" : "Không")
        },
        {
            title: "Trộn đề",
            dataIndex: "is_trondethi",
            render: (v: boolean) => (v ? "Có" : "Không")
        },
        {
            title: "Thứ tự",
            dataIndex: "order"
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (v: number) => (v === 1 ? "Hoạt động" : "Ngưng")
        }
    ];

    return (
        <>
            <h5>Bảng cấu trúc đề</h5>

            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"   
                loading={loading}
                size="small"
                bordered
                scroll={{ x: "max-content" }}
                onRow={(record) => ({
                    onClick: () => onSelect(record)
                })}
                locale={{
                    emptyText: <Empty description="Chưa có cấu trúc câu" />
                }}
                
            />
        </>
    );
};

export default ExamStructureTable;
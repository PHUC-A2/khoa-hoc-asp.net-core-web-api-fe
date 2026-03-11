import { Modal, Spin, Tag, Divider } from "antd";
import {
    ClockCircleOutlined,
    FileTextOutlined,
    TeamOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    BookOutlined,
    SyncOutlined
} from "@ant-design/icons";
import { useAppSelector } from "../../../../redux/hooks";
import { selectClientExamStructureDetail, selectClientExamStructureDetailLoading } from "../../../../redux/features/examStructureClientSlice";

interface Props {
    open: boolean;
    onClose: () => void;
    theme: "light" | "dark";
}

const ExamStructureDetailModal = ({ open, onClose, theme }: Props) => {

    const detail = useAppSelector(selectClientExamStructureDetail);
    const loading = useAppSelector(selectClientExamStructureDetailLoading);
    const isDark = theme === "dark";

    const textColor = isDark ? "#e2e8f0" : "#1a2733";
    const subColor = "#94a3b8";
    const goldColor = "#faad14";
    const cardBg = isDark ? "#1e2936" : "#ffffff";
    const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

    const itemStyle = {
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 2
    };

    const labelStyle = {
        fontSize: "0.75rem",
        color: subColor
    };

    const valueStyle = {
        fontSize: "0.95rem",
        fontWeight: 600,
        color: textColor
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={600}
            title={
                <span style={{ color: goldColor, fontWeight: 700 }}>
                    Chi tiết chủ đề đề thi
                </span>
            }
            styles={{
                body: { background: cardBg },   // ← content → body
                header: { background: cardBg, borderBottom: `1px solid ${borderColor}` }
            }}
        >
            <Spin spinning={loading}>

                {detail && (

                    <div style={{ padding: "8px 0" }}>

                        {/* Tên */}
                        <div style={{ marginBottom: 20 }}>
                            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: textColor, marginBottom: 6 }}>
                                {detail.name}
                            </div>
                            {detail.note && (
                                <div style={{ fontSize: "0.875rem", color: subColor }}>
                                    {detail.note}
                                </div>
                            )}
                        </div>

                        {/* Tags trạng thái */}
                        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                            <Tag color={detail.status === 1 ? "green" : "red"}>
                                {detail.status === 1 ? "Hoạt động" : "Ngưng hoạt động"}
                            </Tag>
                            {detail.is_dungtailieu && (
                                <Tag icon={<BookOutlined />} color="blue">Được dùng tài liệu</Tag>
                            )}
                            {detail.is_trondethi && (
                                <Tag icon={<SyncOutlined />} color="purple">Trộn đề</Tag>
                            )}
                        </div>

                        <Divider style={{ borderColor, margin: "0 0 20px" }} />

                        {/* Thông tin chính */}
                        <div style={{ marginBottom: 6, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: goldColor }}>
                            Thông tin đề thi
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 16,
                            marginBottom: 20
                        }}>

                            <div style={itemStyle}>
                                <span style={labelStyle}><ClockCircleOutlined /> Thời gian</span>
                                <span style={valueStyle}>{detail.duration} phút</span>
                            </div>

                            <div style={itemStyle}>
                                <span style={labelStyle}><FileTextOutlined /> Số câu hỏi</span>
                                <span style={valueStyle}>{detail.so_cau_hoi} câu</span>
                            </div>

                            <div style={itemStyle}>
                                <span style={labelStyle}><TeamOutlined /> Hệ đào tạo</span>
                                <span style={valueStyle}>Hệ {detail.id_he}</span>
                            </div>

                            <div style={itemStyle}>
                                <span style={labelStyle}>Thứ tự</span>
                                <span style={valueStyle}>{detail.order}</span>
                            </div>

                        </div>

                        <Divider style={{ borderColor, margin: "0 0 20px" }} />

                        {/* Thông tin kỹ thuật */}
                        <div style={{ marginBottom: 6, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: goldColor }}>
                            Thông tin kỹ thuật
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 16
                        }}>

                            <div style={itemStyle}>
                                <span style={labelStyle}>Mã môn học</span>
                                <span style={valueStyle}>{detail.id_mon}</span>
                            </div>

                            <div style={itemStyle}>
                                <span style={labelStyle}>Mã mẫu đề</span>
                                <span style={valueStyle}>{detail.id_maudethi}</span>
                            </div>

                            <div style={itemStyle}>
                                <span style={labelStyle}>Kiểu hiển thị</span>
                                <span style={valueStyle}>{detail.id_kieuhienthi}</span>
                            </div>

                            <div style={itemStyle}>
                                <span style={labelStyle}>Sử dụng tài liệu</span>
                                <span style={{ ...valueStyle }}>
                                    {detail.is_dungtailieu
                                        ? <span style={{ color: "#52c41a" }}><CheckCircleOutlined /> Có</span>
                                        : <span style={{ color: "#ff4d4f" }}><CloseCircleOutlined /> Không</span>
                                    }
                                </span>
                            </div>

                        </div>

                    </div>

                )}

            </Spin>

        </Modal>
    );

};

export default ExamStructureDetailModal;
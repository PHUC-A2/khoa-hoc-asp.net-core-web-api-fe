import { useEffect, useState } from "react";
import { Layout, Typography, Input, Select, Empty, Skeleton, Tag, Button } from "antd";
import {
    ClockCircleOutlined,
    FileTextOutlined,
    SearchOutlined,
    BookOutlined,
    SyncOutlined
} from "@ant-design/icons";
import { motion, type Variants } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import type { ICauTrucDe } from "../../../types/CauTrucDe";
import "./ExamStructurePage.scss";
import ExamStructureDetailModal from "./modal/ExamStructureDetailModal";
import { clearDetail, fetchClientExamStructureById, fetchClientExamStructures, selectClientExamStructures, selectClientExamStructuresLoading } from "../../../redux/features/examStructureClientSlice";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

interface Props {
    theme: "light" | "dark";
}

// Đổi fadeInUp
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const ExamStructurePage = ({ theme }: Props) => {

    const dispatch = useAppDispatch();
    const data = useAppSelector(selectClientExamStructures);
    const loading = useAppSelector(selectClientExamStructuresLoading);
    const isDark = theme === "dark";

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState<number | "all">("all");
    const [filterTaiLieu, setFilterTaiLieu] = useState<boolean | "all">("all");
    const [openDetail, setOpenDetail] = useState(false);

    useEffect(() => {
        dispatch(fetchClientExamStructures());
    }, []);

    const handleOpenDetail = (item: ICauTrucDe) => {
        dispatch(fetchClientExamStructureById(item.id));
        setOpenDetail(true);
    };

    const handleCloseDetail = () => {
        setOpenDetail(false);
        dispatch(clearDetail());
    };

    const filtered = data.filter((item) => {
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || item.status === filterStatus;
        const matchTaiLieu = filterTaiLieu === "all" || item.is_dungtailieu === filterTaiLieu;
        return matchSearch && matchStatus && matchTaiLieu;
    });

    return (
        <Layout className={`exam-structure-page ${isDark ? "dark" : "light"}`}>

            <Content>
                <div className="page-content">

                    {/* Header */}
                    <motion.div
                        className="page-header"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <Title className="page-title">
                            Chủ đề <span className="gold-text">Đề Thi</span>
                        </Title>
                        <Paragraph className="page-subtitle">
                            Khám phá các chủ đề đề thi và cấu trúc bài kiểm tra
                        </Paragraph>
                    </motion.div>

                    {/* Filter bar */}
                    <motion.div
                        className="filter-bar"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <Input
                            placeholder="Tìm kiếm chủ đề đề thi..."
                            prefix={<SearchOutlined style={{ color: "#faad14" }} />}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ maxWidth: 320 }}
                            allowClear
                        />

                        <Select
                            value={filterStatus}
                            onChange={setFilterStatus}
                            style={{ minWidth: 150 }}
                            options={[
                                { label: "Tất cả trạng thái", value: "all" },
                                { label: "Hoạt động", value: 1 },
                                { label: "Ngưng", value: 0 }
                            ]}
                        />

                        <Select
                            value={filterTaiLieu}
                            onChange={setFilterTaiLieu}
                            style={{ minWidth: 170 }}
                            options={[
                                { label: "Tất cả", value: "all" },
                                { label: "Được dùng tài liệu", value: true },
                                { label: "Không dùng tài liệu", value: false }
                            ]}
                        />
                    </motion.div>

                    {/* Loading skeletons */}
                    {loading && (
                        <div className="skeleton-grid">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="skeleton-card">
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && filtered.length === 0 && (
                        <div className="empty-state">
                            <Empty
                                description={
                                    <span style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                                        Không tìm thấy chủ đề đề thi nào
                                    </span>
                                }
                            />
                        </div>
                    )}

                    {/* Cards */}
                    {!loading && filtered.length > 0 && (
                        <div className="cards-grid">
                            {filtered.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    className="exam-card"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={{
                                        hidden: { opacity: 0, y: 24 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.4, delay: index * 0.05 }
                                        }
                                    }}
                                    onClick={() => handleOpenDetail(item)}
                                >

                                    <div className="card-header">
                                        <div className="card-title">{item.name}</div>
                                        <div className="card-badge">
                                            {item.duration} phút
                                        </div>
                                    </div>

                                    <div className="card-note">
                                        {item.note || "Không có ghi chú"}
                                    </div>

                                    <div className="card-stats">
                                        <div className="stat-item">
                                            <FileTextOutlined className="stat-icon" />
                                            <span><strong>{item.so_cau_hoi}</strong> câu hỏi</span>
                                        </div>
                                        <div className="stat-item">
                                            <ClockCircleOutlined className="stat-icon" />
                                            <span><strong>{item.duration}</strong> phút</span>
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <div className="tag-group">
                                            {item.status === 1
                                                ? <Tag color="green">Hoạt động</Tag>
                                                : <Tag color="red">Ngưng</Tag>
                                            }
                                            {item.is_dungtailieu && (
                                                <Tag icon={<BookOutlined />} color="blue">Tài liệu</Tag>
                                            )}
                                            {item.is_trondethi && (
                                                <Tag icon={<SyncOutlined />} color="purple">Trộn đề</Tag>
                                            )}
                                        </div>

                                        <Button
                                            className="detail-btn"
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenDetail(item);
                                            }}
                                        >
                                            Xem chi tiết
                                        </Button>
                                    </div>

                                </motion.div>
                            ))}
                        </div>
                    )}

                </div>
            </Content>

            {/* Detail Modal */}
            <ExamStructureDetailModal
                open={openDetail}
                onClose={handleCloseDetail}
                theme={theme}
            />

        </Layout>
    );

};

export default ExamStructurePage;
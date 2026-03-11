import { Layout, Typography, Row, Col, Card } from "antd";
import { motion, type Variants } from "framer-motion";
import {
    BookOutlined,
    SafetyCertificateOutlined,
    TeamOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import { FaGraduationCap } from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import './AboutPage.scss';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

interface AboutPageProps {
    theme: 'light' | 'dark';
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const AboutPage = ({ theme }: AboutPageProps) => {
    const isDark = theme === 'dark';

    const goldColor = '#faad14';
    const bgColor = isDark ? '#0d141c' : '#ffffff';
    const cardBg = isDark ? '#1e2936' : '#ffffff';
    const textMain = isDark ? '#e2e8f0' : '#1a2733';
    const textSub = isDark ? '#94a3b8' : '#64748b';
    const borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
    const sectionBg = isDark ? 'rgba(250,173,20,0.04)' : 'rgba(250,173,20,0.03)';

    const features = [
        {
            icon: <PiExamFill style={{ fontSize: 28, color: goldColor }} />,
            title: "Quản lý cấu trúc đề thi",
            desc: "Tổ chức và quản lý các chủ đề đề thi một cách có hệ thống, hỗ trợ nhiều loại bài kiểm tra khác nhau.",
        },
        {
            icon: <ClockCircleOutlined style={{ fontSize: 28, color: goldColor }} />,
            title: "Kiểm soát thời gian thi",
            desc: "Cài đặt thời gian linh hoạt cho từng bài kiểm tra, đảm bảo quy trình thi diễn ra đúng giờ.",
        },
        {
            icon: <SafetyCertificateOutlined style={{ fontSize: 28, color: goldColor }} />,
            title: "Bảo mật đề thi",
            desc: "Hệ thống mã hóa và kiểm soát truy cập chặt chẽ, đảm bảo tính bảo mật và công bằng trong thi cử.",
        },
        {
            icon: <FileTextOutlined style={{ fontSize: 28, color: goldColor }} />,
            title: "Ngân hàng câu hỏi",
            desc: "Lưu trữ và phân loại câu hỏi theo chủ đề, mức độ khó và hệ đào tạo một cách khoa học.",
        },
        {
            icon: <TeamOutlined style={{ fontSize: 28, color: goldColor }} />,
            title: "Hỗ trợ đa hệ đào tạo",
            desc: "Tương thích với nhiều hệ đào tạo: chính quy, tại chức, liên thông, đảm bảo tính linh hoạt.",
        },
        {
            icon: <BookOutlined style={{ fontSize: 28, color: goldColor }} />,
            title: "Tài liệu tham khảo",
            desc: "Quản lý quyền sử dụng tài liệu trong kỳ thi, hỗ trợ cả hình thức thi đóng và thi mở.",
        },
    ];

    const stats = [
        { value: "500+", label: "Đề thi đã tạo" },
        { value: "50+", label: "Môn học" },
        { value: "10K+", label: "Sinh viên" },
        { value: "99%", label: "Độ chính xác" },
    ];

    const values = [
        "Minh bạch trong quy trình thi cử",
        "Công bằng cho tất cả sinh viên",
        "Hiện đại hóa giáo dục",
        "Hỗ trợ tận tâm 24/7",
    ];

    return (
        <Layout style={{ background: bgColor, minHeight: '100vh' }}>
            <Content>
                <div style={{ maxWidth: 1160, margin: '0 auto', padding: '96px 24px 80px' }}>

                    {/* Hero Section */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        style={{ textAlign: 'center', marginBottom: 80 }}
                    >
                        <motion.div variants={fadeUp}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '6px 18px',
                                borderRadius: 20,
                                background: 'rgba(250,173,20,0.1)',
                                border: '1px solid rgba(250,173,20,0.25)',
                                color: goldColor,
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                marginBottom: 24,
                            }}>
                                <FaGraduationCap />
                                Hệ thống quản lý thi cử
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <Title style={{
                                color: textMain,
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                fontWeight: 800,
                                marginBottom: 20,
                                lineHeight: 1.2,
                            }}>
                                Nền tảng thi cử <span style={{ color: goldColor }}>thông minh</span><br />
                                cho giáo dục hiện đại
                            </Title>
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <Paragraph style={{
                                color: textSub,
                                fontSize: '1.05rem',
                                maxWidth: 620,
                                margin: '0 auto',
                                lineHeight: 1.8,
                            }}>
                                EduPro giúp các cơ sở giáo dục quản lý toàn bộ quy trình thi cử — từ thiết kế cấu trúc đề thi đến tổ chức kiểm tra — một cách chuyên nghiệp và hiệu quả.
                            </Paragraph>
                        </motion.div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            gap: 2,
                            marginBottom: 80,
                            borderRadius: 16,
                            overflow: 'hidden',
                            border: `1px solid ${borderColor}`,
                        }}
                    >
                        {stats.map((s, i) => (
                            <motion.div key={i} variants={cardVariant} style={{
                                padding: '28px 20px',
                                background: cardBg,
                                textAlign: 'center',
                                borderRight: i < stats.length - 1 ? `1px solid ${borderColor}` : 'none',
                            }}>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: goldColor, lineHeight: 1 }}>
                                    {s.value}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: textSub, marginTop: 6 }}>{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        style={{ marginBottom: 80 }}
                    >
                        <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 48 }}>
                            <Title level={2} style={{ color: textMain, fontWeight: 800, marginBottom: 12 }}>
                                Tính năng <span style={{ color: goldColor }}>nổi bật</span>
                            </Title>
                            <Paragraph style={{ color: textSub, fontSize: '0.95rem' }}>
                                Được thiết kế chuyên biệt cho môi trường giáo dục đại học
                            </Paragraph>
                        </motion.div>

                        <Row gutter={[20, 20]}>
                            {features.map((f, i) => (
                                <Col xs={24} sm={12} lg={8} key={i}>
                                    <motion.div variants={cardVariant}>
                                        <Card
                                            bordered={false}
                                            style={{
                                                background: cardBg,
                                                border: `1px solid ${borderColor}`,
                                                borderRadius: 14,
                                                height: '100%',
                                                transition: 'all 0.25s ease',
                                            }}
                                            styles={{ body: { padding: '24px' } }}
                                            hoverable
                                        >
                                            <div style={{
                                                width: 52, height: 52,
                                                borderRadius: 12,
                                                background: 'rgba(250,173,20,0.1)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                marginBottom: 16,
                                            }}>
                                                {f.icon}
                                            </div>
                                            <Title level={5} style={{ color: textMain, marginBottom: 8, fontWeight: 700 }}>
                                                {f.title}
                                            </Title>
                                            <Paragraph style={{ color: textSub, fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
                                                {f.desc}
                                            </Paragraph>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </motion.div>

                    {/* Mission + Values */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <Row gutter={[32, 32]} align="middle">
                            <Col xs={24} md={12}>
                                <motion.div variants={fadeUp}>
                                    <div style={{
                                        padding: '40px',
                                        background: sectionBg,
                                        border: `1px solid rgba(250,173,20,0.15)`,
                                        borderRadius: 16,
                                    }}>
                                        <div style={{ color: goldColor, fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                                            Sứ mệnh của chúng tôi
                                        </div>
                                        <Title level={3} style={{ color: textMain, fontWeight: 800, marginBottom: 16 }}>
                                            Nâng cao chất lượng giáo dục qua công nghệ
                                        </Title>
                                        <Paragraph style={{ color: textSub, lineHeight: 1.8, fontSize: '0.95rem' }}>
                                            Chúng tôi tin rằng một hệ thống thi cử công bằng, minh bạch và hiệu quả là nền tảng của một nền giáo dục chất lượng. EduPro ra đời để hiện thực hóa điều đó.
                                        </Paragraph>
                                        <Paragraph style={{ color: textSub, lineHeight: 1.8, fontSize: '0.95rem', margin: 0 }}>
                                            Với đội ngũ kỹ thuật và giáo dục giàu kinh nghiệm, chúng tôi liên tục cải tiến hệ thống để phục vụ tốt nhất cho giảng viên và sinh viên.
                                        </Paragraph>
                                    </div>
                                </motion.div>
                            </Col>

                            <Col xs={24} md={12}>
                                <motion.div variants={fadeUp}>
                                    <div style={{ padding: '40px', background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}>
                                        <div style={{ color: goldColor, fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                                            Giá trị cốt lõi
                                        </div>
                                        <Title level={3} style={{ color: textMain, fontWeight: 800, marginBottom: 24 }}>
                                            Cam kết của EduPro
                                        </Title>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                            {values.map((v, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <div style={{
                                                        width: 28, height: 28,
                                                        borderRadius: 8,
                                                        background: 'rgba(250,173,20,0.12)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        flexShrink: 0,
                                                    }}>
                                                        <CheckCircleOutlined style={{ color: goldColor, fontSize: 14 }} />
                                                    </div>
                                                    <Text style={{ color: textMain, fontSize: '0.95rem', fontWeight: 500 }}>{v}</Text>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </Col>
                        </Row>
                    </motion.div>

                </div>
            </Content>
        </Layout>
    );
};

export default AboutPage;
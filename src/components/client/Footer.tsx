import { Layout, Row, Col, Typography, Space, Divider } from "antd";
import { AiFillTikTok, AiFillYoutube } from "react-icons/ai";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { SiZalo } from "react-icons/si";
import { FaGraduationCap } from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Link } from "react-router";

const { Footer: AntFooter } = Layout;
const { Title, Text, Paragraph } = Typography;

interface FooterProps {
    theme: 'light' | 'dark';
}

const Footer = ({ theme }: FooterProps) => {

    const isDark = theme === 'dark';
    const bg = isDark ? '#0d141c' : '#f8fafc';
    const borderTop = isDark ? '1px solid rgba(250,173,20,0.15)' : '1px solid rgba(0,0,0,0.07)';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const headingColor = isDark ? '#e2e8f0' : '#1a2733';
    const goldColor = '#faad14';
    const dividerColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

    const linkStyle: React.CSSProperties = {
        textDecoration: 'none',
        color: textColor,
        fontSize: '0.9rem',
        transition: 'color 0.2s',
        display: 'block',
        lineHeight: '2',
    };

    const iconLinkStyle: React.CSSProperties = {
        color: textColor,
        fontSize: 22,
        transition: 'color 0.2s, transform 0.2s',
        display: 'inline-flex',
    };

    const quickLinks = [
        { to: '/', label: 'Trang chủ' },
        { to: '/exam-structure', label: 'Chủ đề đề thi' },
        { to: '/about', label: 'Về chúng tôi' },
        { to: '/contact', label: 'Liên hệ' },
        { to: '/admin', label: 'Trang quản trị' },
    ];

    return (
        <AntFooter style={{ padding: 0, background: bg, borderTop }}>

            <style>{`
                .edu-footer a:hover {
                    color: ${goldColor} !important;
                }
                .edu-footer .social-icon:hover {
                    color: ${goldColor} !important;
                    transform: translateY(-3px);
                }
            `}</style>

            <div className="edu-footer" style={{ padding: '52px 60px 32px' }}>
                <Row gutter={[40, 40]}>

                    {/* Brand */}
                    <Col xs={24} md={7}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{
                                width: 40, height: 40,
                                background: 'linear-gradient(135deg, #faad14, #ff8c00)',
                                borderRadius: 12,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 20, color: '#fff',
                                boxShadow: '0 2px 8px rgba(250,173,20,0.35)',
                                flexShrink: 0,
                            }}>
                                <FaGraduationCap />
                            </div>
                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: headingColor, letterSpacing: '-0.3px' }}>
                                Edu<span style={{ color: goldColor }}>Pro</span>
                            </span>
                        </div>
                        <Paragraph style={{ color: textColor, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20 }}>
                            Nền tảng quản lý đề thi và cấu trúc thi cử hiện đại, hỗ trợ giảng viên và sinh viên trong quá trình học tập và kiểm tra.
                        </Paragraph>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: goldColor, fontSize: '0.85rem', fontWeight: 600 }}>
                            <PiExamFill />
                            <span>Hệ thống quản lý thi cử</span>
                        </div>
                    </Col>

                    {/* Liên kết nhanh */}
                    <Col xs={24} sm={12} md={5}>
                        <Title level={5} style={{ color: headingColor, marginBottom: 16, fontWeight: 700 }}>
                            Liên kết nhanh
                        </Title>
                        <nav>
                            {quickLinks.map(link => (
                                <Link key={link.to} to={link.to} style={linkStyle} className="footer-nav-link">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </Col>

                    {/* Liên hệ */}
                    <Col xs={24} sm={12} md={6}>
                        <Title level={5} style={{ color: headingColor, marginBottom: 16, fontWeight: 700 }}>
                            Thông tin liên hệ
                        </Title>
                        <Space direction="vertical" size={10}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                <MdLocationOn style={{ color: goldColor, fontSize: 16, marginTop: 2, flexShrink: 0 }} />
                                <Text style={{ color: textColor, fontSize: '0.875rem', lineHeight: 1.5 }}>
                                    Đường Đặng Thai Mai, Phường Tô Hiệu, Sơn La
                                </Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <MdPhone style={{ color: goldColor, fontSize: 16, flexShrink: 0 }} />
                                <Text style={{ color: textColor, fontSize: '0.875rem' }}>0123 456 789</Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <MdEmail style={{ color: goldColor, fontSize: 16, flexShrink: 0 }} />
                                <Text style={{ color: textColor, fontSize: '0.875rem' }}>admin@edupro.edu.vn</Text>
                            </div>
                        </Space>
                    </Col>

                    {/* Mạng xã hội */}
                    <Col xs={24} sm={12} md={6}>
                        <Title level={5} style={{ color: headingColor, marginBottom: 16, fontWeight: 700 }}>
                            Theo dõi chúng tôi
                        </Title>
                        <Space size={14} style={{ marginBottom: 20 }}>
                            {[
                                { href: 'https://facebook.com', icon: <BiLogoFacebookCircle /> },
                                { href: 'https://chat.zalo.me', icon: <SiZalo /> },
                                { href: 'https://tiktok.com', icon: <AiFillTikTok /> },
                                { href: 'https://youtube.com', icon: <AiFillYoutube /> },
                            ].map(({ href, icon }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={iconLinkStyle}
                                    className="social-icon"
                                >
                                    {icon}
                                </a>
                            ))}
                        </Space>
                        <div style={{
                            padding: '10px 14px',
                            borderRadius: 10,
                            background: isDark ? 'rgba(250,173,20,0.08)' : 'rgba(250,173,20,0.06)',
                            border: `1px solid rgba(250,173,20,0.2)`,
                            fontSize: '0.8rem',
                            color: textColor,
                            lineHeight: 1.6,
                        }}>
                            📢 Cập nhật thông tin thi cử và lịch kiểm tra mới nhất qua các kênh truyền thông.
                        </div>
                    </Col>

                </Row>

                <Divider style={{ borderColor: dividerColor, margin: '32px 0 20px' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Text style={{ color: textColor, fontSize: '0.85rem' }}>
                        © {new Date().getFullYear()} <span style={{ color: headingColor, fontWeight: 600 }}>EduPro</span>. Tất cả quyền được bảo lưu.
                    </Text>
                    <Text style={{ color: textColor, fontSize: '0.82rem' }}>
                        Được xây dựng với ❤️ cho giáo dục Việt Nam
                    </Text>
                </div>
            </div>

        </AntFooter>
    );
};

export default Footer;
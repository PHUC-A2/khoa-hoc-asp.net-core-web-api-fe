import { Layout, Menu, Drawer, Button, Dropdown, Space, Switch, Tooltip, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { AiOutlineLogin, AiOutlineLogout, AiOutlineUserAdd, AiFillDashboard } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';
import { FaInfoCircle, FaGraduationCap } from 'react-icons/fa';
import { PiExamFill, PiHouseFill } from 'react-icons/pi';
import { MdContactMail } from 'react-icons/md';
import type { MenuProps } from 'antd';
import { LuMoon } from 'react-icons/lu';
import { IoSettingsOutline, IoSunny } from 'react-icons/io5';

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;

type MenuItem = Required<MenuProps>['items'][number];

interface HeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const Header = ({ theme, toggleTheme }: HeaderProps) => {

    const location = useLocation();
    const currentKey = () => {
        if (location.pathname === '/') return 'home';
        if (location.pathname.startsWith('/exam-structure')) return 'exam-structure';
        if (location.pathname.startsWith('/about')) return 'about';
        if (location.pathname.startsWith('/contact')) return 'contact';
        return '';
    };

    const [drawerVisible, setDrawerVisible] = useState(false);
    const isDark = theme === 'dark';
    const screens = useBreakpoint();

    const handleLogout = async () => { };

    const handleClick: MenuProps['onClick'] = () => {
        if (!screens.md) setDrawerVisible(false);
    };

    const linkStyle = { textDecoration: 'none', color: isDark ? '#e2e8f0' : '#1a2733' };
    const goldColor = '#faad14';

    const mainMenuItems: MenuItem[] = [
        {
            label: <Link to="/" style={linkStyle}>Trang chủ</Link>,
            key: 'home',
            icon: <PiHouseFill />
        },
        {
            label: <Link to="/exam-structure" style={linkStyle}>Chủ đề đề thi</Link>,
            key: 'exam-structure',
            icon: <PiExamFill />
        },
        {
            label: <Link to="/about" style={linkStyle}>Về chúng tôi</Link>,
            key: 'about',
            icon: <FaInfoCircle />
        },
        {
            label: <Link to="/contact" style={linkStyle}>Liên hệ</Link>,
            key: 'contact',
            icon: <MdContactMail />
        },
    ];

    const settingsMenu: MenuProps['items'] = [
        { label: <Link to="#" style={linkStyle}>Tài khoản</Link>, key: 'account', icon: <MdAccountCircle /> },
        { label: <Link to="#" style={linkStyle} onClick={handleLogout}>Đăng xuất</Link>, key: 'logout', icon: <AiOutlineLogout /> },
        { label: <Link to="/login" style={linkStyle}>Đăng nhập</Link>, key: 'login', icon: <AiOutlineLogin /> },
        { label: <Link to="/register" style={linkStyle}>Đăng ký</Link>, key: 'register', icon: <AiOutlineUserAdd /> },
        { label: <Link to="/admin" style={linkStyle}>Trang quản trị</Link>, key: 'admin', icon: <AiFillDashboard /> },
    ];

    const bg = isDark ? 'rgba(13, 20, 28, 0.92)' : 'rgba(255,255,255,0.92)';
    const borderBottom = isDark ? '1px solid rgba(250,173,20,0.15)' : '1px solid rgba(0,0,0,0.06)';

    return (
        <>
            <style>{`
                .edu-header .ant-menu-item-selected a,
                .edu-header .ant-menu-item-selected .anticon {
                    color: ${goldColor} !important;
                }
                .edu-header .ant-menu-item-selected::after {
                    border-bottom-color: ${goldColor} !important;
                }
                .edu-header .ant-menu-horizontal > .ant-menu-item:hover a,
                .edu-header .ant-menu-horizontal > .ant-menu-item:hover .anticon {
                    color: ${goldColor} !important;
                }
                .edu-header .ant-menu-horizontal > .ant-menu-item:hover::after {
                    border-bottom-color: ${goldColor} !important;
                }
                .edu-header-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    flex-shrink: 0;
                    margin-right: 32px;
                }
                .edu-header-logo-icon {
                    width: 36px;
                    height: 36px;
                    background: linear-gradient(135deg, #faad14, #ff8c00);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    color: #fff;
                    flex-shrink: 0;
                    box-shadow: 0 2px 8px rgba(250,173,20,0.4);
                }
                .edu-header-logo-text {
                    font-size: 1.1rem;
                    font-weight: 800;
                    letter-spacing: -0.3px;
                    color: ${isDark ? '#e2e8f0' : '#1a2733'};
                    line-height: 1;
                }
                .edu-header-logo-text span {
                    color: ${goldColor};
                }
            `}</style>

            <AntHeader className="edu-header" style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                position: 'fixed',
                width: '100%',
                zIndex: 1000,
                background: bg,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom,
                height: 64,
            }}>

                {/* Logo */}
                <Link to="/" className="edu-header-logo">
                    <div className="edu-header-logo-icon">
                        <FaGraduationCap />
                    </div>
                    {screens.sm !== false && (
                        <div className="edu-header-logo-text">
                            Edu<span>Pro</span>
                        </div>
                    )}
                </Link>

                {/* Menu chính */}
                {screens.md ? (
                    <Menu
                        onClick={handleClick}
                        selectedKeys={[currentKey()]}
                        mode="horizontal"
                        theme={isDark ? 'dark' : 'light'}
                        items={mainMenuItems}
                        style={{
                            background: 'transparent',
                            borderBottom: 'none',
                            flex: 1,
                        }}
                    />
                ) : (
                    <div style={{ flex: 1 }}>
                        <Button
                            type="text"
                            icon={<MenuOutlined />}
                            onClick={() => setDrawerVisible(true)}
                            style={{ color: isDark ? '#e2e8f0' : '#1a2733' }}
                        />
                    </div>
                )}

                {/* Right controls */}
                <Space size="middle">
                    <Tooltip title={isDark ? 'Giao diện sáng' : 'Giao diện tối'}>
                        <Switch
                            size="small"
                            checked={isDark}
                            onChange={toggleTheme}
                            checkedChildren={<LuMoon />}
                            unCheckedChildren={<IoSunny />}
                        />
                    </Tooltip>

                    <Dropdown menu={{ items: settingsMenu }} placement="bottomRight">
                        <Button
                            type="text"
                            icon={<IoSettingsOutline />}
                            style={{ color: isDark ? '#e2e8f0' : '#1a2733' }}
                        >
                            {screens.md ? 'Tài khoản' : ''}
                        </Button>
                    </Dropdown>
                </Space>

                {/* Drawer mobile */}
                <Drawer
                    title={
                        <span style={{ color: goldColor, fontWeight: 700 }}>
                            <FaGraduationCap style={{ marginRight: 8 }} />
                            EduPro
                        </span>
                    }
                    placement="left"
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                    size="default"
                    styles={{
                        body: { padding: 0, background: isDark ? '#0d141c' : '#fff' },
                        header: { background: isDark ? '#0d141c' : '#fff', borderBottom: `1px solid rgba(250,173,20,0.2)` }
                    }}
                >
                    <Menu
                        onClick={handleClick}
                        selectedKeys={[currentKey()]}
                        mode="inline"
                        theme={isDark ? 'dark' : 'light'}
                        items={mainMenuItems}
                        style={{ background: 'transparent', border: 'none' }}
                    />
                </Drawer>

            </AntHeader>
        </>
    );
};

export default Header;
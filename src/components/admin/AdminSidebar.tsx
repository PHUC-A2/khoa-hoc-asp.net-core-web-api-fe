import { Layout, Menu, Breadcrumb, Button, Grid, Drawer, Switch, Tooltip } from 'antd';
import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    LoginOutlined,
} from '@ant-design/icons';
import { MdFeaturedPlayList } from 'react-icons/md';
import { FaReact, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { IoMenu, IoSunny } from 'react-icons/io5';
import { LuMoon } from 'react-icons/lu';
const { Sider, Header, Content } = Layout;
const { useBreakpoint } = Grid;

interface AdminSidebarProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ theme, toggleTheme }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const screens = useBreakpoint();

    const isDark = theme === 'dark';
    const siderWidth = collapsed ? 80 : 200;
    const handleLogout = async () => {
        try {
            // const res = await logout();
            // if (res?.data?.statusCode === 200) {
            //     dispatch(setLogout());
            toast.success('Đăng xuất thành công');
            navigate('/');
            // }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!');
        }
    };

    const menuItems = [
        { key: '1', label: <Link to="/admin" style={{ textDecoration: 'none' }}>Dashboard</Link>, icon: <FaReact className='icon-spin' /> },
        {
            key: 'sub1',
            label: 'Tính năng',
            icon: <MdFeaturedPlayList />,
            children: [
                {
                    key: '2',
                    label: <Link to="/admin/cau-truc-de" style={{ textDecoration: 'none' }}>QL Cấu Trúc Đề</Link>,
                    icon: <UserOutlined />,
                },
                {
                    key: '3',
                    label: <Link to="/admin/cautrucde-thanhphan" style={{ textDecoration: 'none' }}>QL Cấu Trúc Đề Thành Phần</Link>,
                    icon: <UserOutlined />,
                },
                {
                    key: '4',
                    label: <Link to="/admin/cautrucde-thanhphan-sub" style={{ textDecoration: 'none' }}>QL Cấu Trúc Đề Thành Phần Sub</Link>,
                    icon: <UserOutlined />,
                },
            ],
        },
        {
            key: 'sub2',
            label: 'Cài đặt',
            icon: <SettingOutlined />,
            children: [
                { key: '8', label: <Link to="/" style={{ textDecoration: 'none' }}>Trang khách</Link>, icon: <UserOutlined /> },
                { key: '9', label: <span style={{ cursor: 'pointer' }}>Tài khoản</span>, icon: <FaUserCircle /> },
                { key: '10', label: <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Đăng xuất</span>, icon: <LogoutOutlined /> },
                { key: '1q', label: <span onClick={() => navigate("/login")} style={{ cursor: 'pointer' }}>Đăng nhập</span>, icon: <LoginOutlined /> },
            ],
        },
    ];

    const breadcrumbText = location.pathname.split('/').filter(Boolean).join(' / ');

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Desktop Sider */}
            {screens.md && (
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    theme={isDark ? 'dark' : 'light'}
                    style={{ position: 'fixed', height: '100vh', left: 0, top: 0, bottom: 0, zIndex: 100 }}
                >
                    <Menu
                        theme={isDark ? 'dark' : 'light'}
                        mode="inline"
                        items={menuItems}
                        defaultSelectedKeys={['1']}
                        style={{ borderRight: 0 }}
                    />
                </Sider>
            )}

            {/* Mobile Drawer */}
            {!screens.md && (
                <Drawer
                    title="Menu"
                    placement="left"
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                    styles={{
                        body: {
                            padding: 0
                        }
                    }}
                    closeIcon={true}
                    style={{
                        background: isDark ? '#001529' : '#fff', // set màu nền
                    }}
                    size={200}
                    mask={false} // tắt overlay để vẫn tương tác với body
                >
                    <Menu
                        mode="inline"
                        items={menuItems}
                        theme={isDark ? 'dark' : 'light'}
                        onClick={() => setDrawerVisible(false)}
                    />
                </Drawer>
            )}

            {/* Main Layout */}
            <Layout style={{ marginLeft: screens.md ? siderWidth : 0, transition: 'all 0.2s' }}>
                {/* Header */}
                <Header
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        zIndex: 99,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px 24px 24px 24px',
                        background: isDark ? '#001529' : '#fff',
                        color: isDark ? '#fff' : '#000',
                        transition: 'all 0.2s',
                        height: '90px'
                    }}
                >
                    {/* BÊN TRÁI */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: screens.md ? siderWidth : 0 }}>
                        {!screens.md && (
                            <Button
                                type="text"
                                onClick={() => setDrawerVisible(!drawerVisible)}
                                style={{ color: isDark ? '#fff' : '#000', fontSize: 24 }}
                            >
                                <Tooltip title={drawerVisible ? 'Đóng menu' : 'Mở menu'}>
                                    <IoMenu />
                                </Tooltip>
                            </Button>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h5>
                                <FaReact className='icon-spin' /> {" "}
                                Chào mừng bạn đến với trang quản trị!
                            </h5>
                            <Breadcrumb
                                items={[{ title: breadcrumbText }]}
                                style={{ color: isDark ? '#fff' : '#000', marginBottom: 0 }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Tooltip placement="topLeft" title={isDark ? 'Giao diện sáng' : 'Giao diện tối'}>
                            <Switch
                                size='small'
                                checked={isDark}
                                onChange={toggleTheme}
                                checkedChildren={<LuMoon />}
                                unCheckedChildren={<IoSunny />}
                            />
                        </Tooltip>
                    </div>
                </Header>

                {/* Content */}
                <Content
                    style={{
                        marginTop: 80,
                        padding: 24,
                        background: isDark ? '#141414' : '#f0f2f5',
                        minHeight: 'calc(100vh - 64px)',
                        marginLeft: screens.md ? 0 : 0,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminSidebar;

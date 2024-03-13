import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const { Header, Sider } = Layout
const items = [
    {
        label:'数据概览',
        key:'/home',
        icon:<HomeOutlined />
    },
    {
        label:'内容管理',
        key:'/article',
        icon:<DiffOutlined />
    },
    {
        label:'发布文章',
        key:'/publish',
        icon:<EditOutlined />
    }
]
const _Layout = () => {
    const navigate = useNavigate()
    const onClick =(e) => {
        // console.log(e)
        navigate(e.key)
    }
    // 反向高亮
    const location = useLocation()
    console.log(location.pathname)
    const SelectedKey=location.pathname
  return (
    <Layout>
      <Header className="header">
        <div className="user-info">
          <span className="user-name">user.name</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={SelectedKey}
            style={{ height: '100%', borderRight: 0 }}
            onClick={onClick}
            items = {items}
          >

          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
            {/* 二级路由出口 */}
            <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default _Layout
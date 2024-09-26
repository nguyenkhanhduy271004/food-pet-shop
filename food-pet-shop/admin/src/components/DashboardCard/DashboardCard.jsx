import React from 'react'
import { Card, Statistic, Space } from 'antd'
import CountUp from 'react-countup';
import './DashboardCard.scss'

const formatter = (value) => <CountUp end={value} separator="," />;


function DashboardCard({ icon, title, value, color }) {
    return (
        <Card className='card' style={{ backgroundColor: color }}>
            <Space direction='horizontal'>
                {icon}
                <Statistic title={title} value={value} className='statistic' formatter={formatter} />
            </Space>
        </Card>
    )
}

export default DashboardCard

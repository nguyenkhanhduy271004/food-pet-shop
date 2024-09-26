import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import dayjs from 'dayjs';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function DashboardChart({ orders }) {
    const [revenueData, setRevenueData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        if (!orders || !Array.isArray(orders)) {
            return;
        }

        // Group orders by month and calculate total revenue
        const monthlyRevenue = orders.reduce((acc, order) => {
            const month = dayjs(order.date).format('YYYY-MM');
            if (acc[month]) {
                acc[month] += order.amount;
            } else {
                acc[month] = order.amount;
            }
            return acc;
        }, {});

        // Prepare data for the chart
        const labels = Object.keys(monthlyRevenue).sort();
        const revenues = Object.values(monthlyRevenue);

        const dataSource = {
            labels,
            datasets: [
                {
                    label: "Revenue",
                    data: revenues,
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
            ],
        };

        setRevenueData(dataSource);
    }, [orders]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Monthly Revenue",
            },
        },
    };

    return <Bar options={options} data={revenueData} />;
}

export default DashboardChart;

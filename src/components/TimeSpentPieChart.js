import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, Text } from 'recharts';
import { formatTimeSpent } from '../utils/timeUtils'

const TimeSpentPieChart = ({ data }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const renderLabel = (entry) => {
        const { cx, cy, midAngle, outerRadius, name, percent } = entry;
        const sin = Math.sin(-Math.PI / 180 * midAngle);
        const cos = Math.cos(-Math.PI / 180 * midAngle);
        const sx = cx + outerRadius * cos;
        const sy = cy + outerRadius * sin;
        const ex = sx + (cos >= 0 ? 1 : -1) * 22;
        const ey = sy;
        const textAnchor = cos >= 0 ? 'start' : 'end';
        const payload = `${name} ${(percent * 100).toFixed(2)}%`;

        return (
            <Text x={ex} y={ey} dy={0} textAnchor={textAnchor}>
                {payload}
            </Text>
        );
    };

    const CustomTooltip = ({ payload, label, active }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${payload[0].name} : ${formatTimeSpent(payload[0].value)}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="flex justify-center items-center">
            <PieChart width={550} height={300}>
                <Pie
                    data={data}
                    cx={250}
                    cy={150}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={renderLabel}
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
        </div>
    );
};

export default TimeSpentPieChart;

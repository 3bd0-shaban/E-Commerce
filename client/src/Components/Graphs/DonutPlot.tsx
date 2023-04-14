'use client';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const DonutPlot: React.FC = () => {
    const data = [
        {
            value: 15,
            type: 'Hemoglobin',
        },
        {
            value: 30,
            type: 'Suger',
        },
        {
            value: 50,
            type: 'Heartbeat',
        },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
    return (
        <PieChart width={300} height={280}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="type"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                // label={{
                //     position: 'inside',
                //     content: '{value}',
                //     fontSize: 14,
                //     fill: '#fff',
                // }}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend />
            <Tooltip />
        </PieChart>
    );
};

export default DonutPlot;

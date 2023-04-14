'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Data {
    timePeriod: string;
    value: number;
}

interface AreaPlotProps {
    color: string;
    data: Data[];
}

const AreaPlot: React.FC<AreaPlotProps> = ({ color, data }) => {
    const gradientFillId = `gradient-fill-${color}`;
    const gradientStrokeId = `gradient-stroke-${color}`;

    return (
        <ResponsiveContainer width="100%" height="80%" className="m-0 p-0">
            <AreaChart width={100} height={200} data={data} className="w-full h-full">
                <defs>
                    <linearGradient id={gradientFillId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor={color} stopOpacity={.8} />
                        <stop offset="70%" stopColor="#fff" stopOpacity={0} />
                        <stop offset="100%" stopColor="#fff" stopOpacity={0} />
                        <stop offset="50%" stopColor={color} stopOpacity={0} />

                    </linearGradient>
              
                </defs>
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2.5}
                    fill={`url(#${gradientFillId})`}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaPlot;

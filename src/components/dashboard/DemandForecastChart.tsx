import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { subDays, format, addDays } from 'date-fns';
// Mock AI service response
const generateForecastData = () => {
  const data = [];
  const today = new Date();
  // Historical data
  for (let i = 29; i >= 0; i--) {
    data.push({
      date: format(subDays(today, i), 'MMM d'),
      actual: Math.floor(Math.random() * (200 - 100 + 1) + 100),
      predicted: null,
    });
  }
  // Forecasted data
  let lastActual = data[data.length - 1].actual;
  for (let i = 1; i <= 30; i++) {
    const predictedValue = lastActual * (1 + (Math.random() - 0.45) * 0.1);
    data.push({
      date: format(addDays(today, i), 'MMM d'),
      actual: null,
      predicted: Math.floor(predictedValue),
    });
    lastActual = predictedValue;
  }
  return data;
};
const data = generateForecastData();
export function DemandForecastChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          interval={6}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#0A2540"
          strokeWidth={2}
          dot={false}
          name="Actual Sales"
        />
        <Line
          type="monotone"
          dataKey="predicted"
          stroke="#00C49F"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          name="AI Forecast"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
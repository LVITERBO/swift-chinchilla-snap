import { faker } from '@faker-js/faker';

export type FinanceEntry = {
  id: string;
  date: string;
  category: string;
  description: string;
  type: 'revenue' | 'cost';
  amount: number;
};

export type ChartData = {
  month: string;
  revenue: number;
  cost: number;
};

export const generateMockFinanceData = (count: number = 20): FinanceEntry[] => {
  const data: FinanceEntry[] = [];
  for (let i = 0; i < count; i++) {
    const type = faker.helpers.arrayElement(['revenue', 'cost']);
    data.push({
      id: faker.string.uuid(),
      date: faker.date.past({ years: 1 }).toISOString().split('T')[0],
      category: faker.helpers.arrayElement([
        'Sales', 'Marketing', 'Operations', 'Salaries', 'Rent', 'Utilities', 'Product', 'Services', 'Investments'
      ]),
      description: faker.lorem.sentence(5),
      type: type,
      amount: parseFloat(faker.finance.amount({ min: 50, max: 5000, dec: 2 })),
    });
  }
  return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const generateMockChartData = (): ChartData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    revenue: parseFloat(faker.finance.amount({ min: 10000, max: 50000, dec: 2 })),
    cost: parseFloat(faker.finance.amount({ min: 5000, max: 30000, dec: 2 })),
  }));
};
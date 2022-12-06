import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '~/components/expenses/Chart';
import DUMMY_EXPENSES from '~/components/data/expenses.data';
import expensesStyles from '~/styles/expenses.css';

export default function ExpensesAnalysisPage() {
	return (
		<main>
			<Chart expenses={DUMMY_EXPENSES} />
			<ExpenseStatistics expenses={DUMMY_EXPENSES} />
		</main>
	);
}

export function links() {
	return [
		{
			rel: 'stylesheet',
			href: expensesStyles,
		},
	];
}

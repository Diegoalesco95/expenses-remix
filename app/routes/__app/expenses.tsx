import { Link, Outlet } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';
import DUMMY_EXPENSES from '~/components/data/expenses.data';
import ExpensesList from '~/components/expenses/ExpensesList';

export default function ExpenseLayout() {
	return (
		<>
			<Outlet />
			<main>
				<section id='expenses-actions'>
					<Link to='add'>
						<FaPlus />
						<span>Add Expense</span>
					</Link>
					<a href='/expenses/raw'>
						<FaDownload />
						<span>Load Raw Data</span>
					</a>
				</section>
				<ExpensesList expenses={DUMMY_EXPENSES} />
			</main>
		</>
	);
}

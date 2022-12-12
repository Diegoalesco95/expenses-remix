import type { LoaderFunction } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';
import ExpensesList from '~/components/expenses/ExpensesList';
import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expenses.server';

export default function ExpenseLayout() {
	const expenses = useLoaderData();

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
				<ExpensesList expenses={expenses} />
			</main>
		</>
	);
}

export const loader: LoaderFunction = async ({ request }) => {
	const userId = await requireUserSession(request);

	return getExpenses(userId);
};

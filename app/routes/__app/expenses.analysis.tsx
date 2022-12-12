import type { LoaderFunction } from '@remix-run/node';
import type { CatchBoundaryComponent } from '@remix-run/react/dist/routeModules';

import { useCatch, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';

import Chart from '~/components/expenses/Chart';
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Error from '~/components/util/Error';
import { getExpenses } from '~/data/expenses.server';
import { requireUserSession } from '~/data/auth.server';

export default function ExpensesAnalysisPage() {
	const expenses = useLoaderData();

	return (
		<main>
			<Chart expenses={expenses} />
			<ExpenseStatistics expenses={expenses} />
		</main>
	);
}

export const loader: LoaderFunction = async ({ request }) => {
	const userId = await requireUserSession(request);

	const expenses = await getExpenses(userId);

	if (!expenses || expenses.length === 0) {
		throw json(
			{
				message: 'Could not load expenses for the requested analysis.',
			},
			{
				status: 404,
				statusText: 'Expenses not found',
			},
		);
	}

	return expenses;
};

export const CatchBoundary: CatchBoundaryComponent = () => {
	const caughtResponse = useCatch();

	return (
		<main>
			<Error title={caughtResponse.statusText}>
				<p>
					{caughtResponse.data?.message ||
						'Something went wrong - could not load expenses'}
				</p>
			</Error>
		</main>
	);
};

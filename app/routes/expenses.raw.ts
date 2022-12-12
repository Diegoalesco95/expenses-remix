import type { LoaderFunction } from '@remix-run/node';
import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expenses.server';

export const loader: LoaderFunction = async ({ request }) => {
	const userId = await requireUserSession(request);
	return getExpenses(userId);
};

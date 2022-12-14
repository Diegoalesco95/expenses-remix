import type { ActionFunction } from '@remix-run/node';
import type { Expense } from '~/interfaces/expense.interface';

import { redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { addExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';
import { requireUserSession } from '~/data/auth.server';

export default function AddExpensesPage() {
	const navigate = useNavigate();

	function closeHandler() {
		navigate('..');
	}

	return (
		<Modal onClose={closeHandler}>
			<ExpenseForm />
		</Modal>
	);
}

export const action: ActionFunction = async ({ request }) => {
	const userId = await requireUserSession(request);
	const formaData = await request.formData();
	const expensesData = Object.fromEntries(formaData) as unknown as Expense;

	try {
		validateExpenseInput(expensesData);
	} catch (error) {
		return error;
	}

	await addExpense(expensesData, userId);
	return redirect('/expenses');
};

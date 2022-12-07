import type { ActionFunction } from '@remix-run/node';
import type { Expense } from '~/interfaces/expense.interface';

import { redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { deleteExpense, updateExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';

export default function UpdateExpensePage() {
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

export const action: ActionFunction = async ({ params, request }) => {
	const expenseId = params.id as string;

	if (request.method === 'PATCH') {
		const formData = await request.formData();
		const expenseData = Object.fromEntries(formData) as unknown as Expense;

		try {
			validateExpenseInput(expenseData);
		} catch (error) {
			console.log(error);
			return error;
		}

		await updateExpense(expenseId, expenseData);
		return redirect('/expenses');
	} else if (request.method === 'DELETE') {
		await deleteExpense(expenseId);
		return {
			deletedId: expenseId,
		};
	}
};

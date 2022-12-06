import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { addExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';

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
	const formaData = await request.formData();
	const expensesData = Object.fromEntries(formaData);

	try {
		validateExpenseInput(expensesData);
	} catch (error) {
		return error;
	}

	await addExpense(expensesData);
	return redirect('/expenses');
};

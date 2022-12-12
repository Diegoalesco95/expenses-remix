import type { Expense } from '~/interfaces/expense.interface';
import { prisma } from './database.server';

export async function addExpense(expenseData: Expense, userId: string) {
	try {
		await prisma.expense.create({
			data: {
				title: expenseData.title,
				amount: +expenseData.amount,
				date: new Date(expenseData.date),
				User: { connect: { id: userId } },
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error('Failed to add expense.');
	}
}

export async function getExpenses(userId: string) {
	if (!userId) {
		throw new Error('Failed to get expenses.');
	}

	try {
		const expenses = await prisma.expense.findMany({
			where: { userId },
			orderBy: {
				date: 'desc',
			},
		});

		return expenses;
	} catch (error) {
		console.log(error);
		throw new Error('Failed to get expenses.');
	}
}

export async function getExpense(id: string) {
	try {
		const expense = await prisma.expense.findFirst({
			where: {
				id,
			},
		});
		return expense;
	} catch (error) {
		console.log(error);
		throw new Error('Failed to get a expense.');
	}
}

export async function updateExpense(id: string, expenseData: Expense) {
	try {
		await prisma.expense.update({
			where: { id },
			data: {
				title: expenseData.title,
				amount: +expenseData.amount,
				date: new Date(expenseData.date),
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error('Failed to update expense.');
	}
}

export async function deleteExpense(id: string) {
	try {
		await prisma.expense.delete({
			where: { id },
		});
	} catch (error) {
		console.log(error);
		throw new Error('Failed to delete expense.');
	}
}

import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { compare, hash } from 'bcryptjs';
import { prisma } from './database.server';

const SESSION_SECRET = process.env.SESSION_SECRET as string;

const sessionStorage = createCookieSessionStorage({
	cookie: {
		secure: process.env.NODE_ENV === 'production',
		secrets: [SESSION_SECRET],
		sameSite: 'lax',
		maxAge: 30 * 24 * 60 * 60, // 30 days
		httpOnly: true,
	},
});

async function createUserSession(userId: string, redirectPath: string) {
	const session = await sessionStorage.getSession();
	session.set('userId', userId);

	return redirect(redirectPath, {
		headers: {
			'Set-Cookie': await sessionStorage.commitSession(session),
		},
	});
}

async function getExistingUser(email) {
	const existingUser = await prisma.user.findFirst({ where: { email } });
	return existingUser;
}

function throwError(message: string, code: number) {
	const error = new Error(
		'Could not log you in, please check the provided credentials.',
	);
	error.status = 401;
	throw error;
}

export async function signup({ email, password }) {
	const existingUser = await getExistingUser(email);

	if (existingUser) {
		throwError(
			'A user with the provided email address exists already',
			422,
		);
	}

	const passwordHash = await hash(password, 12);

	const user = await prisma.user.create({
		data: { email, password: passwordHash },
	});

	return createUserSession(user.id, '/expenses');
}

export async function login({ email, password }) {
	const existingUser = await getExistingUser(email);

	if (!existingUser) {
		throwError(
			'Could not log you in, please check the provided credentials.',
			401,
		);
	}

	const passwordCorrect = await compare(password, existingUser.password);

	if (!passwordCorrect) {
		throwError(
			'Could not log you in, please check the provided credentials.',
			401,
		);
	}

	return createUserSession(existingUser.id, '/expenses');
}

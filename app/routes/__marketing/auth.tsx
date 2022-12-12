import type { ActionFunction } from '@remix-run/node';
import AuthForm from '~/components/auth/AuthForm';
import { login, signup } from '~/data/auth.server';
import { validateCredentials } from '~/data/validation.server';

import authStyles from '~/styles/auth.css';

export default function AuthPage() {
	return <AuthForm />;
}

export const action: ActionFunction = async ({ request }) => {
	const searchParams = new URL(request.url).searchParams;
	const authMode = searchParams.get('mode') || 'login';

	const formaData = await request.formData();
	const credentials = Object.fromEntries(formaData);

	try {
		validateCredentials(credentials);
	} catch (error) {
		return error;
	}

	try {
		if (authMode === 'login') {
			return await login(credentials);
		} else {
			return await signup(credentials);
		}
	} catch (error) {
		console.log('👀', error.status, error.message);

		if (error.status === 422 || error.status === 401) {
			return {
				credentials: error.message,
			};
		}

		return {
			error: error.message,
		};
	}
};

export function links() {
	return [
		{
			rel: 'stylesheet',
			href: authStyles,
		},
	];
}

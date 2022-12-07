import type { ActionFunction } from '@remix-run/node';
import AuthForm from '~/components/auth/AuthForm';

import authStyles from '~/styles/auth.css';

export default function AuthPage() {
	return <AuthForm />;
}

export const action: ActionFunction = async ({ request }) => {
	const searchParams = new URL(request.url).searchParams;
	const authMode = searchParams.get('mode') || 'login';

	const formaData = await request.formData();
	const credentials = Object.fromEntries(formaData);

	if (authMode === 'login') {
	} else {
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

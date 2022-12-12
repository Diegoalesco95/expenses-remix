import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { destroyUserSession } from '~/data/auth.server';

export const action: ActionFunction = ({ request }) => {
	if (request.method !== 'POST') {
		throw json({ message: 'Invalid request method' }, { status: 400 });
	}

	return destroyUserSession(request);
};

import type { MetaFunction } from '@remix-run/node';
import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
} from '@remix-run/react';

import sharedStyles from '~/styles/shared.css';
import Error from '~/components/util/Error';

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'New Remix App',
	viewport: 'width=device-width,initial-scale=1',
});

interface Props {
	title?: string;
	children: React.ReactNode;
}

const Document: React.FC<Props> = ({ title, children }) => {
	return (
		<html lang='en'>
			<head>
				<title>{title}</title>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
};

export default function App() {
	return (
		<Document>
			<Outlet></Outlet>
		</Document>
	);
}

export function CatchBoundary() {
	const caughtResponse = useCatch();

	return (
		<Document title={caughtResponse.statusText}>
			<main>
				<Error title={caughtResponse.statusText}>
					<p>
						{caughtResponse.data?.message ||
							'Something went wrong. Please try again'}
					</p>
					<p>
						Back to <Link to='/'>safety</Link>.
					</p>
				</Error>
			</main>
		</Document>
	);
}

export function ErrorBoundary() {}

export function links() {
	return [
		{
			rel: 'stylesheet',
			href: sharedStyles,
		},
		{
			rel: 'preconnect',
			href: 'https://fonts.googleapis.com',
		},
		{
			rel: 'preconnect',
			href: 'https://fonts.gstatic.com',
			crossOrigin: 'true',
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap',
		},
	];
}

import type { ErrorBoundaryComponent, MetaFunction } from '@remix-run/node';
import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
	useMatches,
} from '@remix-run/react';

import sharedStyles from '~/styles/shared.css';
import Error from '~/components/util/Error';

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Remix Expenses',
	viewport: 'width=device-width,initial-scale=1',
});

interface Props {
	title?: string;
	children: React.ReactNode;
}

const Document: React.FC<Props> = ({ title, children }) => {
	const matches = useMatches();

	const disableJS = matches.some((match) => match.handle?.disableJS);

	return (
		<html lang='en'>
			<head>
				{title && <title>{title}</title>}
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				{!disableJS && <Scripts />}
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

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
	return (
		<Document title='An error occurred'>
			<main>
				<Error title='An error occurred'>
					<p>
						{error.message ||
							'Something went wrong. Please try again'}
					</p>
					<p>
						Back to <Link to='/'>safety</Link>.
					</p>
				</Error>
			</main>
		</Document>
	);
};

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

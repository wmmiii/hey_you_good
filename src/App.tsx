import React from 'react';
import CheckIn from './pages/CheckIn';
import History from './pages/History';
import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import styles from './App.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Theme } from './Theme';
import { UserSettingsProvider } from './contexts/UserSettingsContext';

export function App() {

	return (
		<div className={styles.wrapper}>
			<UserSettingsProvider>
				<Theme />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/login" element={<Login />} />
						<Route path="/checkin" element={<CheckIn />} />
						<Route path="/history" element={<History />} />
						<Route path="/settings" element={<Settings />} />

						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</UserSettingsProvider>
		</div>
	);
}

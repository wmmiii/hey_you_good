import History from './pages/History';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import React from 'react';
import Settings from './pages/Settings';
import Tags from './pages/Tags';
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
						<Route path="/history" element={<History />} />
						<Route path="/tags" element={<Tags />} />
						<Route path="/settings" element={<Settings />} />

						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</UserSettingsProvider>
		</div>
	);
}

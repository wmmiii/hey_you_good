import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CheckIn from './pages/CheckIn';
import History from './pages/History';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';

export function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/checkin" element={<CheckIn />} />
				<Route path="/history" element={<History />} />
				<Route path="/settings" element={<Settings />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PostList from './components/Posts.jsx';
// import SearchComponent from './components/SearchComponent';
import SearchResult from './components/SearchResult';

function App() {
	return (
		<Router>
			<div className="w3-container">
				<h3 className="w3-xlarge w3-text-red">User Posts Record</h3>
				{/* <SearchComponent /> */}
			</div>
			<div className="w3-container">
				<Routes>
					<Route exact path="/" element={<PostList />} />
					<Route path="/search" element={<SearchResult />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;

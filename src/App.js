import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
	const nameRef = useRef();
	const emailRef = useRef();
	const [users, setUsers] = useState([]);
	useEffect(() => {
		fetch("http://localhost:5000/users")
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);
	const handleFormSubmit = (e) => {
		e.preventDefault();
		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const NewUser = { name, email };
		fetch("http://localhost:5000/users", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(NewUser),
		})
			.then((res) => res.json())
			.then((data) => {
				const updatedData = [...users, data];
				setUsers(updatedData);
			});
		nameRef.current.value = "";
		emailRef.current.value = "";
	};
	return (
		<div className="App">
			<h2>Total Users : {users.length}</h2>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						Id : {user.id} Name : {user.name} Email : {user.email}{" "}
					</li>
				))}
			</ul>
			<form onSubmit={handleFormSubmit}>
				<input ref={nameRef} type="text" name="" id="" placeholder="Name" />
				<input ref={emailRef} type="email" name="" id="" placeholder="Email" />
				<input type="submit" value="submit" />
			</form>
		</div>
	);
}

export default App;

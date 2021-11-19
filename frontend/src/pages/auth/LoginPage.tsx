import React, { useState } from "react";

import { Card, FloatingLabel, Form, Button } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";

export function LoginPage() {
	const { signIn } = useAuth();
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	async function handleSignIn() {
		await signIn(username, password);
	}

	return (
		<section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
			<div className="row d-flex justify-content-center align-items-center h-100">
				<div className="col-12 col-md-5 col-lg-4 col-xl-4">
					<Card className="shadow" style={{ borderRadius: "1rem" }}>
						<Card.Body>
							<h3 className="mb-5">Sign In</h3>
							<div className="form-outline mb-4">
								<FloatingLabel
									controlId="usernameInput"
									label="Username"
									className="mb-3"
								>
									<Form.Control
										type="text"
										onChange={(e) => setUsername(e.target.value)}
									/>
								</FloatingLabel>
							</div>
							<div className="form-outline mb-4">
								<FloatingLabel
									controlId="passwordInput"
									label="Password"
									className="mb-3"
								>
									<Form.Control
										type="password"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</FloatingLabel>
							</div>
							<Button
								size="lg"
								variant="primary"
								className="w-100"
								style={{ color: "white" }}
								onClick={handleSignIn}
							>
								Login
							</Button>
						</Card.Body>
					</Card>
				</div>
			</div>
		</section>
	);
}

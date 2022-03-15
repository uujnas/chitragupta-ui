import axios from 'axios';
import React, { useState } from 'react';
import {
  FormContainer,
  Input,
  Label,
  FormControl,
  Btn
} from '../components/formComponents';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // make request to remote api login endpoint
    const response = await axios.post(
      'http://localhost:4000/users/sign_in.json',
      {
        user: { email, password },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    localStorage.setItem('token', response.headers.authorization);
  };

  return (
    <section className="my-8 pt-14">
      <FormContainer>
        <FormControl>
          <Label>E-mail</Label>
          <Input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Password</Label>
          <Input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <Btn type="button" onClick={handleSubmit} className="bg-blue-500">
              <span className="inline-block mr-2 uppercase">Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline-block w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Btn>
            <div>
              <a href="#" className="inline-block underline">
                Forgot Password
              </a>
            </div>
          </div>
        </FormControl>
      </FormContainer>
    </section>
  );
};

export default Login;

'use client'

import { useState } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";

const AuthContainer = () => {
  const [section, setSection] = useState('login');

  return (
    <div className="p-3 border border-black rounded-lg">
      {section === 'login' && <LoginForm setSection={setSection} />}
      {section === 'register' && <RegisterForm setSection={setSection} />}
    </div>
  );
};

export default AuthContainer;
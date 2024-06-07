'use client'

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const RegisterForm = (props) => {
  const { setSection } = props;
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    router.push('/');
    console.log(data);
  };

  console.log(watch("username")); // watch input value by passing the name of it
  console.log(watch("password")); // watch input value by passing the name of it

  return (
    <div className="rounded-lg flex items-center justify-center bg-gray-50 py-5 px-4 w-96 sm:px-6 w-full lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <img src="assets/images/logo.png" alt="kue basah bu eva" width={80} className="rounded-xl" />
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                {...register("username", { required: true })}
              />
              {errors.username && <span>This field is required</span>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && <span>This field is required</span>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Daftar
            </button>
          </div>
        </form>

        <hr />

        <div className="text-sm text-center">
          <a className="text-blue-500 active:text-blue-600 visited:text-purple-600 hover:cursor-pointer" href="#" onClick={() => setSection('login')}>Masuk</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
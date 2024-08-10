import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-24 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-400"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="abc@gmail.com"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-800 sm:text-sm sm:leading-6 pl-1"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-400"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="#"
                  className="font-semibold text-indigo-500 hover:text-indigo-400"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-800 sm:text-sm sm:leading-6 pl-1"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-400"
              >
                Register As
              </label>
            </div>
            <div className="mt-2">
              <select
                id="role"
                name="role"
                autoComplete="role"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-800 sm:text-sm sm:leading-6 pl-1"
              >
                <option value="job-seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400"
          >
            Register here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { UserCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-300">
          Let's get you started!
        </h2>
        <p className="text-gray-500/80">
          Welcome to CareerLink, Feel free to create an account!
        </p>
      </div>

      <div className=" mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
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
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-400"
              >
                Phone
              </label>
            </div>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="text"
                required
                autoComplete="phone-number"
                placeholder="011-1234567890"
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

          <div className="col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-400">
              Profile Photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300/25 px-6 py-10">
              <div className="text-center">
                {/* <Image className="text-white" /> */}
                <div className="mt-2 flex items-center justify-center gap-x-3">
                  <UserCircleIcon
                    aria-hidden="true"
                    className="h-12 w-12 text-gray-300"
                  />
                </div>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="profile-photo"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="profile-photo"
                      name="profile-photo"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-2">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
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
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400"
          >
            Login here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Filter, X } from "lucide-react";
import JobCard from "@/components/sub-components/JobCard";
import { useSelector } from "react-redux";

const filters = [
  {
    id: "Sector",
    name: "Sector",
    options: [
      { value: "information-technology", label: "IT Services", checked: false },
      { value: "technology", label: "Technology", checked: false },
      { value: "accounting", label: "Account & Finance", checked: false },
      {
        value: "healthcare",
        label: "Healthcare & Life Science",
        checked: false,
      },
    ],
  },
  {
    id: "Company Type",
    name: "Company Type",
    options: [
      { value: "corporate", label: "Corporate", checked: false },
      { value: "mnc", label: "Indian MNC", checked: false },
      { value: "startup", label: "Startup", checked: false },
    ],
  },
  {
    id: "Location",
    name: "Location",
    options: [
      { value: "delhi", label: "Delhi NCR", checked: false },
      { value: "bangalore", label: "Bangalore", checked: false },
      { value: "hyderabad", label: "Hyderabar", checked: false },
      { value: "mumbai", label: "Mumbai", checked: false },
      { value: "pune", label: "Pune", checked: false },
    ],
  },
  {
    id: "Salary",
    name: "Salary",
    options: [
      { value: "0-1", label: "0-1lakh", checked: false },
      { value: "1-3", label: "1-3lakh", checked: false },
      { value: "3-5", label: "3-5lakh", checked: false },
      { value: "5-15", label: "5-15lakh", checked: false },
    ],
  },
];

const Jobs = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { allJobs } = useSelector((state) => state.job);

  return (
    <div className="bg-black/70">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-[9999] lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-gray-950 py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-300">
                  Filters Jobs
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-gray-900 p-2 text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-700">
                {filters.map((section) => (
                  <div
                    key={section.id}
                    className="border-t border-gray-700 px-4 py-6"
                  >
                    <h3 className="text-gray-300 mb-4">{section.name}</h3>
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            defaultValue={option.value}
                            defaultChecked={option.checked}
                            id={`filter-mobile-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-800 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-300">
              Filter Jobs
            </h1>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* FILTER SECTION FOR LARGE DEVICES */}
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <div
                    key={section.id}
                    className="border-b border-gray-800 py-6"
                  >
                    <h3 className="text-gray-300 mb-3">{section.name}</h3>
                    <div className="space-y-4">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            defaultValue={option.value}
                            defaultChecked={option.checked}
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-400"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </form>

              {/* Job Card grid */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {allJobs.map((job) => (
                  <div key={job._id}>
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Jobs;

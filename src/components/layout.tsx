import { ReactNode, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/util";
import { HeartIcon } from "@heroicons/react/20/solid";
import { UserButton } from "@clerk/nextjs";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Prompts", href: "/prompts" },
  { name: "History", href: "/history" },
];

type LayoutProps = {
  children: ReactNode;
};
export default function Layout(props: LayoutProps) {
  const { children } = props;
  const [currentPage, setCurrentPage] = useState(navigation[0]);

  useEffect(() => {
    const currentPage = navigation.find(
      (page) => page.href === window.location.pathname
    );
    if (currentPage) {
      setCurrentPage(currentPage);
    }
  }, []);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white shadow-sm">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item === currentPage
                              ? "border-indigo-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                          )}
                          aria-current={
                            item === currentPage ? "page" : undefined
                          }
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    {/* Profile dropdown */}
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonBox: "flex flex-row",
                          userButtonOuterIdentifier: "order-2",
                        },
                      }}
                      showName={true}
                    />
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item === currentPage
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                        "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                      )}
                      aria-current={item === currentPage ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-200 pb-3 pt-4">
                  <div className="flex items-center px-4">
                    <UserButton
                      showName={true}
                      appearance={{
                        elements: {
                          userButtonBox: "flex flex-row",
                          userButtonOuterIdentifier: "order-2",
                        },
                      }}
                    />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="flex flex-col h-screen justify-between">
          <div className="py-10 flex-grow">
            <header>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                  {currentPage.name}
                </h1>
              </div>
            </header>
            <main>
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
          <footer className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
              <div className="flex justify-center space-x-6 md:order-2">
                <p className="text-center text-gray-700 text-lg">
                  Built with{" "}
                  <span className="text-red-500">
                    <HeartIcon className="inline w-6 h-6" />
                  </span>{" "}
                  by <a href="https://github.com/calum-bird">Calum Bird</a> and{" "}
                  <a href="https://github.com/chitalian">Justin Torre</a>.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

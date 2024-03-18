import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import { Fragment } from "react/jsx-runtime";

import { Badge } from "./catalyst/badge";
import { Button } from "./catalyst/button";

import type { ShipyardShip } from "@/types/space-traders-api/ship";

export function ShipyardSlideOver({
    shipDetails,
    onClose,
}: {
    shipDetails: ShipyardShip | null;
    onClose: () => void;
}) {
    const { post, processing } = useForm({
        shipType: shipDetails?.type,
    });

    if (!shipDetails) return null;

    return (
        <Transition.Root show={!!shipDetails} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                    {shipDetails.name} Details
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        onClick={() =>
                                                            onClose()
                                                        }
                                                    >
                                                        <span className="absolute -inset-2.5" />
                                                        <span className="sr-only">
                                                            Close panel
                                                        </span>
                                                        <XMarkIcon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <dl className="grid grid-cols-1 sm:grid-cols-2">
                                                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                                        Description
                                                    </dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                                        {
                                                            shipDetails.description
                                                        }
                                                    </dd>
                                                </div>
                                                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                                        Supply
                                                    </dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                                        {shipDetails.supply}
                                                    </dd>
                                                </div>
                                                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                                        Activity
                                                    </dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                                        {shipDetails.activity}
                                                    </dd>
                                                </div>
                                                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                                        Purchase Price
                                                    </dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                                        {shipDetails.purchasePrice.toLocaleString()}
                                                    </dd>
                                                </div>
                                                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                                        Crew
                                                    </dt>
                                                    <dd className="mt-1 flex items-center gap-x-2 text-sm leading-6 text-gray-700 sm:mt-2">
                                                        <p>
                                                            Required:
                                                            <span className="ml-1">
                                                                {
                                                                    shipDetails
                                                                        .crew
                                                                        .required
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Capacity:
                                                            <span className="ml-1">
                                                                {
                                                                    shipDetails
                                                                        .crew
                                                                        .capacity
                                                                }
                                                            </span>
                                                        </p>
                                                    </dd>
                                                </div>
                                                {shipDetails.modules.length >
                                                    0 && (
                                                    <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">
                                                            Modules
                                                        </dt>
                                                        <dd className="mt-2 text-sm text-gray-900">
                                                            <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                {shipDetails.modules.map(
                                                                    (
                                                                        module,
                                                                    ) => {
                                                                        return (
                                                                            <li
                                                                                key={
                                                                                    module.symbol
                                                                                }
                                                                                className="flex w-full justify-between gap-x-4 p-4"
                                                                            >
                                                                                <div className="flex w-3/4 flex-col">
                                                                                    <p className="font-bold text-gray-900">
                                                                                        {
                                                                                            module.name
                                                                                        }
                                                                                    </p>
                                                                                    <p className="text-gray-700">
                                                                                        {
                                                                                            module.description
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                                <div className="flex flex-grow flex-col justify-center">
                                                                                    <p>
                                                                                        Range:
                                                                                        <span className="ml-1">
                                                                                            {module.range ??
                                                                                                0}
                                                                                        </span>
                                                                                    </p>
                                                                                    <p>
                                                                                        Capacity:
                                                                                        <span className="ml-1">
                                                                                            {module.capacity ??
                                                                                                0}
                                                                                        </span>
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                        );
                                                                    },
                                                                )}
                                                            </ul>
                                                        </dd>
                                                    </div>
                                                )}
                                                {shipDetails.mounts.length >
                                                    0 && (
                                                    <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">
                                                            Mounts
                                                        </dt>
                                                        <dd className="mt-2 text-sm text-gray-900">
                                                            <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                {shipDetails.mounts.map(
                                                                    (mount) => {
                                                                        return (
                                                                            <li
                                                                                key={
                                                                                    mount.symbol
                                                                                }
                                                                                className="flex flex-col gap-x-4 p-4"
                                                                            >
                                                                                <div className="flex flex-col">
                                                                                    <p className="font-bold text-gray-900">
                                                                                        {
                                                                                            mount.name
                                                                                        }
                                                                                    </p>
                                                                                    <p className="text-gray-700">
                                                                                        {
                                                                                            mount.description
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                                <div className="mt-1 flex flex-wrap gap-1">
                                                                                    {mount.deposits?.map(
                                                                                        (
                                                                                            deposit,
                                                                                        ) => (
                                                                                            <Badge
                                                                                                key={
                                                                                                    deposit
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    deposit
                                                                                                }
                                                                                            </Badge>
                                                                                        ),
                                                                                    )}
                                                                                </div>
                                                                            </li>
                                                                        );
                                                                    },
                                                                )}
                                                            </ul>
                                                        </dd>
                                                    </div>
                                                )}
                                            </dl>
                                        </div>
                                        <form
                                            className="px-4"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                post(route("ships.store"));
                                            }}
                                        >
                                            <Button
                                                type="submit"
                                                className="w-full"
                                                disabled={processing}
                                            >
                                                Buy Ship
                                            </Button>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

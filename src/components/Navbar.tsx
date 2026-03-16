import { BusIcon } from "@phosphor-icons/react";

export default function Navbar() {
	return (
		<nav className="navbar bg-(--pre-primary-color) min-h-16 m-2 rounded-lg w-[calc(100%-1rem)] shadow-md border border-(--color-secondary) border-dashed flex justify-center items-center gap-2">
      <BusIcon size={52} weight="duotone" />
			<div className="flex flex-col justify-center items-start px-3 gap-1">
				<h1 className="text-2xl font-bold">Fleet Management System</h1>
				<p className="text-sm text-gray-500">Manage your fleet with ease.</p>
			</div>
		</nav>
	);
}

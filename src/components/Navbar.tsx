import { BusIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function Navbar() {
	const [localTime, setLocalTime] = useState(new Date());
	const [bostonTime, setBostonTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setLocalTime(new Date());
			setBostonTime(new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" })));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<nav className="navbar bg-(--pre-primary-color) min-h-16 m-2 rounded-lg w-[calc(100%-1rem)] shadow-md border border-(--color-secondary) border-dashed flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
			<div className="flex items-center gap-2">
				<BusIcon size={52} weight="duotone" />
				<div className="flex flex-col justify-center items-start px-3 gap-1">
					<h1 className="text-2xl font-bold">Fleet Management System</h1>
					<p className="text-sm text-gray-500">Manage your fleet with ease.</p>
				</div>
			</div>

			{/* Local and Boston time */}
			<div className="flex items-center gap-2">
				<div className="flex flex-row md:flex-col justify-center items-end px-3 gap-1">
					<div className="flex items-center gap-1">
						<p className="text-sm font-bold text-gray-500">Local time:</p>
						<p className="text-sm text-gray-500">{localTime.toLocaleTimeString()}</p>
					</div>
					<div className="flex items-center gap-1">
						<p className="text-sm font-bold text-gray-500">Boston time:</p>
						<p className="text-sm text-gray-500">{bostonTime.toLocaleTimeString()}</p>
					</div>
				</div>
			</div>
		</nav>
	);
}

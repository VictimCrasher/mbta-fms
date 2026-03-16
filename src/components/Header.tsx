
interface HeaderProps {
	name: string;
	withBorder: boolean;
}

export default function Header({ name, withBorder }: HeaderProps) {
	return (
		<div className={`flex flex-col gap-1 ${withBorder ? "border-b border-base-300 pb-2" : ""}`}>
			<div className="flex items-center gap-2">
				<h4 className="text-md font-bold">{name}</h4>
			</div>
		</div>
	);
}

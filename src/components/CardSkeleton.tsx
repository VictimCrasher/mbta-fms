export default function CardSkeleton({ count }: { count: number }) {
	return Array.from({ length: count }).map((_, index) => (
		<div key={index} className="card skeleton bg-base-200 w-full h-[350px] p-4 flex flex-col gap-2">
			<div className="skeleton flex-1 w-50" />
			<div className="skeleton h-4 w-full" />
			<div className="skeleton h-20 w-full" />
			<div className="skeleton h-4 w-full" />
			<div className="skeleton h-10 w-full" />
		</div>
	));
}
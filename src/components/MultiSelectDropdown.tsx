import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CaretDownIcon, XIcon } from "@phosphor-icons/react";
import InfiniteScroll from "react-infinite-scroll-component";

export type Option = { value: string; label: string; subtitle?: string };

interface MultiSelectDropdownProps {
	label: string;
	placeholder: string;
	options: Option[];
	selectedValues: string[];
	onChange: (values: string[]) => void;
	hasMore: boolean;
	onLoadMore: () => void;
	isLoading?: boolean;
	disabled?: boolean;
	customNoOptionsLabel?: string;
}

export default function MultiSelectDropdown({
	label,
	placeholder,
	options,
	selectedValues,
	onChange,
	hasMore,
	onLoadMore,
	isLoading = false,
	disabled = false,
	customNoOptionsLabel = "No options",
}: MultiSelectDropdownProps) {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	const selectedSet = useMemo(() => new Set(selectedValues), [selectedValues]);

	const toggle = useCallback(
		(value: string) => {
			if (selectedSet.has(value)) {
				onChange(selectedValues.filter((v) => v !== value));
			} else {
				onChange([...selectedValues, value]);
			}
		},
		[onChange, selectedValues, selectedSet],
	);

	const clearAll = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			onChange([]);
		},
		[onChange],
	);

	// click outside to close
	useEffect(() => {
		if (!open) return;
		const handler = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("click", handler);
		return () => document.removeEventListener("click", handler);
	}, [open]);

	const displayLabel = selectedValues.length === 0 ? placeholder : `${selectedValues.length} selected`;

	return (
		<div className="relative w-full md:max-w-1/2 min-w-48" ref={containerRef}>
			<label className="form-control w-full">
				<div className="label py-1">
					<span className="label-text font-medium">{label}</span>
				</div>
			</label>
			<button
				type="button"
				className="btn btn-outline btn-sm w-full justify-between gap-2"
				onClick={() => setOpen((o) => !o)}
				disabled={disabled}
			>
				<span className="truncate">{displayLabel}</span>
				<div className="flex items-center gap-1 shrink-0">
					{selectedValues.length > 0 && (
						<button
							type="button"
							className="btn btn-ghost btn-xs btn-circle"
							onClick={clearAll}
							aria-label="Clear selection"
						>
							<XIcon size={14} />
						</button>
					)}
					<CaretDownIcon size={16} className="opacity-70" />
				</div>
			</button>
			{open && (
				<ul
					className="menu absolute left-0 top-full mt-1 z-100 bg-base-200 rounded-box border border-base-300 shadow-lg max-h-72 w-full overflow-y-auto min-w-48 flex flex-col gap-1"
					ref={listRef}
					id="multi-select-dropdown-list"
				>
					{options.length === 0 && !isLoading && (
						<li className="px-4 py-3 text-sm">{customNoOptionsLabel}</li>
					)}
					{options.length > 0 && (
						<InfiniteScroll
							dataLength={options.length}
							next={onLoadMore}
							hasMore={hasMore}
							loader={
								<li className="px-4 py-1 max-w-full flex justify-center items-center">
									<span className="loading loading-dots loading-sm" />
								</li>
							}
							scrollableTarget="multi-select-dropdown-list"
						>
							{options.map((opt) => (
								<li key={opt.value} className="max-w-full hover:bg-base-300 rounded-box">
									<label className="flex items-center gap-2 cursor-pointer py-2 max-w-full">
										<input
											type="checkbox"
											className="checkbox checkbox-sm"
											checked={selectedSet.has(opt.value)}
											onChange={() => toggle(opt.value)}
										/>
										<div className="flex flex-col">
											<span className="text-sm truncate">{opt.label}</span>
											{opt.subtitle && <span className="text-xs text-gray-500">{opt.subtitle}</span>}
										</div>
									</label>
								</li>
							))}
						</InfiniteScroll>
					)}
					{isLoading && (
						<li className="px-4 py-1 max-w-full flex justify-center items-center">
							<span className="loading loading-dots loading-sm" />
						</li>
					)}
				</ul>
			)}
		</div>
	);
}

import { CaretDoubleLeftIcon, CaretDoubleRightIcon, CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import { PAGE_SIZE_OPTIONS } from "@/types/Pages";

interface PaginationProps {
	page: number;
	pageSize: number;
	totalPages: number;
	setPage: (page: number) => void;
	setPageSize: (pageSize: number) => void;
	disabled?: boolean;
}

const btnCN =
	"join-item btn text-(--color-primary-content) hover:bg-(--color-tertiary-content) hover:text-(--color-tertiary) btn-sm";

export default function Pagination({
	page,
	pageSize,
	totalPages,
	setPage,
	setPageSize,
	disabled = false,
}: PaginationProps) {
	const total = pageSize * totalPages;

	const handleFirst = () => {
		setPage(1);
	};

	const handleLast = () => {
		setPage(totalPages);
	};

	const handlePrevious = () => {
		setPage(page - 1);
	};

	const handleNext = () => {
		setPage(page + 1);
	};

	const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPage(1);
		setPageSize(Number(e.target.value));
	};

	return (
		<div className="flex flex-col md:flex-row gap-2 justify-between items-center m-2">
			<div className="flex items-center gap-2">
				<span className="text-sm text-nowrap">
					Showing {pageSize * page - pageSize + 1} - {pageSize * page} of ~{total} items
				</span>
				<select className="select select-primary select-sm" value={pageSize} onChange={handlePageSizeChange}>
					{PAGE_SIZE_OPTIONS.map((option) => (
						<option key={option} value={option}>
							{option} items per page
						</option>
					))}
				</select>
			</div>
			<div className="join">
				<button className={btnCN} disabled={disabled || page === 1} onClick={handleFirst}>
					<CaretDoubleLeftIcon size={16} weight="duotone" />
				</button>
				<button className={btnCN} disabled={disabled || page === 1} onClick={handlePrevious}>
					<CaretLeftIcon size={16} weight="duotone" />
				</button>

				{totalPages <= 4 ? (
					<>
						{Array.from(Array(totalPages), (_, i) => (
							<button
								className={`${btnCN} ${page === i + 1 ? "btn-secondary text-white" : ""}`}
								key={i + 1}
								disabled={disabled}
								onClick={() => setPage(i + 1)}
							>
								{i + 1}
							</button>
						))}
					</>
				) : (
					<>
						{page > 2 && (
							<button className={btnCN} onClick={() => setPage(1)} disabled={disabled}>
								1
							</button>
						)}
						{page > 3 && (
							<button className={btnCN} disabled>
								...
							</button>
						)}
						{page > 2 && (
							<button className={btnCN} onClick={() => setPage(page - 1)} disabled={disabled}>
								{page - 1}
							</button>
						)}
						<button className={`${btnCN} btn-secondary text-white`} disabled={disabled}>
							{page}
						</button>
						{page < totalPages - 1 && (
							<button className={btnCN} onClick={() => setPage(page + 1)} disabled={disabled}>
								{page + 1}
							</button>
						)}
						{page < totalPages - 2 && (
							<button className={btnCN} disabled>
								...
							</button>
						)}
						{page < totalPages && (
							<button className={btnCN} onClick={() => setPage(totalPages)} disabled={disabled}>
								{totalPages}
							</button>
						)}
					</>
				)}

				<button className={btnCN} disabled={disabled || page === totalPages} onClick={handleNext}>
					<CaretRightIcon size={16} weight="duotone" />
				</button>
				<button className={btnCN} disabled={disabled || page === totalPages} onClick={handleLast}>
					<CaretDoubleRightIcon size={16} weight="duotone" />
				</button>
			</div>
		</div>
	);
}

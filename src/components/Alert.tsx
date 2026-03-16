import type { AlertType } from "@/types/Alert";
import { CheckCircleIcon, InfoIcon, WarningIcon, XCircleIcon } from "@phosphor-icons/react";

const alertClasses = {
	error: "alert-error",
	warning: "alert-warning",
	info: "alert-info",
	success: "alert-success",
};

const alertIcons = {
	error: <XCircleIcon size={24} weight="duotone" />,
	warning: <WarningIcon size={24} weight="duotone" />,
	info: <InfoIcon size={24} weight="duotone" />,
	success: <CheckCircleIcon size={24} weight="duotone" />,
};

export default function Alert({ message, type, icon }: { message: string; type: AlertType; icon?: React.ReactNode }) {
	return (
		<div role="alert" className={`alert ${alertClasses[type]}`}>
			{icon || alertIcons[type]}
			<span>{message}</span>
		</div>
	);
}

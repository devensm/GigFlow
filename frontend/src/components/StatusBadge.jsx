import Badge from "./ui/Badge";


const StatusBadge = ({ status }) => {
  const variantMap = {
    pending: "warning",
    hired: "success",
    rejected: "error",
    open: "primary",
    assigned: "success",
  };

  const variant = variantMap[status] || "gray";
  const displayLabel = status.charAt(0).toUpperCase() + status.slice(1);

  return <Badge variant={variant} size="sm">{displayLabel}</Badge>;
};

export default StatusBadge;

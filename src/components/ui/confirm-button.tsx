import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ConfirmButton({
  label,
  confirmLabel = "Confirm",
  variant = "danger",
  onConfirm,
  className,
}: {
  label: string;
  confirmLabel?: string;
  variant?: "danger" | "ghost" | "outline";
  onConfirm: () => void;
  className?: string;
}) {
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    if (!ask) return;
    const t = window.setTimeout(() => setAsk(false), 4000);
    return () => window.clearTimeout(t);
  }, [ask]);

  if (!ask) {
    return (
      <Button type="button" variant={variant} className={className} onClick={() => setAsk(true)}>
        {label}
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="danger" onClick={onConfirm}>
        {confirmLabel}
      </Button>
      <Button type="button" variant="ghost" onClick={() => setAsk(false)}>
        Cancel
      </Button>
    </div>
  );
}

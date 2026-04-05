import React from "react";

type AppLoaderProps = {
  label?: string;
  compact?: boolean;
};

const AppLoader: React.FC<AppLoaderProps> = ({
  label = "Loading...",
  compact = false,
}) => {
  return (
    <div
      className={`flex w-full items-center justify-center ${compact ? "py-4" : "py-10"}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-brand-red" />
        <span className="text-sm font-semibold text-gray-600">{label}</span>
      </div>
    </div>
  );
};

export default AppLoader;

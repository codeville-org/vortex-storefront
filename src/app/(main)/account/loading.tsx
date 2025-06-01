import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full min-h-[80vh] flex items-center justify-center">
      <Loader className="size-6 animate-spin" />
    </div>
  );
}

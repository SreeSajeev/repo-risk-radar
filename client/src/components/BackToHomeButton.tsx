
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function BackToHomeButton() {
  return (
    <div className="mb-5">
      <Link to="/" className="group inline-flex items-center">
        <Button
          variant="ghost"
          className="px-2 py-1 bg-gradient-to-r from-[#0061FF] to-[#4C9FFF] text-white hover:from-[#4C9FFF] hover:to-[#0061FF] hover:scale-105 transition-all font-mono gap-1 rounded-md shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Home</span>
        </Button>
      </Link>
    </div>
  );
}

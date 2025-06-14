
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function BackToHomeButton() {
  return (
    <div className="mb-5">
      <Link to="/" className="group inline-flex items-center">
        <Button
          variant="ghost"
          className="px-2 py-1 text-[#00FFD1] hover:bg-[#17171C] hover:text-[#EAEAEA] rounded-md shadow-[0_0_12px_2px_#00FFD1aa] transition-all font-mono gap-1"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Home</span>
        </Button>
      </Link>
    </div>
  );
}

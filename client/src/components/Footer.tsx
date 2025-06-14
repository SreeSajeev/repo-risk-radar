
import { Github, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-[#8892B0]/20 bg-[#1A1A1C]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0061FF] to-[#4C9FFF] rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 grid grid-cols-2 gap-[2px]">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-mono font-semibold text-[#EAEAEA]">BusFactor</span>
            </div>
            <p className="text-[#A2A2A2] text-sm leading-relaxed">
              Developer intelligence for sustainable codebases
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-[#EAEAEA] font-semibold mb-4">Product</h3>
            <div className="space-y-2">
              <a href="#" className="block text-[#A2A2A2] hover:text-[#00FFD1] transition-colors">About</a>
              <a href="#" className="block text-[#A2A2A2] hover:text-[#00FFD1] transition-colors">GitHub</a>
              <a href="#" className="block text-[#A2A2A2] hover:text-[#00FFD1] transition-colors">Docs</a>
              <a href="#" className="block text-[#A2A2A2] hover:text-[#00FFD1] transition-colors">API</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[#EAEAEA] font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <a href="#" className="block text-[#A2A2A2] hover:text-[#00FFD1] transition-colors">Privacy</a>
              <a href="#" className="block text-[#A2A2A2] hover:text-[#00FFD1] transition-colors">Terms</a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-[#EAEAEA] font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-[#8892B0]/10 hover:bg-[#00FFD1]/20 rounded-lg transition-colors group"
              >
                <Github className="h-5 w-5 text-[#A2A2A2] group-hover:text-[#00FFD1]" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-[#8892B0]/10 hover:bg-[#00FFD1]/20 rounded-lg transition-colors group"
              >
                <Linkedin className="h-5 w-5 text-[#A2A2A2] group-hover:text-[#00FFD1]" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#8892B0]/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#A2A2A2] text-sm">
            © 2025 BusFactor Labs. Built with open-source tools.
          </p>
          <p className="text-[#8892B0] text-sm mt-2 md:mt-0">
            Designed by <span className="text-[#00FFD1]">Lovable AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

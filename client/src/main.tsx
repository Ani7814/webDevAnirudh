import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initAnimations } from "./lib/animations";

// Initialize animations once the DOM is loaded
document.addEventListener('DOMContentLoaded', initAnimations);

createRoot(document.getElementById("root")!).render(<App />);

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Generate build timestamp in EST timezone
const getBuildTimestamp = () => {
  return new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York'
  }) + ' EST';
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 3131,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Inject build timestamp at compile time
    __BUILD_TIMESTAMP__: JSON.stringify(getBuildTimestamp()),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'ui': ['lucide-react', 'sonner'],
        },
      },
    },
    minify: 'esbuild',
    target: 'es2020',
  },
  esbuild: {
    target: 'es2020',
    drop: mode === 'production' ? ['debugger'] : [],
  },
}));

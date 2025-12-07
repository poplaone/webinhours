import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Optimize development server
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    visualizer({
      template: "treemap", // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "analyse.html", // will be saved in project's root
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize build performance with safer target
    target: 'es2020',
    // minify: 'esbuild', // Default is esbuild, so we can omit or explicitly set it
    // Enable module preload for parallel loading with CSS preload
    modulePreload: {
      polyfill: true,
      resolveDependencies: (filename, deps, { hostType }) => {
        // Preload CSS files to break dependency chains
        return deps.filter(dep => {
          // Include all JS modules and CSS files
          return dep.endsWith('.js') || dep.endsWith('.css');
        });
      },
    },
    // Ensure proper output format
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Prevent TDZ errors by ensuring proper module initialization
      // preserveEntrySignatures: 'strict', // Removed to let Rollup optimize
      output: {
        manualChunks: (id) => {
          // React core and vendor splitting
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react') || id.includes('@radix-ui') || id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'ui-vendor';
            }
            // For other vendors, let them be part of a general vendor chunk or standard splitting
            // return 'vendor'; 
          }
        },
        // Optimize asset naming and enable CSS splitting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Split CSS files by chunk for better caching and loading
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash].[ext]';
          }
          // Ensure JS files go to js folder, not by extension
          if (assetInfo.name?.endsWith('.js')) {
            return 'assets/js/[name]-[hash].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // ENABLE tree shaking
    treeshake: true,
    // Ensure source maps for debugging (dev only)
    sourcemap: mode === 'development',
    // Ensure CSS code splitting is enabled (default is true, but just to be explicit if needed, though 'true' is better)
    cssCodeSplit: true,
  },
  optimizeDeps: {
    // Pre-bundle essential dependencies to prevent loading issues
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'clsx',
      'tailwind-merge',
      'class-variance-authority'
    ],
  },
  // Optimize CSS - inline critical CSS, split the rest
  css: {
    devSourcemap: mode === 'development',
    preprocessorOptions: {
      css: {
        // Ensure CSS is processed efficiently
        charset: false
      }
    }
  },
  // Optimize preview server
  preview: {
    port: 4173,
    host: true,
  },
}));

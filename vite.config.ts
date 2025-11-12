import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { componentTagger } from "lovable-tagger"; // Temporarily disabled to fix TSX output issue

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
    // componentTagger temporarily disabled to fix TSX output issue
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize build performance with safer target
    target: 'es2020',
    minify: 'terser',
    // Enable module preload for parallel loading
    modulePreload: {
      polyfill: true,
    },
    // Ensure proper output format
    outDir: 'dist',
    emptyOutDir: true,
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    rollupOptions: {
      output: {
        // Simplified chunk splitting to prevent circular dependencies
        manualChunks: (id) => {
          // Core React libraries - keep together to prevent dependency issues
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-core';
          }
          
          // All Radix UI components together to prevent import issues
          if (id.includes('@radix-ui/')) {
            return 'ui-components';
          }
          
          // Animation libraries - excluded for performance
          // if (id.includes('framer-motion') || id.includes('node_modules/motion/')) {
          //   return 'animations';
          // }
          
          // Data and backend
          if (id.includes('@supabase/supabase-js') || id.includes('@tanstack/react-query')) {
            return 'data-layer';
          }
          
          // Form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform/') || id.includes('zod')) {
            return 'forms';
          }
          
          // Heavy content libraries
          if (id.includes('recharts') || id.includes('react-markdown') || id.includes('react-masonry')) {
            return 'content-libs';
          }
          
          // Icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // Other vendor libraries
          if (id.includes('node_modules/')) {
            return 'vendor';
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
    // Optimize chunk size warnings - we want smaller chunks
    chunkSizeWarningLimit: 500,
    // Enable tree shaking for better bundle optimization
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false
    }
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
    // Force pre-bundling of problematic dependencies
    force: true,
  },
  // Optimize CSS
  css: {
    devSourcemap: mode === 'development',
    // Enable CSS code splitting for better performance
    codeSplit: true,
  },
  // Optimize preview server
  preview: {
    port: 4173,
    host: true,
  },
}));

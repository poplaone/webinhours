import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize build performance
    target: 'esnext',
    minify: 'terser',
    // Enable module preload for parallel loading
    modulePreload: {
      polyfill: true,
    },
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    rollupOptions: {
      output: {
        // Advanced chunk splitting for better performance
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-router-dom/')) {
            return 'react-router';
          }
          
          // Split Radix UI into smaller chunks
          if (id.includes('@radix-ui/')) {
            if (id.includes('dialog') || id.includes('select') || id.includes('tabs')) {
              return 'radix-core';
            }
            return 'radix-misc';
          }
          
          // Split animations - defer loading
          if (id.includes('framer-motion') || id.includes('node_modules/motion/')) {
            return 'animations';
          }
          
          // Split icons into separate chunk for tree-shaking
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // Backend and data
          if (id.includes('@supabase/supabase-js')) {
            return 'supabase';
          }
          if (id.includes('@tanstack/react-query')) {
            return 'query';
          }
          
          // Forms
          if (id.includes('react-hook-form') || id.includes('@hookform/') || id.includes('zod')) {
            return 'forms';
          }
          
          // Charts (heavy, should be lazy loaded)
          if (id.includes('recharts')) {
            return 'charts';
          }
          
          // Utilities
          if (id.includes('date-fns')) {
            return 'date-utils';
          }
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
            return 'utilities';
          }
          
          // Keep other node_modules in vendor
          if (id.includes('node_modules/')) {
            return 'vendor-misc';
          }
        },
        // Optimize asset naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 500, // Reduced from 1000
    // Enable tree shaking
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false
    }
  },
  optimizeDeps: {
    // Pre-bundle essential dependencies only
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      '@tanstack/react-query',
    ],
    // Exclude heavy libraries for better tree-shaking
    exclude: ['lucide-react', 'framer-motion', 'motion'],
  },
  // Optimize CSS
  css: {
    devSourcemap: mode === 'development',
  },
  // Optimize preview server
  preview: {
    port: 4173,
    host: true,
  },
}));

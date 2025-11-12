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
          // Core React libraries - minimal bundle
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-router-dom/')) {
            return 'react-router';
          }
          
          // Split Radix UI by usage - load only what's needed per page
          if (id.includes('@radix-ui/')) {
            // Core UI components used everywhere
            if (id.includes('dialog') || id.includes('dropdown-menu')) {
              return 'radix-core';
            }
            // Form components - defer until form pages
            if (id.includes('select') || id.includes('checkbox') || id.includes('radio')) {
              return 'radix-forms';
            }
            // Other components - defer until needed
            return 'radix-misc';
          }
          
          // Split animations - defer loading until page transition
          if (id.includes('framer-motion') || id.includes('node_modules/motion/')) {
            return 'animations';
          }
          
          // Split icons into separate chunk for aggressive tree-shaking
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // Backend and data - keep separate for caching
          if (id.includes('@supabase/supabase-js')) {
            return 'supabase';
          }
          if (id.includes('@tanstack/react-query')) {
            return 'query';
          }
          
          // Forms - only load on form pages
          if (id.includes('react-hook-form') || id.includes('@hookform/') || id.includes('zod')) {
            return 'forms';
          }
          
          // Charts - heavy, lazy load only when needed
          if (id.includes('recharts')) {
            return 'charts';
          }
          
          // Date utilities - defer until needed
          if (id.includes('date-fns')) {
            return 'date-utils';
          }
          
          // Utilities - small, can be bundled
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
            return 'utilities';
          }
          
          // Markdown and other heavy libs - defer
          if (id.includes('react-markdown') || id.includes('react-masonry')) {
            return 'content-libs';
          }
          
          // Keep other node_modules in vendor-misc but enable tree-shaking
          if (id.includes('node_modules/')) {
            return 'vendor-misc';
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
          return 'assets/[ext]/[name]-[hash].[ext]';
        },
      },
    },
    // Optimize chunk size warnings - we want smaller chunks
    chunkSizeWarningLimit: 500,
    // Disable tree shaking to prevent TDZ errors
    treeshake: false
  },
  optimizeDeps: {
    // Pre-bundle only the most essential dependencies
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
    // Exclude heavy libraries for better tree-shaking and lazy loading
    exclude: [
      'lucide-react', 
      'framer-motion', 
      'motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      'react-markdown',
      'recharts',
      'date-fns'
    ],
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

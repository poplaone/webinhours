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
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    rollupOptions: {
      output: {
        // Advanced chunk splitting for better performance
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          
          // UI Library chunks
          'radix-ui': [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-select', 
            '@radix-ui/react-tabs',
            '@radix-ui/react-accordion',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-toast'
          ],
          'ui-components': [
            '@radix-ui/react-slot',
            '@radix-ui/react-separator',
            '@radix-ui/react-label',
            '@radix-ui/react-progress',
            '@radix-ui/react-scroll-area'
          ],
          
          // Animation and visual libraries
          'animations': ['framer-motion', 'motion'],
          'icons': ['lucide-react'],
          
          // Backend and data
          'supabase': ['@supabase/supabase-js'],
          'query': ['@tanstack/react-query'],
          
          // Form and validation
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          
          // Utilities
          'date-utils': ['date-fns'],
          'utilities': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          
          // Heavy components (lazy load these)
          'admin-heavy': [
            './src/components/admin/AdminPanelTabs',
            './src/components/admin/WebsiteUploadForm',
            './src/components/admin/WebsiteEditForm'
          ]
        },
        // Optimize asset naming
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '')?.replace('.ts', '') || 'chunk'
            : 'chunk';
          return `assets/js/${facadeModuleId}-[hash].js`;
        },
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
    // Pre-bundle dependencies for faster dev server
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      '@supabase/supabase-js',
      '@tanstack/react-query',
    ],
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

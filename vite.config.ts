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
    // Optimize build performance with safer target
    target: 'es2020',
    minify: 'terser',
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
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    rollupOptions: {
      // Prevent TDZ errors by ensuring proper module initialization
      preserveEntrySignatures: 'strict',
      output: {
        // Ultra-simplified chunk splitting to prevent TDZ errors
        manualChunks: (id) => {
          // Keep ALL node_modules together to prevent initialization issues
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
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // DISABLE tree shaking completely to prevent TDZ errors
    treeshake: false,
    // Ensure source maps for debugging (dev only)
    sourcemap: mode === 'development'
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
  // Optimize CSS - inline critical CSS, split the rest
  css: {
    devSourcemap: mode === 'development',
    // Disable code splitting to reduce network chains in production
    codeSplit: mode === 'development',
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

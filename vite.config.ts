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
      // Preserve entry signatures to prevent TDZ errors from circular dependencies
      preserveEntrySignatures: 'exports-only',
      output: {
        // Ensure proper module initialization order
        hoistTransitiveImports: false,
        manualChunks: (id) => {
          // React core + Radix UI bundled together to prevent TDZ errors
          // Radix depends on React.forwardRef, so they must be in same chunk
          if (
            id.includes('node_modules/react/') || 
            id.includes('node_modules/react-dom/') ||
            id.includes('@radix-ui')
          ) {
            return 'react-vendor';
          }
          // React Router - needed for navigation
          if (id.includes('react-router')) {
            return 'react-router';
          }
          // Supabase - defer to when auth/data is needed
          if (id.includes('@supabase')) {
            return 'supabase';
          }
          // TanStack Query - defer
          if (id.includes('@tanstack/react-query')) {
            return 'query';
          }
          // Icons - large bundle, defer loading
          if (id.includes('lucide-react') || id.includes('@tabler/icons')) {
            return 'icons';
          }
          // Framer Motion - defer animations
          if (id.includes('framer-motion')) {
            return 'motion';
          }
          // GSAP - defer animations
          if (id.includes('gsap')) {
            return 'gsap';
          }
          // Form libraries - keep together
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
            return 'forms';
          }
          // Utility libraries - small, keep in utilities
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
            return 'utilities';
          }
          // Charts
          if (id.includes('recharts') || id.includes('d3')) {
            return 'charts';
          }
          // Embla carousel
          if (id.includes('embla')) {
            return 'carousel';
          }
          // Date utilities
          if (id.includes('date-fns')) {
            return 'date-utils';
          }
          // Let Rollup handle other vendor code naturally to avoid TDZ issues
        },
        // Optimize asset naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash].[ext]';
          }
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

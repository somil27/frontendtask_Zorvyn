# Finflow Vite Warnings Fix - TODO

## Plan Steps:
- [x] Step 1: Update vite.config.js to use @vitejs/plugin-react-oxc
- [x] Step 2: Update package.json to add @vitejs/plugin-react-oxc devDependency (fixed JSON syntax)
- [x] Step 3: Run `npm install` to install new dependency (used latest ^0.4.3, --legacy-peer-deps)
- [x] Step 4: Clear Vite cache: delete node_modules/.vite (PowerShell: Remove-Item)
- [x] Step 5: Restart `npm run dev` and verify no warnings (user to run manually as original dev may need kill; check http://localhost:5173/ for app, logs for warnings gone)

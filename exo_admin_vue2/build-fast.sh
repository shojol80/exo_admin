#!/bin/bash

# Fast build script for Exolog Admin Panel
# Suppresses Sass warnings for faster builds

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}🔧 Exolog Admin Fast Build${NC}"
echo -e "${CYAN}============================${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}[ERROR] package.json not found. Please run from admin directory.${NC}"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[INFO] Installing dependencies...${NC}"
    npm install --silent
fi

echo -e "${YELLOW}[INFO] Building admin panel (fast mode)...${NC}"

# Set environment variables to suppress warnings
export NODE_OPTIONS="--max-old-space-size=4096"
export SASS_SILENCE_DEPRECATIONS="*"

# Build with suppressed output
npm run build 2>/dev/null || {
    echo -e "${YELLOW}[INFO] Fast build failed, trying with warnings...${NC}"
    npm run build
}

echo -e "${GREEN}[SUCCESS] 🎉 Fast build completed!${NC}"
echo ""
echo -e "${CYAN}📋 Next Steps:${NC}"
echo -e "  • Test the build in dist/ directory"
echo -e "  • Upload dist/ contents to your live server"
echo ""
echo -e "${CYAN}🚀 For live deployment, upload the contents of:${NC}"
echo -e "     ./dist/ → your-server/exo_admin/"

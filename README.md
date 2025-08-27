# Exolog Admin Panel Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js v12.22.12 (automatically handled by build script)
- npm v6.14.16 (comes with Node.js v12.22.12)
- Python 3 (for node-sass compilation)

### Building the Admin Panel

**Recommended Method (with Plyr fix):**
```bash
cd resources/js/exo_admin
./build-with-plyr-fix.sh
```

**Alternative Methods:**
```bash
# Manual build (may fail due to Plyr issues)
npm run build

# Docker build (production method)
docker-compose up composer-npm
```

## 📁 Project Structure

```
resources/js/exo_admin/
├── src/                          # Source code
│   ├── components/              # Vue components
│   ├── views/                   # Page views
│   │   └── misc/Login.vue      # Login page (recently updated)
│   ├── assets/                  # Static assets
│   └── main.js                  # Entry point
├── dist/                        # Built files (ready for deployment)
├── node_modules/               # Dependencies
├── package.json                # NPM configuration
├── build-with-plyr-fix.sh      # Build script with Plyr fix
└── README.md                   # This file
```

## 🔧 Build Script Features

The `build-with-plyr-fix.sh` script automatically:

1. **📦 Creates Backups**: Saves original Plyr files before modification
2. **🔧 Fixes Plyr Issue**: Temporarily disables problematic Plyr imports
3. **🏗️ Builds Project**: Uses correct Node.js version (v12.22.12)
4. **📤 Deploys Locally**: Optionally copies to local test directory
5. **🔄 Restores Files**: Returns source code to original state
6. **🧹 Cleans Up**: Removes temporary files and backups

### Script Usage

```bash
# Normal build with Plyr fix
./build-with-plyr-fix.sh

# Clean build artifacts
./build-with-plyr-fix.sh clean

# Restore files only (if something goes wrong)
./build-with-plyr-fix.sh restore
```

## ⚠️ Known Issues

### Plyr.js Import Problem

**Issue**: The FileManager component uses Plyr.js for audio/video playback, but webpack fails to resolve the Plyr module correctly during build.

**Error**: `Module not found: Error: Can't resolve 'plyr'`

**Solution**: The build script temporarily disables Plyr imports during build, then restores them afterward.

**Affected Files**:
- `src/components/FileManager/components/modals/views/AudioPlayer.vue`
- `src/components/FileManager/components/modals/views/VideoPlayer.vue`

**Impact**: Audio/Video players in FileManager won't work until Plyr is properly fixed, but all other functionality works normally.

## 🎨 Recent Changes

### Login Page Updates
- **Email placeholder**: "📧 Your Email Address"
- **Button**: Green "🎯 Sign In (UPDATED)" button
- **File**: `src/views/misc/Login.vue`

## 🚀 Deployment

### Local Testing
After building, files are available in `./dist/` directory.

### Live Server Deployment
1. Build the project: `./build-with-plyr-fix.sh`
2. Upload contents of `./dist/` to your live server
3. Ensure the upload path matches your server's admin panel directory

### Production Build Process
The production environment uses Docker with `composer-npm` service:
```bash
docker-compose up composer-npm
```

## 🛠️ Development Workflow

1. **Make Changes**: Edit files in `src/` directory
2. **Build**: Run `./build-with-plyr-fix.sh`
3. **Test**: Check `dist/` output or local deployment
4. **Deploy**: Upload `dist/` contents to live server

## 🔍 Troubleshooting

### Build Fails
- Ensure Node.js v12.22.12 is available (script handles this)
- Check that Python 3 is installed
- Use the build script instead of direct npm commands

### Plyr Issues
- The build script automatically handles Plyr import issues
- If you need audio/video functionality, consider updating Plyr or using alternative libraries

### Permission Issues
- Make sure the build script is executable: `chmod +x build-with-plyr-fix.sh`
- Check file permissions in the project directory

## 📋 NPM Scripts

```json
{
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build --dest ./dist",
  "deploy": "npm run build && shx rm -rf ../../../homepages.webkracht.nl/htdocs/exo_admin/* && shx mkdir -p ../../../homepages.webkracht.nl/htdocs/exo_admin && shx cp -r ./dist/* ../../../homepages.webkracht.nl/htdocs/exo_admin"
}
```

## 🎯 Next Steps

1. **Fix Plyr.js**: Update to newer version or fix webpack configuration
2. **Optimize Build**: Reduce bundle size and improve build performance
3. **Add Tests**: Implement unit and integration tests
4. **Documentation**: Expand component documentation

## 📞 Support

For development issues:
1. Check this README
2. Review build script output
3. Ensure all prerequisites are met
4. Use the build script instead of manual npm commands

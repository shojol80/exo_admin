#!/bin/bash

# Fix all SCSS import paths from "src/assets/scss/vue-component" to "@/assets/scss/vue-component"

echo "🔧 Fixing SCSS import paths in Vue files..."

# Find all .vue files with the old import path and replace them
find src/ -name "*.vue" -type f -exec grep -l "src/assets/scss/vue-component" {} \; | while read file; do
    echo "Fixing: $file"
    sed -i '' 's|src/assets/scss/vue-component|@/assets/scss/vue-component|g' "$file"
done

echo "✅ All SCSS import paths have been fixed!"
echo "📊 Checking results..."

# Count remaining files with old import
remaining=$(grep -r "src/assets/scss/vue-component" src/ --include="*.vue" | wc -l)
echo "Remaining files with old imports: $remaining"

if [ "$remaining" -eq 0 ]; then
    echo "🎉 SUCCESS: All imports have been fixed!"
else
    echo "⚠️  Some files still need manual fixing"
fi

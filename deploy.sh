#!/bin/bash

# Hiragana App - GitHub Pages Deployment Script

echo "🚀 Deploying Hiragana Practice App to GitHub Pages"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init -b main
    echo "✅ Git initialized with 'main' branch"
else
    echo "✅ Git repository already exists"
fi

# Check if remote exists
if git remote | grep -q origin; then
    echo "✅ Remote 'origin' already configured"
    repo_url=$(git remote get-url origin)
else
    echo ""
    echo "❓ Please enter your GitHub repository (SSH format):"
    echo "   (e.g., git@github.com:username/hiragana.git)"
    read -p "Repository URL: " repo_url
    
    if [ -z "$repo_url" ]; then
        echo "❌ No repository URL provided. Exiting."
        exit 1
    fi
    
    git remote add origin "$repo_url"
    echo "✅ Remote added"
fi

# Add all files
echo "📝 Adding files..."
git add .

# Commit
echo "💾 Committing changes..."
if git diff-index --quiet HEAD --; then
    echo "ℹ️  No changes to commit"
else
    git commit -m "Deploy Hiragana practice app - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Get current branch name
current_branch=$(git branch --show-current)

# Push to GitHub using SSH
echo "🚀 Pushing to GitHub via SSH..."
echo "   Using SSH key authentication (no password needed)"
git push -u origin "$current_branch" 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment complete!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to: https://github.com/$(echo $repo_url | sed 's/.*://;s/.git$//')"
    echo "2. Click 'Settings' → 'Pages'"
    echo "3. Under 'Source', select '$current_branch' branch and '/ (root)' folder"
    echo "4. Click 'Save'"
    echo "5. Wait 1-2 minutes for GitHub to build"
    echo ""
    echo "🌐 Your site will be live at:"
    echo "   https://$(echo $repo_url | sed 's/.*://;s/.git$//' | sed 's/\//\.github\.io\//')"
    echo ""
    echo "🎉 Happy learning hiragana!"
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "1. Make sure your SSH key is added to GitHub:"
    echo "   https://github.com/settings/keys"
    echo "2. Test SSH connection: ssh -T git@github.com"
    echo "3. Make sure the repository exists on GitHub"
fi

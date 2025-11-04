#!/bin/bash

# Hiragana App - GitHub Pages Deployment Script

echo "🚀 Deploying Hiragana Practice App to GitHub Pages"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already exists"
fi

# Add all files
echo "📝 Adding files..."
git add .

# Commit
echo "💾 Committing changes..."
git commit -m "Deploy Hiragana practice app"

# Check if remote exists
if git remote | grep -q origin; then
    echo "✅ Remote 'origin' already configured"
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

# Get current branch name
current_branch=$(git branch --show-current)

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin "$current_branch"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Click on 'Settings' → 'Pages'"
echo "3. Under 'Source', select '$current_branch' branch"
echo "4. Click 'Save'"
echo "5. Your site will be live at: https://username.github.io/repository-name/"
echo ""
echo "💡 Note: This script uses SSH authentication with your SSH key."
echo ""
echo "🎉 Happy learning hiragana!"

#!/usr/bin/env bash
# Deploy the Next.js portfolio to Vercel (requires `vercel` CLI installed)

set -e
# Ensure we are on the latest code
# git push origin main

echo "🚀 Starting Deployment Sequence..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy
echo "📡 Deploying to Vercel Production..."
npx vercel --prod

echo "✅ Deployment Command Executed."


#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
    // Get git commit hash (short)
    const hash = execSync('git rev-parse --short HEAD').toString().trim();

    // Get current build time (not git commit time)
    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    // Get author name from git
    const author = execSync('git log -1 --format=%an').toString().trim();

    // Get branch name
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

    const buildInfo = {
        hash,
        timestamp, // Now shows actual build time
        author,
        branch,
        buildDate: now.toISOString()
    };

    const outputPath = path.join(__dirname, '../src/generated/buildInfo.json');
    const outputDir = path.dirname(outputPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(buildInfo, null, 2));

    console.log('✅ Build info generated:', buildInfo);
} catch (error) {
    console.error('❌ Failed to generate build info:', error.message);

    // Try to get git user name from config as fallback
    let fallbackAuthor = 'Developer';
    try {
        fallbackAuthor = execSync('git config user.name').toString().trim() || 'Developer';
    } catch (e) {
        // If git config also fails, use environment variables that AWS Amplify might set
        fallbackAuthor = process.env.USER || process.env.USERNAME || process.env.LOGNAME || 'Developer';
    }

    // Fallback build info
    const fallbackInfo = {
        hash: 'dev',
        timestamp: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }),
        author: fallbackAuthor,
        branch: 'local',
        buildDate: new Date().toISOString()
    };

    const outputPath = path.join(__dirname, '../src/generated/buildInfo.json');
    const outputDir = path.dirname(outputPath);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(fallbackInfo, null, 2));
    console.log('⚠️  Using fallback build info');
}

# Coolify Deployment Guide

This guide will help you deploy the Bitmap Converter app to Coolify from GitHub.

## Prerequisites

- GitHub repository with your code
- Coolify instance running
- Docker support enabled in Coolify

## Deployment Steps

### 1. Repository Setup

1. Push your code to GitHub
2. Ensure all the following files are in your repository:
   - `Dockerfile`
   - `docker-compose.yml`
   - `coolify.json`
   - `.dockerignore`
   - `next.config.js` (with standalone output)

### 2. Coolify Configuration

1. **Create New Project** in Coolify
2. **Connect GitHub Repository**:
   - Repository URL: `https://github.com/yourusername/your-repo-name`
   - Branch: `main` (or your default branch)

3. **Build Configuration**:
   - Build Pack: `Docker`
   - Dockerfile: `Dockerfile`
   - Build Context: `.` (root directory)

4. **Runtime Configuration**:
   - Port: `3000`
   - Health Check URL: `/api/health`
   - Health Check Interval: `30s`
   - Health Check Timeout: `10s`
   - Health Check Retries: `3`

5. **Environment Variables** (Optional):
   ```
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   ```

### 3. Domain Configuration

1. Set up your domain in Coolify
2. Configure SSL certificate (Let's Encrypt recommended)
3. Point your domain to your Coolify instance

### 4. Deployment

1. Click **Deploy** in Coolify
2. Monitor the build logs
3. Wait for the health check to pass
4. Access your app via the configured domain

## Build Process

The Docker build process includes:

1. **Dependencies Installation**: npm ci for faster, reliable builds
2. **Application Build**: Next.js production build with optimizations
3. **Standalone Output**: Minimal production image
4. **Multi-stage Build**: Optimized for size and security
5. **Health Checks**: Built-in monitoring endpoint

## Monitoring

- **Health Endpoint**: `https://yourdomain.com/api/health`
- **Expected Response**:
  ```json
  {
    "status": "ok",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "service": "bitmap-converter"
  }
  ```

## Troubleshooting

### Build Failures

1. Check build logs in Coolify
2. Verify all dependencies are in `package.json`
3. Ensure TypeScript compilation passes locally

### Runtime Issues

1. Check container logs in Coolify
2. Verify health check endpoint responds
3. Check port configuration (should be 3000)

### Performance Optimization

1. Enable gzip compression (included in config)
2. Use CDN for static assets if needed
3. Monitor resource usage in Coolify

## Automatic Deployments

To enable automatic deployments:

1. Set up GitHub webhook in Coolify
2. Configure branch protection rules
3. Enable auto-deploy on push to main branch

## Rollback

If deployment fails:

1. Use Coolify's rollback feature
2. Or deploy a previous working commit
3. Check logs for error details

## Support

- Check Coolify documentation
- Review Docker build logs
- Test locally with `docker build` and `docker run`

## Security Notes

- No sensitive data in environment variables
- All dependencies are from npm registry
- Docker image runs as non-root user
- Health check doesn't expose sensitive information
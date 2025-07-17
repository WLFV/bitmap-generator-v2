# BITMAP CONVERTER

A modern bitmap image converter with advanced dithering algorithms built with Next.js 14.

## Features

- 🎨 Advanced dithering algorithms
- 🌓 Light/Dark theme support
- 📱 Responsive design
- ⚡ Fast image processing
- 🎯 Modern UI with Tailwind CSS
- 🔄 Real-time preview

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Deployment**: Docker + Coolify

## Getting Started

### Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

```bash
npm run build
npm start
```

## Docker Deployment

### Build and run with Docker

```bash
# Build the image
docker build -t bitmap-converter .

# Run the container
docker run -p 3000:3000 bitmap-converter
```

### Using Docker Compose

```bash
docker-compose up -d
```

## Coolify Deployment

This project is configured for deployment with Coolify:

1. **Repository**: Connect your GitHub repository to Coolify
2. **Build Pack**: Docker
3. **Port**: 3000
4. **Health Check**: `/api/health`

### Environment Variables

No environment variables are required for basic functionality.

### Deployment Configuration

- **Dockerfile**: Optimized multi-stage build
- **Health Check**: Available at `/api/health`
- **Standalone Output**: Enabled for optimal Docker performance
- **Image Optimization**: WebP and AVIF support

## Project Structure

```
src/
├── app/
│   ├── api/health/          # Health check endpoint
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── bitmap-canvas.tsx    # Canvas component
│   ├── controls-panel.tsx   # Control panel
│   ├── dithering-dropdown.tsx
│   ├── download-button.tsx
│   ├── theme-toggle.tsx     # Theme switcher
│   └── uploader.tsx         # File uploader
├── lib/
│   └── dithering/           # Dithering algorithms
├── store/
│   └── bitmap-store.ts      # State management
├── types/
│   └── bitmap.ts            # Type definitions
└── utils/
    ├── bitmap-processor.ts  # Image processing
    └── svg-exporter.ts      # SVG export
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
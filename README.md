# Astro Component Playground

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

An interactive playground for exploring and demonstrating Astro components, built with Starlight documentation framework and enhanced with React integration.

## Features

- 📝 **Interactive Documentation**: Component examples with live previews
- ⚛️ **React Integration**: Seamless React component support within Astro
- 🎨 **Tailwind CSS**: Modern styling with Tailwind CSS 4.0
- 🚀 **Starlight Framework**: Powerful documentation site generator
- 🎮 **Live Playground**: Interactive component renderer for testing

## 🚀 Project Structure

```
.
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images and media files
│   ├── components/
│   │   ├── examples/         # Example components (Astro & React)
│   │   └── playground/       # Interactive playground components
│   ├── content/
│   │   └── docs/            # Documentation pages (.md/.mdx)
│   ├── pages/               # Additional Astro pages
│   ├── styles/              # Global CSS and Tailwind config
│   └── content.config.ts    # Content collections configuration
├── astro.config.mjs         # Astro configuration
└── package.json
```

## Components

This playground includes several example components:

- **Button.astro**: Basic Astro component with Tailwind styling
- **InteractiveButton.astro**: Astro component with client-side interactivity
- **ReactCounter.tsx**: React component with state management
- **PlaygroundRenderer.tsx**: Interactive component preview system

## 🧞 Commands

All commands are run from the root of the project:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |
| `npm run astro`   | Run Astro CLI commands                       |

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:4321`

4. **Explore the components** in the documentation and try the interactive examples

## Adding New Components

1. Create your component in `src/components/examples/`
2. Add documentation in `src/content/docs/`
3. Include interactive examples using the playground renderer
4. Components can be written in Astro (.astro) or React (.tsx)

## 👀 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Starlight Documentation](https://starlight.astro.build/)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)

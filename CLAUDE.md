# Claude Code Configuration

This file contains configuration and context for Claude Code to work effectively with this Astro Component Playground project.

## Project Overview

This is an Astro-based component playground built with:

- **Astro** - The web framework
- **Starlight** - Documentation framework
- **React** - For interactive components
- **Tailwind CSS 4.0** - For styling
- **TypeScript** - For type safety

## Key Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run build        # Build for production
npm run preview      # Preview production build

# Linting & Type Checking
npm run astro check  # Run Astro's built-in checks
```

## Project Structure

```
src/
├── components/
│   ├── examples/         # Example components (Button, InteractiveButton, ReactCounter)
│   └── playground/       # Playground system (PlaygroundRenderer)
├── content/docs/         # Documentation pages (.mdx files)
├── pages/               # Additional Astro pages
└── styles/              # Global CSS and Tailwind config
```

## Component Development Guidelines

### Astro Components

- Use `.astro` extension
- Follow existing patterns in `src/components/examples/`
- Use Tailwind classes for styling
- Add client directives (`client:load`, `client:visible`) when needed

### React Components

- Use `.tsx` extension
- Import React from 'react'
- Use TypeScript for props
- Follow React best practices

### Documentation

- Add `.mdx` files to `src/content/docs/`
- Use the PlaygroundRenderer for interactive examples
- Include component props and usage examples

## Common Tasks

### Adding a New Component

1. Create component in `src/components/examples/`
2. Create documentation in `src/content/docs/[component-name].mdx`
3. Test with the playground renderer
4. Update navigation if needed

### Styling

- Use Tailwind CSS classes
- Global styles go in `src/styles/global.css`
- Follow existing design patterns

### Testing

- Test components in the browser using `npm run dev`
- Use the playground renderer for interactive testing
- Run `npm run build` to test production builds

## Dependencies

Key dependencies to be aware of:

- `astro` - Core framework
- `@astrojs/starlight` - Documentation theme
- `@astrojs/react` - React integration
- `react` & `react-dom` - React runtime
- `tailwindcss` - CSS framework
- `@tailwindcss/vite` - Vite integration

## Development Notes

- The project uses ES modules (`"type": "module"`)
- TypeScript is configured for strict mode
- Tailwind CSS 4.0 is used (note the newer API)
- React 19 is the current version used

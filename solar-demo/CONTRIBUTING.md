# Contributing to Balaji Solar & Auto Cleaning

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/balaji-solar.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy `.env.example` to `.env.local` and configure your environment variables
5. Start the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

- Create a feature branch from `main`:
  ```bash
  git checkout -b feature/your-feature-name
  ```
- Make your changes
- Run the verification checks:
  ```bash
  npm run lint
  npm run type-check
  npm run build
  ```
- Commit your changes with a clear, descriptive message
- Push to your fork and submit a pull request

## Code Style

- Use TypeScript for all components
- Follow the existing naming conventions (PascalCase for components, camelCase for functions/variables)
- Keep components small and focused on a single responsibility
- Use Tailwind CSS v4 utility classes for styling
- Ensure components are accessible (proper ARIA attributes, semantic HTML)

## Commit Messages

Use clear, descriptive commit messages:

- `feat: add new FAQ section component`
- `fix: resolve WhatsApp button tooltip positioning`
- `refactor: extract animation variants into shared module`
- `docs: update README with deployment instructions`

## Pull Request Guidelines

- Provide a clear description of what the PR does
- Reference any related issues
- Ensure all CI checks pass
- Keep PRs focused — one feature or fix per PR

## Reporting Issues

Use the GitHub issue templates for bug reports and feature requests. Please include:

- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable
- Browser and device information

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

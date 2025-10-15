# Jumbo King Restaurant Website

## Overview

Jumbo King is a static restaurant website for an Indian burger chain founded in 2001. The website showcases the brand's menu, locations, team, and company information through a multi-page HTML structure. It's a client-side only application with no backend services, databases, or server-side logic. The site uses vanilla HTML, CSS, and JavaScript to provide an interactive browsing experience for customers looking to learn about Jumbo King's offerings and locations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Static Multi-Page Website**
- **Problem**: Need to present restaurant information across different sections (menu, locations, team, contact)
- **Solution**: Traditional multi-page HTML architecture with separate files for each section
- **Rationale**: Simple, SEO-friendly approach suitable for static content without requiring a framework
- **Pros**: Easy to maintain, fast loading, no build process needed
- **Cons**: Some code duplication across pages (navigation, footer)

**Navigation System**
- **Problem**: Consistent navigation across all pages with mobile responsiveness
- **Solution**: Sticky navigation bar with hamburger menu for mobile devices
- **Implementation**: CSS-based responsive design with JavaScript toggle for mobile menu
- **Components**: 
  - Fixed navigation with active state indicators
  - Hamburger menu animation using CSS transforms
  - Click-outside-to-close functionality

**Interactive Features**
- **Problem**: Need user interaction without backend
- **Solution**: Client-side JavaScript for dynamic behaviors
- **Features Implemented**:
  - Add-to-cart button feedback (visual confirmation without actual cart)
  - Mobile menu toggle with animated hamburger icon
  - Form interactions (contact form)
  - User authentication (login/register using localStorage)
  - Session management and user state persistence

### Styling Architecture

**CSS Organization**
- **Problem**: Maintain consistent styling across multiple pages
- **Solution**: Single centralized `styles.css` file
- **Design System**:
  - Primary color: Red (#d32f2f) - brand color
  - Container-based responsive layout (max-width: 1200px)
  - Mobile-first responsive breakpoints
  - Consistent spacing and typography

**Component Patterns**
- Reusable classes for common elements (buttons, cards, grids)
- Page-specific sections (hero, menu-grid, team-grid, outlets-section)
- Utility classes for spacing and layout

### JavaScript Architecture

**Event-Driven Interactions**
- **Problem**: Handle user interactions without page reloads
- **Solution**: DOM event listeners with vanilla JavaScript
- **Key Functions**:
  - Hamburger menu toggle with animation state management
  - Add-to-cart visual feedback with timeout-based state reset
  - Navigation link click handlers for mobile menu closure

**State Management**
- Simple DOM class-based state (active/inactive states)
- No complex state management needed for static content
- Temporary UI states (button feedback) using timeouts

## External Dependencies

### Third-Party Services
**None** - The website is completely self-contained with no external API calls, CDN dependencies, or third-party integrations.

### Assets and Resources
- **Icons**: Emoji-based icons (no icon library required)
- **Fonts**: System fonts (`'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`)
- **Images**: Text-based emoji placeholders for menu items and team photos

### Future Integration Points
The current architecture could support:
- Contact form backend integration (email service or API endpoint)
- Shopping cart functionality (would require backend or local storage enhancement)
- Location services (Google Maps API for outlet locations)
- Online ordering system integration
- Analytics tracking (Google Analytics or similar)

### Browser Compatibility
- Relies on modern JavaScript (addEventListener, querySelector)
- CSS features: Flexbox, CSS transforms, sticky positioning
- Target browsers: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
# Exo Admin - Current Features Documentation

## Core Features to Preserve During Vue 3 Migration

### 1. Authentication & Authorization
- User login/logout system
- Two-factor authentication (2FA) setup and management
- User roles and permissions
- Password generation and management
- Session management

### 2. Dashboard & Navigation
- Main dashboard with widgets
- Sidebar navigation with collapsible sections
- Breadcrumb navigation
- Screen mode switching (fullscreen/popup)
- Mobile-responsive navigation

### 3. User Management
- User creation, editing, and deletion
- User groups management
- User profile management
- User permissions and roles
- User mailbox configuration
- VCF contact download

### 4. Content Management (Forms & Reacts)
- Dynamic form builder with drag & drop
- Form field types: input, textarea, select, checkbox, radio, date, file, etc.
- Form validation rules
- React (content) creation and editing
- React templates and layouts
- Form permalinks management
- Content publishing workflow

### 5. File Management
- File browser with tree view and grid view
- File upload with drag & drop
- File operations: copy, move, delete, rename
- Image cropping functionality
- File preview (images, videos, audio)
- File compression/decompression
- File permissions management

### 6. Data Tables & Filtering
- Advanced data tables with sorting
- Column filtering and search
- Pagination controls
- Export functionality
- Custom column configurations
- Row selection and bulk operations

### 7. Rich Text Editing
- TinyMCE integration
- Custom toolbar configurations
- Style formats management
- Media insertion
- Code editing capabilities

### 8. Site & Domain Management
- Multiple site management
- Domain configuration
- Edition management
- Site variables and settings
- Sitemap generation

### 9. Search & Query Builder
- Advanced search functionality
- Query builder with visual interface
- Search parameter management
- Filter rules configuration

### 10. Scheduler & Automation
- Cron job management
- Scheduled task configuration
- Process execution monitoring
- Maintenance mode management

### 11. Newsletter System
- Newsletter creation and management
- Mailing list management
- Email template system
- Mail reporting and analytics

### 12. Developer Tools
- Code editor with syntax highlighting
- Component testing interface
- Development utilities
- Debug information display

## Technical Features

### UI Components
- Custom switch components
- Tree view components
- Multiselect dropdowns
- Date/time pickers
- Progress bars and loading indicators
- Modal dialogs system
- Context menus
- Notification system

### Data Management
- Vuex store with modular structure
- API integration with axios
- Real-time data updates
- Caching mechanisms
- Error handling and validation

### Styling & Theming
- Bootstrap 4 integration
- Custom SCSS variables and mixins
- Responsive design
- Dark/light theme support
- Custom icon system (FontAwesome + SVG)

## Critical Dependencies to Migrate

### High Priority (Breaking Changes Expected)
- BootstrapVue 2 → BootstrapVue 3 or Bootstrap 5 components
- vue-tables-2 → Modern Vue 3 table solution
- VeeValidate 3 → VeeValidate 4
- vue-fragment → Native Vue 3 fragments
- PortalVue → Native Vue 3 Teleport

### Medium Priority (API Changes Expected)
- vue-awesome-notifications → Vue 3 notification system
- vue-progressbar → Vue 3 progress component
- vue-shortkey → VueUse keyboard composables
- liquor-tree → Vue 3 tree component
- vuebar → Vue 3 scrollbar component

### Low Priority (Minor Changes)
- FontAwesome Vue → Vue 3 version
- vue-router-back-button → Custom implementation
- Axios → Update to latest version

## Testing Checklist

### Core Workflows
- [ ] User login and authentication
- [ ] Form creation and editing
- [ ] File upload and management
- [ ] Content publishing
- [ ] User management
- [ ] Site configuration
- [ ] Search functionality
- [ ] Newsletter management

### UI Components
- [ ] All modal dialogs
- [ ] Data table operations
- [ ] Form validation
- [ ] File manager operations
- [ ] Tree view interactions
- [ ] Context menus
- [ ] Notification system

### API Integration
- [ ] All CRUD operations
- [ ] File operations
- [ ] Authentication endpoints
- [ ] Search and filtering
- [ ] Bulk operations

## Migration Notes

### Event Bus Usage
- Heavy usage of exoEventBus for component communication
- API call notifications via event bus
- Router navigation via event bus
- Need to migrate to provide/inject or composables

### Custom Mixins
- Global ECO mixin for store access
- Authorization mixins
- Form control mixins
- Component helper mixins

### Functional Components
- vnodes components for dynamic rendering
- Table row components
- Filter components

### Vue 2 Specific Patterns
- $listeners and $attrs usage
- Scoped slots syntax
- Global component registration
- Plugin installation patterns

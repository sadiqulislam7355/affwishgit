# AFFWISH - White-Label CPA Network Platform

A comprehensive, production-ready white-label SaaS platform for CPA (Cost Per Action) affiliate networks.

## Features

### 🏢 Multi-Tenant Architecture
- **White-Label System**: Each tenant can have custom branding, domain, and settings
- **Role-Based Access**: Super Admin, Network Admin, Affiliate, Advertiser roles
- **Tenant Management**: Complete isolation and management of network instances

### 📊 Advanced Analytics & Reporting
- **Real-time Dashboards**: Role-specific dashboards with relevant metrics
- **Performance Tracking**: Clicks, conversions, revenue, EPC tracking
- **Custom Reports**: Flexible reporting with export capabilities
- **Fraud Detection**: Integrated fraud prevention with multiple API providers

### 🎯 Offer & Campaign Management
- **Offer Creation**: Complete offer management with targeting options
- **SmartLink System**: Advanced link routing with geo/device targeting
- **Campaign Tracking**: Comprehensive tracking with custom parameters
- **Creative Management**: Upload and manage promotional materials

### 🔒 Security & Fraud Prevention
- **API Integration**: IPQualityScore, Anura, FraudScore integration
- **Real-time Monitoring**: Bot detection, proxy detection, suspicious patterns
- **Automated Blocking**: Configurable thresholds and auto-blocking
- **Audit Trails**: Complete activity logging and monitoring

### 💰 Financial Management
- **Payout System**: Automated payout calculations and processing
- **Multiple Payment Methods**: PayPal, Bank Transfer, Cryptocurrency
- **Invoice Generation**: Automated billing and invoice creation
- **Revenue Tracking**: Comprehensive financial reporting

### 🔗 Postback Automation
- **Flexible Configuration**: Custom postback URLs with macro support
- **Real-time Firing**: Instant conversion tracking and notifications
- **Testing Tools**: Built-in postback testing and validation
- **Queue Management**: Reliable delivery with retry mechanisms

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Static hosting compatible (shared hosting, CDN, etc.)

## Installation

### For Shared Hosting

1. **Build the project**:
   ```bash
   npm install
   npm run build
   ```

2. **Upload to hosting**:
   - Upload the contents of the `dist` folder to your hosting root directory
   - Ensure `.htaccess` file is included for proper routing

3. **Configure domain**:
   - Point your domain to the hosting directory
   - Ensure mod_rewrite is enabled for clean URLs

### For VPS/Cloud Hosting

1. **Clone and install**:
   ```bash
   git clone <repository>
   cd affwish-cpa-platform
   npm install
   ```

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Serve with web server**:
   - Use Nginx, Apache, or any static file server
   - Point to the `dist` directory
   - Configure proper routing for SPA

## Configuration

### Environment Setup
The platform is designed to work with various backend APIs. Configure your API endpoints in the `src/services/api.ts` file.

### Fraud Detection APIs
Configure your fraud detection providers in the admin panel:
- IPQualityScore
- Anura
- FraudScore

### White-Label Customization
Each tenant can customize:
- Logo and branding
- Color scheme
- Domain mapping
- Email templates
- Terms and privacy pages

## Usage

### Demo Mode
The platform includes a comprehensive demo mode with:
- Sample data for all user roles
- Working forms and interactions
- Simulated API responses
- Role switching for testing

### Production Setup
For production deployment:
1. Replace mock API services with real backend endpoints
2. Configure database connections
3. Set up proper authentication
4. Configure email services
5. Set up payment processing

## User Roles

### Super Admin
- Platform-wide management
- Tenant creation and management
- System monitoring and configuration
- Global analytics and reporting

### Network Admin
- Network-specific management
- Offer and affiliate management
- Fraud detection configuration
- Financial reporting and payouts

### Affiliate
- Performance dashboard
- Offer browsing and link generation
- Earnings and payment tracking
- Creative and promotional tools

### Advertiser
- Campaign management
- Offer creation and tracking
- Traffic source analysis
- Budget and performance monitoring

## API Integration

The platform is designed to integrate with:
- **CRM Systems**: For user management
- **Payment Processors**: Stripe, PayPal, etc.
- **Email Services**: SendGrid, Mailgun, etc.
- **Fraud Detection**: Multiple API providers
- **Analytics**: Custom tracking and reporting

## Support

For technical support and customization:
- Review the comprehensive documentation
- Check the built-in help system
- Contact support for enterprise features

## License

This is a commercial white-label platform. Contact for licensing terms.

---

**AFFWISH** - Empowering affiliate networks worldwide with cutting-edge technology and comprehensive features.
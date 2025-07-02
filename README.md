# AFFWISH - Premium CPA Network Platform

A production-ready CPA (Cost Per Action) affiliate network platform built with React, TypeScript, and Supabase.

## 🚀 **Production Ready Features**

### ✅ **Complete User Management**
- **Admin Dashboard**: Full network administration
- **Affiliate Portal**: Performance tracking and link management
- **Role-based Access Control**: Secure permissions system
- **User Impersonation**: Admin can impersonate affiliates for support

### ✅ **Offer Management**
- **Dynamic Offer Creation**: Full CRUD operations
- **Tracking URL Generation**: Auto-generated with macro support
- **Postback Integration**: Real-time conversion tracking
- **Multi-template Support**: Everflow, HasOffers, Affise, Trackier, Voluum, CAKE, etc.

### ✅ **Advanced Tracking**
- **Real-time Click Tracking**: IP, device, browser detection
- **Conversion Attribution**: 30-day attribution window
- **Fraud Protection**: IPQualityScore integration
- **Analytics Dashboard**: Performance metrics and reporting

### ✅ **Payment System**
- **Multiple Payment Methods**: PayPal, Bank Transfer, Crypto, Check
- **Automated Calculations**: Real-time earnings tracking
- **Payment History**: Complete transaction records
- **Configurable Minimums**: Flexible payout thresholds

## 🔐 **Default Login Credentials**

### **Admin Account**
```
Email: admin@affwish.com
Password: Admin123!@#
```
**Access Level**: Full network administration
- Manage offers and affiliates
- View all analytics and reports
- Configure network settings
- Process payments
- Fraud protection management

### **Affiliate Account**
```
Email: affiliate@affwish.com
Password: Affiliate123!@#
```
**Access Level**: Affiliate portal
- Browse available offers
- Generate tracking links
- View performance statistics
- Manage payment settings
- Access creatives and resources

## 🛠 **Technical Stack**

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Charts**: Recharts for analytics visualization
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## 📊 **Database Schema**

### **Core Tables**
- `profiles` - User profiles with role-based access
- `offers` - CPA offers with tracking configuration
- `affiliates` - Affiliate management and statistics
- `clicks` - Click tracking and analytics
- `conversions` - Conversion tracking and reporting
- `payments` - Payment history and management
- `postbacks` - Postback configurations
- `fraud_logs` - Fraud detection logs
- `settings` - Network-wide configuration

### **Security Features**
- **Row Level Security (RLS)**: Database-level access control
- **Role-based Policies**: Admin vs Affiliate data separation
- **Secure Authentication**: Supabase Auth with email verification
- **API Protection**: Authenticated endpoints only

## 🔧 **Configuration**

### **Environment Variables**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Network Settings**
Access admin settings to configure:
- **Global Postback URL**: Network-wide conversion tracking
- **Fraud Protection**: IPQualityScore API integration
- **SMTP Settings**: Email notifications
- **Payment Configuration**: Minimum payouts and frequencies
- **Tracking Domains**: Custom tracking and postback domains

## 🚀 **Getting Started**

1. **Clone and Install**
```bash
git clone <repository>
cd affwish-cpa-platform
npm install
```

2. **Configure Supabase**
- Create a new Supabase project
- Run the migration files in `/supabase/migrations/`
- Update environment variables

3. **Start Development**
```bash
npm run dev
```

4. **Login with Default Credentials**
- Use the admin or affiliate credentials above
- Explore the full functionality

## 📈 **Key Features**

### **For Admins**
- **Offer Management**: Create, edit, and manage CPA offers
- **Affiliate Oversight**: Monitor affiliate performance and payments
- **Real-time Analytics**: Track clicks, conversions, and revenue
- **Fraud Protection**: Automated fraud detection and blocking
- **Payment Processing**: Manage affiliate payouts and history
- **Network Configuration**: Global settings and integrations

### **For Affiliates**
- **Offer Discovery**: Browse and filter available offers
- **Link Generation**: Create tracking links with custom parameters
- **Performance Tracking**: Real-time statistics and analytics
- **Creative Assets**: Access banners, videos, and landing pages
- **Payment Management**: Track earnings and request payouts
- **Profile Management**: Update payment methods and preferences

## 🔒 **Security & Compliance**

- **Data Protection**: GDPR-compliant data handling
- **Secure Authentication**: Multi-factor authentication support
- **Fraud Prevention**: Real-time IP and device fingerprinting
- **Audit Logging**: Complete activity tracking
- **API Security**: Rate limiting and authentication
- **Database Security**: Encrypted data storage

## 📞 **Support & Documentation**

- **Admin Guide**: Complete network administration documentation
- **Affiliate Guide**: Step-by-step affiliate onboarding
- **API Documentation**: RESTful API endpoints and examples
- **Integration Guides**: Third-party service integrations
- **Troubleshooting**: Common issues and solutions

## 🎯 **Production Deployment**

The platform is production-ready with:
- **Scalable Architecture**: Handles high-volume traffic
- **Real-time Updates**: Live data synchronization
- **Mobile Responsive**: Works on all devices
- **Performance Optimized**: Fast loading and smooth UX
- **Error Handling**: Comprehensive error management
- **Monitoring Ready**: Built-in analytics and logging

---

**AFFWISH** - *Powering the future of affiliate marketing* 🚀
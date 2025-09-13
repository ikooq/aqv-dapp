# Deployment Guide

This guide covers how to deploy Aqyldy Vaults to different environments.

## 🚀 Quick Deploy

### Vercel (Recommended for Frontend)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aqyldy/aqv-dapp)

1. Click the deploy button above
2. Connect your GitHub account
3. Configure environment variables
4. Deploy!

### Manual Vercel Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SOLANA_NETWORK
vercel env add NEXT_PUBLIC_SOLANA_RPC
# ... add other variables
```

## 🏗️ Environment Setup

### Development
```bash
# Copy environment file
cp env.example .env.local

# Install dependencies
npm install

# Run development server
npm run dev
```

### Production
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Environment Variables

### Required Variables
```env
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_DEMO_MODE=false
```

### Optional Variables
```env
NEXT_PUBLIC_JUP_ENABLE_SEND=true
NEXT_PUBLIC_PYTH_ENABLED=true
NEXT_PUBLIC_GA_TRACKING_ID=your-tracking-id
```

## 🌐 Solana Program Deployment

### Prerequisites
```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"

# Install Anchor CLI
npm install -g @coral-xyz/anchor-cli

# Set up Solana config
solana config set --url devnet
```

### Deploy to Devnet
```bash
cd aqv

# Build the program
anchor build

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Verify deployment
solana program show <PROGRAM_ID>
```

### Deploy to Mainnet
```bash
# Switch to mainnet
solana config set --url mainnet-beta

# Deploy (requires mainnet SOL)
anchor deploy --provider.cluster mainnet-beta

# Verify deployment
solana program show <PROGRAM_ID>
```

## 🐳 Docker Deployment

### Build Docker Image
```bash
# Build image
docker build -t aqv-dapp .

# Run container
docker run -p 3000:3000 aqv-dapp
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
      - NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com
```

## ☁️ Cloud Deployment

### AWS
1. Use AWS Amplify for frontend
2. Deploy Solana program to AWS Lambda
3. Use RDS for database (if needed)

### Google Cloud
1. Use Cloud Run for frontend
2. Deploy Solana program to Cloud Functions
3. Use Cloud SQL for database (if needed)

### DigitalOcean
1. Use App Platform for frontend
2. Use Droplets for Solana program
3. Use Managed Database (if needed)

## 🔒 Security Considerations

### Environment Security
- Never commit `.env` files
- Use environment-specific configurations
- Rotate API keys regularly
- Use HTTPS in production

### Smart Contract Security
- Audit all smart contracts
- Use multi-signature wallets
- Implement proper access controls
- Test thoroughly on devnet

## 📊 Monitoring

### Application Monitoring
- Set up error tracking (Sentry)
- Monitor performance metrics
- Track user analytics
- Set up uptime monitoring

### Blockchain Monitoring
- Monitor transaction success rates
- Track gas usage
- Monitor program logs
- Set up alerts for failures

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run deploy
```

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

#### Solana Program Issues
```bash
# Check program status
solana program show <PROGRAM_ID>

# Check account balance
solana balance <ACCOUNT_ADDRESS>

# View program logs
solana logs <PROGRAM_ID>
```

#### Environment Issues
```bash
# Check environment variables
echo $NEXT_PUBLIC_SOLANA_NETWORK

# Verify RPC connection
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}' $NEXT_PUBLIC_SOLANA_RPC
```

## 📞 Support

If you encounter issues during deployment:
- Check the [troubleshooting section](#-troubleshooting)
- Open a GitHub issue
- Join our Discord community
- Contact support@aqyldy.com

---

Happy deploying! 🚀

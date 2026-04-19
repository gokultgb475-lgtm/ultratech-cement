# Deployment Guide

## Building for Production

### 1. Build the Project
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 2. Preview Build Locally
```bash
npm run preview
```

This lets you test the production build locally before deploying.

## Deployment Options

### Option A: GitHub Pages

Use the built site inside the `docs/` folder and let GitHub Pages serve it directly from the `main` branch.

#### 1. Build the Pages version
```bash
npm run build:pages
```

#### 2. Copy the build into `docs/`
```bash
rm -rf docs
mkdir docs
cp -R dist/. docs/
touch docs/.nojekyll
```

#### 3. Push the latest code
```bash
git add docs
git commit -m "Update GitHub Pages build"
git push origin main
```

#### 4. Enable Pages in GitHub
- Open your repository on GitHub
- Go to `Settings` -> `Pages`
- Set `Source` to `Deploy from a branch`
- Set `Branch` to `main`
- Set `Folder` to `/docs`

#### 5. Wait for Pages to publish
- GitHub usually publishes within a minute or two after the push

Your site will be live at:
`https://gokultgb475-lgtm.github.io/ultratech-cement/`

### Option B: Firebase Hosting (Recommended)

#### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

#### 2. Login to Firebase
```bash
firebase login
```

#### 3. Initialize Firebase in your project
```bash
firebase init hosting
```

When prompted:
- Select your Firebase project
- Set public directory to: `dist`
- Configure as single-page app: `Yes`

#### 4. Deploy
```bash
npm run build
firebase deploy
```

Your site will be live at: `https://<project-id>.firebaseapp.com`

### Option C: Vercel (Easiest)

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Deploy
```bash
vercel
```

Follow the prompts. Vercel handles building automatically.

### Option D: Netlify

#### 1. Connect Repository
Go to [Netlify](https://netlify.com) and connect your Git repository.

#### 2. Build Settings
- Build command: `npm run build`
- Publish directory: `dist`

#### 3. Environment Variables
Add these in Netlify settings:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
...
```

### Option E: Docker (Self-hosted)

#### 1. Create Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

#### 2. Build Docker Image
```bash
docker build -t ultratech-cement .
```

#### 3. Run Container
```bash
docker run -p 3000:3000 ultratech-cement
```

## Environment Variables Setup

### 1. Create .env file (Never commit this)
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. Update firebase.ts to use environment variables
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Firebase Firestore Deployment Rules

### Update Production Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create orders
    match /orders/{document=**} {
      allow create: if true;
      allow read, update: if request.auth != null;
      allow delete: if false; // Don't allow deletion
    }
    
    // Allow authenticated admins to read products
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Optional: Add admin-specific collections
    match /admins/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Performance Optimization

### 1. Code Splitting
Already configured in `vite.config.ts`

### 2. Image Optimization
- Use WebP format for images
- Optimize SVGs
- Lazy load images

### 3. API Optimization
- Use Firestore indexes for common queries
- Implement caching strategies
- Monitor Firestore read/write costs

### 4. Bundle Analysis
```bash
npm install -D rollup-plugin-visualizer
```

Add to vite.config.ts:
```typescript
import { visualizer } from "rollup-plugin-visualizer";

export default {
  plugins: [visualizer()],
};
```

## Monitoring & Analytics

### 1. Google Analytics
Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 2. Firebase Analytics
Already connected via Firebase SDK.

### 3. Error Tracking
Consider adding Sentry:
```bash
npm install @sentry/react
```

## Backup & Recovery

### 1. Database Backups
Firebase automatically backs up Firestore data.

### 2. Manual Backups
```bash
firebase firestore:export gs://bucket-name/exports
```

### 3. Source Control
Always maintain Git history:
```bash
git push origin main
```

## SSL/HTTPS

- Firebase Hosting: Automatic SSL
- Vercel: Automatic SSL
- Netlify: Automatic SSL
- Self-hosted: Use Let's Encrypt

## Domain Setup

### 1. Firebase Hosting
```bash
firebase hosting:channel:deploy staging
firebase hosting:clone source-site:prod target-site:prod
```

### 2. Custom Domain
1. Buy domain from registrar
2. Add to Firebase/Vercel console
3. Update DNS records
4. SSL certificate auto-provisioned

## Performance Monitoring

### Production Checklist
- [ ] Build size < 500KB (gzipped)
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3.5s
- [ ] All Firebase rules configured
- [ ] Admin users created
- [ ] Products initialized
- [ ] Email notifications working
- [ ] Error tracking enabled
- [ ] Analytics enabled

## Rollback Plan

### If Something Goes Wrong

#### Firebase Hosting
```bash
firebase hosting:channel:list
firebase hosting:channel:deploy :promote target-id
```

#### Vercel
```bash
vercel rollback
```

#### Manual Rollback
```bash
git revert <commit-id>
git push origin main
npm run build
# Redeploy
```

## Cost Optimization

### Firebase Usage Limits (Free Tier)
- Firestore: 50K reads/day
- Storage: 5GB
- Auth: Unlimited

### Monitoring Usage
1. Go to Firebase Console
2. Check Usage tab
3. Set billing alerts

### Reduce Costs
- Optimize Firestore queries
- Implement pagination
- Cache frequently read data
- Archive old orders after 30 days

## Security Checklist

- [ ] API keys restricted to your domain
- [ ] Firestore rules enforced
- [ ] Firebase Auth enabled
- [ ] Admin password strong
- [ ] No sensitive data in frontend code
- [ ] HTTPS only
- [ ] CORS configured
- [ ] Rate limiting enabled (if using API)
- [ ] Regular security audits
- [ ] Backup strategy in place

## Maintenance

### Regular Tasks

**Weekly:**
- Check analytics
- Review new orders
- Monitor performance

**Monthly:**
- Update dependencies: `npm update`
- Review Firebase usage
- Check error logs
- Backup Firestore data

**Quarterly:**
- Security audit
- Performance optimization
- Update Firebase rules if needed
- Review and update admin credentials

## Support & Troubleshooting

### Common Issues

**High Firestore costs**
- Optimize queries
- Implement pagination
- Add request limits

**Slow page load**
- Enable compression
- Optimize images
- Split code
- Use CDN

**Authentication issues**
- Check Firebase rules
- Verify Firebase config
- Check browser console

**OutOurs connections**
- Check network tab
- Verify authentication
- Check Firebase status

## Post-Deployment Testing

```bash
# Run tests
npm run test

# Build verification
npm run build

# Production preview
npm run preview

# Lighthouse audit
npx lighthouse https://your-domain.com
```

## Continuous Integration/Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Firebase
      uses: w9jds/firebase-action@master
      with:
        args: deploy --only hosting
      env:
        FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

## Getting Firebase Token for CI/CD

```bash
firebase login:ci
```

Copy the token and add to GitHub Secrets as `FIREBASE_TOKEN`.

## Next Steps

1. ✅ Build locally: `npm run build`
2. ✅ Preview production: `npm run preview`
3. ✅ Set up Firebase Hosting (or Vercel/Netlify)
4. ✅ Configure environment variables
5. ✅ Deploy: `firebase deploy` (or equivalent)
6. ✅ Test all functionality
7. ✅ Set up monitoring
8. ✅ Create backup schedule
9. ✅ Document maintenance tasks
10. ✅ Train admin users

---

For more information:
- [Vite Deployment](https://vitejs.dev/guide/ssr.html)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com)

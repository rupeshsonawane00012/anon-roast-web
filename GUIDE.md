# Quick Start Guide

## 🚀 Using RoastMe

### For First-Time Users

1. **Visit the Homepage**
   - An anonymous session is created automatically
   - No sign-up required!

2. **Upload an Image**
   - Click "Start Roasting" or go to `/upload`
   - Drag & drop or browse for an image
   - Choose your roast level: Soft, Spicy, or Savage
   - Check the consent box
   - Hit "Enter the Arena"

3. **In the Arena**
   - View your uploaded image
   - Watch roasts appear in real-time
   - Submit your own roasts
   - Share the best ones

### Daily Challenge

- Visit `/daily` to see today's roasting topic
- Upload an image related to the topic
- Compete for the top spot on the leaderboard
- New challenge every 24 hours

### Sharing

- Every roast session gets a unique shareable link
- Go to `/share/:roastId` to see the share page
- One-click share to Twitter, Facebook, Reddit
- Copy link to share anywhere

## 🔧 Technical Details

### Anonymous Sessions
- Random username generated (e.g., "SpicyRoaster247")
- Stored in localStorage
- No personal data collected

### Image Storage
- Uploaded to Supabase Storage
- Signed URLs (24-hour expiry)
- Automatic cleanup of expired sessions

### Real-time Updates
- Arena polls for new roasts every 5 seconds
- Top roasts are highlighted automatically
- Creativity scores are AI-generated

### Moderation
- All content passes through AI moderation
- Blocked content includes:
  - Hate speech & slurs
  - Sexual harassment
  - Threats & doxxing
  - Body shaming
  - Lazy insults

## 🎯 Tips for Going Viral

1. **Choose Good Images**
   - Clear, relatable content
   - Funny contexts work best
   - Tech/work content is popular

2. **Write Creative Roasts**
   - Be witty, not mean
   - Reference the image specifically
   - Add unexpected twists

3. **Share Strategically**
   - Share to relevant communities
   - Best roasts get the most engagement
   - Daily challenges are share-worthy

4. **Engage with Daily Challenges**
   - Consistent participation
   - Build anonymous reputation
   - Top 10 gets featured

## 🛡️ Safety

- Report inappropriate content immediately
- Use the flag icon on any roast
- Moderators review within 24 hours
- Repeat offenders are banned

## 📱 Mobile Experience

- Fully responsive design
- Touch-friendly interfaces
- Share buttons optimized for mobile
- Works on all modern browsers

---

Need help? Check `/rules` for full community guidelines.

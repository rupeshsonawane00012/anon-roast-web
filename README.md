# RoastMe - Anonymous Image Roasting Platform

A production-grade, viral web application where users can upload images anonymously and get creatively roasted by the community.

## 🎯 Features

### Core Functionality
- **Anonymous Sessions**: Auto-generated random usernames, no profiles or sign-ups
- **Image Upload**: Drag-and-drop image uploads with consent verification
- **Roast Levels**: Choose between Soft, Spicy, or Savage roasts
- **Real-time Arena**: Live feed of roast submissions with auto-refresh
- **AI Moderation**: Automated content filtering for safety (simulated)
- **Daily Challenges**: 24-hour roasting competitions with leaderboards
- **Share System**: One-click sharing to social media platforms

### Pages
1. **Landing (/)** - Hero section, how it works, featured roasts
2. **How It Works (/how)** - Detailed explainer with rules and guidelines
3. **Upload (/upload)** - Image upload with roast level selection
4. **Arena (/arena/:id)** - Main engagement page with roast submissions
5. **Daily (/daily)** - Daily challenge with countdown timer
6. **Share (/share/:roastId)** - Shareable roast cards with social buttons
7. **Rules (/rules)** - Community guidelines and safety policies

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation (Data mode)
- **Tailwind CSS v4** for styling
- **Motion (Framer Motion)** for animations
- **Lucide React** for icons
- **Sonner** for toast notifications

### Backend
- **Supabase** (PostgreSQL database + Storage + Real-time)
- **Hono** server (Deno edge function)
- **Key-Value Store** for data persistence
- **Supabase Storage** for image hosting with signed URLs

## 📁 Project Structure

```
/src/app
├── App.tsx                    # Root component with RouterProvider
├── routes.tsx                 # Route configuration
├── pages/
│   ├── Landing.tsx           # Home page
│   ├── HowItWorks.tsx        # Explainer page
│   ├── Upload.tsx            # Image upload form
│   ├── Arena.tsx             # Main roasting interface
│   ├── Daily.tsx             # Daily challenge
│   ├── Share.tsx             # Share page with social buttons
│   ├── Rules.tsx             # Community guidelines
│   └── NotFound.tsx          # 404 page
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── RoastCard.tsx         # Individual roast display
│   └── SessionProvider.tsx   # Anonymous session management
└── lib/
    └── supabase.ts           # API client

/supabase/functions/server
└── index.tsx                  # Hono server with routes
```

## 🔌 API Endpoints

### Server Routes (Hono)
- `POST /session` - Create anonymous session
- `POST /upload` - Upload image and create roast session
- `GET /roast/:id` - Get roast session details
- `POST /roast/:id/submit` - Submit a roast
- `GET /roast/:id/feed` - Get roast submissions
- `GET /daily` - Get daily challenge
- `POST /report` - Report inappropriate content

## 🗄️ Data Schema

### Key-Value Store Structure
```
session:{sessionId}             → User session data
roast:{roastId}                 → Roast session metadata
roast_submission:{roastId}:{id} → Individual roast submissions
daily:{date}                    → Daily challenge data
daily_submission:{date}:{id}    → Daily challenge submissions
report:{reportId}               → Content reports
```

## 🎨 Design System

- **Typography**: System fonts with clear hierarchy
- **Colors**: Orange primary (#F97316), gradients for CTAs
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth micro-animations with Motion
- **Responsive**: Mobile-first design

## 🔒 Safety Features

### AI Moderation (Simulated)
- Blocks offensive language and slurs
- Detects hate speech patterns
- Scores roasts on creativity
- Auto-mutes repeat offenders

### Content Policies
- Consent-required uploads
- No hate speech or harassment
- No NSFW content
- Body shaming prohibited
- 18+ age restriction

## 🚀 Getting Started

The app is already configured and running. Key features:

1. **Anonymous by Default**: Sessions are auto-created on first visit
2. **Upload Flow**: Upload → Choose Level → Enter Arena
3. **Real-time Updates**: Arena polls for new submissions every 5s
4. **24hr Expiry**: Roast sessions expire after 24 hours

## 📝 Notes

### Production Considerations
- **AI Moderation**: Currently simulated. In production, integrate OpenAI/Anthropic moderation API
- **Image Processing**: Consider adding face blur functionality
- **Scaling**: Implement proper real-time with WebSockets/Supabase Realtime
- **Analytics**: Add event tracking for viral growth metrics
- **Rate Limiting**: Implement rate limits on uploads and submissions

### Moderation Quality
The current moderation is basic keyword filtering. For production:
- Use OpenAI Moderation API
- Implement ML-based image scanning
- Add human review queue for edge cases
- Create appeal system for false positives

## 🎯 Viral Growth Features

- **Daily Challenges**: Drives repeat engagement
- **Share Cards**: Screenshot-optimized for social media
- **Leaderboards**: Anonymous competition
- **Top Roasts**: Highlights best content
- **No Barriers**: No signup required

## 🛡️ Safety First

Every design decision prioritizes safety:
- Anonymous but accountable (session tracking)
- AI-first moderation (content blocked before publish)
- Easy reporting system
- Clear community guidelines
- Age-gated content

---

Built with ❤️ for the roasting community. Be creative, not cruel.

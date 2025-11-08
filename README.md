# Avyra Studio

World-class designs delivered in 48 hours. Design partner for founders.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# ClickUp Integration
CLICKUP_API_KEY=your_clickup_api_key_here
CLICKUP_LIST_ID=your_clickup_list_id_here

# Optional: ClickUp Custom Field IDs for additional data mapping
CLICKUP_CUSTOM_FIELD_EMAIL_ID=
CLICKUP_CUSTOM_FIELD_COMPANY_ID=
CLICKUP_CUSTOM_FIELD_BUDGET_ID=

# Beehive Integration
BEEHIVE_API_KEY=your_beehive_api_key_here
BEEHIVE_PUBLICATION_ID=your_beehive_publication_id_here
```

#### Getting Your API Keys:

**ClickUp:**
1. Go to ClickUp Settings → Apps → API Token
2. Generate a new API key
3. Get your List ID from the ClickUp URL: `https://app.clickup.com/[workspace]/v/li/[LIST_ID]`

**Beehive:**
1. Go to Beehive Settings → Integrations → API
2. Create a new API key
3. Get your Publication ID from your Beehive dashboard URL

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Intake Form Flow

The site includes a streamlined application flow:

1. **Homepage** (`/`) - Hero with "Get Started" CTA button
2. **Intake Form** (`/intake`) - 11-step application form:
   - Welcome screen
   - 5 text input questions (name, email, company, website, project description)
   - 4 multiple-choice questions (timeline, services, budget, referral source)
   - Submit confirmation screen
3. **Success Page** - Shown after successful submission with "Let's Start Dreaming" CTA

### Form Questions

**Text Inputs:**
1. What's your name?
2. Where can we reach you with next steps? (Email)
3. What should we call this masterpiece in the making? (Company/Project Name)
4. Where can we see your brand in action? (Website - optional)
5. Tell us about your project (Project description and goals)

**Multiple Choice:**
6. When do you want to launch? (Urgent, 1-2 months, 3-6 months, Flexible)
7. Which of our services are you interested in? (Multi-select: Brand Identity, Brand Strategy, Web Design, UI/UX Design, Marketing Assets, Event Design, Development Services, Other)
8. What's your ballpark budget? ($2k-$5k, $5k-$10k, $10k-$20k, $20k-$50k, $50k-$100k+)
9. Where did you hear about us? (Referral, Social Media, Google Search, Event or Conference, Other)

## API Routes

### `/api/submit-intake`

Handles form submission to ClickUp (CRM) and Beehive (newsletter).

**Request Body:**
```typescript
{
  name: string;
  email: string;
  company_name: string;
  website: string;              // Optional
  project_description: string;
  launch_timeline: string;
  services: string;             // Comma-separated string
  budget: string;
  referral_source: string;
}
```

**Response:**
```typescript
{
  success: true,
  integrations: {
    clickup: boolean,
    beehive: boolean
  }
}
```

**ClickUp Task Creation:**
- Task Name: `{name} - {company_name} ({budget})`
- Priority: Based on budget (higher budget = higher priority)
- Tags: Timeline, budget, referral source, and all selected services
- Status: "new application"

**Beehive Subscription:**
- Adds subscriber with name and company information
- Campaign: "avyra-studio-application"
- Sends welcome email

## Project Structure

```
avyra-studio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── submit-intake/
│   │   │       └── route.ts          # API endpoint for form submission
│   │   ├── intake/
│   │   │   ├── page.tsx              # Intake form page
│   │   │   └── metadata.ts           # SEO metadata
│   │   └── page.tsx                  # Homepage
│   └── components/
│       └── landing/
│           ├── IntakeForm.tsx        # Main intake form component
│           ├── hero.tsx              # Homepage hero section
│           ├── navbar.tsx            # Navigation
│           ├── footer.tsx            # Footer
│           └── ...                   # Other landing page components
└── public/
    ├── images/                       # Images and graphics
    └── icons/                        # Icons and SVGs
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **GSAP** - Advanced animations
- **React Hook Form** - Form handling
- **ClickUp API** - CRM integration
- **Beehive API** - Newsletter integration

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Make sure to add all environment variables in your Vercel project settings.

## Support

For questions or issues, contact the Avyra team.

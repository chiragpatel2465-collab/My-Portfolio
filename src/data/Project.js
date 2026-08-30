const projects = [
  {
    id: "nova-ai-dashboard",
    title: "Nova AI Dashboard",
    thumbnail: "/assets/projects/nova-thumbnail.png",
    fallbackGradient: "from-violet-600/30 to-fuchsia-600/20",
    date: "2025",
    techStack: ["React 18", "Tailwind CSS", "Framer Motion", "Recharts"],
    liveUrl: "https://example.com/nova",
    githubUrl: "https://github.com/yourusername/nova-ai",
    featured: true,
    description: "A comprehensive analytics dashboard for AI model performance tracking. It provides real-time visualization of machine learning metrics, user engagement, and system health for enterprise-level AI deployments. Built to consolidate fragmented reporting tools into a single, cohesive glassmorphic interface.",
    keyFeatures: [
      {
        title: "Real-time Metric Visualization",
        description: "Streams live data via WebSockets to instantly reflect changes in AI token consumption and latency metrics."
      },
      {
        title: "Interactive Data Filtering",
        description: "Allows users to slice and dice timeline data down to the millisecond using highly performant Recharts graphs."
      },
      {
        title: "Adaptive Glassmorphic UI",
        description: "A visually stunning interface that maintains high contrast and accessibility while delivering a premium dark-mode aesthetic."
      }
    ],
    galleryImages: [
      "/assets/projects/nova-screenshot-1.png",
      "/assets/projects/nova-screenshot-2.png",
      "/assets/projects/nova-screenshot-3.png"
    ]
  },
  {
    id: "dev-sync-pro",
    title: "DevSync Pro",
    thumbnail: "/assets/projects/devsync-thumbnail.png",
    fallbackGradient: "from-blue-600/30 to-violet-600/20",
    date: "2024",
    techStack: ["TypeScript", "Next.js", "Tailwind CSS"],
    liveUrl: "https://example.com/devsync",
    githubUrl: "https://github.com/yourusername/devsync",
    featured: false,
    description: "A collaborative workspace designed specifically for remote engineering teams. It bridges the gap between ticketing systems and real-time chat, allowing developers to link commits directly to conversation threads. Built to reduce context-switching and improve async communication.",
    keyFeatures: [
      {
        title: "Deep GitHub Integration",
        description: "Automatically pulls commit contexts and PR statuses directly into team discussion threads."
      },
      {
        title: "Async Audio Standups",
        description: "Built-in voice notes with automated transcription for teams working across multiple global time zones."
      },
      {
        title: "Customizable Workflows",
        description: "Drag-and-drop Kanban boards that sync bilaterally with Jira and Linear."
      }
    ],
    galleryImages: [
      "/assets/projects/devsync-screenshot-1.png",
      "/assets/projects/devsync-screenshot-2.png",
      "/assets/projects/devsync-screenshot-3.png",
      "/assets/projects/devsync-screenshot-4.png"
    ]
  }
];

export default projects;
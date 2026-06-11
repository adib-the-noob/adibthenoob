import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Cable,
  Cloud,
  Database,
  Globe,
  Server,
  Wrench,
} from "lucide-react";
import { FaAws, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaMedium, FaMastodon, FaStackOverflow, FaDev, FaPaperPlane } from "react-icons/fa";
import {
  SiApachekafka,
  SiDocker,
  SiGo,
  SiKubernetes,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiRust,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { IconType } from "react-icons";

type StackItem = { label: string; icon: IconType };

const stack: StackItem[] = [
  { label: "Go", icon: SiGo },
  { label: "Rust", icon: SiRust },
  { label: "TypeScript", icon: SiTypescript },
  { label: "Node.js", icon: SiNodedotjs },
  { label: "PostgreSQL", icon: SiPostgresql },
  { label: "Redis", icon: SiRedis },
  { label: "Kafka", icon: SiApachekafka },
  { label: "Docker", icon: SiDocker },
  { label: "Kubernetes", icon: SiKubernetes },
  { label: "AWS", icon: FaAws },
  { label: "Cloud", icon: Cloud },
  { label: "gRPC", icon: Cable },
  { label: "Terraform", icon: SiTerraform },
];

const stats = [
  { value: "6+", label: "Years building backend" },
  { value: "40M+", label: "Requests / day served" },
  { value: "99.98%", label: "API uptime, last 12 mo" },
  { value: "< 80ms", label: "p95 latency at the edge" },
];

const projects = [
  {
    title: "Helix — Distributed Job Queue",
    description:
      "At-least-once job scheduler with exactly-once sinks, built on Postgres + Redis Streams. Powers async workloads across 3 services.",
    tags: ["Go", "PostgreSQL", "Redis", "gRPC"],
    href: "https://github.com/adib/helix",
    stats: "12k req/min • 99.99% delivery",
  },
  {
    title: "Forge — Auth & RBAC",
    description:
      "Drop-in identity service with OIDC, short-lived JWTs, refresh rotation, and policy-based RBAC. Used by 4 internal products.",
    tags: ["Rust", "OAuth 2.1", "PostgreSQL", "OpenTelemetry"],
    href: "https://github.com/adib/forge",
    stats: "p95 18ms • 0 CVE since launch",
  },
  {
    title: "Quill — Observability Sidecar",
    description:
      "Lightweight log/metrics shipper that batches to ClickHouse. Auto-discovers pods, tags with k8s metadata, ships via OTLP.",
    tags: ["TypeScript", "ClickHouse", "Kubernetes", "OTLP"],
    href: "https://github.com/adib/quill",
    stats: "12k pods • 4 GB/min steady",
  },
];

type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

const experience: Experience[] = [
  {
    company: "Northwind Labs",
    role: "Staff Backend Engineer",
    period: "2023 — Present",
    location: "Remote",
    bullets: [
      "Led migration of a 6-year-old Rails monolith to a Go-based service mesh; cut p95 latency from 480ms → 110ms.",
      "Designed a multi-tenant event bus on Kafka + Schema Registry — 40M events/day, zero data-loss incidents in 18 months.",
      "Mentored 4 senior engineers; instituted RFC and post-incident review processes across the platform org.",
    ],
  },
  {
    company: "Helio Systems",
    role: "Senior Backend Engineer",
    period: "2020 — 2023",
    location: "Berlin (hybrid)",
    bullets: [
      "Built the auth & RBAC service (Rust, OAuth 2.1, short-lived JWTs) used by 4 internal products and 12k external orgs.",
      "Owned the observability stack — OpenTelemetry pipelines into ClickHouse, dashboards adopted company-wide.",
      "On-call rotation lead for a 99.98% SLA; reduced paging volume 60% via SLO-driven runbooks.",
    ],
  },
  {
    company: "Lattice & Loom",
    role: "Backend Engineer",
    period: "2018 — 2020",
    location: "Singapore",
    bullets: [
      "Shipped the first version of the order pipeline (Node.js + PostgreSQL) handling 3k orders/day at launch.",
      "Introduced contract tests between Go and Node services — caught 40+ breaking changes pre-prod in the first quarter.",
      "Wrote the internal gRPC style guide still in use today.",
    ],
  },
];

const services = [
  {
    icon: Server,
    title: "API design",
    body: "REST, gRPC, and GraphQL contracts that age well — typed, versioned, and documented before they&rsquo;re built.",
  },
  {
    icon: Database,
    title: "Data modeling",
    body: "Schemas that hold up at scale. Indexes that match the query plan. Migrations that don&rsquo;t page you at 3am.",
  },
  {
    icon: Wrench,
    title: "Reliability",
    body: "Backpressure, retries with jitter, circuit breakers, idempotency keys — the boring stuff that keeps things up.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Subtle ambient glow at the top of the page. No grid, no rules. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_70%)] blur-3xl"
      />

      <main className="mx-auto w-full max-w-5xl px-6 pb-24">
        {/* Hero */}
        <section className="flex flex-col items-start gap-8 pt-12 pb-20 sm:pt-20">
          <Badge variant="secondary" className="rounded-full px-3 py-1 font-mono">
            <span className="mr-1.5 size-1.5 rounded-full bg-emerald-500" />
            open to staff & senior backend roles
          </Badge>

          <div className="flex items-center gap-5">
            <Avatar className="size-16 ring-2 ring-border ring-offset-2 ring-offset-background">
              <AvatarImage src="/avatar.jpg" alt="Adib" />
              <AvatarFallback className="font-mono">AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Hi, I&rsquo;m</p>
              <p className="text-xl font-semibold">Adib</p>
            </div>
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              I build the systems
              <br />
              <span className="text-muted-foreground">that don&rsquo;t go down.</span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Backend developer focused on distributed systems, data
              pipelines, and developer-facing APIs. I care about latency
              budgets, typed contracts, and leaving the codebase better than I
              found it.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="#work">
                See selected work
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="https://github.com/adib" target="_blank">
                <FaGithub data-icon="inline-start" />
                GitHub
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </section>

        <Separator className="my-2" />

        {/* Stats */}
        <section className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-6">
              <div className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </section>

        {/* Stack */}
        <section id="stack" className="mt-24 scroll-mt-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                / stack
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Tools I reach for
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm text-muted-foreground sm:block">
              Pragmatic picks. I optimize for boring, dependable infrastructure.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {stack.map(({ label, icon: Icon }) => (
              <Badge
                key={label}
                variant="secondary"
                className="gap-1.5 rounded-full px-3 py-1.5 text-sm font-normal"
              >
                <Icon aria-hidden className="size-3.5" />
                {label}
              </Badge>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mt-24 grid gap-4 md:grid-cols-3">
          {services.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="mb-2 flex size-9 items-center justify-center rounded-lg border bg-background">
                  <Icon className="size-4" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {body}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Experience */}
        <section id="experience" className="mt-24 scroll-mt-20">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              / experience
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Where I&rsquo;ve worked
            </h2>
          </div>

          <div className="space-y-4">
            {experience.map((exp, i) => (
              <Card
                key={exp.company}
                className="bg-card/50 transition-colors hover:bg-card"
              >
                <CardHeader>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-md border bg-background">
                        <Building2 className="size-3.5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {exp.company}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {exp.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-right">
                      <span className="font-mono">{exp.period}</span>
                      <span>·</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="ml-4 list-disc space-y-1.5 text-sm leading-6 text-muted-foreground marker:text-foreground/40">
                    {exp.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
                {i < experience.length - 1 && (
                  <Separator className="mt-auto" />
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="mt-24 scroll-mt-20">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              / selected work
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Things I&rsquo;ve shipped
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <Card
                key={p.title}
                className="group flex flex-col bg-card/50 transition-colors hover:bg-card"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg">{p.title}</CardTitle>
                    <Link
                      href={p.href}
                      target="_blank"
                      className="text-muted-foreground transition-colors group-hover:text-foreground"
                      aria-label={`Open ${p.title}`}
                    >
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                  <CardDescription className="leading-6">
                    {p.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="rounded-full font-mono text-[10px] font-normal"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <p className="font-mono text-xs text-muted-foreground">
                    {p.stats}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-24 scroll-mt-20">
          <Card className="relative overflow-hidden border-border/60 bg-gradient-to-br from-card to-card/40">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_70%)] blur-3xl"
            />
            <CardContent className="grid gap-10 p-8 sm:p-12 md:min-h-[480px] md:grid-cols-2 md:gap-12">
              {/* Left — pitch + primary CTA */}
              <div className="flex flex-col justify-between gap-8">
                <div className="space-y-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    / contact
                  </p>
                  <CardTitle className="text-3xl leading-[1.1] tracking-tight sm:text-4xl">
                    Let&rsquo;s build something reliable.
                  </CardTitle>
                  <CardDescription className="max-w-md text-base leading-7">
                    Open to staff / senior backend roles and short-term
                    consulting on distributed systems, API design, or
                    observability. Fastest reply over email.
                  </CardDescription>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button asChild size="lg">
                    <Link href="mailto:adib@adib-the-noob.com">
                      <FaPaperPlane data-icon="inline-start" />
                      adib@adib-the-noob.com
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground sm:ml-2">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-mono">usually replies within a day</span>
                  </div>
                </div>
              </div>

              {/* Right — social link list */}
              <div className="flex flex-col justify-center gap-2 md:border-l md:border-border/60 md:pl-12">
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  / find me elsewhere
                </p>
                {(
                  [
                    {
                      href: "https://github.com/adib",
                      label: "GitHub",
                      handle: "@adib",
                      icon: FaGithub,
                    },
                    {
                      href: "https://linkedin.com/in/adib",
                      label: "LinkedIn",
                      handle: "in/adib",
                      icon: FaLinkedin,
                    },
                    {
                      href: "https://x.com/adib",
                      label: "X (Twitter)",
                      handle: "@adib",
                      icon: FaTwitter,
                    },
                    {
                      href: "https://instagram.com/adib",
                      label: "Instagram",
                      handle: "@adib",
                      icon: FaInstagram,
                    },
                    {
                      href: "https://youtube.com/@adib",
                      label: "YouTube",
                      handle: "@adib",
                      icon: FaYoutube,
                    },
                    {
                      href: "https://medium.com/@adib",
                      label: "Medium",
                      handle: "@adib",
                      icon: FaMedium,
                    },
                    {
                      href: "https://dev.to/adib",
                      label: "DEV",
                      handle: "@adib",
                      icon: FaDev,
                    },
                    {
                      href: "https://stackoverflow.com/users/adib",
                      label: "Stack Overflow",
                      handle: "adib",
                      icon: FaStackOverflow,
                    },
                    {
                      href: "https://mastodon.social/@adib",
                      label: "Mastodon",
                      handle: "@adib@mastodon.social",
                      icon: FaMastodon,
                    },
                    {
                      href: "https://adib-the-noob.com",
                      label: "Website",
                      handle: "adib-the-noob.com",
                      icon: Globe,
                    },
                  ] as const
                ).map(({ href, label, handle, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-md border border-transparent px-3 py-2.5 text-sm transition-colors hover:border-border/60 hover:bg-background/50"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex size-8 items-center justify-center rounded-md border border-border/60 bg-background/50 text-muted-foreground transition-colors group-hover:text-foreground">
                        <Icon className="size-4" />
                      </span>
                      <span className="font-medium">{label}</span>
                    </span>
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-mono">{handle}</span>
                      <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-5xl px-6 py-10">
        <Separator className="mb-6" />
        <div className="flex flex-col items-start justify-between gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p className="font-mono">
            © {new Date().getFullYear()} Adib — built with Next.js + shadcn/ui
          </p>
          <p className="font-mono">
            <span className="text-emerald-500">●</span> all systems normal
          </p>
        </div>
      </footer>
    </div>
  );
}

---
name: shadcn-ui-components
description: "Shadcn UI component patterns, customization, and advanced usage for premium React/Next.js applications"
tags: [shadcn, ui, components, react, tailwindcss, design-system]
version: 1.0.0
created: 2026-05-27
---

# Shadcn UI Component Patterns

## Installation

```bash
npx shadcn@latest init
npx shadcn@latest add button card badge input label dialog dropdown-menu tabs
```

## Button Variants

```tsx
import { Button } from "@/components/ui/button";

// Variants: default, secondary, outline, ghost, destructive, link
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Danger</Button>
<Button variant="link">Link</Button>

// Sizes: default, sm, lg, icon
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

## Card Component

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

<Card className="border-border/50 bg-background/60 backdrop-blur-sm">
  <CardHeader>
    <CardTitle>Premium Design</CardTitle>
    <CardDescription>Modern glassmorphism card</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
  <CardFooter className="gap-2">
    <Button>Action</Button>
    <Button variant="outline">Cancel</Button>
  </CardFooter>
</Card>
```

## Input with Label

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="email@example.com" />
</div>
```

## Dialog/Modal

```tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

function ModalDemo() {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Description goes here</DialogDescription>
        </DialogHeader>
        {/* Content */}
      </DialogContent>
    </Dialog>
  );
}
```

## Tabs

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

## Glassmorphism Card Example

```tsx
<div className="relative">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl" />
  <Card className="relative bg-background/40 backdrop-blur-xl border-border/50">
    <CardHeader>
      <CardTitle>Glassmorphism</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Premium glass effect</p>
    </CardContent>
  </Card>
</div>
```

## Animated Card Hover

```tsx
import { motion } from "framer-motion";

function AnimatedCard({ children }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)" 
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

## Badge Variants

```tsx
import { Badge } from "@/components/ui/badge";

// Variants: default, secondary, outline, destructive
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Danger</Badge>

// With dot indicator
<Badge className="gap-1.5">
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
  </span>
  Live
</Badge>
```

## Custom cn Utility

```tsx
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Dark Mode Compatible Colors

```css
/* In globals.css with Tailwind v4 */
@theme {
  --color-background: oklch(0.15 0.02 250);
  --color-foreground: oklch(0.98 0 0);
  --color-card: oklch(0.2 0.02 250);
  --color-border: oklch(0.3 0.02 250);
  --color-primary: oklch(0.7 0.15 250);
}
```
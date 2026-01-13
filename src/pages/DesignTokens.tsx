import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

const DesignTokens = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const colorTokens = [
    { name: "Primary (Blue)", class: "bg-primary", token: "primary", usage: "text-primary, bg-primary, border-primary" },
    { name: "Primary Foreground", class: "bg-primary-foreground", token: "primary-foreground", usage: "text-primary-foreground" },
    { name: "Secondary (Green)", class: "bg-secondary", token: "secondary", usage: "text-secondary, bg-secondary, border-secondary" },
    { name: "Secondary Foreground", class: "bg-secondary-foreground", token: "secondary-foreground", usage: "text-secondary-foreground" },
    { name: "Tertiary (Orange)", class: "bg-tertiary", token: "tertiary", usage: "text-tertiary, bg-tertiary, border-tertiary" },
    { name: "Tertiary Foreground", class: "bg-tertiary-foreground", token: "tertiary-foreground", usage: "text-tertiary-foreground" },
    { name: "Background", class: "bg-background", token: "background", usage: "bg-background" },
    { name: "Foreground", class: "bg-foreground", token: "foreground", usage: "text-foreground" },
    { name: "Muted", class: "bg-muted", token: "muted", usage: "bg-muted" },
    { name: "Muted Foreground", class: "bg-muted-foreground", token: "muted-foreground", usage: "text-muted-foreground" },
    { name: "Accent", class: "bg-accent", token: "accent", usage: "bg-accent" },
    { name: "Accent Foreground", class: "bg-accent-foreground", token: "accent-foreground", usage: "text-accent-foreground" },
    { name: "Destructive", class: "bg-destructive", token: "destructive", usage: "bg-destructive" },
    { name: "Border", class: "bg-border", token: "border", usage: "border-border" },
  ];

  const typographyScales = [
    { name: "H1 - Page Title", class: "text-5xl font-bold", code: "text-5xl font-bold" },
    { name: "H2 - Section Header", class: "text-4xl font-bold", code: "text-4xl font-bold" },
    { name: "H3 - Subsection", class: "text-3xl font-semibold", code: "text-3xl font-semibold" },
    { name: "H4 - Card Title", class: "text-2xl font-semibold", code: "text-2xl font-semibold" },
    { name: "H5 - Small Header", class: "text-xl font-semibold", code: "text-xl font-semibold" },
    { name: "Body Large", class: "text-lg font-normal", code: "text-lg font-normal" },
    { name: "Body Default", class: "text-base font-normal", code: "text-base font-normal" },
    { name: "Body Small", class: "text-sm font-medium", code: "text-sm font-medium" },
    { name: "Caption", class: "text-xs font-normal", code: "text-xs font-normal" },
  ];

  const fontWeights = [
    { name: "Normal (400)", class: "font-normal", code: "font-normal", usage: "Body text, descriptions" },
    { name: "Medium (500)", class: "font-medium", code: "font-medium", usage: "Subtle emphasis, labels" },
    { name: "Semibold (600)", class: "font-semibold", code: "font-semibold", usage: "Subheadings, card titles" },
    { name: "Bold (700)", class: "font-bold", code: "font-bold", usage: "Major headings, CTAs" },
  ];

  const spacingScale = [
    { name: "gap-2 (8px)", class: "gap-2", pixels: "8px", usage: "Tight spacing, icon-text pairs" },
    { name: "gap-4 (16px)", class: "gap-4", pixels: "16px", usage: "Standard component spacing" },
    { name: "gap-6 (24px)", class: "gap-6", pixels: "24px", usage: "Section spacing, card groups" },
    { name: "gap-8 (32px)", class: "gap-8", pixels: "32px", usage: "Major section dividers" },
  ];

  const borderRadius = [
    { name: "rounded-lg", class: "rounded-lg", code: "rounded-lg", usage: "Standard cards, buttons" },
    { name: "rounded-xl", class: "rounded-xl", code: "rounded-xl", usage: "Hero sections, featured cards" },
    { name: "rounded-2xl", class: "rounded-2xl", code: "rounded-2xl", usage: "Premium components" },
    { name: "rounded-full", class: "rounded-full", code: "rounded-full", usage: "Avatars, badges" },
  ];

  const shadows = [
    { name: "Shadow Small", class: "shadow-sm", code: "shadow-sm", usage: "Subtle elevation" },
    { name: "Shadow Default", class: "shadow", code: "shadow", usage: "Standard cards" },
    { name: "Shadow Medium", class: "shadow-md", code: "shadow-md", usage: "Elevated panels" },
    { name: "Shadow Large", class: "shadow-lg", code: "shadow-lg", usage: "Modals, popovers" },
    { name: "Shadow Elegant", class: "shadow-elegant", code: "shadow-elegant", usage: "Premium components" },
    { name: "Shadow Glow", class: "shadow-glow", code: "shadow-glow", usage: "Hover states, focus" },
  ];

  const opacityLevels = [
    { name: "10%", class: "opacity-10", code: "opacity-10 or /10", usage: "Subtle backgrounds" },
    { name: "20%", class: "opacity-20", code: "opacity-20 or /20", usage: "Light overlays" },
    { name: "50%", class: "opacity-50", code: "opacity-50 or /50", usage: "Disabled states" },
    { name: "80%", class: "opacity-80", code: "opacity-80 or /80", usage: "Hover dimming" },
  ];

  return (
    <>
      <SEO
        title="Design Tokens Reference"
        description="Complete design system documentation with colors, typography, spacing, and visual examples"
      />

      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground">Design Tokens Reference</h1>
            <p className="text-lg text-muted-foreground">
              Complete design system documentation with live examples and code snippets
            </p>
          </div>

          {/* Color Tokens */}
          <Card className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Color Tokens</h2>
            <p className="text-muted-foreground">
              All colors use HSL format and semantic tokens. Always use semantic classes like{" "}
              <code className="px-2 py-1 bg-muted rounded text-sm">text-primary</code> instead of hardcoded values.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {colorTokens.map((token) => (
                <div key={token.token} className="space-y-2">
                  <div className={`h-20 ${token.class} rounded-lg border border-border`} />
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{token.name}</p>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded flex-1">{token.usage}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(token.usage, token.token)}
                        className="h-8 w-8 p-0"
                      >
                        {copiedCode === token.token ? (
                          <Check className="h-3 w-3 text-secondary" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pathway Colors */}
          <Card className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Pathway Color Mapping</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="h-24 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">Primary</span>
                </div>
                <p className="font-semibold text-foreground">Internal/Executive Pathway</p>
                <code className="text-xs bg-muted px-2 py-1 rounded block">text-primary</code>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-lg">Secondary</span>
                </div>
                <p className="font-semibold text-foreground">Partner/Ecosystem Pathway</p>
                <code className="text-xs bg-muted px-2 py-1 rounded block">text-secondary</code>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-tertiary rounded-lg flex items-center justify-center">
                  <span className="text-tertiary-foreground font-bold text-lg">Tertiary</span>
                </div>
                <p className="font-semibold text-foreground">Customer Pathway</p>
                <code className="text-xs bg-muted px-2 py-1 rounded block">text-tertiary</code>
              </div>
            </div>
          </Card>

          {/* Typography */}
          <Card className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Typography Scale</h2>
            <div className="space-y-6">
              {typographyScales.map((type) => (
                <div key={type.code} className="space-y-2 pb-4 border-b border-border last:border-0">
                  <div className={`${type.class} text-foreground`}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{type.name}</p>
                      <code className="text-xs bg-muted px-2 py-1 rounded">{type.code}</code>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(type.code, type.code)}
                      className="h-8 w-8 p-0"
                    >
                      {copiedCode === type.code ? (
                        <Check className="h-3 w-3 text-secondary" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Font Weights */}
          <Card className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Font Weights</h2>
            <div className="space-y-4">
              {fontWeights.map((weight) => (
                <div key={weight.code} className="flex items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-1 flex-1">
                    <p className={`text-2xl ${weight.class} text-foreground`}>{weight.name}</p>
                    <p className="text-sm text-muted-foreground">{weight.usage}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-background px-3 py-1 rounded">{weight.code}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(weight.code, weight.code)}
                      className="h-8 w-8 p-0"
                    >
                      {copiedCode === weight.code ? (
                        <Check className="h-3 w-3 text-secondary" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Spacing Scale */}
          <Card className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Spacing Scale</h2>
            <div className="space-y-4">
              {spacingScale.map((spacing) => (
                <div key={spacing.class} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{spacing.name}</p>
                      <p className="text-sm text-muted-foreground">{spacing.usage}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(spacing.class, spacing.class)}
                      className="h-8 w-8 p-0"
                    >
                      {copiedCode === spacing.class ? (
                        <Check className="h-3 w-3 text-secondary" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <div className={`flex ${spacing.class} bg-muted/30 p-4 rounded-lg`}>
                    <div className="h-12 w-12 bg-primary rounded" />
                    <div className="h-12 w-12 bg-secondary rounded" />
                    <div className="h-12 w-12 bg-tertiary rounded" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Border Radius */}
          <Card className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Border Radius</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {borderRadius.map((radius) => (
                <div key={radius.code} className="space-y-2">
                  <div className={`h-24 bg-gradient-to-br from-primary/20 to-secondary/20 border border-border ${radius.class}`} />
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{radius.name}</p>
                    <p className="text-xs text-muted-foreground">{radius.usage}</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded flex-1">{radius.code}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(radius.code, radius.code)}
                        className="h-6 w-6 p-0"
                      >
                        {copiedCode === radius.code ? (
                          <Check className="h-3 w-3 text-secondary" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Shadows */}
          <Card className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Shadow Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shadows.map((shadow) => (
                <div key={shadow.code} className="space-y-2">
                  <div className={`h-32 bg-background border border-border rounded-lg ${shadow.class} flex items-center justify-center`}>
                    <p className="text-sm font-medium text-muted-foreground">{shadow.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">{shadow.usage}</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded flex-1">{shadow.code}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(shadow.code, shadow.code)}
                        className="h-6 w-6 p-0"
                      >
                        {copiedCode === shadow.code ? (
                          <Check className="h-3 w-3 text-secondary" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Opacity Levels */}
          <Card className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Opacity Levels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {opacityLevels.map((opacity) => (
                <div key={opacity.code} className="space-y-2">
                  <div className="relative h-24 bg-gradient-to-br from-primary to-secondary rounded-lg overflow-hidden">
                    <div className={`absolute inset-0 bg-background ${opacity.class}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{opacity.name}</p>
                    <p className="text-xs text-muted-foreground">{opacity.usage}</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded flex-1">{opacity.code}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(opacity.code, opacity.code)}
                        className="h-6 w-6 p-0"
                      >
                        {copiedCode === opacity.code ? (
                          <Check className="h-3 w-3 text-secondary" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Best Practices */}
          <Card className="p-6 space-y-4 bg-muted/30">
            <h2 className="text-2xl font-bold text-foreground">Best Practices</h2>
            <ul className="space-y-2 text-foreground">
              <li className="flex gap-2">
                <span className="text-secondary">✓</span>
                <span>Always use semantic tokens (text-primary) over hardcoded HSL values</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary">✓</span>
                <span>Use opacity modifiers (/10, /20, /50) for transparent variants</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary">✓</span>
                <span>Follow the established spacing hierarchy (gap-2, gap-4, gap-6, gap-8)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary">✓</span>
                <span>Apply shadow-elegant for premium components, shadow-glow for hover states</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span>Don't use arbitrary values like text-[hsl(210,70%,50%)]</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">✗</span>
                <span>Avoid mixing gap-3 or inconsistent spacing values</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DesignTokens;

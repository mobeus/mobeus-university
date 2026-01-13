import { useState, useEffect } from 'react';

const SUBSECTION_PROMPTS: Record<string, string> = {
  // Automotive Metaphors & Imagery

  'welcome-carousel': '16:9 ultra-photorealistic image: Mercedes-Benz showroom with sleek modern architecture, Canon 24mm f/1.4L, 8K resolution, dramatic lighting highlighting the curves of a silver luxury car, reflection on polished floor, invitation to luxury metaphor, architectural photography aesthetic',

  'transformation-matrix': '16:9 photorealistic macro: Extreme close-up of a Mercedes-Benz steering wheel emblem, Canon 100mm macro f/2.8L, 8K ultra HD, brushed metal texture, dramatic backlighting, navigation and direction metaphor, automotive photography aesthetic',

  'three-pathways-explained': '16:9 ultra-photorealistic image: Three winding roads merging into one superhighway at sunset, aerial view, Canon 50mm f/1.4L, 8K resolution, motion blur of lights, golden hour lighting, convergence metaphor, automotive landscape aesthetic',

  'risk-across-matrix': '16:9 photorealistic close-up: Gear shifter in motion, Canon 85mm f/1.2L at f/1.4, 8K resolution, dramatic strobe lighting freezing motion, shallow depth of field, precision and control metaphor, high-speed photography aesthetic',

  'internal-use-cases': '16:9 ultra-photorealistic macro: Extreme close-up of engine gears interlocking perfectly, Canon 100mm macro f/2.8L, 8K resolution, steel textures, dramatic side lighting, seamless integration metaphor, industrial design aesthetic',

  'great-internal-use-cases': '16:9 ultra-photorealistic close-up: Designer sketching a new car concept on a tablet, Canon 100mm macro f/2.8L, 8K resolution, focus on the stylus tip and digital line, creativity and innovation metaphor, design studio aesthetic',

  'ecosystem-use-cases': '16:9 photorealistic close-up: Connected car dashboard displaying network of vehicles, Canon 100mm macro f/2.8L, 8K ultra HD, digital interface details, glowing nodes, network and connection metaphor, technology photography aesthetic',

  'partner-segmentation': '16:9 ultra-photorealistic image: Headlight beam splitting into spectrum of light through a prism, Canon 85mm f/1.4L, 8K resolution, crystal refraction detail, differentiation and clarity metaphor, scientific illustration aesthetic',

  'customer-use-cases': '16:9 photorealistic macro: Convertible top mid-opening mechanism, Canon 100mm macro f/2.8L, 8K ultra HD, mechanical detail, dramatic backlighting, transformation journey metaphor, automotive engineering aesthetic',

  'customer-segmentation': '16:9 ultra-photorealistic image: Abstract pattern of wheel spokes and rims, Canon 50mm f/1.4L, 8K resolution, perfect symmetry, dramatic lighting, diversity and pattern metaphor, abstract automotive art',

  'use-case-1a-benefits': '16:9 photorealistic macro: Extreme close-up of golden engine oil flowing smoothly, Canon 100mm macro f/2.8L, 8K ultra HD, viscosity and light refraction, dramatic backlighting, efficiency and performance metaphor, fluid dynamics aesthetic',

  'use-case-1a-solution': '16:9 photorealistic close-up: Complex engine part assembly coming together, Canon 85mm f/1.4L, 8K resolution, exploded view style, precision engineering metaphor, technical photography aesthetic',

  'use-case-1a-vendors': '16:9 ultra-photorealistic macro: Formula 1 pit crew working in perfect coordination, Canon 100mm macro f/2.8L, 8K ultra HD, focus on hands and tools, speed and teamwork metaphor, sports photography aesthetic',

  'transformation-timeline': '16:9 ultra-photorealistic image: Tire tread marks evolving from vintage to modern pattern on asphalt, Canon 100mm macro f/2.8L, 8K ultra HD, texture detail, dramatic lighting, time and evolution metaphor, automotive history aesthetic',

  'executive-readiness': '16:9 photorealistic close-up: Driver hands gripping leather steering wheel firmly, Canon 85mm f/1.2L, 8K resolution, leather texture and stitching detail, dramatic side lighting, control and readiness metaphor, lifestyle photography aesthetic',

  'matrix-philosophy-hero': '16:9 ultra-photorealistic image: Mercedes-Benz hood ornament standing against the wind, Canon 85mm f/1.2L, 8K resolution, dramatic side lighting, shallow depth of field, resilience and leadership metaphor, classic automotive aesthetic',

  'internal-hero': '16:9 photorealistic extreme close-up: Headlight lens detail reflecting the road ahead, Canon 100mm macro f/2.8L, 8K ultra HD, glass texture and internal components, shallow depth of field, vision and clarity metaphor, automotive detail aesthetic',

  'ecosystem-hero': '16:9 ultra-photorealistic image: Car chassis structure revealed, Canon 85mm f/1.2L, 8K resolution, dramatic lighting revealing strength and foundation, engineering metaphor, technical photography aesthetic',

  'customer-hero': '16:9 ultra-photorealistic close-up: Ambient lighting strip glowing in car interior, Canon 85mm f/1.2L, 8K resolution, soft purple or blue glow, intimate atmosphere, care and comfort metaphor, luxury interior aesthetic',

  'use-case-1a-hero': '16:9 ultra-photorealistic image: Electric spark jumping between contacts in an EV motor, Canon 85mm f/1.2L, ultra-high-speed capture, 8K resolution, blue-white energy burst, power and energy metaphor, scientific photography aesthetic',
};

export const useSubsectionImage = (subsectionId: string) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Image generation disabled - Supabase removed
    // Return null to use fallback images defined in components
    setIsLoading(false);
    setImageUrl(null);
  }, [subsectionId]);

  const regenerateImage = async () => {
    console.log('Image regeneration disabled - Supabase removed');
    // No-op function since Supabase is removed
  };

  return { imageUrl, isLoading, error, regenerateImage };
};

/**
 * ImageCarousel
 * Swipeable image gallery
 * 
 * USE WHEN: Multiple images, gallery view, screenshot showcase
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each image is clickable → notifyTele
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface CarouselImage {
    imageUrl?: string;
    imagePrompt?: string;
    caption?: string;
    actionPhrase: string;
}

interface ImageCarouselProps {
    title?: string;
    images: CarouselImage[];
    autoPlay?: boolean;
    interval?: number;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
    title,
    images = [],
    autoPlay = false,
    interval = 5000,
}) => {
    const { playClick } = useSound();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const goToSlide = (index: number) => {
        playClick();
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        playClick();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        playClick();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    React.useEffect(() => {
        if (autoPlay && images.length > 1) {
            const timer = setInterval(goToNext, interval);
            return () => clearInterval(timer);
        }
    }, [autoPlay, interval, images.length]);

    if (images.length === 0) return null;

    const currentImage = images[currentIndex];

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-4 text-center">{title}</h3>}

            <div className="relative">
                {/* Main Image */}
                <div
                    className="aspect-video glass-image-container rounded-xl overflow-hidden glass-card-clickable"
                    onClick={() => handleAction(currentImage.actionPhrase)}
                >
                    <SmartImage
                        assetId={currentImage.imageUrl || currentImage.imagePrompt || ''}
                        alt={currentImage.caption || `Image ${currentIndex + 1}`}
                        className="smart-image w-full h-full object-cover"
                    />
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-onyx/60 flex items-center justify-center text-mist hover:bg-onyx/80 transition-colors"
                            onClick={goToPrevious}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-onyx/60 flex items-center justify-center text-mist hover:bg-onyx/80 transition-colors"
                            onClick={goToNext}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Caption */}
                {currentImage.caption && (
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                        <p className="text-mist bg-onyx/60 px-4 py-2 rounded-lg inline-block">
                            {currentImage.caption}
                        </p>
                    </div>
                )}
            </div>

            {/* Dots */}
            {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-sapphire w-6' : 'bg-mist/40'
                                }`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;

import React, { Suspense } from "react";
import { SUBSECTION_DATA } from "@/data/subsectionData";

// Import all templates
import { HeroWithStats } from "@/components/templates/HeroWithStats";
import { InfoCards } from "@/components/templates/InfoCards";
import { ComparisonTable } from "@/components/templates/ComparisonTable";
import { ProcessFlow } from "@/components/templates/ProcessFlow";
import { ThreeColumnBenefits } from "@/components/templates/ThreeColumnBenefits";
import { Timeline } from "@/components/templates/Timeline";
import { PieChart } from "@/components/templates/PieChart";
import { BarChart } from "@/components/templates/BarChart";
import { SimpleCards } from "@/components/templates/SimpleCards";
import { TabsAccordion } from "@/components/templates/TabsAccordion";
import { LineChart } from "@/components/templates/LineChart";
import { ImageCarousel } from "@/components/templates/ImageCarousel";
import { VerticalCarCardGrid } from "@/components/templates/VerticalCarCardGrid";

import { AdvantageCards } from "@/components/templates/AdvantageCards";
import { AlertsList } from "@/components/templates/AlertsList";
import { AudioPlayer } from "@/components/templates/AudioPlayer";
import { CaseStudy } from "@/components/templates/CaseStudy";
import { DecisionFramework } from "@/components/templates/DecisionFramework";
import { FourQuadrantMatrix } from "@/components/templates/FourQuadrantMatrix";
import { IconCards } from "@/components/templates/IconCards";
import { MetricsDashboard } from "@/components/templates/MetricsDashboard";
import { NumberedList } from "@/components/templates/NumberedList";
import { PhaseTimeline } from "@/components/templates/PhaseTimeline";
import { PriorityGrid } from "@/components/templates/PriorityGrid";
import { ProgressTracker } from "@/components/templates/ProgressTracker";
import { QuoteCallout } from "@/components/templates/QuoteCallout";
import { ReadinessChecklist } from "@/components/templates/ReadinessChecklist";
import { ScoringGuide } from "@/components/templates/ScoringGuide";
import { StatusCardList } from "@/components/templates/StatusCardList";
import { TwoColumnComparison } from "@/components/templates/TwoColumnComparison";
import { VideoPlayer } from "@/components/templates/VideoPlayer";
import { WarningList } from "@/components/templates/WarningList";
import { ParagraphWithButton } from "@/components/templates/ParagraphWithButton";
import { TwoColumnParagraphs } from "@/components/templates/TwoColumnParagraphs";
import { ImageLeftTextRight } from "@/components/templates/ImageLeftTextRight";
import { TwoImagesSideBySide } from "@/components/templates/TwoImagesSideBySide";
import { FAQ } from "@/components/templates/FAQ";

import { FinancialEstimator } from "@/components/templates/FinancialEstimator";
import { VisualOptionSelector } from "@/components/templates/VisualOptionSelector";
import { ScheduleComparison } from "@/components/templates/ScheduleComparison";

import { DynamicGrid } from "@/components/templates/DynamicGrid";
import { MediaContentSplit } from "@/components/templates/MediaContentSplit";
import { DataComparison } from "@/components/templates/DataComparison";
import { ImageComparisonSlider } from "@/components/templates/ImageComparisonSlider";
import { MasonryGallery } from "@/components/templates/MasonryGallery";

import { Quiz } from "@/components/templates/Quiz";
import { FeatureCard } from "@/components/templates/FeatureCard";
import { StatsRow } from "@/components/templates/StatsRow";
import { ReviewList } from "@/components/templates/ReviewList";
import { ActionRow } from "@/components/templates/ActionRow";

// Map template names to components
const TEMPLATE_MAP: Record<string, React.FC<any>> = {
    HeroWithStats,
    InfoCards,
    ComparisonTable,
    ProcessFlow,
    ThreeColumnBenefits,
    Timeline,
    PieChart,
    BarChart,
    SimpleCards,
    TabsAccordion,
    LineChart,
    ImageCarousel,
    VerticalCarCardGrid,
    // Newly Activated Templates
    AdvantageCards,
    AlertsList,
    AudioPlayer,
    CaseStudy,
    DecisionFramework,
    FourQuadrantMatrix,
    IconCards,
    MetricsDashboard,
    NumberedList,
    PhaseTimeline,
    PriorityGrid,
    ProgressTracker,
    QuoteCallout,
    ReadinessChecklist,
    ScoringGuide,
    StatusCardList,
    TwoColumnComparison,
    VideoPlayer,
    WarningList,

    // New Content Expansion Templates
    ParagraphWithButton,
    TwoColumnParagraphs,
    ImageLeftTextRight,
    TwoImagesSideBySide,
    FAQ,

    // Financial & Config Tools (Generic)
    FinancialEstimator,
    VisualOptionSelector,
    ScheduleComparison,

    // New "Mega-Batch" Flexible Templates
    DynamicGrid,
    MediaContentSplit,
    DataComparison,
    ImageComparisonSlider,
    MasonryGallery,

    // Batch 3: Interactive & Actions
    Quiz,
    FeatureCard,
    StatsRow,
    ReviewList,
    ActionRow
};

interface UniversalSubsectionProps {
    id: string;
    animationClass?: string;
    isExiting?: boolean;
}

export const UniversalSubsection: React.FC<UniversalSubsectionProps> = ({
    id,
    animationClass = "",
    isExiting = false,
}) => {
    const data = SUBSECTION_DATA[id];

    if (!data) {
        console.warn(`UniversalSubsection: No data found for ID "${id}"`);
        return (
            <div className="p-8 border border-red-500/20 bg-red-500/10 rounded-lg text-red-200">
                <h3 className="font-bold">Missing Content Data</h3>
                <p>No registry entry found for ID: <code>{id}</code></p>
            </div>
        );
    }

    const TemplateComponent = TEMPLATE_MAP[data.template];

    if (!TemplateComponent) {
        console.warn(`UniversalSubsection: Unknown template "${data.template}" for ID "${id}"`);
        return (
            <div className="p-8 border border-yellow-500/20 bg-yellow-500/10 rounded-lg text-yellow-200">
                <h3 className="font-bold">Unknown Template</h3>
                <p>Template <code>{data.template}</code> is not registered in UniversalSubsection.</p>
            </div>
        );
    }

    return (
        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl" />}>
            <TemplateComponent
                {...data.props}
                animationClass={animationClass}
                isExiting={isExiting}
            />
        </Suspense>
    );
};

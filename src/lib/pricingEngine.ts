export interface QuoteRequest {
    serviceType: string;
    location: string;
    amount: number;
    description: string;
    urgency: string; // "low" | "medium" | "high"
}

export interface PricingAnalysisResult {
    fairMin: number;
    fairMax: number;
    status: "fair" | "high" | "overpriced";
    confidenceScore: number;
    recommendation: string;
    overpricingPercentage: number;
    riskScore: number; // 1-10 scale
}

const baseRanges: Record<string, { min: number; max: number }> = {
    car_repair: { min: 300, max: 800 },
    plumbing: { min: 150, max: 500 },
    dentist: { min: 150, max: 450 },
    contractor: { min: 1500, max: 5000 },
    other: { min: 200, max: 1000 },
};

// Simplified mock checking for urban locations based on standard keywords or patterns
const urbanKeywords = ["new york", "ny", "los angeles", "la", "chicago", "san francisco", "sf", "london", "dublin", "paris", "city", "100", "902", "606"];
const ruralKeywords = ["rural", "county", "township", "village", "farm"];

const complexityKeywords = ["emergency", "overhaul", "engine", "custom", "extensive", "structural", "root canal", "transmission", "weekend", "after hours", "midnight"];

function calculateLocationFactor(location: string): number {
    const locRaw = location.toLowerCase();

    const isUrban = urbanKeywords.some(kw => locRaw.includes(kw));
    const isRural = ruralKeywords.some(kw => locRaw.includes(kw));

    if (isUrban) return 1.2; // 20% premium
    if (isRural) return 0.85; // 15% discount
    return 1.0; // Standard 
}

function calculateUrgencyMultiplier(urgency: string): number {
    switch (urgency) {
        case "high": return 1.5;
        case "medium": return 1.0;
        case "low": return 0.9;
        default: return 1.0;
    }
}

function calculateComplexityMultiplier(description: string): number {
    const descRaw = description.toLowerCase();
    const complexityTriggers = complexityKeywords.filter(kw => descRaw.includes(kw));

    // Base is 1.0, add 0.15 for every complexity keyword found, maxing out at +0.6
    const extra = Math.min(complexityTriggers.length * 0.15, 0.6);
    return 1.0 + extra;
}

export function analyzeQuote(req: QuoteRequest): PricingAnalysisResult {
    const range = baseRanges[req.serviceType] || baseRanges["other"];
    let baseMin = range.min;
    let baseMax = range.max;

    // Apply multipliers
    const locationFactor = calculateLocationFactor(req.location);
    const urgencyMultiplier = calculateUrgencyMultiplier(req.urgency);
    const complexityMultiplier = calculateComplexityMultiplier(req.description);

    const totalMultiplier = locationFactor * urgencyMultiplier * complexityMultiplier;

    let fairMin = Math.round(baseMin * totalMultiplier);
    let fairMax = Math.round(baseMax * totalMultiplier);

    // Analyze the actual quote against the computed fair range
    let status: "fair" | "high" | "overpriced" = "fair";
    let recommendation = "";

    // Overpricing logic
    let overpricingPercentage = 0;
    if (req.amount > fairMax) {
        overpricingPercentage = Math.round(((req.amount - fairMax) / fairMax) * 100);
    }

    // Risk Score (1-10) Based on extreme factors
    let riskScore = 1;
    if (req.amount < fairMin * 0.5) riskScore += 4; // Too good to be true risk
    if (req.amount > fairMax * 1.5) riskScore += 4; // Rip off risk
    if (req.urgency === "high") riskScore += 1;
    if (complexityMultiplier > 1.3) riskScore += 1; // High complexity means high risk of cost overrun

    // Cap risk score between 1 and 10
    riskScore = Math.min(Math.max(riskScore, 1), 10);

    // Determine Status & Recommendations
    if (overpricingPercentage > 35) {
        status = "overpriced";
        recommendation = "This quote is significantly higher than market rates. We strongly suggest seeking alternative quotes unless they provide premium quality or exceptional warranties.";
    } else if (overpricingPercentage > 5) {
        status = "high";
        recommendation = "This quote is slightly on the higher end of the spectrum for your area and requirements. You have solid ground to negotiate a 5-15% discount.";
    } else if (req.amount < fairMin * 0.7) {
        status = "fair";
        recommendation = "This quote is well below market average. Ensure they are a reputable provider and aren't cutting corners on materials or scope.";
    } else {
        status = "fair";
        recommendation = "This quote aligns quite well with the estimated fair value based on your location and scope. You may still ask for a small courtesy discount if you wish.";
    }

    // Confidence is simulated but we base it partly on how much data we matched
    let confidenceScore = 80;
    if (locationFactor !== 1.0) confidenceScore += 5; // Recognized location type
    if (complexityMultiplier > 1.0) confidenceScore += 10; // Found specific keywords we understand
    if (req.serviceType !== "other") confidenceScore += 4;

    confidenceScore = Math.min(confidenceScore, 99);

    return {
        fairMin,
        fairMax,
        status,
        confidenceScore,
        recommendation,
        overpricingPercentage,
        riskScore,
    };
}

export type AreaUnit = 'sqmts' | 'sqft';

const SQM_TO_SQFT = 10.7639104;

/**
 * Converts any area range or single value string (e.g. "120.75 - 122.71 Sq.Mts", "125 - 260 Sq.Mts", "2,200 - 3,850 Sq.Mts")
 * dynamically between Sq.Mts (Goa standard) and Sq.Ft (Metro/National standard).
 */
export function formatAreaUnit(areaStr: string | undefined | null, targetUnit: AreaUnit): string {
  if (!areaStr) return '';

  const clean = areaStr.trim();
  const lower = clean.toLowerCase();

  // Detect whether the original string is specified in Sq.Ft or Sq.Mts
  const isSourceSqFt = lower.includes('sq.ft') || lower.includes('sq ft') || lower.includes('sqft') || lower.includes('ft');
  const isSourceSqMts = lower.includes('sq.mts') || lower.includes('sq mts') || lower.includes('sq.mt') || lower.includes('sq mt') || lower.includes('sqm') || lower.includes('meter') || lower.includes('metre');

  // Default to sq.mts (Goa baseline standard) if not explicitly sq.ft
  const sourceUnit: AreaUnit = isSourceSqFt && !isSourceSqMts ? 'sqft' : 'sqmts';

  // If target matches source, preserve original formatting
  if (sourceUnit === targetUnit) {
    return clean;
  }

  // Remove existing unit labels first to prevent regex interference
  const numericPortion = clean
    .replace(/\s*(?:Sq\.Mts|Sq\. Mts|Sq\.Mt|Sq\. Mt|SqMts|SqM|sq\.mts|sq\.mt|sqm|Sq\.Ft|Sq\. Ft|SqFt|sq\.ft|sqft)\s*/gi, '')
    .trim();

  // Replace each numeric value in the range (e.g., "120.75 - 122.71" or "2,200 - 3,850" or "4,450")
  const convertedNumbers = numericPortion.replace(/(\d+(?:,\d+)*(?:\.\d+)?)/g, (match) => {
    const rawNum = parseFloat(match.replace(/,/g, ''));
    if (isNaN(rawNum)) return match;

    let converted: number;
    if (sourceUnit === 'sqmts' && targetUnit === 'sqft') {
      converted = rawNum * SQM_TO_SQFT;
    } else {
      converted = rawNum / SQM_TO_SQFT;
    }

    if (targetUnit === 'sqft') {
      // Sq.Ft standard representation (e.g. 1,345 or 23,681)
      if (converted >= 100) {
        return Math.round(converted).toLocaleString('en-IN');
      } else {
        return (Math.round(converted * 10) / 10).toLocaleString('en-IN');
      }
    } else {
      // Sq.Mts standard representation (whole number or 2 decimal places)
      if (converted % 1 === 0) {
        return Math.round(converted).toLocaleString('en-IN');
      } else if (converted >= 100) {
        return (Math.round(converted * 10) / 10).toLocaleString('en-IN');
      } else {
        return (Math.round(converted * 100) / 100).toLocaleString('en-IN');
      }
    }
  });

  return `${convertedNumbers} ${targetUnit === 'sqft' ? 'Sq.Ft' : 'Sq.Mts'}`;
}

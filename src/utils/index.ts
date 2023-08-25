export function getPercentage(partial: number, total: number): number {
    return (100 * partial) / total;
}

export function getValueFromPercetage(percentage: number, total: number) {
    return (total * percentage) / 100;
}

export function truncateValue(value: number) {
    if (value > 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value > 10000) {
        return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed();
}

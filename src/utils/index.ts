export function getPercentage(partial: number, total: number): number {
    return (100 * partial) / total;
}

export function getValueFromPercetage(percentage: number, total: number) {
    return (total * percentage) / 100;
}

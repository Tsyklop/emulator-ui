export const minValue = (min: number, error: string) => {
    return (value: number) => {
        if (value <= 0) {
            return error;
        }
        return null;
    }
};
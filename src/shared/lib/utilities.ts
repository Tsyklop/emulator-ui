import {BrandDto, RegionDto} from '~/shared/api/types';
import {SelectItem} from "@mantine/core";

export function enumValueToLabel(value: string) {
    return value.split('_')
        .map(word => word.toLowerCase())
        .map(word => (word && word[0].toUpperCase() + word.slice(1)) || "")
        .join(' ');
}

export function mapBrandsToItemsForSelectAndPrependDefaultItem(brands: BrandDto[]) : SelectItem[] {
    const result: SelectItem[] = [
        {
            value: '-1',
            label: 'Any',
            selected: true,
        },
    ];
    brands.map(
        (brand) =>
            ({
                value: Number(brand.id).toString(),
                label: brand.name,
            } as SelectItem),
    ).forEach(value => result.push(value));
    return result;
}

export function mapRegionsToItemsForSelectAndPrependDefaultItem(regions: RegionDto[]) : SelectItem[] {
    const result: SelectItem[] = [
        {
            value: '-1',
            label: 'Any',
            selected: true,
        },
    ];
    regions.map(
        (region) =>
            ({
                value: Number(region.id).toString(),
                label: region.name,
            } as SelectItem),
    ).forEach(value => result.push(value));
    return result;
}
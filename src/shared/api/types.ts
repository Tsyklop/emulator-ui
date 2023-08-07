/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2023-06-12 23:23:44.

export interface PageDto<T> {
    content: T[];
    size: number;
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
}

export interface ResponseDto {
    message: string;
}

export interface ValidationErrorDto {
    fields: FieldDto[];
}

export interface FieldDto {
    code: string;
    name: string;
    message: string;
}

export interface BrandDto {
    id: number;
    name: string;
    concept: string;
    description: string;
    priceSegment: string;
    targetAudienceAge: string;
    targetAudienceSex: string;
    targetAudienceInterests: string;
    status: StatusType;
    enabled: boolean;
    createdBy: string;
    createdAt: DateAsNumber;
    updatedBy: string;
    updatedAt: DateAsNumber;
}

export interface BrandExtendedDto extends BrandDto {
    companyName: string;
}

export interface CompanyDto {
    id: number;
    site: string;
    type: string;
    name: string;
    source: string;
    contact: string;
    comment: string;
    fieldOfActivity: string;
    maxUsers: number;
    maxStores: number;
    maxRegions: number;
    maxCompetitors: number;
    status: StatusType;
    enabled: boolean;
    createdBy: string;
    createdAt: DateAsNumber;
    updatedBy: string;
    updatedAt: DateAsNumber;
}

export interface CompanyExtendedDto extends CompanyDto {
    users: number;
    stores: number;
    regions: number;
    competitors: number;
}

export interface FormatDto {
    id: number;
    name: string;
    status: StatusType;
    enabled: boolean;
    brandId: number;
    createdBy: string;
    createdAt: DateAsNumber;
    updatedBy: string;
    updatedAt: DateAsNumber;
}

export interface FormatExtendedDto extends FormatDto {
    brandName: string;
}

export interface PlatformDto {
    id: number;
    name: string;
    status: StatusType;
    enabled: boolean;
    commissionPercentage: number;
    brandId: number;
}

export interface RegionDto {
    id: number;
    name: string;
    status: StatusType;
    enabled: boolean;
    brandId: number;
    createdBy: string;
    createdAt: DateAsNumber;
    updatedBy: string;
    updatedAt: DateAsNumber;
}

export interface RegionExtendedDto extends RegionDto {
    brandName: string;
}

export interface BaseSearchFilterDto {
    search: string;
    status: SearchStatusType;
}

export interface BrandSearchFilterDto extends BaseSearchFilterDto {
    searchBy: BrandSearchByType;
}

export interface CompanySearchFilterDto extends BaseSearchFilterDto {
    searchBy: CompanySearchByType;
}

export interface EmployeeSearchFilterDto extends BaseSearchFilterDto {
    brandId: number;
    searchBy: EmployeeSearchByType;
}

export interface FormatSearchFilterDto extends BaseSearchFilterDto {
    brandId: number;
    searchBy: FormatSearchByType;
}

export interface ManagerSearchFilterDto extends BaseSearchFilterDto {
    searchBy: ManagerSearchByType;
}

export interface RegionSearchFilterDto extends BaseSearchFilterDto {
    brandId: number;
    searchBy: RegionSearchByType;
}

export interface TownSearchFilterDto extends BaseSearchFilterDto {
    brandId: number;
    regionId: number;
    searchBy: TownSearchByType;
}

export interface StoreDto {
    id: number;
    name: string;
    type: string;
    comment: string;
    country: string;
    address: string;
    manager: string;
    internalCode: string;
    totalSquare: number;
    storeSquare: number;
    closing: DateAsNumber;
    opening: DateAsNumber;
    status: StatusType;
    enabled: boolean;
    townId: number;
    brandId: number;
    formatId: number;
}

export interface StoreExtendedDto extends StoreDto {
    townName: string;
    brandName: string;
    formatName: string;
}

export interface TownDto {
    id: number;
    name: string;
    status: StatusType;
    enabled: boolean;
    regionId: number;
    createdBy: string;
    createdAt: DateAsNumber;
    updatedBy: string;
    updatedAt: DateAsNumber;
}

export interface TownExtendedDto extends TownDto {
    brandName: string;
    regionName: string;
}

export interface AuthLoginDto {
    login: string;
    password: string;
}

export interface EmployeeDto {
    id: number;
    fio: string;
    login: string;
    phone: string;
    position: string;
    availableBrandsIds: number[];
    availableBrandsNames: string[];
    status: StatusType;
    enabled: boolean;
    createdBy: string;
    createdAt: DateAsNumber;
    updatedBy: string;
    updatedAt: DateAsNumber;
}

export interface ManagerDto {
    id: number;
    fio: string;
    login: string;
    phone: string;
    position: string;
    activeAfter: DateAsNumber;
    companyId: number;
    companyName: string;
    status: StatusType;
    enabled: boolean;
    createdBy: string;
    createdAt: DateAsNumber;
    updatedBy: string;
    updatedAt: DateAsNumber;
}

export interface UpdatePasswordDto {
    current: string;
    password: string;
    confirmPassword: string;
}

export interface UpdateTempPasswordDto {
    password: string;
    confirmPassword: string;
}

export interface UserDto {
    id: number;
    fio: string;
    login: string;
    role: RoleType;
    status: StatusType;
    phone: string;
    filled: boolean;
    enabled: boolean;
    position: string;
    tempPassword: boolean;
    managerId: number;
    companyId: number;
    createdBy: string;
    createdAt: DateAsNumber;
    updatedBy: string;
    updatedAt: DateAsNumber;
}

export type DateAsNumber = number;

export enum StatusType {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export enum SearchStatusType {
    ANY = "ANY",
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export enum BrandSearchByType {
    ALL = "ALL",
    ID = "ID",
    NAME = "NAME",
    CONCEPT = "CONCEPT",
    DESCRIPTION = "DESCRIPTION",
    PRICE_SEGMENT = "PRICE_SEGMENT",
    TARGET_AUDIENCE_AGE = "TARGET_AUDIENCE_AGE",
    TARGET_AUDIENCE_SEX = "TARGET_AUDIENCE_SEX",
    TARGET_AUDIENCE_INTERESTS = "TARGET_AUDIENCE_INTERESTS",
    COMPANY_NAME = "COMPANY_NAME",
}

export enum CompanySearchByType {
    ALL = "ALL",
    ID = "ID",
    SITE = "SITE",
    TYPE = "TYPE",
    NAME = "NAME",
    SOURCE = "SOURCE",
    CONTACT = "CONTACT",
    COMMENT = "COMMENT",
    FIELD_OF_ACTIVITY = "FIELD_OF_ACTIVITY",
    MAX_USERS = "MAX_USERS",
    MAX_STORES = "MAX_STORES",
    MAX_REGIONS = "MAX_REGIONS",
    MAX_COMPETITORS = "MAX_COMPETITORS",
}

export enum EmployeeSearchByType {
    ALL = "ALL",
    ID = "ID",
    FIO = "FIO",
    LOGIN = "LOGIN",
    PHONE = "PHONE",
    POSITION = "POSITION",
    BRAND_NAME = "BRAND_NAME",
}

export enum FormatSearchByType {
    ALL = "ALL",
    ID = "ID",
    NAME = "NAME",
    BRAND_NAME = "BRAND_NAME",
}

export enum ManagerSearchByType {
    ALL = "ALL",
    ID = "ID",
    FIO = "FIO",
    LOGIN = "LOGIN",
    PHONE = "PHONE",
    POSITION = "POSITION",
    COMPANY_NAME = "COMPANY_NAME",
}

export enum RegionSearchByType {
    ALL = "ALL",
    ID = "ID",
    NAME = "NAME",
    BRAND_NAME = "BRAND_NAME",
}

export enum TownSearchByType {
    ALL = "ALL",
    ID = "ID",
    NAME = "NAME",
    BRAND_NAME = "BRAND_NAME",
}

export enum RoleType {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    EMPLOYEE = "EMPLOYEE",
}

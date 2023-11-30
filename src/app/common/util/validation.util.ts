import { DateFilterModel } from "@app/models/components/date-filter.model";
import { DateModel } from "@app/models/components/date.model";

export class ValidationUtil {

  static isNotNullAndNotEmpty(value: any): boolean {
    if (typeof value !== "undefined" && value !== null) {
      if (typeof value === "string") {
        return value.trim().length > 0;
      } else if (value instanceof Array) {
        return value.length > 0;
      } else if(typeof value === "object"){
        return (value && (Object.keys(value).length > 0));
      }

      return true;
    }

    return false;
  }

  static isNullOrEmpty(value: any): boolean {
    if (typeof value !== "undefined" && value !== null) {
      if (typeof value === "string") {
        return value.trim().length === 0;
      } else if (value instanceof Array) {
        return value.length === 0;
      } else if(typeof value === "object"){
        return (value && (Object.keys(value).length === 0));
      }

      return false;
    }

    return true;
  }

  static isValidDateFilter(filter: DateFilterModel): boolean {
    if (ValidationUtil.isNullOrEmpty(filter)) return false;

    if (ValidationUtil.isNullOrEmpty(filter.fromDate) || ValidationUtil.isNullOrEmpty(filter.toDate)) return false;

    if (ValidationUtil.isNullOrEmpty(filter.fromDate.year) || ValidationUtil.isNullOrEmpty(filter.fromDate.year.value)) return false;
    if (ValidationUtil.isNullOrEmpty(filter.fromDate.month) || ValidationUtil.isNullOrEmpty(filter.fromDate.month.value)) return false;
    if (ValidationUtil.isNullOrEmpty(filter.fromDate.date) || ValidationUtil.isNullOrEmpty(filter.fromDate.date.value)) return false;

    if (ValidationUtil.isNullOrEmpty(filter.toDate.year) || ValidationUtil.isNullOrEmpty(filter.toDate.year.value)) return false;
    if (ValidationUtil.isNullOrEmpty(filter.toDate.month) || ValidationUtil.isNullOrEmpty(filter.toDate.month.value)) return false;
    if (ValidationUtil.isNullOrEmpty(filter.toDate.date) || ValidationUtil.isNullOrEmpty(filter.toDate.date.value)) return false;

    return true;
  }

  static isValidDateModel(date: DateModel): boolean {
    if (ValidationUtil.isNullOrEmpty(date)) return false;

    if (ValidationUtil.isNullOrEmpty(date.year) || ValidationUtil.isNullOrEmpty(date.year.value)) return false;
    if (ValidationUtil.isNullOrEmpty(date.month) || ValidationUtil.isNullOrEmpty(date.month.value)) return false;
    if (ValidationUtil.isNullOrEmpty(date.date) || ValidationUtil.isNullOrEmpty(date.date.value)) return false;

    return true;
  }
}
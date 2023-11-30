import { SelectDropdownModel } from "@app/models/components/select-dropdown.model";
import { ValidationUtil } from "../util/validation.util";

export class CheckUseridConstant {
  static muserPid: string = "muserPid";

  static listCheckUserid: SelectDropdownModel[] = [
    { label: "본인", value: "1" },
    { label: "후원직대(후원인)", value: "2" },
    { label: "후원그룹(후원인)", value: "3" },
    { label: "직대(추천인)", value: "5" },
    { label: "산하그룹(추천인)", value: "6" },
  ];
  static listCheckUseridMember: SelectDropdownModel[] = [
    { label: "후원직대(후원인)", value: "2" },
    { label: "후원그룹(후원인)", value: "3" },
    { label: "직대(추천인)", value: "5" },
    { label: "산하그룹(추천인)", value: "6" },
  ]; 
  static listCheckUseridMemberNotParent: SelectDropdownModel[] = [
    { label: "직대(추천인)", value: "5" },
    { label: "산하그룹(추천인)", value: "6" },
  ]; 

  static getListCheckUserid(): SelectDropdownModel[] {
    const havePid = sessionStorage.getItem(CheckUseridConstant.muserPid);
    if (ValidationUtil.isNotNullAndNotEmpty(havePid)) {
      const items = [];
      for (const item of CheckUseridConstant.listCheckUserid) {
        if (havePid !== 'Y' && (item.value === '2' || item.value === '3' || item.value === '4')) continue;

        items.push(item)
      }
      return items;
    }

    return CheckUseridConstant.listCheckUserid;
  }

  static getlistCheckUseridMember(): SelectDropdownModel[] {
    const havePid = sessionStorage.getItem(CheckUseridConstant.muserPid);
    if (ValidationUtil.isNotNullAndNotEmpty(havePid)) {
      const items = [];
      for (const item of CheckUseridConstant.listCheckUseridMember) {
        if (havePid !== 'Y' && (item.value === '2' || item.value === '3' || item.value === '4')) continue;

        items.push(item)
      }
      return items;
    }

    return CheckUseridConstant.listCheckUseridMember;
  }

  static getListCheckUseridMemberPosition(): SelectDropdownModel[] {
    const listCheckUserid = [
      { label: "후원직대(후원인)", value: "2" },
      { label: "후원그룹(후원인)", value: "6" },
      { label: "직대(추천인)", value: "3" },
      { label: "산하그룹(추천인)", value: "7" },
    ];
    const havePid = sessionStorage.getItem(CheckUseridConstant.muserPid);
    if (ValidationUtil.isNotNullAndNotEmpty(havePid)) {
      const items = [];
      for (const item of listCheckUserid) {
        if (havePid !== 'Y' && (item.value === '2' || item.value === '4' || item.value === '6')) continue;

        items.push(item)
      }
      return items;
    }

    return listCheckUserid;
  }
}
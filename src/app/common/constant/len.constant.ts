import { SelectDropdownModel } from "@app/models/components/select-dropdown.model";

export class LenConstant {
  static listLen: SelectDropdownModel[] = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "30", value: "30" },
    { label: "50", value: "50" },
    { label: "100", value: "100" },
  ];

  static listPdtLen: SelectDropdownModel[] = [
    { label: "12", value: "12" },
    { label: "24", value: "24" },
    { label: "48", value: "48" },
  ];
}

export class WAlert {
  icon: string = "successful" // ["confirm", "cancelled", "successful", "warning", "question"]
  title: string | undefined | null = "";
  message: string | undefined | null = "";
  confirmBtnText: string = "확인";
  cancelBtnText: string = "취소";
  action: string = "";
}
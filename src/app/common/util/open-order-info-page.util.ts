export class OpenOrderInfoUtil {
  static openOrderInfoPage(orderNo: String): void {
    window.open(`/my-office/order-management/order-details-inquiry?order-no=${orderNo}`, "_blank");
  }
}
export class ReportUtil {
  static openOrderReport(userid: string | String, orderNo: string | String): void {
    window.open(
      `/report/order/${userid}/${orderNo}`,
      "report", 
      "toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=800, height=900, left=500,top=50"
    );
  }

  static openOrderWithdralwal(orderNo: string): void {
    window.open(
      `/report/order-withdrawal/${orderNo}`,
      "report", 
      "toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=800, height=900, left=500,top=50"
    );
  }

  static openMemberInquiryReport(userid: string | null): void {
    window.open(`/report/member-inquiry/${userid}`, 
    'report', 
    'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=800, height=900, left=500,top=50');

  }

  static openBenefitReport(): void {
    window.open(
      `/report/benefit-statement-report`,
      "report", 
      'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=1150, height=900'
    );
  }

  static openWitholdingTax(): void {
    window.open("/report/witholding-tax-report" ,
							'report', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=800, height=900, left=500,top=50');
  }

  
}
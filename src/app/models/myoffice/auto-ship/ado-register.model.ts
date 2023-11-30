export interface ADORegisterModel {
  //AdoHistory
	admitDate: string;
	adoKind: string;
	adoNo: string;
	userid: string;
	username: string;
	corpName: string;
	cntName: string;
	regDate: string;
	status: string;
	admitsDay: string;
	admitsYYYYMM: string;
	accountSubmission: string;
	bePayment: string;
	afterPayment: string;
	paymentId: string;	
	totPrice: number;
	totPoint: number,
	totVat: number;
	totAmt: number;
	totPv1: number;
	totPv2: number;
	totPv3: number;
	bank: string;
	account: string;
	accountHolder: string;
	rName: string;
	rTel: string;
	rMobile: string;
	rPost: string;
	rAddr: string;
	remark: string;
	insDate: string;
	insUser: string;
	updDate: string;
	updUser: string;

	//ordStatement
	rcptYn: string;
	ordDate: string;
	ordNo: string;
	kindCd: string;
	pathCd: string;
	deliKind: string;
	bName: string;
	ordAmt: number;
	ordPv1: number;
	ordPv2: number;
	ordPv3: number;
	
	//adoStatement
	cardName: string;
	cardNo: string;
	cardHolder: string;
	storeName: string;
	courierName: string;
	termDate: string;
	
	//adoInfo
	payKind: string;
	cardCd: string;
	cardInstall: string;
	birthday: string;
	cardYYMM: string;
	cardPw: string;
	rAddr1: string;
	rAddr2: string;
	storeCd: string;
	deliCd: string;
	
	cateCd: string;
	pdtCd: string;
	pdtName: string;
	
	price: number;
	vat: number;
	amt: number;
	point: number;
	RetailAmt: number;
	RetailPoint: number;
	pv1: number;
	pv2: number;
	pv3: number;
	filePath: string;
	fileName: string;
	fileNameOrg: string;
	
	mobile: string;
	post: string;
	state: string;
	city: string;
	county: string;
	addr1: string;
	addr2: string;
	eMail: string;
	
	retCode: string;
	retMsg: string;
	
	deliAmt: number;
	deliFree: number;
	deliPdtCd: string;
	
	adoMinQty: number;
	adoMaxQty: number;
	
	mUseKana: string;
	mUseEnglish: string;

	qty: number;

	classify: string;
	retStr: string;

	admitsDayYYYYMMDD: string;
	strStatus: string;
	rMemo: string;
	cardYY: string;
	cardMM: string;
	strAdoKind: string;
	startDate: string;
}
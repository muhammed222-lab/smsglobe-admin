// lib/processData.ts
export function processData(data: {
  cryptoPayments: any[];
  deposits: any[];
  userDeposits: any[];
  refers: any[];
  users: string | any[];
}) {
  const totalCryptoPayments = data.cryptoPayments.reduce(
    (sum: number, payment: { amount: string }) =>
      sum + parseFloat(payment.amount),
    0,
  );
  const totalDeposits = data.deposits.reduce(
    (sum: any, deposit: { amount: any }) => sum + deposit.amount,
    0,
  );
  const totalUserDeposits = data.userDeposits.reduce(
    (sum: any, deposit: { amount: any }) => sum + deposit.amount,
    0,
  );
  const totalCommission = data.refers.reduce(
    (sum: any, refer: { commission: any }) => sum + refer.commission,
    0,
  );
  const totalUsers = data.users.length;

  return {
    totalCryptoPayments,
    totalDeposits,
    totalUserDeposits,
    totalCommission,
    totalUsers,
  };
}

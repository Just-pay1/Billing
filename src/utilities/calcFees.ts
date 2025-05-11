export const calcFee = ( commission_setup: 'Percentage' | 'Fixed', commission_amount: number, bill_amount: number, fee_from: 'user' | 'merchant' ): any => {
    console.log(commission_setup, commission_amount, bill_amount)

    const fee = (commission_setup === 'Fixed') 
    ? commission_amount 
    : (commission_setup === 'Percentage') 
        ? bill_amount * commission_amount / 100 
        : 0;
    console.log('fee: ', fee);

    const total_amount = (fee_from === 'user')
    ? fee + bill_amount 
    : (fee_from === 'merchant')
        ? bill_amount
        : 0;


    return {fee, total_amount};
};

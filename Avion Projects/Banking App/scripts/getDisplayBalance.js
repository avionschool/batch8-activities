function get_balance(user) {
    // displays in ₱ and commas
    let string = '₱' + user.balance.toLocaleString();
    if (string.includes('.')) {
        return string;
    } else return string + '.00'; // display whole numbers with trailing zeros
}

function display_balance(amount) {
    amount = amount.toLocaleString(); // convert to string
    ans = "";
    if (amount.includes('.')) {
        ans = amount;
    } else ans = amount + '.00';
    
    if (ans.includes('-')) {
        ans = `(${ans.slice(1)})`;
    }
    return ans; 
}
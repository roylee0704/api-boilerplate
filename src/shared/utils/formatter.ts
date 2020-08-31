export const stripPhoneNumber = (phoneNumber: string): string => {
    phoneNumber = phoneNumber ? phoneNumber.trim() : phoneNumber;
    if (!phoneNumber) {
        return '';
    }

    while (phoneNumber[0] === '+') {
        phoneNumber = phoneNumber.slice(1);
    }

    if (phoneNumber[0] === '0') {
        phoneNumber = '6' + phoneNumber;
    }

    return phoneNumber;
};

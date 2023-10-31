import * as SMS from 'expo-sms';

interface Visitor {
  id: number;
  // Add other properties of the Visitor object as needed
}

export const sendSMSToVisitor = async (phoneNumber: string, msg: any) => {
  try {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // do your SMS stuff here
      const { result } = await SMS.sendSMSAsync([phoneNumber], msg);
    } else {
      console.log('test')
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

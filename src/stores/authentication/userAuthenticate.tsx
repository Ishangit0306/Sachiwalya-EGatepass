import { Alert } from 'react-native';
import { fetchLoginApi } from '../../utils/api';
import { AppThunk } from '../store';
import { LoginPayloadType, loginSuccess } from './slice';
import { USER_TYPE_EMPLOYEE, USER_TYPE_SECURITY } from '../../utils/config';

const authenticate =
  (data: any, fetchApi: any, navigation?: any): AppThunk =>
    async (dispatch) => {
      try {
        if (data) {
          const res = await fetchApi(data);

          console.log('response data are>>>>>>>>>>>', res);

          if (res.statusCode === 404) {
            Alert.alert(res.message);
            //Toast.show('Error! login error', { duration: Toast.durations.LONG });
          }
          // Alert.alert(`${JSON.stringify(res)}`);

          if (res.statusCode === 200 || res.statusCode === 201) {
            const isEmployee = res.data.etype === USER_TYPE_EMPLOYEE ? true : false;

          
            console.log('resdata', res.data)
            const loginData: LoginPayloadType = {
              user: {
                id: res.data.eid,
                etype: res.data.etype,
                userName: res.data.username,
                email: res.data.username, // currently send username only
                departmentName: isEmployee ? res.data.username : null,
                departmentId: isEmployee ? res.data.eid : null,
                ephone:res.data.ephone,
                edesignation:res.data.edesignation,
              },
              token: res.data.token,
              role: res.data.role
            };

            console.log('login dispatch data', loginData)
            dispatch(loginSuccess(loginData));
            return;
          }
          // else{
          //     Alert.alert(`Login Network Error ****8${JSON.stringify(res)}`);
          // }
        }
      } catch (err) {
        console.error('Error: while authentication', JSON.stringify(err));
      }
    };

export const authLogin = ({ data, navigation }: any): AppThunk =>
  authenticate(data, fetchLoginApi, navigation);

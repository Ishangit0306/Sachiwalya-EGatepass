import { API_BASE_URL, ROLE_TYPE_EMPLOYEE, ROLE_TYPE_PASSOFFICE, ROLE_TYPE_SECURITY } from './config';
import loginData from '../db/login-db.json';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { TYPE_ADMIN, TYPE_EMPLOYER, TYPE_PASSOFFICE, TYPE_SECURITY } from '../types';

// export const fetchLoginApi = async (data: any) => {
//     const { email, password } = data;
//     const user = loginData.users.find(
//         (user) => user.email === email && user.password === password
//     );

//     if (user) {
//         return {
//             data: user,
//             statusCode: 201,
//             message: 'login successfully',
//         }
//     } else {
//         return {
//             data: null,
//             statusCode: 404,
//             message: 'credentials not matched',
//             error: 'login error'
//         };
//     }
// }

export const fetchLoginApi = async (data: any) => {
  const requestData = data;
  const requestBody = {
    username: requestData.email,
    password: requestData.password,
  };
  try {
    console.log('base url', API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const resData = await response.json();

    if (!response.ok) {
      return {
        statusCode: 404,
        message: resData.message,
      };
    }
    console.log('resData', resData);
    if (response.status === 200 || response.status === 201) {
      const { role, auth_token, eid, etype } = resData;
      console.log('inside', role);
      const userData = await fetchUserDetail(auth_token);

      if (userData.statusCode === 200 || userData.statusCode === 201) {
        return {
          data: { ...userData.data, token: auth_token },
          statusCode: 200,
          message: 'success',
        };
      } else {
        return {
          data: null,
          statusCode: 404,
          message: 'error in authorization and fetch user',
        };
      }
    } else {
      return {
        data: null,
        statusCode: 404,
        message: 'error in authorization and fetch user',
      };
    }
  } catch (error) {
    return {
      data: null,
      statusCode: 404,
      message: error,
    };
  }
};

// export const fetchLoginApi = async (data: { email: string, password: string }) => {
//     const requestBody = {
//         username: data.email,
//         password: data.password
//     };

//     try {
//         const response = await fetch(`${API_BASE_URL}/api/login`, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(requestBody)
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch login API');
//         }

//         const resData = await response.json();

//         if (resData.statusCode === 200 || resData.statusCode === 201) {
//             const { role, auth_token } = resData;

//             const userData = await fetchUserDetail(auth_token);

//             if (userData.statusCode === 200 || userData.statusCode === 201) {
//                 return {
//                     data: { ...userData.data, token: auth_token },
//                     statusCode: 200,
//                     message: 'success',
//                 };
//             } else {
//                 throw new Error('Error in fetching user data');
//             }
//         } else {
//             throw new Error('Error in authorization');
//         }
//     } catch (error) {
//         return {
//             data: null,
//             statusCode: 404,
//             message: error?error:"abcd"
//         };
//     }
// };

export const fetchUserDetail = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/oldusers/getUser`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log('user', data);
  if (response.ok) {
    return {
      data: data,
      message: 'success',
      statusCode: 200,
      error: false,
    };
  } else {
    return {
      data: null,
      message: data.message,
      statusCode: 404,
      error: true,
    };
  }
};

type GET_VISITOR_API = {
  token: string;
  role: TYPE_EMPLOYER | TYPE_SECURITY | TYPE_ADMIN | TYPE_PASSOFFICE;
  etype:number|null;
  eid:number|null;
  archive:number|null;
};
export const getVisitorsListApi = async ({ token, role ,etype,eid,archive}: GET_VISITOR_API) => {
  let API_URL_VISITOR;

  // if (role === ROLE_TYPE_SECURITY || role === ROLE_TYPE_PASSOFFICE ) {
  //   API_URL_VISITOR = `${API_BASE_URL}/oldvisitor/getTodayRecord`;

  // } else if (role === ROLE_TYPE_EMPLOYEE) {
  //   API_URL_VISITOR = `${API_BASE_URL}/v1.0/user/get-visitor-list/${eid}/${etype}/no/no/no/no/${archive}`
  //   //API_URL_VISITOR = `${API_BASE_URL}/oldvisitor/getTodayRecord`
  // }
  API_URL_VISITOR = `${API_BASE_URL}/v1.0/user/get-visitor-list/${eid}/${etype}/no/no/no/no/${archive}`
  // console.log(
  //   'current url will be hit for visitor>>>>>>>>>>>>>>>>>>>>>>',
  //   API_URL_VISITOR
  // );

  const response = await fetch(`${API_URL_VISITOR}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (response.ok) {
    return {
      data: data?.data?.list,
      message: 'success',
      statusCode: 200,
      error: false,
    };
  } else {
    return {
      data: null,
      message: data.message,
      statusCode: 404,
      error: true,
    };
  }
};

export const getEmployeeList = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/users/getEmployees`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  let transformedData = [];
  //console.log('employee record>>>>>>>>>>>>>>>>', data);
  if (response.ok) {
    transformedData = data.map((item: any) => ({
      label: `${item.firstname} ${item.lastname} - ${item.id}`,
      value: item.id,
    }));
    return {
      data: transformedData,
      message: 'success',
      statusCode: 200,
      error: false,
    };
  } else {
    return {
      data: null,
      message: data.message,
      statusCode: 404,
      error: true,
    };
  }
};

// export const bookAppointmentFormApi = async (data: any, token: string) => {
//     console.log('api book data are>>>>>>>>>>>>>>>>>>>>>>>>', data)
//     const response = await fetch(`${API_BASE_URL}/users/visitor`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'multipart/form-data',
//             'Authorization': `Bearer ${token}`
//         },
//         body: data
//     });

//     const resData = await response.json();

//     console.log('data stored response>>>>>>>>>>>>>>>>>>>>>>', resData)
//     if (response.ok) {

//         // if (resData.statusCode === 200 || resData.statusCode === 201) {
//         //     return {
//         //         data: true,
//         //         statusCode: 200,
//         //         message: 'success',
//         //     }
//         // } else {
//         //     return {
//         //         data: null,
//         //         statusCode: 404,
//         //         message: 'error in authorization and fetch user',
//         //     }
//         // }
//     }
// }

export const bookAppointmentFormApi = async (data: FormData, token: string) => {
  console.log('formupdataishan ', data);
  try {
    console.log('api book data are>>>>>>>>>>>>>>>>>>>>>>>>', data);
    const response = await fetch(`${API_BASE_URL}/oldvisitor/create`, {
      method: 'POST',
      headers: {
        //Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        //Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    console.log('in ali call response');
    const resData = await response.json();
    console.log('data stored >>>>>>>>>>>>>>>>>>>>>>', resData);

    if (response.ok) {
      console.log('data stored response>>>>>>>>>>>>>>>>>>>>>>', resData);
      return {
        data: resData,
        statusCode: 201,
        message: 'success',
        error: false,
      };
    } else {
      return {
        data: null,
        statusCode: response.status,
        message: resData.message || 'Unknown error',
        error: true,
      };
    }
  } catch (error) {
    console.error('Error in bookAppointmentFormApi:', error);
    return {
      data: null,
      statusCode: 500,
      message: 'Internal Server Error',
      error: true,
    };
  }
};

type StausUpdateType = {
  visitor_id: number;
  status: number;
  token: string;
};

export const updateVisitorStatusApi = async ({
  visitor_id,
  status,
  token,
}: StausUpdateType) => {
  console.log("Status", status);
  // Assuming you have the necessary data to construct the requestBody
  const requestBody = {
    visitor_id: visitor_id,
    status: status,
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/oldvisitor/updateVisitorStatus`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    console.log('response data are for status update>>>>>>>>>>>>>>>>>>>>>');
    const resData = await response.json();
    if (response.ok) {
      return {
        statusCode: 201,
        message: 'updated',
      };
    } else {
      return {
        data: null,
        statusCode: response.status,
        message: resData.message || 'Unknown error',
        error: true,
      };
    }
  } catch (error) {
    return {
      data: null,
      statusCode: 500, // Provide the appropriate status code for server error
      message: 'Internal Server Error', // Provide the appropriate error message
    };
  }
};
export const scannedDocumentApi = async (data: FormData, token: string) => {
  console.log('scannedApidata,', data);
  try {
    const response = await fetch(`${API_BASE_URL}/oldvisitor/capture`, {
      method: 'POST',
      headers: {
        //Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    const resData = await response.json();

    console.log('scanneddocapi', resData);
    if (response.ok) {
      return {
        data: resData,
        statusCode: 201,
        message: 'success',
        error: false,
      };
    } else {
      return {
        data: null,
        statusCode: response.status,
        message: resData.message || 'Unknown error',
        error: true,
      };
    }
  } catch (error) {
    console.error('Error in bookAppointmentFormApi:', error);
    return {
      data: null,
      statusCode: null,
      message: error,
      error: true,
    };
  }
};

export const fetchDepartment = async () => {
  const dorganisation = 'Secreteriat';
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1.0/master/departments-list/${dorganisation}`,
      {
        method: 'GET',
        headers: {
          // Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
        },
      }
    );
    const resData = await response.json();
    if (response.ok) {
      return {
        data: resData.data.list,
        statusCode: 201,
        message: 'success',
        error: false,
      };
    } else {
      return {
        data: null,
        statusCode: response.status,
        message: resData.message || 'Unknown error',
        error: true,
      };
    }
  } catch (error) {
    console.error('Error in Fetch Department', error);
    return {
      data: null,
      statusCode: null,
      message: error,
      error: true,
    };
  }
};

export const fetchDesignation = async (dept: number) => {
  console.log('dept', dept);
  const dorganisation = 'Secreteriat';
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1.0/master/designations-list/${dorganisation}/${dept}`,
      {
        method: 'GET',
        headers: {
          // Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
        },
      }
    );
    const resData = await response.json();
    if (response.ok) {
      return {
        data: resData.data.list,
        statusCode: 201,
        message: 'success',
        error: false,
      };
    } else {
      return {
        data: null,
        statusCode: response.status,
        message: resData.message || 'Unknown error',
        error: true,
      };
    }
  } catch (error) {
    console.error('Error in Fetch Department', error);
    return {
      data: null,
      statusCode: null,
      message: error,
      error: true,
    };
  }
};

export const fetchOfficer = async (dept: number, desig: number) => {
  console.log('dept', dept);
  const dorganisation = 'Secreteriat';
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1.0/master/visiting-officer-list/${dorganisation}/${dept}/${desig}`,
      {
        method: 'GET',
        headers: {
          // Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
        },
      }
    );
    const resData = await response.json();
    if (response.ok) {
      return {
        data: resData.data.list,
        statusCode: 201,
        message: 'success',
        error: false,
      };
    } else {
      return {
        data: null,
        statusCode: response.status,
        message: resData.message || 'Unknown error',
        error: true,
      };
    }
  } catch (error) {
    console.error('Error in Fetch Department', error);
    return {
      data: null,
      statusCode: null,
      message: error,
      error: true,
    };
  }
};

export const fetchOtpApi = async (data: any) => {
  const requestData = data;
 
  const requestBody = {
    mobile: data
  };
  try {
    //console.log('base url',API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}/v1.0/verification/otp-genetare`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    const resData = await response.json();

    if (!response.ok) {
      return {
        statusCode: 404,
        message: resData.message
      }
    }
    if (response.status === 200 || response.status === 201) {
      return {
        data: resData.data,
        statusCode: 200,
        message: 'otp successfully Send'
      }
    }
    else {
      return {
        data: null,
        statusCode: 404,
        message: 'error in fetching otp',
      }
    }
  } catch (error) {
    return {
      data: null,
      statusCode: 404,
      message: error,
    }
  }

}

export const verifyOtpApi = async (data: any) => {
  //const requestData = data;
  const requestBody = {
    otp: data.enteredOTP,
    id: data.id,
    mobile: data.mobile,

  };
  console.log('sending for verify', requestBody);
  try {
    console.log('base url', API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}/v1.0/verification/otp-validate`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    const resData = await response.json();

    if (!response.ok) {
      return {
        validate: false,
        statusCode: 404,
        message: resData.message
      }
    }

    if (response.status === 200 || response.status === 201) {

      return {
        validate: true,
        statusCode: 200,
        message: 'otp successfully Send'
      }
    }
    else {
      return {
        validate: false,
        statusCode: 404,
        message: 'error in verifying otp',
      }
    }
  } catch (error) {
    return {
      validate: null,
      statusCode: 404,
      message: error,
    }
  }

}

export const fetchUser = async (data: any) => {

  const requestBody = {
    otp: data.enteredOTP,
    id: data.id,
    mobile: data.mobile
  }
  console.log('data for fetch user', requestBody);
  // name:uname,
  // address:uaddress,
  // gender:ugender,
  // contactNumber:uphone,
  // visitorId:uidentitynum,
  // pic:uphoto


  //     const resdata={ name:'Ishan Malhotra',
  //     address:'Premn Nagar',
  //     contactNumber:'8171037175',
  //     gender:'M',
  //     visitorId:'222930071043',
  // pic:'abcd.jpeg'}
  try {
    const response = await fetch(`${API_BASE_URL}/v1.0/verification/otp-validate`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });
    const resdata = await response.json();
    const resData = resdata.data;
    console.log('resData', resData);
    console.log('reduxstoreapidata', resData);

    if (response.ok) {

      const resdatad = {
        name: resData.uname,
        address: resData.uaddress,
        contactNumber: resData.uphone,
        gender: resData.ugender,
        visitorId: resData.uidentitynum,
        pic: resData.uphoto,
        uid: resData.uid,
        typeOfId: resData.uidentitytype,
        email: resData.uemail,
        idpic:resData.id_pic
      }
      console.log('redux store data will be', resdatad);
      return {
        data: resdatad,
        statusCode: 201,
        message: 'success',
        error: false,
      };
    } else {
      return {
        data: null,
        statusCode: response.status,
        message: resData.message || 'Unknown error',
        error: true,
      };
    }
  } catch (error) {
    console.error('Error in Fetching user', error);
    return {
      data: null,
      statusCode: null,
      message: error,
      error: true,
    };
  }
}

export const saveUserApi = async (data: any) => {
  const vid=data.vid;
  const headers:any = {
   'Accept': 'application/json',
};

if (vid) {
   headers['Content-Type'] = 'application/json';
}

 const senddata= vid?JSON.stringify(data):data;
 console.log('stringify',senddata)
   let url=`${API_BASE_URL}/v1.0/visitor/save`
   let method= 'POST'

   try {
     if(vid)
     {
       url=`${API_BASE_URL}/v1.0/visitor/update/${vid}`
       method='PATCH'
     }
     console.log('url',url);
       const response = await fetch(url, {
           method: method,
           headers: headers,
           body: senddata
       });
       const resData = await response.json();
       console.log("res",resData);
   
       if (!response.ok) {
           return  {
               statusCode:404,
              message:resData.message
           }
       }
       console.log('resData',resData);
       if (response.status === 200 || response.status === 201) {

           
           return{
               message:'succesfully submitted',
               statusCode:200,
               //message:'Form Submitted Succesfully',
           }
   
          
       }
       else{
           return {
               data: null,
               statusCode: 404,
               message: 'error in submitting form',
           }
       } 
   } catch (error) {
       return {
           data: null,
           statusCode: 404,
           message: error,
       }
   }
   
}

export const departmentName = async () => {
  try {
      const dept = "Secreteriat";
      const response = await fetch(`${API_BASE_URL}/v1.0/master/departments-list/${dept}`, {
          method: 'GET',
          headers: {
               Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              //Authorization: `Bearer ${token}`,
          },
      });
      const resData = await response.json();
         //console.log(resData.data.list);
      if (response.ok) {
          return {
              data: resData.data.list,
              statusCode: 201,
              message: 'success',
              error: false,
          };
      } else {
          return {
              data: [],
              statusCode: response.status,
              message: resData.message || 'Unknown error',
              error: true,
          };
      }
  } catch (error) {
      console.error('Error in Fetching Depathment:', error);
      return {
          data: null,
          statusCode: null,
          message: error,
          error: true,
      };
  }
};


export const designationName = async (dept:any) => {
  try {
      //const dept = "UK Secreteriat";
      const response = await fetch(`${API_BASE_URL}/v1.0/master/designations-list/Secreteriat/${dept}`, {
          method: 'GET',
          headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json', 
              //Authorization: `Bearer ${token}`,
          },
      });
      const resData = await response.json(); 
      const regex = /,\s*([\]}])/g; 
      const fixedJson = JSON.stringify(resData).replace(regex, "$1");
      const json = JSON.parse(fixedJson);
     //console.log("Res daTA ", resData)
     //console.log("NORMAL parse",JSON.stringify(resData))
     //console.log("fixed",fixedJson);
     //console.log("JSON,",json)
      if (response.ok) { 
          return {
              data: resData.data.list,
              statusCode: 201,
              message: 'success',
              error: false,
          };
      } else {
          return {
              data: [],
              statusCode: response.status,
              message: resData.message || 'Unknown error',
              error: true,
          };
      }
  } catch (error) {
      console.error('Error in Fetching Depathment:', error);
      return {
          data: null,
          statusCode: null,
          message: error,
          error: true,
      };
  }
};

export const officerName = async (dept:any,designation:any) => {
  try {
      //const dept = "UK Secreteriat";
      console.log('designation',designation);
      const response = await fetch(`${API_BASE_URL}/v1.0/master/visiting-officer-list/Secreteriat/${dept}/${designation}`, {
          method: 'GET',
          headers: {
               Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              //Authorization: `Bearer ${token}`,
          },
      });
      const resData = await response.json();
         console.log('desigantionapi',resData);
      if (response.ok) {
          return {
              data: resData.data.list,
              statusCode: 201,
              message: 'success',
              error: false,
          };
      } else {
          return {
              data: [],
              statusCode: response.status,
              message: resData.message || 'Unknown error',
              error: true,
          };
      }
  } catch (error) {
      console.error('Error in Fetching officer', error);
      return {
          data: null,
          statusCode: null,
          message: error,
          error: true,
      };
  }
};

export const scannedUserDocumentApi = async (data: FormData) => {
  console.log('scannedApidata,', data);
  try {
    const response = await fetch(`${API_BASE_URL}/oldvisitor/capture`, {
      method: 'POST',
      headers: {
        //Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        //Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    const resData = await response.json();

    console.log('scanneddocapi', resData);
    if (response.ok) {
      return {
        data: resData,
        statusCode: 201,
        message: 'success',
        error: false,
      };
    } else {
      return {
        data: null,
        statusCode: response.status,
        message: resData.message || 'Unknown error',
        error: true,
      };
    }
  } catch (error) {
    console.error('Error in bookAppointmentFormApi:', error);
    return {
      data: null,
      statusCode: null,
      message: error,
      error: true,
    };
  }
};
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserFormData, UserState, VisitorsFormState, VisitorState } from '../../types';

const initialState: UserFormData = {
    name:'',
    address:'',
    contactNumber:'',
    gender:'',
    visitorId:'',
    pic:'',
    uid:'',
    typeOfId:0,
    email:'',
    idpic:''
}

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeuser: (
            state,
            action: PayloadAction<UserFormData>,
        ) => {
            
                state.visitorId= action.payload.visitorId;
                state.name= action.payload.name;
                state.address=action.payload.address;
                state.contactNumber= action.payload.contactNumber;
                state.gender=action.payload.gender;
                state.pic=action.payload.pic;
                state.uid=action.payload.uid;
                state.typeOfId=action.payload.typeOfId;
                state.email=action.payload.email;
                state.idpic=action.payload.idpic;
        },

        resetUser: () => {
          return initialState;
        },
    },
});

export const {
    storeuser,
    resetUser,
} = slice.actions;

export const user = slice.reducer;

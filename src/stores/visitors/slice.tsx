import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VisitorsFormState, VisitorState } from '../../types';

const initialState: VisitorState = {
    visitorList: []
};

export const slice = createSlice({
    name: 'visitors',
    initialState,
    reducers: {
        storeVisitors: (
            state,
            action: PayloadAction<VisitorsFormState>,
        ) => {
            const newData: VisitorsFormState = {
                visitorId: action.payload.visitorId,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                address: action.payload.address,
                contactNumber: action.payload.contactNumber,
                date: action.payload.date,
                time: action.payload.time,
                visitPurpose: action.payload.visitPurpose,
                departmentName: action.payload.departmentName,
                employeeId: action.payload.employeeId,
                documentType: action.payload.documentType,
                visitorStatus: action.payload.visitorStatus,
            };

            state.visitorList.push(newData);
        },

        resetVisitors: (state) => {
            state.visitorList = [];
        },
    },
});

export const {
    storeVisitors,
    resetVisitors,
} = slice.actions;

export const visitors = slice.reducer;

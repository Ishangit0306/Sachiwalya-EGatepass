import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppointmentInitialState } from '../../types';

export type PhotoTakenType = {
  documentPhoto: any,
  visitorPhoto: any;
};

const initialState: AppointmentInitialState = {
  documentPhoto: null,
  visitorPhoto: null,
  name: null,
  idNo: null,
  uploadedImgId: null,
};

export const slice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    documentPhotoStore: (
      state,
      action: PayloadAction<{ documentPhoto: any }>,
    ) => {
      const { documentPhoto } = action.payload;
      console.log("photo received", documentPhoto)

      return {
        ...state,
        documentPhoto: documentPhoto,
      };
    },

    visitorPhotoStore: (
      state,
      action: PayloadAction<{ visitorPhoto: any }>,
    ) => {
      const { visitorPhoto } = action.payload;

      return {
        ...state,
        visitorPhoto: visitorPhoto,
      };
    },

    visitorScannedDataStore: (
      state,
      action: PayloadAction<{ name: any, idNo: any, uploadedImgId: any }>,
    ) => {
      const { name, idNo, uploadedImgId } = action.payload;

      return {
        ...state,
        name: name,
        idNo: idNo,
        uploadedImgId: uploadedImgId,
      };
    },

    resetPhotoState: (state) => {
      console.log("photo clear")
      state.documentPhoto = null;
      state.visitorPhoto = null;
      state.name = null;
      state.idNo = null;
      state.uploadedImgId = null;
    },
  },
});

export const {
  documentPhotoStore,
  visitorPhotoStore,
  resetPhotoState,
  visitorScannedDataStore,
} = slice.actions;

export const appointment = slice.reducer;

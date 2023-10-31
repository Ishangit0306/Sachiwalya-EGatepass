import { RootState } from '../../types';

export const getAppointmentPhotoData = (state: RootState) => state.appointment;

export const getDocumentScannedPhoto = (state: RootState) => state.appointment.documentPhoto;

export const getVisitorScannedPhoto = (state: RootState) => state.appointment.visitorPhoto;

export const getAllAppointmentData = (state: RootState) => state.appointment
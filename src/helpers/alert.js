import SweetAlert from 'react-native-sweet-alert';

export const alert = (title, confirmButtonTitle, style) => {
  return SweetAlert.showAlertWithOptions({
    title: title,
    confirmButtonTitle: confirmButtonTitle,
    style: style,
  });
};

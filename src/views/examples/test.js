import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert';
const Container = wrapComponent(function({ createSnackbar }) {
    function showSnackbar() {
      createSnackbar({
        message: 'Hello Snackbar!',
        dismissable: false,
        pauseOnHover: false,
        progressBar: true,
        sticky: false,
        theme: 'success',
        timeout: 3000
      });
    }
  });

export default Container;
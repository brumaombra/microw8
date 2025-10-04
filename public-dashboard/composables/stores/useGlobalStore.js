export const useGlobalStore = () => useState('global', () => ({
    busy: false,
    queueData: {}, // Main data object for queue data

    // Message toast data
    toast: {
        visible: false,
        message: '',
        type: 'success'
    },

    // Message dialog data
    dialog: {
        visible: false,
        title: '',
        message: '',
        type: 'success'
    },

    // Confirm dialog data
    confirmDialog: {
        visible: false,
        title: '',
        message: '',
        themeColor: '',
        onConfirm: null,
        onCancel: null,
        confirmButton: null,
        cancelButton: null
    }
}));
const Reducer = (state, action) => {
    switch (action.type) {
        case 'Fetch_Data':
            return {
                ...state, loading: true
            }
        case 'Success_Fetch':
            return {
                ...state, products: action.payload, loading: false
            }
        case 'Fail_Fetch':
            return {
                ...state, loading: false, error: action.payload
            }
        default:
            return state
    }
}
export default Reducer
exports.getPosition = () => {
    return function (dispatch) {
        console.log('trece')
        navigator.geolocation.getCurrentPosition((position) => {

            var region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.4,
                longitudeDelta: 0.4
            };
            console.log(region);
            dispatch(userPosition(region))
        })
    }
};


userPosition = (region) => {
    return {
        type: 'USER_POSITION',
        region
    }
};

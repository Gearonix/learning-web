const successCallback  = (position) => {
    console.log(position)
}

const errorCallback = (error) => {
    console.log(error.message)
}


const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback)

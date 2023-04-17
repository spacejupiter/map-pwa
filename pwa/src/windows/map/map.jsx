import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Socket from '../../websocket';
import hopitalImg from '../../assets/icons/hospital.svg';
import drone from '../../assets/icons/drone.svg';

import { useEffect, useState } from 'react';

const ws = new Socket();

function MapContainer() {
	const [geoLocation, setGeoLocation] = useState({
		lat: 51.498016,
		lng: -0.118011,
	});
	const [state, setState] = useState('start flight');
    const [shouldStart,setStart] = useState(true);

	var startFlight = () => {
        if(shouldStart ===true){
            ws.send({
                type: 'controls',
                payload: 'on',
            });
            setState('starting flight..');
            setTimeout(() => {
                setState('flight in transit');
            }, 2000);
        }
		setStart(false);
	};

    var pauseFlight = () => {
        if(shouldStart === false){
            ws.send({
                type: 'controls',
                payload: 'off',
            });
            setState('pausing flight..');
            setTimeout(() => {
                setState('flight paused');
            }, 2000);
        }
		setStart(true);
	};

	useEffect(() => {
		const socket = ws.getClient();
		socket.onopen = () => {
			console.log('connection established');
		};

		socket.onmessage = (message) => {
			var messageType = JSON.parse(message.data).type;
			if (messageType === 'geo-location') {
				setGeoLocation(JSON.parse(message.data).payload);
				console.log(JSON.parse(message.data).payload);
			}
		};
	}, []);

	const mapStyles = ' h-[100vh] w-[100vw]';
	const center = { lat: 51.505444, lng: -0.091249 };

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_KEY,
	});

	if (isLoaded) {
		return (
			<div className='p'>
				<div className='controls border bg-inherit h-[20vh] w-[50vw] md:w-auto  fixed top-14 z-50 opacity-1 flex flex-col ml-4 space-y-1 md:space-y-2'>
					<div className='md:flex-row  flex-col space-y-2 md:space-x-4'>
						<input
							className='p-2 md:p-3 border border-black bg-white md:border-4 border-1 rounded-lg bg-inherit placeholder-black font-bold'
							placeholder='enter origin '
						/>
						<input
							className='p-2 md:p-3 border bg-white border-black md:border-4 border-1  rounded-lg bg-inherit placeholder-black font-bold'
							placeholder='enter destination '
						/>
					</div>
					<div className='flex flex-col space-y-2 text-black '>
						<div
                        className='text-center p-3 border border-black md:border-4 border-1  bg-white  font-bold'>
							{state}
						</div>
					</div>
                    <div className='controls flex flex-row md:space-x-4 space-x-1'>
                        <button onClick={startFlight} className='text-center md:p-3 md:px-24 px-8 border border-black md:border-4 border-1  bg-white rounded-lg font-bold'>
                            start
                        </button>
                        <button onClick={pauseFlight} className='text-center p-3 md:px-24 px-8 border border-black md:border-4 border-1  bg-white rounded-lg font-bold'>
                            pause
                        </button>
                    </div>
				</div>
				<GoogleMap zoom={14} mapContainerClassName={mapStyles} center={center}>
					<Marker
						icon={{
							url: hopitalImg,
							scaledSize: new window.google.maps.Size(50, 40),
						}}
						position={{ lat: 51.498016, lng: -0.118011 }}
					/>
					<Marker
						icon={{
							url: hopitalImg,
							scaledSize: new window.google.maps.Size(50, 40),
						}}
						position={{ lat: 51.503162, lng: -0.086852 }}
					/>
					<Marker />

					{geoLocation ? (
						<Marker
							icon={{
								url: drone,
								scaledSize: new window.google.maps.Size(30, 43),
							}}
							position={{
								lat: geoLocation.lat,
								lng: geoLocation.lng,
							}}
						/>
					) : (
						<Marker />
					)}
				</GoogleMap>
			</div>
		);
	}

	return <div>loading</div>;
}

export default MapContainer;

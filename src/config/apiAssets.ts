import uuid from 'react-uuid';
import { sha256 } from 'js-sha256';
import environment from './environment';

const { apiSignature,appToken,appBuildNumber  } = environment;

const findOrCreateDeviceUuid = async() => {
	const secureLocal = (await import('./securelocal')).default
	let existingUuid = secureLocal.get('device-uuid');
	if(existingUuid) {
		return existingUuid;
	} else {
		let generatedUuid = uuid();
		secureLocal.set('device-uuid', generatedUuid);
		return generatedUuid;
	}
}

export const getSignature = (time: any) => {
	let stringToHash = time + apiSignature;
	return sha256(stringToHash);
}

export const HEADERS = {
	'app-token': appToken,
	'device-uuid': findOrCreateDeviceUuid(),
	'language': 'en',
  'build-number': appBuildNumber,
  'source': 'fe-react'
}


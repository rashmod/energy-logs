import { DataDocument } from '../types/Energy';

const transformData = (originalData: DataDocument[]) =>
	originalData.map((item) => {
		// Remove $oid and $date wrappers and convert to standard JSON format
		return {
			_id: item._id.$oid, // Convert ObjectId to a string
			createdAt: new Date(item.createdAt),
			serialNo: item.serialNo,
			clientID: item.clientID, // Convert ObjectId to a string
			deviceMapID: item.deviceMapID, // Convert ObjectId to a string
			devices: item.devices.map((device) => device), // Convert ObjectIds to strings
			total_kwh: item.total_kwh,
			updatedAt: new Date(item.updatedAt),
			ac_run_hrs: item.ac_run_hrs,
			ac_fan_hrs: item.ac_fan_hrs,
			algo_status: item.algo_status,
			billing_amount: item.billing_amount,
			cost_reduction: item.cost_reduction,
			energy_savings: {
				savings_percent: item.energy_savings.savings_percent,
				ref_kwh: item.energy_savings.ref_kwh,
				us_meter: item.energy_savings.us_meter,
				us_calc: item.energy_savings.us_calc,
				inv_factor: item.energy_savings.inv_factor,
			},
			mitigated_co2: item.mitigated_co2,
			weather: {
				max_temp: item.weather.max_temp,
				min_temp: item.weather.min_temp,
			},
		};
	});

export default transformData;

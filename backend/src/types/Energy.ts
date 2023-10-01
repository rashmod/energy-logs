// import { Document, Schema } from 'mongoose';

// export type DataDocument = {
// 	_id: ID;
// 	createdAt: AtedAt;
// 	serialNo: string;
// 	clientID: ID;
// 	deviceMapID: ID;
// 	devices: ID[];
// 	total_kwh: number;
// 	updatedAt: AtedAt;
// 	ac_run_hrs: number;
// 	ac_fan_hrs: number;
// 	algo_status: number;
// 	billing_amount: number;
// 	cost_reduction: number;
// 	energy_savings: EnergySavings;
// 	mitigated_co2: number;
// 	weather: Weather;
// };

// export type ID = {
// 	$oid: string;
// };

// export type AtedAt = {
// 	$date: string;
// };

// export type EnergySavings = {
// 	savings_percent: number;
// 	ref_kwh: number;
// 	us_meter: number;
// 	us_calc: number;
// 	inv_factor: number;
// };

// export type Weather = {
// 	max_temp: number;
// 	min_temp: number;
// };

import { Document, Schema } from 'mongoose';

interface EnergySavings {
	savings_percent: number;
	ref_kwh: number;
	us_meter: number;
	us_calc: number;
	inv_factor: number;
}

interface Weather {
	max_temp: number;
	min_temp: number;
}

export interface DataDocument extends Document {
	createdAt: Date;
	serialNo: string;
	clientID: Schema.Types.ObjectId;
	deviceMapID: Schema.Types.ObjectId;
	devices: Schema.Types.ObjectId[];
	total_kwh: number;
	updatedAt: Date;
	ac_run_hrs: number;
	ac_fan_hrs: number;
	algo_status: number;
	billing_amount: number;
	cost_reduction: number;
	energy_savings: EnergySavings;
	mitigated_co2: number;
	weather: Weather;
}

export default DataDocument;

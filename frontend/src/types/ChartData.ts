// Generated by https://quicktype.io

export type TData = {
	_id: ID;
	createdAt: string;
	serialNo: string;
	clientID: ID;
	deviceMapID: ID;
	devices: ID[];
	total_kwh: number;
	updatedAt: string;
	ac_run_hrs: number;
	ac_fan_hrs: number;
	algo_status: number;
	billing_ammount: number;
	cost_reduction: number;
	energy_savings: EnergySavings;
	mitigated_co2: number;
	weather: Weather;
};

export type ID = {
	$oid: string;
};

export type EnergySavings = {
	savings_percent: number;
	ref_kwh: number;
	us_meter: number;
	us_calc: number;
	inv_factor: number;
};

export type Weather = {
	max_temp: number;
	min_temp: number;
};

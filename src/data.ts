import _admissions from './assets/json/admissions.json';
import colleges from './assets/json/colleges.json';
import provinces from './assets/json/provinces.json';

export interface College {
    name: string;
    province: string;
    city: string;
}

export interface Admission {
    name: string;
    college: string;
    major: string;

    _college?: College;
}

export interface ProvinceData {
    name: string;
     value: number;
      admissions: Admission[];
}


const admissions: Admission[] = _admissions;

function getCollege(admission: Admission): College | undefined {
    if (admission._college) {
        return admission._college;
    }

    return admission._college = colleges.find(college => college.name === admission.college);
}

export function getAdmissions(province: string): Admission[] {
    return admissions.filter(admission => province === getCollege(admission)?.province);
}

export function getProvinceData(): ProvinceData[] {
    return provinces.map(province => {
        const province_admissions = getAdmissions(province);
        return {
            name: province,
            value: province_admissions.length * 20,
            admissions: province_admissions
        }
    }).filter(value => value.value > 0);
}

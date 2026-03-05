import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Student {
    id: bigint;
    school: string;
    name: string;
    email: string;
    phone: string;
    pincode: string;
}
export interface backendInterface {
    getAllStudents(): Promise<Array<Student>>;
    loginStudent(phone: string): Promise<Student | null>;
    registerStudent(name: string, email: string, phone: string, pincode: string, school: string): Promise<bigint>;
}

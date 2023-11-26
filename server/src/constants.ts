// DEVELOPMENT INFORMATION

export const __prod__ : boolean = process.env.NODE_ENV === "production";
export const secret : string = "quiefhiwuhguiwfuiqefihuiwef4sw65f13q21ef32cs1v65e4f6c5sda1v31g365fe1sw654f64ca36514sv";
export const NODE_ENV = "development";
export const PORT = 4500;
export const DB_NAME = "builtt";
export const TYPE = "postgresql";
export const PASSWORD = "postgres";
export const CLIENT_URL = "postgres://postgres:postgres@localhost:5432/builtt";
// export const HOST = "localhost";
export const MIGRATIONS_PATH = "./migrations";
export const HOST = __prod__ ? "https://builtt.com/" : "localhost";

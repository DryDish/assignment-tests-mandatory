import "dotenv/config";
export const repeatTestCount = process.env.MYSQL_HOST === "localhost" ? 100 : 3;

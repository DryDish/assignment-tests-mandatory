import "dotenv/config";
/* istanbul ignore next */
export const repeatTestCount = process.env.MYSQL_HOST === "localhost" ? 100 : 1;

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    MYSQL_HOST: string;
    MYSQL_PORT: number;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
    API_URL: string;
  }
}

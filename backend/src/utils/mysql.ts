import config from 'config';
import { Connection, createConnection } from 'mysql2';

const mysqlConfig: any = config.get('mysql');

export class MySQL {

  connection: Connection|undefined;

  constructor() {
  }

  public connect(): Connection {
    return createConnection(mysqlConfig.url);
  };

  public disconnect(): void {
    if (this.connection) {
        this.connection.end;
    }
  };

  public getConnection(): Connection {
    if (this.connection) {
        return this.connection;
    }

    this.connection = this.connect();

    return this.connection;
  };

  public execute(sql: string): any {
    return new Promise((resolve, reject) => {
      this.getConnection().query(sql, (error: any, result: any, fields: any) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }

}

export const mysql = new MySQL();

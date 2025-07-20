import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

export class NamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  primaryKeyName(tableOrName: Table | string, columnNames: string[]) {
    tableOrName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const name = columnNames.reduce((name, column) => `${name}__${column}`, tableOrName);
    return `pk_${name}`;
  }

  foreignKeyName(tableOrName: Table | string, columnNames: string[], referencedTablePath?: string): string {
    tableOrName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const name = columnNames.reduce((name, column) => `${name}__${column}`, `${tableOrName}__${referencedTablePath}`);
    return `fk_${name}`;
  }

  relationConstraintName(tableOrName: string | Table, columnNames: string[]): string {
    tableOrName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const name = columnNames.reduce((name, column) => `${name}__${column}`, tableOrName);
    return `u_${name}`;
  }

  uniqueConstraintName(tableOrName: string | Table, columnNames: string[]): string {
    tableOrName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const name = columnNames.reduce((name, column) => `${name}__${column}`, tableOrName);
    return `u_${name}`;
  }

  indexName(tableOrName: string | Table, columnNames: string[]): string {
    tableOrName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const name = columnNames.reduce((name, column) => `${name}__${column}`, tableOrName);
    return `ix_${name}`;
  }
}

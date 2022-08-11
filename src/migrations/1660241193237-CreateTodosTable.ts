import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTodosTable1660241193237 implements MigrationInterface {
    private todosTable: Table = new Table({
        name: 'todos',
        columns: [
            {
                name: 'id',
                type: 'bigint',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'body',
                type: 'varchar',
                length: '255',
                isNullable: false,
            },
            {
                name: 'done',
                type: 'boolean',
                isNullable: false,
                default: false,
            },
            {
                name: 'created_at',
                type: 'timestamp',
                isNullable: false,
                default: 'now()',
            },
            {
                name: 'updated_at',
                type: 'timestamp',
                isNullable: true,
            },
        ],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.todosTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.todosTable)
    }

}
